const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, '../app/styles/antDefaultVars.less'),
    'utf8',
  ),
);
module.exports = {
  "stories": [
    "../app/**/stories/**/*.stories.mdx",
    "../app/**/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
};
