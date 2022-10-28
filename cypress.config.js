const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.flybreeze.com/",
  },
  env: {
    apiURL: "https://api.flybreeze.com/production/nav/api/",
  },
  defaultCommandTimeout: 15000,
  retries: 3,
});
