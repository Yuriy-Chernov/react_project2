# React SPA 2

Учебный проект на React + TypeScript + Vite.

## Зависимости

### Production

- `react`, `react-dom`
- `@tanstack/react-router`, `@tanstack/react-query`
- `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`

### Development

- `vite`, `@vitejs/plugin-react`, `typescript`
- `tailwindcss`, `@tailwindcss/vite`
- `@types/react`, `@types/react-dom`, `@types/node`

## Запуск

```bash
pnpm install
pnpm dev
```

```bash
pnpm build
pnpm preview
```

## Конфигурация

- `vite.config.ts` — React, Tailwind, алиас `@/` → `src/`
- `tsconfig.json` — strict TypeScript, path aliases
- `.env.example` — переменные окружения для API
