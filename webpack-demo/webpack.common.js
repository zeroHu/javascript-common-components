const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },{
            test: /\.(jpg|png|svg|git)$/,
            use: [
                'file-loader'
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), // 每次都清空dist
        new HtmlWebpackPlugin({ // 根据index.html 自动生成一个index.html 到dist文件夹下 自动引入js
            title: 'output new html title'
        })
    ]
}
