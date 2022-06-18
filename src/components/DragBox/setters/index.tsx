const getAllsetter = require.context(".", true, /index.tsx$/)

const setters = new Map()

getAllsetter.keys().forEach((path) => {
  const setterName = path.match(/.\/(\S*)\/index.tsx/)?.[1] || '';
  const setterType = setterName && setterName.replace(setterName[0],setterName[0].toLowerCase())
  if (setterType) {
    const { default: value } = getAllsetter(path)
    setters.set(setterType, value)
  }
})

export default setters