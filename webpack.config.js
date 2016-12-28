
var path =  path_ = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const QiniuPlugin = require('qiniu-plugin')
//const path = '/Users/maizhikun/Project/Thunder/LiXianSpace/code/mac'

module.exports = {
	entry:{ 
        network: [
        //'webpack-dev-server/client?http://localhost:8080',
        //'webpack/hot/only-dev-server',
        './Src/View/Index/index'],
        index: './Src/View/Index/index'
    },
    //devtool: "cheap-module-source-map",
	output: {
		path:  path_.join(__dirname, 'Public'),
		filename: '[name].bundle.js',
        //publicPath: '/mac/public/'
	},
	module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                include: __dirname+ '/Src',
                exclude: __dirname+ '/Src/Utils'
            }
        ],
		loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: __dirname + '/Src',
            },
            {
                test: /\.scss$/,
                loaders: ['style','css','sass'],
            },
            {
                test: /\.css$/,
                loaders: ['style','css','sass'],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10240'
            },
            {
                test: /\.woff$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot$/,
                loader: "file-loader"
            },
            {
                test: /\.svg$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
		],
	},
    plugins: [
        /*new webpack.DefinePlugin({
              'process.env': {
                NODE_ENV: JSON.stringify('production')
              }
            }),
        new webpack.optimize.UglifyJsPlugin(),*/
        /*new HtmlWebpackPlugin({
            filename: 'network.html',
            template:  path_.join(__dirname, '/Src/View/Network/network.html') ,
            chunks: ['network'],
        }),*/
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:  path_.join(__dirname, '/Src/View/Index/index.html') ,
            chunks: ['index'],
        }),
        //压缩JS
        /*new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),*/
        //抽取公共模块 不行,好像一定要有制定chunks在 可以把通用的放在一个js里,然后每个页面去script它
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            chunks: ['react', 'react-dom'],
        }),
        //七牛插件
        /*new QiniuPlugin({

        // 七牛云的两对密匙 Access Key & Secret Key
        accessKey: '7SXiYZNWBQyXvS8eRg0PFNMlcRIxS9xQ2NaunjXn',

        secretKey: 'trgyS9ecNNBIogkKsOkipGQEe9TMYPNErSdDdKfO',

        // 七牛云存储空间名称
        bucket: 'journey',

        // 上传到七牛后保存的文件名
        path: 'rc/journey/0.0.1'

      }),*/
    ],
};
