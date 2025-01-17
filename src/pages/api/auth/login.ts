import type { APIRoute } from 'astro'
import { themeConfig } from '@/config/default'

interface LoginCredentials {
  username: string
  password: string
}

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json() as LoginCredentials
    const { username, password } = data

    if (!username || !password) {
      return new Response(
        JSON.stringify({
          error: 'Missing username or password',
        }),
        { status: 400 }
      )
    }

    const { admin } = themeConfig

    if (admin && username === admin.username && password === admin.password) {
      return new Response(
        JSON.stringify({
          success: true,
          token: 'dummy-token',
        }),
        { status: 200 }
      )
    }

    return new Response(
      JSON.stringify({
        error: 'Invalid username or password',
      }),
      { status: 401 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      { status: 500 }
    )
  }
}
