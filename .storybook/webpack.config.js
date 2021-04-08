const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      options: {
          presets: ['@babel/react'],
          plugins: [
            [
              'styless',
              {
                import: './app/styles/antDefaultVars.less',
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            ],
            ['import', { libraryName: 'antd', style: true }],
            'styled-components',
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import',    
          ]
      },
  });

  config.module.rules.push({  
      test: /\.less$/,
      loaders: [
          {
              loader: 'less-loader',
              options: {
                  modifyVars: {'@primary-color': '#f00'},
                  javascriptEnabled: true
              }
          }
      ],
  });
  config.resolve.modules.push(path.resolve(__dirname, "../app"));

  return config;
};
