export function getYouTubeId(url: string) {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/;

  const match = url.match(regex);
  return match ? match[1] : null;
}

export function getYouTubeEmbedUrl(url: string) {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function getYouTubeThumbnailUrl(url: string) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function isYouTubeUrl(url: string) {
  return Boolean(getYouTubeId(url));
}