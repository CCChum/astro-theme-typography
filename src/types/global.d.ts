/// <reference types="astro/client" />

declare global {
  interface Window {
    // Analytics
    dataLayer?: any[];
    googleAnalyticsId: string;
    _hmt: any[];
    gtag: (...args: any[]) => void;

    // Comments
    disqusConfig?: {
      shortname: string;
      config: {
        url: string;
        identifier: string;
        title: string;
      };
    };
    disqus_config?: {
      page: {
        url: string;
        identifier: string;
        title: string;
      };
    };
    page: any;
    twikoo: {
      init: (config: { envId: string; region?: string; el: string }) => void;
    };
    twikooConfig?: {
      envId: string;
      region: string;
    };
    giscusConfig?: {
      repo: string;
      repoId: string;
      category: string;
      categoryId: string;
      mapping: string;
      reactionsEnabled: boolean;
      emitMetadata: boolean;
      inputPosition: 'top' | 'bottom';
      lang: string;
    };
    utterances: {
      config: {
        repo: string;
        issueTerm: string;
        label?: string;
        theme?: string;
      };
    };
    DISQUS: any;
  }

  namespace App {
    interface Locals {
      user?: {
        name: string;
        email: string;
      };
    }
  }

  // Extend HTML attributes for custom properties
  declare module 'astro:content' {
    namespace JSX {
      interface HTMLAttributes {
        flex?: boolean;
        lg?: boolean;
        translate?: boolean | string;
        'data-pagefind-body'?: string;
      }
    }
  }
}

export {};
