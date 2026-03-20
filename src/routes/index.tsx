import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">🎬 TMDB Explorer</h1>

        <p className="text-lg text-muted-foreground">
          Discover movies and TV shows in a fast, modern, and user-friendly interface powered by the
          TMDB API.
        </p>

        <p className="text-base text-muted-foreground">
          Explore trending content, apply advanced filters, and find exactly what you're looking for
          with ease.
        </p>

        <div className="grid gap-4 md:grid-cols-2 text-left mt-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">🚀 Features</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>🔍 Discover movies and TV shows</li>
              <li>🎯 Advanced filtering</li>
              <li>📊 Sorting by rating & popularity</li>
              <li>🌍 Multi-language support</li>
              <li>🔞 Adult content toggle</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">⚡ Performance</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>⚡ Fast data fetching & caching</li>
              <li>🧭 Smooth navigation</li>
              <li>📱 Responsive UI</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">🛠️ Tech Stack</h3>
          <p className="text-muted-foreground">
            React 19 · TypeScript · TanStack Router · React Query · Zustand · Tailwind CSS ·
            shadcn/ui
          </p>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          💡 Start exploring now and discover your next favorite movie or TV show!
        </p>
      </div>
    </div>
  );
}
