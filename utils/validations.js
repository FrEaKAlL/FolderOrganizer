const fs = require('node:fs')

const directoryExist = (path) => {
  try {
    const stats = fs.statSync(path)
    return stats.isDirectory()
  } catch {
    return false
  }
}
const fileExist = (path) => {
  try {
    const stats = fs.statSync(path)
    return !stats.isDirectory()
  } catch {
    return false
  }
}

module.exports = { fileExist, directoryExist }