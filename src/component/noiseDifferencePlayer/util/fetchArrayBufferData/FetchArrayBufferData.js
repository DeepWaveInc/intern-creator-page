/**
 * @param {string} url
 *
 * @returns {Promise} Promise resolved
 */

export const fetchArrayBufferData = async (url) => {
  const response = await fetch(url, {
    credentials: 'omit',
    cache: 'no-cache'
  })
  const arrayBuffer = await response.arrayBuffer()
  return arrayBuffer
}
