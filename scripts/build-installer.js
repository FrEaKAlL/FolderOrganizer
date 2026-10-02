const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const packageJson = require('../package.json')

const projectRoot = path.resolve(__dirname, '..')
const scriptPath = path.join(projectRoot, 'installer', 'FolderOrganizer.iss')
const compilerPaths = [
  process.env.ISCC_PATH,
  process.env['ProgramFiles(x86)'] && path.join(process.env['ProgramFiles(x86)'], 'Inno Setup 6', 'ISCC.exe'),
  process.env.ProgramFiles && path.join(process.env.ProgramFiles, 'Inno Setup 6', 'ISCC.exe')
].filter(Boolean)
const compilerPath = compilerPaths.find(candidate => fs.existsSync(candidate))

if (!compilerPath) throw new Error('Inno Setup 6 was not found. Install it or set ISCC_PATH to ISCC.exe.')

execFileSync(compilerPath, [ scriptPath, `/DMyAppVersion=${ packageJson.version }` ], { stdio: 'inherit' })
