import * as os from 'node:os'
import process from 'node:process'

import { InternalColor } from '../types'

/**
 * The header of a pattern.
 */
export interface JelkaHeader {
  /**
   * The number of lights on the tree.
   */
  numberOfLights: number

  /**
   * The frame rate of the pattern.
   */
  frameRate: number
}

/**
 * Writes the header of a pattern.
 *
 * @param header The header to write.
 * @param header.numberOfLights The number of lights on the tree.
 * @param header.frameRate The frame rate of the pattern.
 */
export function writeHeader({ numberOfLights, frameRate }: JelkaHeader): void {
  const header = {
    version: 0,
    led_count: numberOfLights,
    fps: frameRate,
  }

  process.stdout.write(`#${JSON.stringify(header)}${os.EOL}`)
}

/**
 * Writes a frame of a pattern.
 *
 * @param colors The colors of the frame.
 */
export function writeFrame(colors: InternalColor[]): void {
  const frame = colors
    .map(({ red, green, blue }) => {
      const r = Math.max(0, Math.min(255, Math.round(red)))
        .toString(16)
        .padStart(2, '0')
      const g = Math.max(0, Math.min(255, Math.round(green)))
        .toString(16)
        .padStart(2, '0')
      const b = Math.max(0, Math.min(255, Math.round(blue)))
        .toString(16)
        .padStart(2, '0')
      return `${r}${g}${b}`
    })
    .join('')

  process.stdout.write(`#${frame}${os.EOL}`)
}
