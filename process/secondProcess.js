const process = require('./process')
const logger = require('../utils/logger')

const run = async () => {
  try {
    await process.executeProcess()
  } catch (error) {
    logger.error(error.message)
  } finally {
    setTimeout(run, 5000)
  }
}

run()
