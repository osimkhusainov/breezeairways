const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    baseUrl: "https://www.flybreeze.com/",
  },
  env: {
    apiURL: "https://api.flybreeze.com/production/nav/api/",
  },
  defaultCommandTimeout: 15000,
  retries: 2,
});
