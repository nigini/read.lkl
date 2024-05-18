const path = require('path');

module.exports = {
  mode: "development",
  //mode: "production",
  entry: './annotator.mjs',
  target: "web",
  experiments: {
    outputModule: true
  },
  output: {
    path: path.resolve(__dirname, '..', 'static', 'assets', 'js'),
    filename: 'annotate-lkl.mjs',
    library: {
      type: 'module'
    },
    module: true
  },
};