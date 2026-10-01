require('colors')
let inquirer

const prompt = async question => {
  inquirer ??= (await import('inquirer')).default
  return inquirer.prompt(question)
}
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
  return prompt({
    type: 'select',
    name: 'response',
    message: resources.init.texto,
    choices: resources.init.opciones,
    filter(value) {
      return value.toLowerCase()
    }
  }).then(({ response }) => response)
}
const pathOrganizer = (text) => {
  return prompt({
    type: 'input',
    name: 'response',
    message: text.rutaDeDescarga,
    validate(value) {
      if (validations.directoryExist(value)){
        return true
      }
      return text.rutaInValida
    }
  }).then(({ response }) => response)
}
const typeConfig = (text) => {
  return prompt({
    type: 'select',
    name: 'response',
    message: text.infoDeConfiguracion.texto,
    choices: text.infoDeConfiguracion.opciones,
    filter(value) {
      return value.toLowerCase()
    }
  }).then(({ response }) => response === 'defecto' || response === 'default' ? 'default' : 'custom')
}
const typeConfirm = (text) => {
  return prompt({
    type: 'confirm',
    name: 'response',
    message: text.confirmacion,
    default: true,
    transformer: (answer) => (answer ? '✔️' : '✖️'),
  }).then(({ response }) => !response )
}
const questionsConfig = (text, carpeta) => {
  return prompt({
    type: 'confirm',
    name: 'response',
    message: `${ text.preguntaAConfigurar } ${ carpeta }`,
    default: true,
    transformer: (answer) => (answer ? `${ carpeta } ✔️` : `${ carpeta } ✖️`),
  }).then(({ response }) => response )
}
const questionsExt = (text, ext) => {
  return prompt({
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
  }).then(({ response }) => response.split(',').map(x => x.trim()).join(', '))
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
  return prompt({
    type: 'confirm',
    name: 'response',
    message: text.preguntaCrearServicio,
    default: true,
    transformer: (answer) => (answer ? '✔️' : '✖️')
  }).then(({ response }) => response)
}
const questionsProcessExecute = (text) => {
  return prompt({
    type: 'confirm',
    name: 'response',
    message: text.ejecutaProceso,
    default: true,
    transformer: (answer) => (answer ? '✔️' : '✖️')
  }).then(({ response }) => response)
}
const normalProcess = async () => {
  const lng = await language()
  const text = (lng === 'ingles') ? resourcesIng.ing : resourcesEsp.esp
  const path = await pathOrganizer(text)
  let optionType
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
        await service.installServiceInteractive(text.descripcion)
      } else {
        if (await questionsProcessExecute(text)) {
          processFile.executeProcess()
        }
      }
    }
  }
}
const questionExecutePrevio = (text) => {
  return prompt({
    type: 'confirm',
    name: 'response',
    message: text.preguntaDeEjecucion,
    default: true,
    transformer: (answer) => (answer ? '✔️' : '✖️')
  }).then(({ response }) => response)
}
const executePrevio = async () => {
  const configuration = fileConfig.getConfiguration()
  const text = configuration.idioma === 'ingles' ? resourcesIng.ing : resourcesEsp.esp
  logger.warn(text.existeUnaConfiguracion.yellow)
  configuration.carpetas.forEach(info => {
    logger.info(`${ info.texto.padEnd(15, ' ') }[${ info.extencion }]`)
  })

  if (await questionExecutePrevio(text)) {
    if (await questionCreateService(text)) {
      await service.installServiceInteractive(text.descripcion)
    } else {
      if (await questionsProcessExecute(text)) {
        processFile.executeProcess()
      }
    }
  } else {
    await normalProcess()
  }
}

const menu = async () => {
  header()
  if (fileConfig.validateFileConfig()) {
    await executePrevio()
  } else {
    await normalProcess()
  }
}
module.exports = { menu }
