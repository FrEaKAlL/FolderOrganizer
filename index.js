const { createConfigEmpty } = require('./utils/fileConfig')
const { menu } = require('./menu/menu')

const main = () => {
  createConfigEmpty()
  menu()
}

main()