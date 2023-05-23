import CryptoJS from 'crypto-js'

const DEFAULT_CHUNK_SIZE = 10_485_760

const readFileSlice = async (file, start, size) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const slice = file.slice(start, start + size)
    reader.onload = () => resolve(new Uint8Array(reader.result))
    reader.onerror = reject
    reader.readAsArrayBuffer(slice)
  })
}

const getFileSHA256ChecksumHash = async (file) => {
  const sliceSize = DEFAULT_CHUNK_SIZE
  let sha256 = CryptoJS.algo.SHA256.create()
  let start = 0
  while (start < file.size) {
    const slice = await readFileSlice(file, start, sliceSize)
    const wordArray = CryptoJS.lib.WordArray.create(slice)
    sha256 = sha256.update(wordArray)
    start += sliceSize
  }
  sha256.finalize()
  return sha256._hash.toString()
}

export default getFileSHA256ChecksumHash
