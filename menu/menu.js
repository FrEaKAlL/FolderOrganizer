require('colors')
const { default: inquirer } = require('inquirer')
const resources = require('../resources/recursos.json')
const resourcesIng = require('../resources/recursos.ing.json')
const resourcesEsp = require('../resources/recursos.esp.json')
const logger = require('../utils/logger')
const fileConfig = require('../utils/fileConfig')
const validations = require('../utils/validations')
const service = require('../process/service')
const processFile = require('../process/process')


const header = () => {
  logger.box(resources.init.titulo.blue)
}
const language = () => {
  return inquirer.prompt({
    type: 'list',
    name: 'response',
    message: resources.init.texto,
    choices: resources.init.opciones,
    filter(value) {
      return value.toLowerCase()
    }
  }).then(({ response }) => response).catch(() => process.exit(1))
}
const pathOrganizer = (text) => {
  return inquirer.prompt({
    type: 'input',
    name: 'response',
    message: text.rutaDeDescarga,
    validate(value) {
      if (validations.directoryExist(value)){
        return true
      }
      return text.rutaInValida
    }
  }).then(({ response }) => response).catch(() => process.exit(1))
}
const typeConfig = (text) => {
  return inquirer.prompt({
    type: 'list',
    name: 'response',
    message: text.infoDeConfiguracion.texto,
    choices: text.infoDeConfiguracion.opciones,
    filter(value) {
      return value.toLowerCase()
    }
  }).then(({ response }) => response === 'defecto' || response === 'default' ? 'default' : 'custom').catch(() => process.exit(1))
}
const typeConfirm = (text) => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'response',
    message: text.confirmacion,
    default: true,
    transformer: (answer) => (answer ? '✔️' : '✖️'),
  }).then(({ response }) => !response ).catch(() => process.exit(1))
}
const questionsConfig = (text, carpeta) => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'response',
    message: `${ text.preguntaAConfigurar } ${ carpeta }`,
    default: true,
    transformer: (answer) => (answer ? `${ carpeta } ✔️` : `${ carpeta } ✖️`),
  }).then(({ response }) => response ).catch(() => process.exit(1))
}
const questionsExt = (text, ext) => {
  return inquirer.prompt({
    type: 'input',
    name: 'response',
    message: text.preguntaExtenciones,
    validate(value) {
      if (value === '') {
        return text.extencionRequerida
      }
      return true
    },
    default() {
      return ext
    }
  }).then(({ response }) => response.split(',').map(x => x.trim()).join(', ')).catch(() => process.exit(1))
}
const configurationCustomQuestions = async (text) => {
  let configurationCustom = []
  for (let carpeta of text.carpetasAConfigurar) {
    if (await questionsConfig(text, carpeta.texto)) {
      configurationCustom.push({
        texto: carpeta.texto,
        extencion: await questionsExt(text, carpeta.extencion)
      })
    }
  }
  if (configurationCustom.length !== 0) {
    configurationCustom.forEach(info => {
      logger.info(`${ info.texto.padEnd(15, ' ') }[${ info.extencion }]`)
    })
  }
  return configurationCustom
}
const questionCreateService = (text) => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'response',
    message: text.preguntaCrearServicio,
    default: true,
    transformer: (answer) => (answer ? '✔️' : '✖️')
  }).then(({ response }) => response).catch(() => process.exit(1))
}
const questionsProcessExecute = (text) => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'response',
    message: text.ejecutaProceso,
    default: true,
    transformer: (answer) => (answer ? '✔️' : '✖️')
  }).then(({ response }) => response).catch(() => process.exit(1))
}
const normalProcess = async () => {
  const lng = await language()
  const text = (lng === 'ingles') ? resourcesIng.ing : resourcesEsp.esp
  const path = await pathOrganizer(text)
  let optionType = 'default'
  let configurationCustom = []
  do {
    optionType = (await typeConfig(text))
    if (optionType === 'custom') {
      configurationCustom = await configurationCustomQuestions(text)
    } else {
      text.configDefecto.forEach(i => {
        logger.info(i)
      })
    }
  } while (await typeConfirm(text))
  if (configurationCustom.length !== 0 || optionType === 'default') {
    if (fileConfig.saveConfiguration(lng, path, optionType, configurationCustom)) {
      if (await questionCreateService(text)) {
        service.creaServicioEnWindows(text)
      } else {
        if (await questionsProcessExecute(text)) {
          processFile.executeProcess()
        }
      }
    }
  }
}
const questionExecutePrevio = (text) => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'response',
    message: text.preguntaDeEjecucion,
    default: true,
    transformer: (answer) => (answer ? '✔️' : '✖️')
  }).then(({ response }) => response).catch(() => process.exit(1))
}
const executePrevio = async () => {
  const configuration = fileConfig.getConfiguration()
  const text = configuration.idioma === 'Ingles' ? resourcesIng.ing : resourcesEsp.esp
  logger.warn(text.existeUnaConfiguracion.yellow)
  configuration.carpetas.forEach(info => {
    logger.info(`${ info.texto.padEnd(15, ' ') }[${ info.extencion }]`)
  })

  if (await questionExecutePrevio(text)) {
    if (await questionCreateService(text)) {
      service.creaServicioEnWindows(text)
    } else {
      if (await questionsProcessExecute(text)) {
        processFile.executeProcess()
      }
    }
  } else {
    normalProcess()
  }
}

const menu = () => {
  header()
  if (fileConfig.validateFileConfig()) {
    executePrevio()
  } else {
    normalProcess()
  }
}
module.exports = { menu }