const getAllPage = require.context(".", true, /index.tsx$/)

const pages = new Map()

getAllPage.keys().forEach((path) => {
  const pageName = path.match(/.\/(\S*)\/index.tsx/)?.[1] || '';
  const pageType = pageName.replace(pageName[0], pageName[0].toLowerCase())
  if (pageType) {
    const { default: value } = getAllPage(path)
    pages.set(pageType, value)
  }
})


export default pages