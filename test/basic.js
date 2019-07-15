'use strict';

const {By, ClassicRunner, Target, Eyes} = require('@applitools/eyes.webdriverio');
const {Configuration} = require('@applitools/eyes-selenium');

let eyes;
let driver;

describe('applitools', function () {

  beforeEach(async () => {
    const runner = new ClassicRunner();
    eyes = new Eyes(runner);

    const configuration = new Configuration();
    configuration.setAppName('Eyes Example');
    configuration.setTestName('My first Javascript test!');
    // Set your private API key here or in the "APPLITOOLS_API_KEY" environment variable
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setConfiguration(configuration);

    driver = await eyes.open(browser);
  });

  afterEach(async () => {
    try {
      await eyes.close(false);
      const results = await eyes.getRunner().getAllTestResults(false);
      console.log('Result:', results);
    } catch (e) {
      await eyes.abortIfNotClosed();
    }
  });

  it('eyes should work', async () => {
    // Navigate the browser to the "hello world!" web-site.
    await driver.url('https://demo.applitools.com');

    // Visual checkpoint #1.
    await eyes.check('Main Page', Target.window());

    // Click the "Log in" button.
    await driver.click(By.id('log-in'));

    // Visual checkpoint #2.
    await eyes.check('Click!', Target.window());
  })
});
