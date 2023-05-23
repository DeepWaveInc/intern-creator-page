const durationToMinSec = (duration) => {
  const minute = parseInt(duration / 60)
    .toString()
    .padStart(2, 0)
  const second = parseInt(duration % 60)
    .toString()
    .padStart(2, 0)
  return duration ? `${minute}:${second}` : '--:--'
}

export default durationToMinSec
