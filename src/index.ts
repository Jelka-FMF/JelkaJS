import path from 'node:path'
import process from 'node:process'

import { STATE } from './state'
import { InternalColor, Position } from './types'
import type { normalizePositionsBall } from './utils/normalizations'
import { loadPositions, normalizePositions } from './utils/positions'
import { writeHeader } from './utils/writer'

/**
 * The configuration options of the pattern.
 */
export interface JelkaConfig {
  /**
   * The initial color of the lights.
   *
   * By default, the lights are turned off.
   */
  initialColor?: InternalColor

  /**
   * The initial frame rate of the pattern.
   *
   * By default, the frame rate is set to 50 frames per second.
   */
  initialFrameRate?: number

  /**
   * A function that normalizes the positions of the lights.
   *
   * The function should take the raw positions of the lights
   * and return the normalized positions.
   *
   * By default, {@link normalizePositionsBall} is used,
   * with a default scale of 100.
   */
  positionNormalization?: (positions: Record<number, Position>) => Record<number, Position>

  /**
   * A path to a custom file with the light positions.
   *
   * If not specified, the file is detected and loaded
   * automatically from predefined locations.
   */
  positionFilename?: string
}

/**
 * Initializes the pattern state and the interface.
 *
 * @param config The configuration options of the pattern.
 * @param config.initialColor The initial color of the lights.
 * @param config.initialFrameRate The initial frame rate of the pattern.
 * @param config.positionNormalization A function that normalizes the positions of the lights.
 * @param config.positionFilename A path to a custom file with the light positions.
 */
export function initializeJelka({
  initialColor,
  initialFrameRate,
  positionNormalization,
  positionFilename,
}: JelkaConfig = {}): void {
  if (STATE._initialized) {
    throw new Error('[LIBRARY] The state has already been initialized.')
  }

  // Provide default position filenames
  let filenames = [
    `${process.cwd()}/positions.csv`,
    `${path.dirname(process.argv[1])}/positions.csv`,
    `${process.cwd()}/../../data/positions.csv`,
    `${path.dirname(process.argv[1])}/../../data/positions.csv`,
  ]

  // Allow overriding positions file via environment variable
  if (process.env.JELKA_POSITIONS) {
    filenames = [process.env.JELKA_POSITIONS]
  }

  // Allow specifying a custom position filename
  if (positionFilename) {
    filenames = [positionFilename]
  }

  // Resolve relative paths to absolute paths
  filenames = filenames.map(filename => path.resolve(filename))

  // Load the positions
  const rawPositions = loadPositions(filenames)

  // Normalize the positions
  const normalizedPositions = normalizePositions(rawPositions, positionNormalization)

  // Get the number of lights
  const numberOfLights = Math.max(...Object.keys(normalizedPositions).map(Number)) + 1

  // Set the initial state
  STATE.frameRate = initialFrameRate ?? 50
  STATE.numberOfLights = numberOfLights
  STATE.rawPositions = rawPositions
  STATE.normalizedPositions = normalizedPositions

  // Set the initial colors
  STATE.colorStates = Array(numberOfLights).fill(initialColor ?? { red: 0, green: 0, blue: 0 }) as InternalColor[]

  // Send the pattern header
  writeHeader({ numberOfLights: numberOfLights, frameRate: STATE.frameRate })

  // Mark the state as initialized
  STATE._initialized = true

  // Log the initialization
  process.stderr.write('[LIBRARY] Initialized the pattern.\n')
}
