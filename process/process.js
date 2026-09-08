const recursosIng = require('../resources/recursos.ing.json')
const recursosEsp = require('../resources/recursos.esp.json')
const path = require('node:path')
const fs = require('node:fs/promises')
const logger = require('../utils/logger')
const config = require('../utils/fileConfig')

const getName = async (directoryPath, name) => {
  try {
    await fs.access(path.join(directoryPath, name))
  } catch (error) {
    if (error.code === 'ENOENT') {
      return name
    }
    throw error
  }

  const extension = path.extname(name)
  const baseName = path.basename(name, extension)
  const match = baseName.match(/^(.*) \((\d+)\)$/)
  const nextName = match
    ? `${ match[1] } (${ Number(match[2]) + 1 })${ extension }`
    : `${ baseName } (1)${ extension }`

  return getName(directoryPath, nextName)
}

const scanDirs = async (directoryPath) => {
  try {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true })

    return entries
      .filter(entry => !entry.isDirectory())
      .map(entry => ({
        path: path.join(directoryPath, entry.name),
        name: entry.name,
        ext: path.extname(entry.name).slice(1).toLowerCase()
      }))
  } catch (error) {
    logger.error(error.message)
    return []
  }
}

const moveFiles = async (data, text, fileConfig) => {
  for (const file of data) {
    if (file.ext === 'tmp' || file.ext === 'crdownload') {
      continue
    }

    const folder = fileConfig.carpetas.find(carpeta => {
      const extensions = carpeta.extencion.split(',').map(ext => ext.trim().toLowerCase())
      return extensions.includes(file.ext)
    })
    const destinationDirectory = path.join(fileConfig.rutaAOrganizar, folder ? folder.texto : text.otros)

    try {
      await fs.mkdir(destinationDirectory, { recursive: true })
      const name = await getName(destinationDirectory, file.name)
      await fs.rename(file.path, path.join(destinationDirectory, name))
      logger.info(destinationDirectory)
    } catch (error) {
      logger.error(`${ file.name }: ${ error.message }`)
    }
  }
}

const executeProcess = async (fileConfig = config.getConfiguration()) => {
  const data = await scanDirs(fileConfig.rutaAOrganizar)
  const text = fileConfig.idioma === 'ingles' ? recursosIng.ing : recursosEsp.esp
  await moveFiles(data, text, fileConfig)
}

module.exports = { executeProcess }
