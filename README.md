# T-App

A modern Next.js application built with the latest technologies and best practices.

## 🚀 Tech Stack

- **Next.js 15** - Latest version with App Router and Server Components
- **React 19** - Latest React with improved performance and features
- **TypeScript** - Strict mode enabled for type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components built with Radix UI
- **TanStack Query** - Powerful data fetching and state management
- **pnpm** - Fast, disk space efficient package manager
- **Node.js 20** - Specified via `.nvmrc` for consistent development environment
- **Prettier** - With import sorting using @trivago/prettier-plugin-sort-imports

## 📋 Prerequisites

- Node.js 20 (use `nvm use` if you have nvm installed)
- pnpm (install with `npm install -g pnpm`)

## 🛠️ Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start the development server:**

   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Code Conventions

### Import Order

The project uses automatic import sorting with the following order:

```
1. React-related imports
2. Next.js imports
3. Third-party libraries
4. API-related imports (@/lib/api/generated/*)
5. API client imports (@/lib/api/*)
6. Library utilities (@/lib/*)
7. UI components (@/components/ui/*)
8. Shared components (@/components/shared/*)
9. Provider components (@/components/providers/*)
10. Other components (@/components/*)
11. Hooks (@/hooks/*)
12. App-specific imports (@/app/*)
13. Relative imports
```

To format your code and sort imports:

```bash
pnpm format
```

## 📦 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality checks

## 🧩 Adding shadcn/ui Components

To add new components from shadcn/ui:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Example:

```bash
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
```

## 🔄 TanStack Query

This project includes TanStack Query for efficient data fetching. The setup includes:

- Query client configuration with sensible defaults
- React Query Devtools for debugging (development only)
- Example usage in the main page component

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Home page with demos
│   └── globals.css     # Global styles
├── components/
│   ├── providers/      # React context providers
│   └── ui/            # shadcn/ui components
└── lib/
    └── utils.ts       # Utility functions
```

## 🎨 Styling

- **Tailwind CSS** is configured and ready to use
- **shadcn/ui** components use CSS variables for theming
- Dark mode support is built-in
- Custom utility classes can be added in `globals.css`

## 🔧 Configuration Files

- `.nvmrc` - Node.js version specification
- `tsconfig.json` - TypeScript configuration (strict mode)
- `tailwind.config.ts` - Tailwind CSS configuration
- `components.json` - shadcn/ui component configuration
- `next.config.ts` - Next.js configuration

## 🚀 Deployment

This application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - Full-stack deployment
- **Railway** - Simple deployment with databases
- **Docker** - Containerized deployment

For Vercel deployment:

```bash
pnpm build
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

Built with ❤️ using modern web technologies.
