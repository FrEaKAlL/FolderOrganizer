const os = require('os')
const { execFileSync } = require('node:child_process')

const quoteSystemdValue = value => `"${ String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]/g, ' ') }"`

const creaServicioEnWindows = async (text) => {
  try {
    const platform = os.platform()
    const serviceName = 'FolderOrganizer'
    const fullPath = `${ __dirname }\\secondProcess.js`
    if (platform === 'win32'){
      const Service = require('node-windows').Service

      const svc = new Service({
        name: serviceName,
        description: text.descripcion,
        script: fullPath,
        nodeOptions: [
          '--harmony',
          '--max_old_space_size=4096'
        ]
      })
      if (svc.exists) {
        svc.stop()
        svc.uninstall()
      }
      svc.on('install', () => {
        svc.start()
      })
      svc.install()
    } else if (platform === 'linux') {
      const fullPath = `${ __dirname }/secondProcess.js`
      const serviceFile = `
[Unit]
Description=${ text.descripcion }
After=network.target

[Service]
ExecStart=${ quoteSystemdValue(process.execPath) } ${ quoteSystemdValue(fullPath) }
WorkingDirectory=${ quoteSystemdValue(__dirname.replace('/process', '')) }
Restart=always
User=${ process.env.USER }
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target`.trim()

      const servicePath = `/etc/systemd/system/${ serviceName }.service`
      execFileSync('sudo', [ 'tee', servicePath ], {
        input: serviceFile,
        stdio: [ 'pipe', 'inherit', 'inherit' ]
      })
      execFileSync('sudo', [ 'systemctl', 'daemon-reload' ], { stdio: 'inherit' })
      execFileSync('sudo', [ 'systemctl', 'enable', serviceName ], { stdio: 'inherit' })
      execFileSync('sudo', [ 'systemctl', 'start', serviceName ], { stdio: 'inherit' })
    }
  }catch(ex) {
    console.error(ex)
  }
}
module.exports = { creaServicioEnWindows }
