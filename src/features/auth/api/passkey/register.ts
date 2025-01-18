import type { APIRoute } from 'astro'
import {
  generateRegistrationOptions,
  verifyRegistrationResponse
} from '@simplewebauthn/server'

const rpName = 'Astro Theme Typography'
const rpID = 'localhost'
const origin = `http://${rpID}:4321`

export const post: APIRoute = async ({ request }) => {
  try {
    const user = { id: '1', username: 'admin' }

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID: user.id,
      userName: user.username,
      attestationType: 'none'
    })

    return new Response(JSON.stringify(options), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to generate registration options' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const put: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: body.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID
    })

    if (verification.verified) {
      const { credentialID } = verification.registrationInfo
      // Store the credential ID in your database
      return new Response(JSON.stringify({ verified: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    return new Response(JSON.stringify({ verified: false }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to verify registration' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
