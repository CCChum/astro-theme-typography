---
title: Hello World
description: Welcome to Astro Typography, a clean and minimal blog theme.
pubDate: 2024-01-15
categories: ["General"]
---

Welcome to Astro Typography, a clean and minimal blog theme built with Astro and UnoCSS.

## Features

- Clean and minimal design
- Dark mode support
- Responsive layout
- SEO friendly
- RSS feed
- Sitemap
- Categories
- Archive

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/astro-theme-typography.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Configuration

Edit `.config/user.ts` to customize your blog:

```typescript
export const config = {
  site: {
    title: 'My Blog',
    description: 'A personal blog built with Astro'
  },
  // ... more configuration options
}
```

## Writing Posts

Create markdown files in `src/content/posts` directory:

```markdown
---
title: My New Post
description: A brief description
pubDate: 2024-01-15
category: General
---

Your post content here...
```

## Deployment

Build your site for production:

```bash
pnpm build
```

Deploy to your favorite hosting platform!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License 2024
