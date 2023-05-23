/**
 * @param {number} seconds
 *
 * @returns {type: 'hours' | 'minutes' | 'seconds', value: number} Object
 */

export const formatSecondsToMinutesOrHours = (seconds) => {
  const minutes =
    seconds > 60 ? Math.ceil(seconds / 60) : Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  switch (true) {
    case hours > 0:
      return {
        unit: 'hours',
        value: hours
      }
    case minutes > 0:
      return {
        unit: 'minutes',
        value: minutes
      }
    default:
      return {
        unit: 'seconds',
        value: 1
      }
  }
}
