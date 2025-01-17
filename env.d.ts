/// <reference types="astro/client" />
/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly AUTH_SECRET: string
  readonly ADMIN_USERNAME: string
  readonly ADMIN_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals {
    translate: (key: string) => string
    language: string
  }
}
