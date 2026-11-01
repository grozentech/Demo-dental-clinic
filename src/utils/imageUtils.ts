/**
 * Image Utilities and Resilient Fallback Handlers
 * Ensures zero broken image frames across all network conditions.
 */

export function createSvgFallback(title: string, subtitle?: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
    <rect width="600" height="400" fill="#F5F8FA"/>
    <rect x="1" y="1" width="598" height="398" stroke="#E2E8F0" stroke-width="2" rx="12"/>
    <circle cx="300" cy="170" r="44" fill="#E6F8F5"/>
    <path d="M300 148C287.85 148 278 157.85 278 170C278 178.8 282 188 286 196C290 204 294 214 294 222C294 225.31 296.69 228 300 228C303.31 228 306 225.31 306 222C306 216 308 210 310 204C312 210 314 216 314 222C314 225.31 316.69 228 320 228C323.31 228 326 225.31 326 222C326 214 330 204 334 196C338 188 342 178.8 342 170C342 157.85 332.15 148 320 148H300Z" fill="#20B8A5"/>
    <text x="300" y="260" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="bold" fill="#12345A">${title}</text>
    <text x="300" y="285" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#5D7185">${subtitle || 'Demo Dental Clinic · Healthcare Practice'}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function handleImageFallback(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackTitle: string = 'Demo Dental Clinic'
) {
  const target = e.currentTarget;
  // Prevent infinite loop if fallback fails
  if (!target.dataset.failed) {
    target.dataset.failed = 'true';
    target.src = createSvgFallback(fallbackTitle);
  }
}
