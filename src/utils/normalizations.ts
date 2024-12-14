import { Position } from '../types'

/**
 * Normalizes the positions of the lights by scaling into a ball.
 *
 * The origin (0, 0, 0) is the center of the ball.
 * The scale parameter is the radius of the ball.
 *
 * The positions are normalized by dividing each coordinate
 * by the maximum radius and then multiplying by the scale.
 *
 * @param positions The positions to normalize.
 * @param scale The radius of the ball.
 *
 * @returns The normalized positions.
 */
export function normalizePositionsBall(positions: Record<number, Position>, scale = 100) {
  // Max distance from the origin (0, 0, 0) to any light
  const maxRadius = Math.max(...Object.values(positions).map(pos => Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2)))

  // Scale the positions based on the max radius and parameter
  const normalizedPositions: Record<number, Position> = {}
  for (const index in positions) {
    normalizedPositions[index] = {
      x: (positions[index].x / maxRadius) * scale,
      y: (positions[index].y / maxRadius) * scale,
      z: (positions[index].z / maxRadius) * scale,
    }
  }

  return normalizedPositions
}

/**
 * Normalizes the positions of the lights into the range.
 *
 * Each axis is normalized independently by transforming the
 * coordinates into the range `[left, right]`.
 *
 * Warning: This function does not preserve the aspect ratio.
 * Do not use it in patterns that use shapes or other objects
 * that depend on the aspect ratio.
 *
 * @param positions The positions to normalize.
 * @param left The left bound of the range.
 * @param right The right bound of the range.
 *
 * @returns The normalized positions.
 */
export function normalizePositionsRange(positions: Record<number, Position>, left = 0, right = 100) {
  // Find the min and max of each axis
  const minX = Math.min(...Object.values(positions).map(pos => pos.x))
  const maxX = Math.max(...Object.values(positions).map(pos => pos.x))
  const minY = Math.min(...Object.values(positions).map(pos => pos.y))
  const maxY = Math.max(...Object.values(positions).map(pos => pos.y))
  const minZ = Math.min(...Object.values(positions).map(pos => pos.z))
  const maxZ = Math.max(...Object.values(positions).map(pos => pos.z))

  // Normalize the positions based on the min and max of each axis
  const normalizedPositions: Record<number, Position> = {}
  for (const index in positions) {
    normalizedPositions[index] = {
      x: ((positions[index].x - minX) / (maxX - minX)) * (right - left) + left,
      y: ((positions[index].y - minY) / (maxY - minY)) * (right - left) + left,
      z: ((positions[index].z - minZ) / (maxZ - minZ)) * (right - left) + left,
    }
  }

  return normalizedPositions
}

/**
 * Does not normalize the positions.
 *
 * Can be provided as a no-op normalization function.
 *
 * @param positions The positions.
 *
 * @returns The positions.
 */
export function normalizePositionsNone(positions: Record<number, Position>) {
  return positions
}
