const resourcesIng = require('../resources/recursos.ing.json')
const resourcesEsp = require('../resources/recursos.esp.json')
const logger = require('./logger')
const validations = require('./validations')
const fs = require('node:fs')
const path = require('node:path')
const configPath = path.resolve(__dirname, '..', 'config.json')

const validateFileConfig = () => {
  if (validations.fileExist(configPath)) {
    if (getConfiguration().empty) {
      return false
    }
    return true
  }
}
const getConfiguration = () => {
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  } catch (exception) {
    logger.error(exception.message)
    process.exit(1)
  }
}

const createConfigEmpty = () => {
  if (!validations.fileExist(configPath)) {
    try {
      fs.writeFileSync(configPath, JSON.stringify({ empty: true }))
    } catch (exception) {
      logger.error(exception.message)
    }
  }
}
const saveConfiguration = (language, path, typeConfig, configurationCustom) => {
  const text = (language === 'ingles') ? resourcesIng.ing : resourcesEsp.esp
  let json = {
    idioma: language,
    rutaAOrganizar: path,
    configuracion: typeConfig
  }
  if (typeConfig === 'default') {
    json.carpetas = text.carpetasAConfigurar
  } else {
    json.carpetas = configurationCustom
  }
  try {
    fs.writeFileSync(configPath, JSON.stringify(json))
    logger.info(text.configuracionGuardada)
    return true
  } catch {
    process.exit(1)
  }
}
module.exports = { getConfiguration, validateFileConfig, createConfigEmpty, saveConfiguration }
