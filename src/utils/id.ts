export function generateUniqueId(prefix: string = "temp"): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}
