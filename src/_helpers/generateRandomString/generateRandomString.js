export const generateRandomString = (length = 10) => {
  const AtoZ = new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i))
  const ZeroToNine = new Array(10).fill('').map((_, i) => i)
  var result = ''
  var characters = `${AtoZ.join('')}${AtoZ.join(
    ''
  ).toLocaleLowerCase()}${ZeroToNine.join('')}`
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
