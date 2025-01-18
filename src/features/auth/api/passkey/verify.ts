import type { APIRoute } from 'astro'
import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server'

interface StoredAuthenticator {
  credentialID: Uint8Array
  credentialPublicKey: Uint8Array
  counter: number
}

const rpID = import.meta.env.WEBAUTHN_RP_ID || 'blog.chumyin.com'
const expectedOrigin = import.meta.env.WEBAUTHN_ORIGIN || 'https://blog.chumyin.com'

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

    const body = await request.json()

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
        expectedChallenge: body.challenge,
        expectedOrigin,
        expectedRPID: rpID,
        authenticator: {
          credentialID: storedAuthenticator.credentialID,
          credentialPublicKey: storedAuthenticator.credentialPublicKey,
          counter: storedAuthenticator.counter
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
        message: 'Authentication failed' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      console.error('Error during authentication verification:', error)
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Error during authentication verification' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  } catch (error) {
    console.error('Error processing authentication request:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Error processing authentication request' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Mock functions - replace with actual database operations
async function getStoredAuthenticator(id: string): Promise<StoredAuthenticator | null> {
  // This is a mock implementation
  // Replace with actual database query
  return null
}

async function updateAuthenticatorCounter(id: string, newCounter: number): Promise<void> {
  // This is a mock implementation
  // Replace with actual database update
  console.log('Updating counter for', id, 'to', newCounter)
}
