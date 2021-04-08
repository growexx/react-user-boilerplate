const fs = require('fs');
module.exports = {
  "stories": [
    "../app/**/stories/**/*.stories.mdx",
    "../app/**/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-react-docgen",
  ],
};
