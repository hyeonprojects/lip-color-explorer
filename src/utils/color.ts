/**
 * Calculates the relative luminance of a HEX color to determine contrast.
 * Returns a value between 0 (pure black) and 1 (pure white).
 */
export function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return 0.5;

  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Returns true if the color is bright (luminance > 0.85), requiring a micro-border guard
 * so that pale/nude swatches are clearly visible against light backgrounds.
 */
export function isHighLuminance(hex: string): boolean {
  return getLuminance(hex) > 0.85;
}

/**
 * Formats a number as Korean Won string (e.g., 18000 -> "18,000원")
 */
export function formatKRW(price: number): string {
  return `${price.toLocaleString('ko-KR')}원`;
}
