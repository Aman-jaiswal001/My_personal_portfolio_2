const apiOrigin = import.meta.env.VITE_API_ORIGIN || 'http://localhost:3002';

export function apiUrl(path) {
  return `${apiOrigin}${path}`;
}
