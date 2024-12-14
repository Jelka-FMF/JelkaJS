////////////////////
// Relation Types //
////////////////////

/**
 * Represents a relation between two values.
 *
 * @category Types.Relation
 */
export enum Relation {
  Greater = '>',
  Less = '<',
}

////////////////////
// Position Types //
////////////////////

/**
 * Represents a position in 3D space.
 *
 * @category Types.Position
 */
export interface Position {
  x: number
  y: number
  z: number
}

/**
 * Represents an axis in 3D space.
 *
 * @category Types.Position
 */
export enum Axis {
  X = 'x',
  Y = 'y',
  Z = 'z',
}

/////////////////
// Color Types //
/////////////////

/**
 * Represents a color in the RGB color space.
 *
 * @category Types.Color
 */
export interface RgbColor {
  red: number
  green: number
  blue: number
}

/**
 * Represents an RGB component of a color.
 *
 * @category Types.Color
 */
export enum RgbComponent {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

/**
 * Represents a color in the HSL color space.
 *
 * @category Types.Color
 */
export interface HslColor {
  hue: number
  saturation: number
  lightness: number
}

/**
 * Represents an HSL component of a color.
 *
 * @category Types.Color
 */
export enum HslComponent {
  Hue = 'hue',
  Saturation = 'saturation',
  Lightness = 'lightness',
}

/**
 * Represents a color in the HSV color space.
 *
 * @category Types.Color
 */
export interface HsvColor {
  hue: number
  saturation: number
  value: number
}

/**
 * Represents an HSV component of a color.
 *
 * @category Types.Color
 */
export enum HsvComponent {
  Hue = 'hue',
  Saturation = 'saturation',
  Value = 'value',
}

/**
 * Represents a color in the CMYK color space.
 *
 * @category Types.Color
 */
export interface CmykColor {
  cyan: number
  magenta: number
  yellow: number
  key: number
}

/**
 * Represents a CMYK component of a color.
 *
 * @category Types.Color
 */
export enum CmykComponent {
  Cyan = 'cyan',
  Magenta = 'magenta',
  Yellow = 'yellow',
  Key = 'key',
}

////////////////////
// Internal Types //
////////////////////

/**
 * Represents an internal color state.
 *
 * This is used to represent the color state of a light internally.
 * It is not meant to be used directly by the user.
 *
 * @category Types.Internal
 */
export interface InternalColor {
  red: number
  green: number
  blue: number
}
