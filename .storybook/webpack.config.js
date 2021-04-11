const path = require('path');
const options = require('../babel.config');
const fs = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, '../app/styles/antDefaultVars.less'),
    'utf8',
  ),
);
module.exports = async ({ config }) => {
  config.module.rules.push(
    // {
    //   test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
    //   exclude: /node_modules/,
    //   use: {
    //     loader: 'babel-loader',
    //     options: options.babelQuery,
    //   },
    // },
    {
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: themeVariables,
          },
        },
      ],
    },
);

  config.resolve.modules.push(path.resolve(__dirname, "../app"));

  return config;
};
