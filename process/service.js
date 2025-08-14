const os = require('os')
const { execSync } = require('child_process')

const getNodePath = () => {
  return execSync('which node').toString().trim()
}

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
ExecStart=${ getNodePath() } ${ fullPath }
WorkingDirectory=${__dirname.replace('/process', '')}
Restart=always
User=${ process.env.USER }
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target`.trim()

      const servicePath = `/etc/systemd/system/${ serviceName }.service`
      console.log(`echo "${ serviceFile.replace(/"/g, '\\"') }" | sudo tee ${ servicePath }`)
      execSync(`echo "${ serviceFile.replace(/"/g, '\\"') }" | sudo tee ${ servicePath }`)
      execSync('sudo systemctl daemon-reload')
      execSync(`sudo systemctl enable ${ serviceName }`)
      execSync(`sudo systemctl start ${ serviceName }`)
    }
  }catch(ex) {
    console.error(ex)
  }
}
module.exports = { creaServicioEnWindows }