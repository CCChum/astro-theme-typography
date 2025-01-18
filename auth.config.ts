import type { AuthConfig } from '@auth/core/types'
import Credentials from '@auth/core/providers/credentials'
import { themeConfig } from '@/config'

interface CustomUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export default {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (
          credentials.username === themeConfig.admin.username &&
          credentials.password === themeConfig.admin.password &&
          themeConfig.admin.enabled
        ) {
          return {
            id: '1',
            name: themeConfig.admin.username,
            role: 'admin'
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = (user as CustomUser).role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user && token.role) {
        (session.user as CustomUser).role = token.role as 'admin' | 'user'
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  }
} satisfies AuthConfig
