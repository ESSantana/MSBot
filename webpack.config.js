const path = require('path');

module.exports = {
  entry: './compiled/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bot.bundle.js'
  },
  target: 'node'
};