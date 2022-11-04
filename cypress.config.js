const { defineConfig } = require('cypress');

module.exports = defineConfig({
  experimentalStudio: true,
  experimentalShadowDomSupport: true,
  viewportWidth: 1360,
  viewportHeight: 1024,
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
