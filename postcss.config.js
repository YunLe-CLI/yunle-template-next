const pxtorem = require("postcss-pxtorem");
module.exports = {
  plugins: [
    // pxtorem({
    //   rootValue: 100,
    //   unitPrecision: 5,
    //   propList: ["*"],
    //   // selectorBlackList: [/^\.nop2r/, /^\.am/],//排除antd样式
    //   replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 0
    // })
  ]
}
