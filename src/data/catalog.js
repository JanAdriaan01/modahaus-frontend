export const PRODUCT_LIBRARY = {
  "Sliding Window": {
    codePrefix: "SW",
    description: "Smooth sliding aluminium windows",
    image: "/images/sliding1000.jpg",
    sizes: {
      "1200x1200": 4500,
      "1500x1200": 5200,
      "1800x1200": 5900,
    },
  },
  "Casement Window": {
    codePrefix: "CW", 
    description: "Hinged casement windows",
    image: "/images/swift38.jpg",
    sizes: {
      "600x900": 3200,
      "900x900": 3800,
      "1200x900": 4400,
    },
  },
  "Fixed Window": {
    codePrefix: "FW",
    description: "Fixed non-opening windows",
    image: "/images/edge42.jpg",
    sizes: {
      "600x600": 1800,
      "900x900": 2400,
      "1200x1200": 3200,
    },
  },
};

export const ROOM_PRESETS = {
  Bathroom: ["600x900", "900x900"],
  Bedroom: ["1200x1200", "1500x1200"], 
  Kitchen: ["900x900", "1200x900"],
  LivingRoom: ["1500x1200", "1800x1200"],
};

export const GLASS_MULTIPLIER = {
  clear: 1.0,
  tinted: 1.2,
  laminated: 1.5,
  lowe: 1.8,
};

export const FINISH_MULTIPLIER = {
  white: 1.0,
  charcoal: 1.1,
  black: 1.1,
  bronze: 1.3,
};

export const PRODUCT_REVIEWS = {};

export function makeSku(prefix, size) {
  return `${prefix}-${size.replace('x', '-')}`;
}

export function parseSku(sku) {
  const [prefix, width, height] = sku.split('-');
  return { prefix, size: `${width}x${height}` };
}

export function findProductByPrefix(prefix) {
  for (const [type, product] of Object.entries(PRODUCT_LIBRARY)) {
    if (product.codePrefix === prefix) {
      return [type, product];
    }
  }
  return null;
}