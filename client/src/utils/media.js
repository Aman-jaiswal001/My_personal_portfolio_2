const apiOrigin = import.meta.env.VITE_API_ORIGIN || 'http://localhost:3002';

export function mediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/images/') || url.startsWith('/PDF/')) {
    return url;
  }
  return `${apiOrigin}${url}`;
}
