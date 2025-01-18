import type { AuthConfig } from '@auth/core'
import type { AuthToken } from '@/types'
import { themeConfig } from '@/config'
import GithubProvider from '@auth/core/providers/github'

export const authConfig: AuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }): Promise<AuthToken> {
      if (user?.email === process.env.ADMIN_EMAIL) {
        token.role = 'admin'
      }
      return token
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error'
  }
}
