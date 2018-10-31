const path = require('path');

module.exports = {
  entry: ['./src/rave.js', './src/misc.js'],
  output: {
    filename: 'rave.js',
    path: path.resolve('./dist')
  }
};
