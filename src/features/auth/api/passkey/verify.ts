import type { APIRoute } from 'astro'
import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import type { 
  AuthenticationResponseJSON,
  VerifyAuthenticationResponseOpts
} from '@simplewebauthn/server'

const rpID = import.meta.env.WEBAUTHN_RP_ID || 'blog.chumyin.com'
const expectedOrigin = import.meta.env.WEBAUTHN_ORIGIN || 'https://blog.chumyin.com'

interface StoredAuthenticator {
  credentialID: Uint8Array
  credentialPublicKey: Uint8Array
  counter: number
}

export const post: APIRoute = async ({ request }) => {
  try {
    if (!request.body) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Request body is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const body = await request.json() as AuthenticationResponseJSON

    if (!body.id || !body.response) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid authentication response format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get stored authenticator data from database
    const expectedChallenge = 'your-challenge'
    const storedAuthenticator = await getStoredAuthenticator(body.id)

    if (!storedAuthenticator) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Authenticator not found' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!storedAuthenticator.credentialPublicKey || !storedAuthenticator.credentialID) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid authenticator data' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    try {
      const verification = await verifyAuthenticationResponse({
        response: body,
        expectedChallenge,
        expectedOrigin,
        expectedRPID: rpID,
        requireUserVerification: true,
        credential: {
          id: body.id,
          publicKey: storedAuthenticator.credentialPublicKey,
          counter: storedAuthenticator.counter || 0
        }
      })

      if (verification.verified) {
        try {
          // Update authenticator counter
          await updateAuthenticatorCounter(
            body.id, 
            verification.authenticationInfo.newCounter
          )

          return new Response(JSON.stringify({ 
            success: true,
            message: 'Authentication successful',
            newCounter: verification.authenticationInfo.newCounter
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        } catch (counterError) {
          console.error('Error updating counter:', counterError)
          return new Response(JSON.stringify({ 
            success: true,
            message: 'Authentication successful but failed to update counter',
            newCounter: verification.authenticationInfo.newCounter
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
      }

      return new Response(JSON.stringify({ 
        success: false,
        message: 'Authentication failed: Invalid credentials' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (verificationError) {
      console.error('Verification error:', verificationError)
      return new Response(JSON.stringify({ 
        success: false,
        message: 'Authentication failed: Verification error' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return new Response(JSON.stringify({ 
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Mock functions - replace with actual database operations
async function getStoredAuthenticator(id: string): Promise<StoredAuthenticator | null> {
  try {
    // TODO: Implement database lookup
    return {
      credentialID: new Uint8Array([]),
      credentialPublicKey: new Uint8Array([]),
      counter: 0
    }
  } catch (error) {
    console.error('Database error:', error)
    return null
  }
}

async function updateAuthenticatorCounter(id: string, newCounter: number) {
  try {
    // TODO: Implement database update
    console.log(`Updating counter for ${id} to ${newCounter}`)
  } catch (error) {
    console.error('Error updating counter:', error)
    throw error
  }
}
