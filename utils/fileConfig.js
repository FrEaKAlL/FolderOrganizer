const resourcesIng = require('../resources/recursos.ing.json')
const resourcesEsp = require('../resources/recursos.esp.json')
const logger = require('./logger')
const validations = require('./validations')
const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')

const getConfigDirectory = () => {
  if (process.env.FOLDERORGANIZER_CONFIG_DIR) {
    return process.env.FOLDERORGANIZER_CONFIG_DIR
  }

  if (process.platform === 'win32') {
    return path.join(process.env.ProgramData || 'C:\\ProgramData', 'FolderOrganizer')
  }

  if (process.platform === 'linux') {
    return path.join(process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'), 'folderorganizer')
  }

  return path.join(os.homedir(), '.folderorganizer')
}

const configDirectory = getConfigDirectory()
const configPath = path.join(configDirectory, 'config.json')

const ensureConfigDirectory = () => {
  fs.mkdirSync(configDirectory, { recursive: true })
}

const validateFileConfig = () => {
  if (validations.fileExist(configPath)) {
    if (getConfiguration().empty) {
      return false
    }
    return true
  }
  return false
}
const getConfiguration = () => {
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  } catch (exception) {
    logger.error(exception.message)
    process.exit(1)
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
    ensureConfigDirectory()
    fs.writeFileSync(configPath, JSON.stringify(json))
    logger.info(text.configuracionGuardada)
    return true
  } catch {
    process.exit(1)
  }
}
module.exports = { getConfiguration, validateFileConfig, saveConfiguration, getConfigDirectory, configPath }
