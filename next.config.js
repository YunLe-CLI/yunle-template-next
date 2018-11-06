const withPlugins = require('next-compose-plugins')
const withLess = require('@zeit/next-less')

const withCss = require('@zeit/next-css')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = (file) => {}
}

module.exports = withPlugins([
    [withCss],
    [withLess, {
        cssModules: true,
        lessLoaderOptions: {
            "inlineJavaScript": true,
        }
    }],
])
