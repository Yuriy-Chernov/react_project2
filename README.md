# React SPA 2

Учебное SPA на React + TypeScript + Vite: каталог товаров DummyJSON, корзина, избранное и авторизация.

Репозиторий: https://github.com/Yuriy-Chernov/react_project2
Деплой: https://react-project2-alpha-one.vercel.app/

## Функциональность

- Авторизация через DummyJSON (`/auth/login`, `/auth/me`), защищённые маршруты.
- Каталог товаров с поиском и фильтрацией по тегам.
- Страница товара с галереей, описанием и наличием.
- Корзина (количество, итог, оформление заказа) и список избранного — данные хранятся в `localStorage`.
- Адаптивная вёрстка, мобильное меню.

Страницы: `/login`, `/`, `/product/$id`, `/cart`, `/wishlist`.

Чат по WebSocket в этой версии не реализован.

## Стек

- React 19, TypeScript (strict)
- Vite
- TanStack Router, TanStack Query
- Tailwind CSS 4, UI-примитивы на Radix Slot + CVA
- Zod, React Hook Form
- DummyJSON API

Архитектура: Feature-Sliced Design (`app`, `pages`, `widgets`, `features`, `entities`, `shared`).

## Зависимости

### Production

- `react`, `react-dom`
- `@tanstack/react-router`, `@tanstack/react-query`
- `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`
- `react-hook-form`, `@hookform/resolvers`, `zod`

### Development

- `vite`, `@vitejs/plugin-react`, `@tanstack/router-plugin`
- `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
- `tailwindcss`, `@tailwindcss/vite`
- `eslint`, `typescript-eslint`, `prettier`, `husky`, `lint-staged`

Менеджер пакетов: `pnpm@10.32.0`.

## Запуск

Нужны Node.js 20+ и pnpm.

```bash
pnpm install
pnpm dev
```
