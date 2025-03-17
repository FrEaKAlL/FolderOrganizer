const { default: consola } = require('consola')

const info = (...params) => console.log(...params)
const error = (...params) => console.error(...params)
const box = (...params) => consola.box(...params)
const warn = (...params) => consola.warn(...params)

module.exports = { info, error, box, warn }