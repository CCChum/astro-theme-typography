/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@astrojs/image/client" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}

interface ImportMetaEnv {
  readonly GITHUB_ID: string
  readonly GITHUB_SECRET: string
  readonly AUTH_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'astro:content' {
  interface Render {
    '.md': Promise<{
      Content: import('astro').MarkdownInstance<{}>['Content']
      headings: import('astro').MarkdownHeading[]
      remarkPluginFrontmatter: Record<string, any>
    }>
  }
}

declare module '@auth/core/types' {
  interface Session {
    user?: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module '@simplewebauthn/browser' {
  export function startRegistration(options: any): Promise<any>
  export function startAuthentication(options: any): Promise<any>
}

declare namespace App {
  interface Locals {
    locale: string
    translate: (key: string) => string
  }
}

declare module 'virtual:*' {
  const value: any
  export default value
}
