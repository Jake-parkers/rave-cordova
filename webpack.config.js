const path = require('path');

module.exports = {
  entry: ['./src/rave.js', './src/misc.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
