console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const NODE_ENV = process.env.NODE_ENV || 'development';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const isHot = !!process.env.HOT || false;

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const src = `${__dirname}/src`;
const dist = `${__dirname}/dist`;
const publicPath = '/';

const devPlugins = () => {
	if (isDev) {
		return [
			new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
        // favicon: 'favicon.png',
        chunksSortMode: 'none',
        xhtml: true
      }),
		]
	}
	return [];
}

const hotPlugins = isHot
  ? [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true, // Enable multi-pass compilation for enhanced performance in larger projects.
      }),
    ]
  : [];

const prodPlugins = isProd
  ? [
      // Note: do not use '-p' in "build:prod" script

      // CommonsChunk analyzes everything in your bundles, extracts common bits into files together.
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
      }),

      // Minify and optimize the index.html
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
        chunksSortMode: 'dependency',
        xhtml: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true
      }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,    // Enables tree shaking
          dead_code: true, // Enables tree shaking
          pure_getters: true,
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          comparisons: true,
          sequences: true,
          evaluate: true,
          join_vars: true,
          if_return: true,
        },
        output: {
          comments: false
        },
        sourceMap: true
      }),
    ]
  : [];

const cssRules = isHot
  ? [
      {
        // Enables HMR. Inlines CSS in html head style tag
        test: /\.scss$/,
        use: [{
          	loader: 'style-loader'
          }, {
            loader: 'css-loader',

            // Uncomment options if you don't want inlines CSS (HMR works for both)
            /*
            options: {
              url: true,
              sourceMap: true,
              importLoaders: 1
            }
            */
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
            }
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'sass-loader',
            query: {
              sourceMap: 'expanded'
            }
          },
        ]
      }
    ]
  : [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: isDev
                ? {
                    url: true,
                    sourceMap: true,
                    importLoaders: 1
                  }
                : {
                    url: true
                  }
            }, {
              loader: 'postcss-loader',
              options: isDev
                ? { sourceMap: 'inline' }
                : {}
            }, {
              loader: 'resolve-url-loader'
            }, {
              loader: 'sass-loader',
              query: {
                sourceMap: isProd ? 'compressed' : 'expanded'
              }
            },
          ]
        })
      },
		];

module.exports = {
	context: src,

	devtool: isProd ? 'hidden-source-map' : 'source-map',

	entry: {
		vendor: isProd ? ['./vendor.js'] : [],
		app: (isHot
      ? [
          // Dynamically set the webpack public path at runtime below
          // Must be first entry to properly set public path
          // See: http://webpack.github.io/docs/configuration.html#output-publicpath
          // NOTE: Not shure if this is really needed. Seems to work OK without
          //'./webpack-public-path.js',


//************ comented this line, why?
          // 'webpack-hot-middleware/client',

          // reload - Set to true to auto-reload the page when webpack gets stuck.
          //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',

          // You can use full urls, like:
          //`webpack-hot-middleware/client?http://${host}:${port}${publicPath}`
          // Remember to update path in ./server/index.js - see: Step 3 in ./server/index.js
        ]
      : [])
      .concat([
        './index.js'
      ]),
	},
	
	output: {
		filename: isProd ? '[name].[chunkhash].js' : '[name].js', // Don't use hashes in dev mode
		chunkFilename: isProd ? '[name].[chunkhash].chunk.js' : '[name].chunk.js',
		path: dist,
		publicPath: publicPath,
		pathinfo: !isProd,
		devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
	},

	// watch: NODE_ENV == 'development',

	watchOptions: {
		aggregateTimeout: 300
	},


	plugins: [

		//set global const
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),

		//not compile on errors
		new webpack.NoEmitOnErrorsPlugin(),

		//extract text settings
    new ExtractTextPlugin({
      filename: isProd ? '[name].[chunkhash].styles.css' : '[name].styles.css',
      disable: false,
      allChunks: true,
    }),

	].concat(devPlugins()).concat(hotPlugins).concat(prodPlugins),

	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader'
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			}, {
        test: /\.(jpg|jpeg)$/,
        loader: 'url-loader?name=[name].[ext]&limit=8192&mimetype=image/jpg'
      },
		].concat(cssRules)
	},

  devServer: {
		host: 'localhost',
		port: '8000',
		publicPath: publicPath,
		contentBase: src,
		hot: isHot,
		compress: true,
		open: true,
		noInfo: true,
		stats: 'errors-only',
		inline: true,
		lazy: false,
		headers: {'Access-Control-Allow-Origin': '*'},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		historyApiFallback: {
			verbose: isHot,
			disableDotRule: false,
		},
	},
};
