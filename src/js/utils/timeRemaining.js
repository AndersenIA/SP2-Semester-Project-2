export function timeRemaining(endsAt) {
  const end = new Date(endsAt).getTime();
  const now = Date.now();

  let diff = end - now;

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 24 * 60 * 60 * 1000;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 60 * 60 * 1000;

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 60 * 1000;

  const seconds = Math.floor(diff / 1000);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}
