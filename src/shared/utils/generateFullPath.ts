export function generateFullPath(
  path?: string,
  size: 'original' | 'w1280' | 'w780' | 'w500' = 'w1280'
): string {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
