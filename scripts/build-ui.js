const fs = require('node:fs/promises')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const projectRoot = path.resolve(__dirname, '..')
const outputDirectory = path.join(projectRoot, 'dist', 'FolderOrganizer-build')
const directories = [ 'utils', 'menu', 'process', 'resources' ]
const files = [ 'index.js', 'package.json', 'package-lock.json', 'start.exe' ]

const retry = async operation => {
  let error

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await operation()
    } catch (exception) {
      error = exception
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  throw error
}

const copy = source => retry(() => fs.cp(
  path.join(projectRoot, source),
  path.join(outputDirectory, source),
  { recursive: true }
))

const installProductionDependencies = () => {
  if (!process.env.npm_execpath) {
    throw new Error('npm_execpath is required to install production dependencies.')
  }

  execFileSync(process.execPath, [ process.env.npm_execpath, 'ci', '--omit=dev', '--ignore-scripts', '--prefix', outputDirectory ], {
    stdio: 'inherit'
  })
}

const build = async () => {
  await retry(() => fs.rm(outputDirectory, { recursive: true, force: true }))
  await fs.mkdir(outputDirectory, { recursive: true })

  for (const source of directories) {
    await copy(source)
  }

  for (const source of files) {
    await copy(source)
  }

  installProductionDependencies()
}

build().catch(error => {
  console.error(`Could not prepare the application distribution: ${ error.message }`)
  process.exitCode = 1
})
