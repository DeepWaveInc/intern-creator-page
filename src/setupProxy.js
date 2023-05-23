const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  // app.use(function (req, res, next) {
  //   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  //   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  //   next()
  // })

  app.use(
    '/accounts-api',
    createProxyMiddleware({
      target: 'https://accounts-test.api.dwave.cc',
      changeOrigin: true,
      pathRewrite: {
        '^/accounts-api': ''
      },
      cookieDomainRewrite: {
        '*': ''
      }
    })
  )

  app.use(
    '/hullaballoo-api',
    createProxyMiddleware({
      target: 'https://hullaballoo-test.api.dwave.cc',
      changeOrigin: true,
      pathRewrite: {
        '^/hullaballoo-api': ''
      },
      cookieDomainRewrite: {
        '*': ''
      }
    })
  )
}
