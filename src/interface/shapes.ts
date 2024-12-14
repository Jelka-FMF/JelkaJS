import { STATE } from '../state'
import { Relation } from '../types'

/**
 * Converts degrees to radians.
 *
 * @param deg The degrees.
 *
 * @returns The radians.
 */
function degToRad(deg: number) {
  return (deg / 180) * Math.PI
}

/**
 * Gets a list of lights intersecting with the ball.
 *
 * @param x0 The x coordinate of the ball center.
 * @param y0 The y coordinate of the ball center.
 * @param z0 The z coordinate of the ball center.
 * @param r The radius of the ball.
 *
 * @returns The list of lights intersecting with the ball.
 */
export function ball(x0: number, y0: number, z0: number, r: number): number[] {
  const lights = []

  for (const [index, { x, y, z }] of Object.entries(STATE.normalizedPositions)) {
    if (Math.pow(x - x0, 2) + Math.pow(y - y0, 2) + Math.pow(z - z0, 2) <= Math.pow(r, 2)) {
      lights.push(parseInt(index))
    }
  }

  return lights
}

/**
 * Gets a list of lights intersecting with the sphere.
 *
 * @param x0 The x coordinate of the sphere center.
 * @param y0 The y coordinate of the sphere center.
 * @param z0 The z coordinate of the sphere center.
 * @param r The radius of the sphere.
 * @param d The thickness of the sphere.
 *
 * @returns The list of lights intersecting with the sphere.
 */
export function sphere(x0: number, y0: number, z0: number, r: number, d: number): number[] {
  const lights = []

  for (const [index, { x, y, z }] of Object.entries(STATE.normalizedPositions)) {
    if (
      Math.pow(x - x0, 2) + Math.pow(y - y0, 2) + Math.pow(z - z0, 2) <= Math.pow(r, 2) &&
      Math.pow(x - x0, 2) + Math.pow(y - y0, 2) + Math.pow(z - z0, 2) >= Math.pow(r - d, 2)
    ) {
      lights.push(parseInt(index))
    }
  }

  return lights
}

/**
 * Gets a list of lights intersecting with the cylinder.
 *
 * @param x0 The x coordinate of the cylinder center.
 * @param y0 The y coordinate of the cylinder center.
 * @param z0 The z coordinate of the cylinder center.
 * @param psi The first rotation of the cylinder (in degrees).
 * @param ksi The second rotation of the cylinder (in degrees).
 * @param r The radius of the cylinder.
 * @param h The height of the cylinder.
 *
 * @returns The list of lights intersecting with the cylinder.
 */
export function cylinder(x0: number, y0: number, z0: number, psi: number, ksi: number, r: number, h: number): number[] {
  psi = degToRad(psi)
  ksi = degToRad(ksi)

  const a = Math.cos(psi) * Math.cos(ksi)
  const b = Math.sin(psi) * Math.cos(ksi)
  const c = Math.sin(ksi)

  const lights = []

  for (const [index, { x, y, z }] of Object.entries(STATE.normalizedPositions)) {
    // Distance between point and line
    const deltaSquared =
      (Math.pow(b * (z - z0) - (y - y0) * c, 2) +
        Math.pow(c * (x - x0) - (z - z0) * a, 2) +
        Math.pow(a * (y - y0) - (x - x0) * b, 2)) /
      (Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2))

    // Distance between point and cylinder's top and bottom
    const delta1 = Math.abs(a * (x - x0 - (h * a) / 2) + b * (y - y0 - (h * b) / 2) + c * (z - z0 - (h * c) / 2))
    const delta2 = Math.abs(a * (x - x0 + (h * a) / 2) + b * (y - y0 + (h * b) / 2) + c * (z - z0 + (h * c) / 2))

    if (deltaSquared <= r * r && delta1 + delta2 <= h) {
      lights.push(parseInt(index))
    }
  }

  return lights
}

/**
 * Gets a list of lights intersecting with the plane.
 *
 * @param x0 The x coordinate of the point in the plane.
 * @param y0 The y coordinate of the point in the plane.
 * @param z0 The z coordinate of the point in the plane.
 * @param psi The first rotation of the plane (in degrees).
 * @param ksi The second rotation of the plane (in degrees).
 * @param d The thickness of the plane.
 *
 * @returns The list of lights intersecting with the plane.
 */
export function plane(x0: number, y0: number, z0: number, psi: number, ksi: number, d: number): number[] {
  psi = degToRad(psi)
  ksi = degToRad(ksi)

  const a = Math.cos(psi) * Math.cos(ksi)
  const b = Math.sin(psi) * Math.cos(ksi)
  const c = Math.sin(ksi)

  const lights = []

  for (const [index, { x, y, z }] of Object.entries(STATE.normalizedPositions)) {
    const distance = Math.abs((a * (x - x0) + b * (y - y0) + c * (z - z0)) / Math.sqrt(a * a + b * b + c * c))

    if (distance <= d / 2) {
      lights.push(parseInt(index))
    }
  }

  return lights
}

/**
 * Gets a list of lights in relation to the plane.
 *
 * @param x0 The x coordinate of the point in plane.
 * @param y0 The y coordinate of the point in plane.
 * @param z0 The z coordinate of the point in plane.
 * @param psi The first rotation of the plane (in degrees).
 * @param ksi The second rotation of the plane (in degrees).
 * @param relation The relation to compare against.
 *
 * @returns The list of lights in relation to the plane.
 */
export function planeRelation(
  x0: number,
  y0: number,
  z0: number,
  psi: number,
  ksi: number,
  relation: Relation,
): number[] {
  psi = degToRad(psi)
  ksi = degToRad(ksi)

  const a = Math.cos(psi) * Math.cos(ksi)
  const b = Math.sin(psi) * Math.cos(ksi)
  const c = Math.sin(ksi)

  const d = a * x0 + b * y0 + c * z0

  const lights = []

  for (const [index, { x, y, z }] of Object.entries(STATE.normalizedPositions)) {
    switch (relation) {
      case Relation.Greater:
        if (a * x + b * y + c * z > d) lights.push(parseInt(index))
        break
      case Relation.Less:
        if (a * x + b * y + c * z < d) lights.push(parseInt(index))
        break
    }
  }

  return lights
}
