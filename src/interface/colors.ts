import { CmykComponent, HslComponent, HsvComponent, InternalColor, RgbComponent } from '../types'
import { cmykToRgb, hslToRgb, hsvToRgb, rgbToCmyk, rgbToHsl, rgbToHsv } from '../utils/colors'

/**
 * Generates a random color.
 *
 * @returns The random color.
 */
export function randomColor(): InternalColor {
  // Generate random RGB values
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)

  // Remove the smallest component to make the color more vibrant
  const min = Math.min(red, green, blue)
  if (red === min) return { red: 0, green, blue }
  if (green === min) return { red, green: 0, blue }
  if (blue === min) return { red, green, blue: 0 }

  return { red, green, blue }
}

/**
 * Creates an RGB color.
 *
 * @param red The intensity of red (0-255).
 * @param green The intensity of green (0-255).
 * @param blue The intensity of blue (0-255).
 *
 * @returns The RGB color, as an internal color.
 */
export function rgbColor(red: number, green: number, blue: number): InternalColor {
  return { red: red, green: green, blue: blue }
}

/**
 * Creates an HSL color.
 *
 * @param hue The hue of the color (0-360).
 * @param saturation The saturation of the color (0-100).
 * @param lightness The lightness of the color (0-100).
 *
 * @returns The HSL color, as an internal color.
 */
export function hslColor(hue: number, saturation: number, lightness: number): InternalColor {
  return hslToRgb({ hue, saturation, lightness })
}

/**
 * Creates an HSV color.
 *
 * @param hue The hue of the color (0-360).
 * @param saturation The saturation of the color (0-100).
 * @param value The value of the color (0-100).
 *
 * @returns The HSV color, as an internal color.
 */
export function hsvColor(hue: number, saturation: number, value: number): InternalColor {
  return hsvToRgb({ hue, saturation, value })
}

/**
 * Creates a CMYK color.
 *
 * @param cyan The intensity of cyan (0-100).
 * @param magenta The intensity of magenta (0-100).
 * @param yellow The intensity of yellow (0-100).
 * @param key The intensity of black (0-100).
 *
 * @returns The CMYK color, as an internal color.
 */
export function cmykColor(cyan: number, magenta: number, yellow: number, key: number): InternalColor {
  return cmykToRgb({ cyan, magenta, yellow, key })
}

/**
 * Gets an RGB component of a color.
 *
 * @param component The RGB component to get.
 * @param color The color to get the component from.
 *
 * @returns The value of the RGB component.
 */
export function rgbComponent(component: RgbComponent, color: InternalColor): number {
  switch (component) {
    case RgbComponent.Red:
      return color.red
    case RgbComponent.Green:
      return color.green
    case RgbComponent.Blue:
      return color.blue
  }
}

/**
 * Gets an HSL component of a color.
 *
 * @param component The HSL component to get.
 * @param color The color to get the component from.
 *
 * @returns The value of the HSL component.
 */
export function hslComponent(component: HslComponent, color: InternalColor): number {
  const { hue, saturation, lightness } = rgbToHsl(color)
  switch (component) {
    case HslComponent.Hue:
      return hue
    case HslComponent.Saturation:
      return saturation
    case HslComponent.Lightness:
      return lightness
  }
}

/**
 * Gets an HSV component of a color.
 *
 * @param component The HSV component to get.
 * @param color The color to get the component from.
 *
 * @returns The value of the HSV component.
 */
export function hsvComponent(component: HsvComponent, color: InternalColor): number {
  const { hue, saturation, value } = rgbToHsv(color)
  switch (component) {
    case HsvComponent.Hue:
      return hue
    case HsvComponent.Saturation:
      return saturation
    case HsvComponent.Value:
      return value
  }
}

/**
 * Gets a CMYK component of a color.
 *
 * @param component The CMYK component to get.
 * @param color The color to get the component from.
 *
 * @returns The value of the CMYK component.
 */
export function cmykComponent(component: CmykComponent, color: InternalColor): number {
  const { cyan, magenta, yellow, key } = rgbToCmyk(color)
  switch (component) {
    case CmykComponent.Cyan:
      return cyan
    case CmykComponent.Magenta:
      return magenta
    case CmykComponent.Yellow:
      return yellow
    case CmykComponent.Key:
      return key
  }
}
