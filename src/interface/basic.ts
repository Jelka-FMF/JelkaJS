import process from 'node:process'

import { STATE } from '../state'
import { writeFrame } from '../utils/writer'

/**
 * Sets the pattern frame rate.
 *
 * @param frameRate The frame rate in frames per second.
 */
export function setFrameRate(frameRate: number): void {
  STATE.frameRate = frameRate
}

/**
 * Returns the pattern frame rate.
 *
 * @returns The frame rate in frames per second.
 */
export function getFrameRate(): number {
  return STATE.frameRate
}

/**
 * Callback for the {@link onFrame} function.
 *
 * This callback is called for each frame. It receives the current
 * frame number and the time since the start of the pattern.
 *
 * @param frameNumber The current frame number.
 * @param timeSinceStart The time since start in milliseconds.
 */
export type OnFrameCallback = (frameNumber: number, timeSinceStart: number) => void

/**
 * Repeats the code for each frame.
 *
 * @param handler The code to execute.
 */
export function onFrame(handler: OnFrameCallback): void {
  if (!STATE._initialized) {
    throw new Error('[LIBRARY] The state has not been initialized yet. Have you called `initializeJelka`?')
  }

  process.stderr.write('[LIBRARY] Starting the main loop.\n')

  const patternStart = performance.now()
  let frameNumber = 0

  async function loop() {
    while (true) {
      const frameStart = performance.now()

      // Run the pattern code
      handler(frameNumber, frameStart - patternStart)

      // Send the state to the lights
      writeFrame(STATE.colorStates)

      const frameEnd = performance.now()
      const frameDuration = frameEnd - frameStart

      const timeToWait = 1000 / STATE.frameRate - frameDuration

      // Wait if necessary to keep the frame rate
      if (timeToWait < 0) {
        process.stderr.write('[LIBRARY] Warning: Cannot keep up with the frame rate.\n')
        process.stderr.write(`[LIBRARY] Frame time: ${frameDuration}, Max frame time: ${1000 / STATE.frameRate}\n`)
      } else if (timeToWait > 0) {
        await new Promise(resolve => setTimeout(resolve, timeToWait))
      }

      frameNumber++
    }
  }

  void loop()
}
