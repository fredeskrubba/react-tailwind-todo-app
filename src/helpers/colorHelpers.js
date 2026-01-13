
export function lightenColor(hex) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex.split("").map(c => c + c).join("");
  }

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.min(255, Math.floor(r + (255 - r) * 0.3));
  g = Math.min(255, Math.floor(g + (255 - g) * 0.3));
  b = Math.min(255, Math.floor(b + (255 - b) * 0.3));

  return `rgb(${r}, ${g}, ${b})`;
}

export function darkenColor(hex) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex.split("").map(c => c + c).join("");
  }

  let r = Math.max(0, parseInt(hex.substring(0, 2), 16) - 20);
  let g = Math.max(0, parseInt(hex.substring(2, 4), 16) - 20);
  let b = Math.max(0, parseInt(hex.substring(4, 6), 16) - 20);

  return `rgb(${r}, ${g}, ${b})`;
}


export function hexToRgb(hex) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex.split("").map(c => c + c).join("");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}