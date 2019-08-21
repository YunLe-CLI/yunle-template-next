const withCss = require('@zeit/next-css');
const withImages = require('next-images');
const antdLessLoader = require("next-antd-aza-less");
const theme = require('./theme');
const package = require('./package');

// if (typeof require !== 'undefined') {
//   require.extensions['.css'] = () => {};
// }
// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = () => {};
// }

module.exports = withImages(withCss((antdLessLoader({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: theme
  },
  // 我们可以通过next的这个方法把全局的一些变量传到我们的代码里面
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
    NODE_ENV: process.env.NODE_ENV,
    VERSION: package.version,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // const antStyles = /antd-mobile\/.*?\/style.*?/  // 移动端
      const antStyles = /antd\/.*?\/style.*?/   // pc端
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }
    return config
  }
}))));
