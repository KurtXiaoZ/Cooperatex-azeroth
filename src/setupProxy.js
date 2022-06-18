const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://data.reachplatform.org/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }),
    proxy('/mock', {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^mock': ''
      }
    })
  )
}