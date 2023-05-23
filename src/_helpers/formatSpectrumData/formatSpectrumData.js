import { SPECTRUM_RANGE } from '../../_constants'

const formatSpectrumData = (data) => {
  const gap = Math.ceil(data.length / SPECTRUM_RANGE)

  const formattedData = Array.from({ length: SPECTRUM_RANGE }, (_, i) => {
    const tempArr = Array.from(data.slice(i * gap, (i + 1) * gap))
    return (
      tempArr.reduce((acc, cur) => acc + Math.abs(cur), 0) / tempArr.length || 0
    )
  })

  return formattedData
}

export default formatSpectrumData
