import { InternalColor, Position } from './types'

/**
 * The current global state of a pattern.
 */
export interface JelkaState {
  /**
   * Whether the state has been initialized.
   */
  _initialized: boolean

  /**
   * The frame rate of the pattern.
   */
  frameRate: number

  /**
   * The number of lights on the tree.
   */
  numberOfLights: number

  /**
   * The raw positions of the lights.
   */
  rawPositions: Record<number, Position>

  /**
   * The normalized positions of the lights.
   */
  normalizedPositions: Record<number, Position>

  /**
   * The color states of the lights.
   */
  colorStates: InternalColor[]
}

/**
 * The current global state of a pattern.
 */
export const STATE: JelkaState = {
  // Start with the uninitialized state
  _initialized: false,

  // Default to 50 frames per second
  frameRate: 50,

  // Start with an empty set of positions
  rawPositions: {},
  normalizedPositions: {},

  // Start with all lights turned off
  colorStates: [],

  // We do not know the number of lights yet
  numberOfLights: -1,
}
