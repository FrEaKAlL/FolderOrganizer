const Service = require('node-windows').Service

const creaServicioEnWindows = async (text) => {
  try {
    let fullPath = `${ __dirname }\\secondProcess.js`
    const svc = new Service({
      name: 'FolderOrganizer',
      description: text.descripcion,
      script: fullPath,
      account: {
        user: 'yankies_0121@hotmail.com',
        password: '6,vdRV<=f>:WEBrJ',
      },
      allowServiceLogon: true,
      nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
      ],
      env: [
        {
          name: 'NODE_ENV',
          value: 'production'
        }
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
  }catch(ex) {
    console.error(ex)
  }
}
module.exports = { creaServicioEnWindows }