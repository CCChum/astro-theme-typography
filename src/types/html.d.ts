/// <reference types="astro/astro-jsx" />

declare module 'astro/jsx-runtime' {
  interface HTMLAttributes {
    flex?: string | boolean
    lg?: string | boolean
    translate?: string | boolean
    'data-pagefind-body'?: boolean
    'data-flex'?: string
    'data-lg'?: string
    'data-translate'?: string | boolean
    class?: string | Record<string, boolean>
    'class:list'?: Array<string | Record<string, boolean>>
  }
}
