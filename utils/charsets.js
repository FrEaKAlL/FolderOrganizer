const os = require('os')
const platform = os.platform()

const pathReplace = (path) => {
  if (platform === 'win32') {
    path = path.replaceAll('/', '\\')
  } else if (platform === 'linux') {
    path = path.replaceAll('\\', '/')
  }
  return path
}
const charset = () => {
  let charSet = ''
  if (platform === 'win32') {
    charSet = '\\'
  } else if (platform === 'linux') {
    charSet = '/'
  }
  return charSet
}

module.exports = { pathReplace, charset }