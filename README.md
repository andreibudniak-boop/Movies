# 🎬 TMDB Explorer

A modern React application for discovering movies and TV shows using the TMDB API.

Built with a performant and scalable stack including TanStack Router, React Query, Zustand, and Tailwind CSS.

## 🚀 Features

- 🔍 Discover movies and TV shows
- 🎯 Advanced filtering (rating, genres, runtime, etc.)
- 📊 Sorting (popularity, rating, etc.)
- 🌍 Multi-language support
- 🔞 Toggle adult content
- ⚡ Fast data fetching & caching with React Query
- 🧭 Type-safe routing with TanStack Router
- 🧩 Modular and scalable architecture

## 🛠️ Tech Stack

### Core

- React 19
- TypeScript
- Vite

### Routing

- @tanstack/react-router (type-safe routing)

### Data Fetching

- @tanstack/react-query
- Axios

### State Management

- Zustand

### UI & Styling

- Tailwind CSS v4
- shadcn/ui
- Radix UI primitives
- class-variance-authority

### Utilities

- dayjs (date handling)
- lucide-react (icons)

### Tooling

- ESLint
- Prettier
- gh-pages (deployment)

#### Structure of project

src/
├── models/
│ ├── movies/
│ │ ├── api/ # API calls (movies)
│ │ ├── components/ # UI components
│ │ ├── hooks/ # Feature hooks
│ │ ├── pages/ # Pages
│ │ └── queries/ # React Query logic
│ │
│ ├── tvs/
│ │ ├── api/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ └── queries/
│
├── routes/ # TanStack Router config
├── shared/
│ ├── components/ # Reusable UI
│ ├── hooks/ # Shared hooks
│ ├── lib/ # Core utilities
│ ├── store/ # Zustand stores
│ ├── types/ # Global types
│ └── utils/ # Helpers
│
├── axiosCreate.ts # Axios instance
├── routeTree.gen.ts # Generated router tree
├── main.tsx
└── app.tsx
.
