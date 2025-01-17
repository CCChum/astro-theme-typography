import type { AuthConfig, User } from '@auth/core'
import type { CustomUser } from './src/types'
import GitHub from '@auth/core/providers/github'

export interface CustomUser extends User {
  role?: 'admin' | 'user'
}

export const authConfig: AuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as CustomUser).role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as CustomUser).role = token.role as 'admin' | 'user'
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  secret: import.meta.env.AUTH_SECRET,
}
