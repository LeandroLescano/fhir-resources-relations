export function generateRandomLightColor() {
  // Generate random hue between 0 and 360 (representing the color wheel)
  const hue = Math.floor(Math.random() * 361);

  // Set saturation and lightness to achieve vibrant and light colors
  const saturation = 80 + Math.random() * 20; // Saturation between 80% and 100%
  const lightness = 70 + Math.random() * 20; // Lightness between 70% and 90%

  // Convert HSL to RGB
  const rgbColor = hslToRgb(hue, saturation, lightness);

  // Convert RGB to hexadecimal format
  const hexColor = rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);

  return hexColor;
}

function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}
