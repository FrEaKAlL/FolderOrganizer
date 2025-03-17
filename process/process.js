const recursosIng = require('../resources/recursos.ing.json')
const recursosEsp = require('../resources/recursos.esp.json')
const path = require('path')
const fs = require('fs')
const logger = require('../utils/logger')
const validations = require('../utils/validations')
const config  = require('../utils/fileConfig')
let data = []

const getName = (onlyPath, name, ext, count) => {
  let onlyName = name.split('.')
  onlyName.pop()
  if (validations.directoryExist(`${ onlyPath }\\${ name }`)) {
    count += 1
    if (onlyName.join('.').includes(`(${ count - 1 })`)) {
      name = `${ onlyName.join('.').replace(`(${ count - 1 })`, `(${ count })`) }.${ ext }`
    } else {
      name = `${ onlyName.join('.') } (${ count }).${ ext }`
    }
    return getName(onlyPath, name, ext, count)
  }
  return name
}
const scanDirs = (directoryPath) => {
  try {
    let ls = fs.readdirSync(directoryPath)

    for (let index = 0; index < ls.length; index++) {
      const file = path.join(directoryPath, ls[index])
      let dataFile = null
      try {
        dataFile = fs.lstatSync(file)
      } catch (err) {
        logger.error(err.message)
      }

      if (dataFile) {
        if (!dataFile.isDirectory()) {
          data.push({
            path: file,
            isDirectory: dataFile.isDirectory(),
            length: dataFile.size,
            name: file.split('\\')[file.split('\\').length - 1],
            ext: file.split('.')[file.split('.').length - 1].toLowerCase()
          })
        }
      }
    }
  } catch (e) {
    logger.error(e.message)
  }
}
const moveFiles = (text) => {
  const fileConfig = config.getConfiguration()
  if (data.length !== 0) {
    data.forEach((x, i) => {
      let RegistraOtros = true
      fileConfig.carpetas.forEach(carpeta => {
        if (carpeta.extencion.includes(x.ext)) {
          if (!validations.directoryExist(`${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }\\${ carpeta.texto }`)) {
            validations.createDirectory(`${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }\\${ carpeta.texto }`)
          }
          RegistraOtros = false
          logger.info(`${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }\\${ carpeta.texto }`)
          x.name = getName(`${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }\\${ carpeta.texto }`, x.name, x.ext, 0)
          fs.rename(x.path, `${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }/${ carpeta.texto }\\${ x.name }`, (err) => {
            if (err) throw err
            fs.stat(`${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }\\${ carpeta.texto }/${ x.name }`, (err, stats) => {
              if (err) throw err
              logger.info(`stats: ${JSON.stringify(stats)}`)
            })
          })
          delete(data[i])
        } else if (x.ext === 'tmp' || x.ext === 'crdownload') {
          RegistraOtros = false
        }
      })
      if (RegistraOtros) {
        if (!validations.directoryExist(`${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }\\${ text.texto }`)) {
          validations.createDirectory(`${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }\\${ text.texto }`)
        }
        x.name = getName(`${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }/${ text.otros }`, x.name, 0)
        fs.rename(x.path, `${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }/${ text.otros }/${ x.name }`, (err) => {
          if (err) throw err
          fs.stat(`${ fileConfig.rutaAOrganizar.trimEnd('/').trimEnd('\\') }/${ text.otros }/${ x.name }`, (err, stats) => {
            if (err) throw err
            logger.info(`stats: ${JSON.stringify(stats)}`)
          })
        })
        delete(data[i])
      }
    })
  }
}
const executeProcess = () => {
  const fileConfig = config.getConfiguration()
  scanDirs(fileConfig.rutaAOrganizar)
  moveFiles((fileConfig.idioma === 'Ingles' ? recursosIng.ing : recursosEsp.esp))
}
module.exports = { executeProcess }