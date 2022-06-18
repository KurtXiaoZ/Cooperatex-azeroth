const getAllModule = require.context(".", true, /index.tsx$/)

const modules = new Map()

getAllModule.keys().forEach((path) => {
  const moduleName = path.match(/.\/(\S*)\/index.tsx/)?.[1] || '';
  const moduleType = moduleName.replace(moduleName[0],moduleName[0].toLowerCase())
  if (moduleType) {
    const { default: value } = getAllModule(path)
    modules.set(moduleType, value)
  }
})

export default modules
