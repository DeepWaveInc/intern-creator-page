import mp4box from 'mp4box'

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.addEventListener('loadend', (e) => resolve(e.target.result))
    reader.addEventListener('error', reject)
    reader.readAsArrayBuffer(file)
  })
}

const getMediaInfo = (file) => {
  return new Promise(async (resolve, reject) => {
    let fileArrayBuffer = await readFile(file)
    fileArrayBuffer.fileStart = 0
    const mp4boxFile = mp4box.createFile()
    mp4boxFile.onError = (error) => {
      reject({
        isLoaded: false
      })
    }
    mp4boxFile.onReady = (info) => {
      resolve({
        isLoaded: true,
        info: info.mime,
        duration: info.duration / info.timescale,
        decode: true
      })
    }
    mp4boxFile.appendBuffer(fileArrayBuffer)
    mp4boxFile.flush()
  })
}

export default getMediaInfo
