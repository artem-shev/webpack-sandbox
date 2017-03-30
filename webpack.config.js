'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname + '/src',

	entry: {
		app: ['webpack-dev-server/client', 'webpack/hot/dev-server', './js/app.js'],
		common: './js/common.js'
	},
	
	output: {
		path: __dirname + '/build',
		publicPath: '/build/', //must be for url
		// publicPath: __dirname + '/build/', //must be for url
		filename: '[name].js',
		library: '[name]'
	},

	watch: NODE_ENV == 'development',

	watchOptions: {
		aggregateTimeout: 300
	},

	devtool: NODE_ENV == 'development'? 'cheap-inline-module-source-map' : void 0,

	plugins: [

		//set global const
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
			TEST: JSON.stringify('test'),
		}),

		//not compile on errors
		new webpack.NoEmitOnErrorsPlugin(),

		//concat common part
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),

		new HtmlWebpackPlugin({
			title: 'webpack',
			filename: 'index.html',
			template: __dirname + '/src/index.html'
		}),

		new webpack.HotModuleReplacementPlugin(),

		// new webpack.ProvidePlugin({
		// 	_: 'lodash'
		// }),

		//uglify js		
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: { warnings: false }
		// })
	],

	// externals: {
	// 	jQuery: '$'
	// },

	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader?presets[]=es2015"
			}, {
				test: /\.scss$/,
				loader: ["style-loader", "css-loader", 'resolve-url-loader', 'sass-loader?sourceMap']
				// loader: 'style-loader!css-loader!resolve-url-loader!sass-loader?sourceMap'
			}

		]
	},

	devServer: {
		host: 'localhost',
		port: 8080
	}
};

//4.2