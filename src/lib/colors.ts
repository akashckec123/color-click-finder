// Color dataset with common color names
export interface ColorData {
  name: string;
  hex: string;
  r: number;
  g: number;
  b: number;
}

export const colors: ColorData[] = [
  { name: "Red", hex: "#FF0000", r: 255, g: 0, b: 0 },
  { name: "Green", hex: "#00FF00", r: 0, g: 255, b: 0 },
  { name: "Blue", hex: "#0000FF", r: 0, g: 0, b: 255 },
  { name: "Yellow", hex: "#FFFF00", r: 255, g: 255, b: 0 },
  { name: "Orange", hex: "#FFA500", r: 255, g: 165, b: 0 },
  { name: "Purple", hex: "#800080", r: 128, g: 0, b: 128 },
  { name: "Pink", hex: "#FFC0CB", r: 255, g: 192, b: 203 },
  { name: "Brown", hex: "#A52A2A", r: 165, g: 42, b: 42 },
  { name: "Black", hex: "#000000", r: 0, g: 0, b: 0 },
  { name: "White", hex: "#FFFFFF", r: 255, g: 255, b: 255 },
  { name: "Gray", hex: "#808080", r: 128, g: 128, b: 128 },
  { name: "Cyan", hex: "#00FFFF", r: 0, g: 255, b: 255 },
  { name: "Magenta", hex: "#FF00FF", r: 255, g: 0, b: 255 },
  { name: "Lime", hex: "#00FF80", r: 0, g: 255, b: 128 },
  { name: "Navy", hex: "#000080", r: 0, g: 0, b: 128 },
  { name: "Maroon", hex: "#800000", r: 128, g: 0, b: 0 },
  { name: "Olive", hex: "#808000", r: 128, g: 128, b: 0 },
  { name: "Teal", hex: "#008080", r: 0, g: 128, b: 128 },
  { name: "Silver", hex: "#C0C0C0", r: 192, g: 192, b: 192 },
  { name: "Gold", hex: "#FFD700", r: 255, g: 215, b: 0 },
  { name: "Indigo", hex: "#4B0082", r: 75, g: 0, b: 130 },
  { name: "Violet", hex: "#8A2BE2", r: 138, g: 43, b: 226 },
  { name: "Turquoise", hex: "#40E0D0", r: 64, g: 224, b: 208 },
  { name: "Coral", hex: "#FF7F50", r: 255, g: 127, b: 80 },
  { name: "Salmon", hex: "#FA8072", r: 250, g: 128, b: 114 },
];

// Convert RGB to Hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

// Calculate color distance using Euclidean distance
export const getColorDistance = (
  r1: number, g1: number, b1: number,
  r2: number, g2: number, b2: number
): number => {
  return Math.sqrt(
    Math.pow(r2 - r1, 2) + 
    Math.pow(g2 - g1, 2) + 
    Math.pow(b2 - b1, 2)
  );
};

// Find closest color name from dataset
export const getClosestColor = (r: number, g: number, b: number): ColorData => {
  let minDistance = Infinity;
  let closestColor = colors[0];

  colors.forEach(color => {
    const distance = getColorDistance(r, g, b, color.r, color.g, color.b);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  });

  return closestColor;
};