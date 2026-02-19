export function generateFullPath(path: string): string {
  if (!path) return '';

  if (path.startsWith('/original') || path.includes('/w200')) {
    return `https://image.tmdb.org/t/p${path}`;
  }

  return `https://image.tmdb.org/t/p/original${path}`;
}
