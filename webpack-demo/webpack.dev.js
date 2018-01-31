const merge  = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // 测试环境
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 9000
    }
})
