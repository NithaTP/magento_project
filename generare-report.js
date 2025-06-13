const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'cucumber-report',
  reportPath: './html-report',
  metadata: {
    browser: {
      name: 'chrome',
      version: '123'
    },
    device: 'Local Test Machine',
    platform: {
      name: 'windows',
      version: '11'
    }
  }
});
