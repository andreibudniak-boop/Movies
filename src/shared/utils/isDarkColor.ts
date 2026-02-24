export function isDarkColor([r, g, b]: number[]) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 140;
}
