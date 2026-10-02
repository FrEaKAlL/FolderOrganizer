const fs = require('node:fs/promises')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const projectRoot = path.resolve(__dirname, '..')
const outputDirectory = path.resolve(projectRoot, 'dist', 'FolderOrganizer-build')
const directories = [ 'menu', 'process', 'resources', 'utils' ]
const files = [ 'index.js', 'package.json', 'pnpm-lock.yaml' ]
const launchers = [ 'folderorganizer.cmd', 'folderorganizer.sh' ]
const assets = [ 'icon.ico' ]

const assertBuildDestination = () => {
  const expectedRoot = path.resolve(projectRoot, 'dist') + path.sep
  if (!outputDirectory.startsWith(expectedRoot)) throw new Error(`Unsafe build destination: ${ outputDirectory }`)
  console.log(`Portable build destination: ${ outputDirectory }`)
}

const runPnpm = args => {
  const packageManager = process.env.npm_execpath
  if (!packageManager) throw new Error('Run the build through pnpm so production dependencies can be installed.')
  const options = { cwd: projectRoot, stdio: 'inherit', env: { ...process.env, INIT_CWD: projectRoot } }
  if (packageManager.toLowerCase().endsWith('.exe')) { execFileSync(packageManager, args, options); return }
  execFileSync(process.execPath, [ packageManager, ...args ], options)
}

const copyApplication = async () => {
  for (const directory of directories) await fs.cp(path.join(projectRoot, directory), path.join(outputDirectory, directory), { recursive: true })
  for (const file of files) await fs.copyFile(path.join(projectRoot, file), path.join(outputDirectory, file))
  for (const launcher of launchers) await fs.copyFile(path.join(projectRoot, 'launchers', launcher), path.join(outputDirectory, launcher))
  const assetsDirectory = path.join(outputDirectory, 'assets')
  await fs.mkdir(assetsDirectory, { recursive: true })
  for (const asset of assets) await fs.copyFile(path.join(projectRoot, 'assets', asset), path.join(assetsDirectory, asset))
}

const installProductionDependencies = () => {
  runPnpm([ 'install', '--prod', '--frozen-lockfile', '--node-linker=hoisted', '--ignore-scripts', '--dir', outputDirectory ])
}

const validateDistribution = () => {
  const validationScript = [
    'require(\'./process/service\')',
    'require(\'./menu/menu\')',
    'Promise.resolve(import(\'inquirer\')).catch(error => { console.error(error); process.exit(1) })'
  ].join(';')
  execFileSync(process.execPath, [ '-e', validationScript ], { cwd: outputDirectory, stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } })
  console.log('Portable distribution validated successfully.')
}

const build = async () => {
  assertBuildDestination()
  await fs.rm(outputDirectory, { recursive: true, force: true })
  await fs.mkdir(outputDirectory, { recursive: true })
  await copyApplication()
  installProductionDependencies()
  validateDistribution()
}

build().catch(error => {
  console.error(`Could not prepare the application distribution: ${ error.message }`)
  process.exitCode = 1
})
