/**
 * @param {number} width - width of container
 * @param {number} height - height of container
 * @param {object} canvasInstance - canvas element
 *
 * @returns {{ canvas: HTMLCanvasElement, context: CanvasRenderingContext2D }}
 */

export const createCanvas = (width, height, canvasInstance) => {
  const canvas = canvasInstance || document.createElement('canvas')
  const context = canvas.getContext('2d')
  const devicePixelRatio = window.devicePixelRatio || 1
  const backingStoreRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1
  const ratio = devicePixelRatio / backingStoreRatio

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = width * ratio
  canvas.height = height * ratio

  context.setTransform(ratio, 0, 0, ratio, 0, 0)

  context.fillStyle = 'transparent'
  context.fillRect(0, 0, canvas.width, canvas.height)
  return { canvas, context }
}
