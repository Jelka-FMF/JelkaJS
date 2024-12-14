import * as fs from 'node:fs'

import { Position } from '../types'
import { normalizePositionsBall } from './normalizations'

/**
 * Loads the positions of the lights from a file.
 *
 * The function tries to load the positions from the first
 * valid file in the list of filenames.
 *
 * @param filenames The list of filenames to load the positions from.
 *
 * @returns The positions of the lights.
 */
export function loadPositions(filenames: string[]): Record<number, Position> {
  for (const filename of filenames) {
    try {
      const data = fs.readFileSync(filename, 'utf-8')
      process.stderr.write(`[LIBRARY] Loading positions from '${filename}'.\n`)

      const positions: Record<number, Position> = {}

      for (const line of data.split('\n')) {
        const trimmedLine = line.trim()
        if (trimmedLine === '') continue
        const [i, x, y, z] = trimmedLine.split(',')
        positions[parseInt(i)] = { x: parseFloat(x), y: parseFloat(y), z: parseFloat(z) }
      }

      return positions
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') continue
      throw error
    }
  }

  throw new Error(`[LIBRARY] No valid file found to load positions from (attempted: ['${filenames.join("', '")}']).`)
}

/**
 * Normalizes the positions of the lights.
 *
 * @param positions The positions to normalize.
 * @param normalizationFunction The function to use for normalization.
 *
 * @returns The normalized positions.
 */
export function normalizePositions(
  positions: Record<number, Position>,
  normalizationFunction?: (positions: Record<number, Position>) => Record<number, Position>,
) {
  if (typeof normalizationFunction === 'undefined') {
    normalizationFunction = normalizePositionsBall
  }

  return normalizationFunction(positions)
}
