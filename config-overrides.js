const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

module.exports = {
  webpack: function (config, env) {
    const isEnvProduction = env === 'production'
    const isEnvDevelopment = env === 'development'
    config.output = {
      ...config.output,
      filename: isEnvProduction
        ? 'public/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'public/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'public/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'public/js/[name].chunk.js',
      assetModuleFilename: 'public/media/[name].[hash][ext]'
    }

    config.module = {
      ...config.module,
      rules: config.module.rules.map((rule) => {
        if ('oneOf' in rule) {
          return {
            ...rule,
            oneOf: rule.oneOf.map((oneOf) => {
              if (
                oneOf.test?.toString &&
                oneOf.test.toString() === '/\\.svg$/'
              ) {
                return {
                  ...oneOf,
                  use: oneOf.use.map((use) => {
                    if (use.loader.includes('file-loader')) {
                      return {
                        ...use,
                        options: {
                          ...use.options,
                          name: 'public/media/[name].[hash].[ext]'
                        }
                      }
                    }
                    return use
                  })
                }
              }
              return oneOf
            })
          }
        } else {
          return rule
        }
      })
    }

    config.plugins = config.plugins.map((plugin) => {
      if (plugin.constructor.name === 'MiniCssExtractPlugin') {
        plugin.options = {
          ...plugin.options,
          filename: 'public/css/[name].[contenthash:8].css',
          chunkFilename: 'public/css/[name].[contenthash:8].chunk.css'
        }
        return plugin
      } else {
        return plugin
      }
    })

    config.plugins.push(new AntdDayjsWebpackPlugin())

    return config
  }
}
