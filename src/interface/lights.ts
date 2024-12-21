import { STATE } from '../state'
import { Axis, Bound, InternalColor, Relation } from '../types'

/**
 * Sets lights to the specified color.
 *
 * @param lights A single light or an array of lights.
 * @param color The RGB color of the lights to set.
 */
export function setLights(lights: number | number[], color: InternalColor): void {
  // Handle a single light case
  if (typeof lights === 'number') lights = [lights]

  // Set the color of each light
  for (const light of lights) {
    if (light >= 0 && light < STATE.colorStates.length) {
      STATE.colorStates[light] = color
    }
  }
}

/**
 * Turns off specified lights.
 *
 * @param lights A single light or an array of lights.
 */
export function resetLights(lights?: number | number[]): void {
  // Default to all lights
  if (lights === undefined) lights = Array.from({ length: STATE.numberOfLights }, (_, i) => i)

  // Handle a single light case
  if (typeof lights === 'number') lights = [lights]

  // Turn off each light
  for (const light of lights) {
    if (light >= 0 && light < STATE.colorStates.length) {
      STATE.colorStates[light] = { red: 0, green: 0, blue: 0 }
    }
  }
}

/**
 * Gets the colors of the specified lights.
 *
 * @param lights The lights to get the colors of.
 *
 * @returns The colors of the specified lights.
 */
export function getColors(lights: number | number[]): InternalColor[] {
  // Handle a single light case
  if (typeof lights === 'number') lights = [lights]

  // Get the color of each light
  return lights.map(light => STATE.colorStates.at(light) ?? { red: 0, green: 0, blue: 0 })
}

/**
 * Gets the color of the specified light.
 *
 * @param light The light to get the color of.
 *
 * @returns The color of the specified light.
 */
export function getColor(light: number): InternalColor {
  // Get the color of the light
  return STATE.colorStates.at(light) ?? { red: 0, green: 0, blue: 0 }
}

/**
 * Gets the coordinates of the specified lights.
 *
 * @param axis The coordinate axis to get the value of.
 * @param lights The lights to get the coordinates of.
 *
 * @returns The coordinates of the specified lights.
 */
export function getCoordinates(axis: Axis, lights: number | number[]): number[] {
  // Handle a single light case
  if (typeof lights === 'number') lights = [lights]

  // Get the coordinate of each light
  return lights.map(light => {
    switch (axis) {
      case Axis.X:
        return STATE.normalizedPositions[light]?.x
      case Axis.Y:
        return STATE.normalizedPositions[light]?.y
      case Axis.Z:
        return STATE.normalizedPositions[light]?.z
    }
  })
}

/**
 * Gets the coordinate of the specified light.
 *
 * @param axis The coordinate axis to get the value of.
 * @param light The light to get the coordinate of.
 *
 * @returns The coordinate of the specified light.
 */
export function getCoordinate(axis: Axis, light: number): number {
  // Get the coordinate of the light
  switch (axis) {
    case Axis.X:
      return STATE.normalizedPositions[light]?.x
    case Axis.Y:
      return STATE.normalizedPositions[light]?.y
    case Axis.Z:
      return STATE.normalizedPositions[light]?.z
  }
}

/**
 * Gets a list of lights.
 *
 * @returns The list of lights.
 */
export function getLights(): number[] {
  return Array.from({ length: STATE.numberOfLights }, (_, i) => i)
}

/**
 * Gets the number of lights.
 *
 * @returns The number of lights.
 */
export function countLights(): number {
  return STATE.numberOfLights
}

/**
 * Gets a random light.
 *
 * @returns The random light.
 */
export function randomLight(): number {
  return Math.floor(Math.random() * STATE.numberOfLights)
}

/**
 * Finds lights where the specified axis value meets the specified relation.
 *
 * @param axis The axis to check.
 * @param relation The relation to check.
 * @param value The value to compare against.
 * @param lights The list of lights to check.
 *
 * @returns The lights that meet the specified relation.
 */
export function lightsWhere(axis: Axis, relation: Relation, value: number, lights: number[]): number[] {
  return lights.filter(light => {
    switch (relation) {
      case Relation.Greater:
        return getCoordinate(axis, light) > value
      case Relation.Less:
        return getCoordinate(axis, light) < value
    }
  })
}

/**
 * Gets the minimum/maximum value of the specified axis.
 *
 * @param axis The axis to get the value of.
 * @param bound Whether to get the minimum or maximum value.
 * @param lights The list of lights to get the value of.
 *
 * @returns The minimum/maximum value of the specified axis.
 */
export function lightsBound(axis: Axis, bound: Bound, lights: number[]): number {
  switch (bound) {
    case Bound.Min:
      return Math.min(...getCoordinates(axis, lights))
    case Bound.Max:
      return Math.max(...getCoordinates(axis, lights))
  }
}
