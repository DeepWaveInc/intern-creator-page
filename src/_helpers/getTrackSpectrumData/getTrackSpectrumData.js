const getTrackSpectrumData = async (link) => {
  const audioContext = new (window.AudioContext =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.msAudioContext)()
  const response = await fetch(link, {
    credentials: 'omit',
    cache: 'no-cache'
  })
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  return audioBuffer?.getChannelData(0) || []
}

export default getTrackSpectrumData
