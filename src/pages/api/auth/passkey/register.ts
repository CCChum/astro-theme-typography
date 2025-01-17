import type { APIRoute } from 'astro'

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()
    const { username, challenge } = data

    // Convert string to Uint8Array for WebAuthn
    const challengeBuffer = new TextEncoder().encode(challenge)
    const usernameBuffer = new TextEncoder().encode(username)

    // Your WebAuthn registration logic here...
    
    return new Response(JSON.stringify({ 
      status: 'success',
      data: {
        challenge: challengeBuffer,
        username: usernameBuffer
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
