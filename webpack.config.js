'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	context: __dirname + '/src/js',

	entry: {
		app: './app.js',
		test: './test.js',
		common: './common.js'
	},
	
	output: {
		path: __dirname + '/src/js/build',
		publicPath: __dirname + '/src/js/build/', //must be for url
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

//uglify js		
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: { warnings: false }
		// })
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader?presets[]=es2015"
			}
		]
	}
};

//4.2