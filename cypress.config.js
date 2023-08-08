const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');


function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  projectId: "ysomiq",

  e2e: {
    baseUrl: "https://restful-booker.herokuapp.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const file = config.env.configFile || 'test';
      config.defaultCommandTimeout = 10000

      on('task', {
        log (message) {
          console.log(message)
          return null
        }
      })

      return getConfigurationByFile(file);
    },
  },
});
