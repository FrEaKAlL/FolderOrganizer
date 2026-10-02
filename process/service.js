const os = require('node:os')
const path = require('node:path')
const { execFileSync, spawnSync } = require('node:child_process')

const serviceName = 'FolderOrganizer'
const serviceScript = path.join(__dirname, 'secondProcess.js')
const projectRoot = path.resolve(__dirname, '..')

const quoteSystemdValue = value => `"${ String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]/g, ' ') }"`

const waitForWindowsServiceEvent = (svc, event) => new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error(`Timed out waiting for Windows service event: ${ event }`)), 30000)
  svc.once(event, () => { clearTimeout(timeout); resolve() })
  svc.once('error', error => { clearTimeout(timeout); reject(error) })
})

const removeWindowsService = async () => {
  const Service = require('node-windows').Service
  const svc = new Service({ name: serviceName, script: serviceScript })
  if (!svc.exists) return false
  const uninstallCompleted = waitForWindowsServiceEvent(svc, 'uninstall')
  svc.uninstall()
  await uninstallCompleted
  return true
}

const installWindowsService = async description => {
  await removeWindowsService()
  const Service = require('node-windows').Service
  const svc = new Service({
    name: serviceName,
    description,
    script: serviceScript,
    nodeOptions: [ '--max_old_space_size=4096' ]
  })
  const installCompleted = waitForWindowsServiceEvent(svc, 'install')
  svc.install()
  await installCompleted
  svc.start()
}

const systemdServicePath = `/etc/systemd/system/${ serviceName }.service`

const installLinuxService = description => {
  const user = process.env.SUDO_USER || process.env.USER
  if (!user) throw new Error('Could not determine the Linux user for the systemd service.')

  const serviceFile = `
[Unit]
Description=${ description }
After=network.target

[Service]
ExecStart=${ quoteSystemdValue(process.execPath) } ${ quoteSystemdValue(serviceScript) }
WorkingDirectory=${ quoteSystemdValue(projectRoot) }
Restart=always
User=${ user }
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target`.trim()

  execFileSync('sudo', [ 'tee', systemdServicePath ], { input: serviceFile, stdio: [ 'pipe', 'ignore', 'inherit' ] })
  execFileSync('sudo', [ 'systemctl', 'daemon-reload' ], { stdio: 'inherit' })
  execFileSync('sudo', [ 'systemctl', 'enable', '--now', serviceName ], { stdio: 'inherit' })
}

const removeLinuxService = () => {
  try {
    execFileSync('sudo', [ 'systemctl', 'disable', '--now', serviceName ], { stdio: 'ignore' })
  } catch {
    // The service may not exist or may already be stopped.
  }
  execFileSync('sudo', [ 'rm', '-f', systemdServicePath ], { stdio: 'inherit' })
  execFileSync('sudo', [ 'systemctl', 'daemon-reload' ], { stdio: 'inherit' })
}

const installService = async description => {
  const platform = os.platform()
  if (platform === 'win32') { await installWindowsService(description); return }
  if (platform === 'linux') { removeLinuxService(); installLinuxService(description); return }
  throw new Error(`Service installation is not supported on ${ platform }.`)
}

const escapePowerShellSingleQuotes = value => value.replace(/'/g, String.fromCharCode(39).repeat(2))

const installWindowsServiceElevated = () => {
  const indexPath = path.join(projectRoot, 'index.js')
  const escapedNode = escapePowerShellSingleQuotes(process.execPath)
  const escapedIndex = escapePowerShellSingleQuotes(indexPath)
  const quotedIndexArgument = `"${ escapedIndex }"`
  const command = `$process = Start-Process -FilePath '${ escapedNode }' -ArgumentList @('${ quotedIndexArgument }', '--install-service') -WorkingDirectory '${ escapePowerShellSingleQuotes(projectRoot) }' -Verb RunAs -Wait -PassThru; exit $process.ExitCode`
  const result = spawnSync('powershell.exe', [ '-NoProfile', '-NonInteractive', '-Command', command ], { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Elevated Windows service installation failed with exit code ${ result.status }.`)
}

const installServiceInteractive = async description => {
  if (os.platform() === 'win32') { installWindowsServiceElevated(description); return }
  await installService(description)
}

const removeService = async () => {
  const platform = os.platform()
  if (platform === 'win32') return removeWindowsService()
  if (platform === 'linux') { removeLinuxService(); return true }
  return false
}

module.exports = { installService, installServiceInteractive, removeService }
