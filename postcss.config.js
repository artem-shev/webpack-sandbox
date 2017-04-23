/*
 * See: https://github.com/postcss/postcss-loader#usage
 */

module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'last 2 versions',
        'ie >= 11',
      ],
    })
  ],
};
