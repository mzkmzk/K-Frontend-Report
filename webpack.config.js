
var path =  path_ = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const QiniuPlugin = require('qiniu-plugin')
var k_qiniu = require( 'k-qiniu')
var env = require('./.env.js');
var _package = require('./package')
//const path = '/Users/maizhikun/Project/Thunder/LiXianSpace/code/mac'
const __DEV__ =  process.env.NODE_ENV !== 'production'

if ( !__DEV__  ) {
  public_path =  'http://publish.404mzk.com/static/' + _package.name + "/" + _package.version +"/"
}else{
  public_path = null
}

module.exports = {
	entry:{ 
        //network: [
        //'webpack-dev-server/client?http://localhost:8080',
        //'webpack/hot/only-dev-server',
        //'./Src/View/Index/index'],
        index: './Src/View/Index/index'
    },
    //devtool: "cheap-module-source-map",
	output: {
		path:  path_.join(__dirname, 'Public'),
		filename: '[name].bundle.js',
        publicPath: public_path//'/mac/public/'
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
        new webpack.DefinePlugin({
              'process.env': {
                NODE_ENV: JSON.stringify('production')
              },
              '__DEV__': __DEV__
            }),
        __DEV__ ?  function(){} : new webpack.optimize.UglifyJsPlugin(),
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
         __DEV__ ? () => {} : new k_qiniu({

          // 七牛云的两对密匙 Access Key & Secret Key
          accessKey: env.qiniu_access_key,
        
          secretKey: env.qiniu_secret_key,
        
          // 七牛云存储空间名称
          bucket: 'publish',
          
          // 上传到七牛后保存的文件名
          path: 'static/[name]/[version]/[asset]'

        }),
    ],
};
