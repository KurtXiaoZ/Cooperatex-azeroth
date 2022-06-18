const getAllModifier = require.context(".", true, /index.tsx$/)

const modifiers = getAllModifier.keys().map((path) => {
  const modifierName = path.match(/.\/(\S*)\/index.tsx/)?.[1] as string;
  if (modifierName) {
    const { default: value } = getAllModifier(path)
    return { [modifierName]: value}
  }
  return null
}).filter((m)=> !!m)

export default modifiers

