const resourcesIng = require('../resources/recursos.ing.json')
const resourcesEsp = require('../resources/recursos.esp.json')
const logger = require('./logger')
const validations = require('./validations')
const fs = require('fs')
const fullPath = '.'
const nameFileConfig = 'config.json'

const validateFileConfig = () => {
  if (validations.fileExist(`${ fullPath }\\${ nameFileConfig }`)) {
    if (getConfiguration().empty) {
      return false
    }
    return true
  }
}
const getConfiguration = () => {
  try {
    return JSON.parse(fs.readFileSync(`${ fullPath }\\${ nameFileConfig }`, 'utf-8'))
  } catch (exception) {
    logger.error(exception.message)
    process.exit(1)
  }
}

const createConfigEmpty = () => {
  if (!validations.fileExist(`${ fullPath }\\${ nameFileConfig }`)) {
    try {
      fs.writeFileSync(`${ fullPath }\\${ nameFileConfig }`, JSON.stringify({ empty: true }))
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
    fs.writeFileSync(`${ fullPath.replace('utils','config') }\\${ nameFileConfig }`, JSON.stringify(json))
    logger.info(text.configuracionGuardada)
    return true
  } catch {
    process.exit(1)
  }
}
module.exports = { getConfiguration, validateFileConfig, createConfigEmpty, saveConfiguration }