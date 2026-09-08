const recursosIng = require('../resources/recursos.ing.json')
const recursosEsp = require('../resources/recursos.esp.json')
const path = require('node:path')
const fs = require('node:fs/promises')
const { constants } = require('node:fs')
const logger = require('../utils/logger')
const config = require('../utils/fileConfig')

const nextName = name => {
  const extension = path.extname(name)
  const baseName = path.basename(name, extension)
  const match = baseName.match(/^(.*) \((\d+)\)$/)
  return match
    ? `${ match[1] } (${ Number(match[2]) + 1 })${ extension }`
    : `${ baseName } (1)${ extension }`
}

const moveWithoutOverwrite = async (source, target) => {
  try {
    await fs.link(source, target)
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw error
    }

    if (![ 'EPERM', 'EXDEV', 'EOPNOTSUPP' ].includes(error.code)) {
      throw error
    }

    await fs.copyFile(source, target, constants.COPYFILE_EXCL)
  }

  await fs.unlink(source)
}

const moveFile = async (file, destinationDirectory) => {
  let name = file.name

  while (true) {
    try {
      await moveWithoutOverwrite(file.path, path.join(destinationDirectory, name))
      return name
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error
      }

      name = nextName(name)
    }
  }
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
      await moveFile(file, destinationDirectory)
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
