import { lightnessThreshold } from "./Constants"

export const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } => {
  r /= 255 // r = r / 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)

    switch (max) {
      case r:
        h = (g - b) / (max - min) + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / (max - min) + 2
        break
      case b:
        h = (r - g) / (max - min) + 4
        break
    }

    h /= 6
  }

  return { h, s, l }
}

export const calculateLightness = (hexColor: string): number => {
  // Remove the hash symbol if present
  const hex = hexColor.replace(/^#/, "")

  // Parse the hex color into RGB components
  const bigint = parseInt(hex, 16) // converts hexadecimal number into decimal (base-10) equivalent.

  const r = (bigint >> 16) & 255

  const g = (bigint >> 8) & 255
  const b = bigint & 255

  /* // Calculate relative luminance
    const luminance: number =
      (0.2126 * r) / 255 + (0.7152 * g) / 255 + (0.0722 * b) / 255

    return luminance
    */

  // Convert RGB to HSL
  const { l } = rgbToHsl(r, g, b)

  return l
}

export const setTextColorOnMouseEnter = (e: React.MouseEvent) => {
  const targetElement = e.target as HTMLElement

  const root = document.documentElement

  const color = root.style.getPropertyValue("--accent-color")

  const lightness = calculateLightness(color)

  if (lightness > lightnessThreshold) {
    targetElement.style.color = "#2a2c3a"
  } else {
    targetElement.style.color = "white"
  }
}

export const resetTextColorToWhiteOnMouseLeave = (e: React.MouseEvent) => {
  const targetElement = e.target as HTMLElement

  targetElement.style.color = "white"
}
