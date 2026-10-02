const { getConfiguration, validateFileConfig } = require('./utils/fileConfig')
const resourcesIng = require('./resources/recursos.ing.json')
const resourcesEsp = require('./resources/recursos.esp.json')

const getServiceDescription = () => {
  if (!validateFileConfig()) {
    return resourcesEsp.esp.descripcion
  }

  const configuration = getConfiguration()
  return configuration.idioma === 'ingles'
    ? resourcesIng.ing.descripcion
    : resourcesEsp.esp.descripcion
}

const runServiceCommand = async command => {
  if (command !== '--install-service' && command !== '--remove-service') {
    return false
  }

  // Administrative service commands intentionally avoid loading the interactive UI.
  // This keeps installer/update operations independent from Inquirer and menu dependencies.
  const { installService, removeService } = require('./process/service')

  if (command === '--install-service') {
    await installService(getServiceDescription())
  } else {
    await removeService()
  }

  return true
}

const main = async () => {
  const command = process.argv[2]

  if (await runServiceCommand(command)) {
    return
  }

  const { menu } = require('./menu/menu')
  await menu()
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
