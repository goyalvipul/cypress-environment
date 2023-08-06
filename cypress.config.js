const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ysomiq",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      console.log(config);
      config.defaultCommandTimeout = 10000
      config.baseUrl = 'https://restful-booker.herokuapp.com'

      config.env.ENVIRONMENT = 'test'

      return config
    },
  },
});
