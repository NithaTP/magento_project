import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(30 * 1000);

Before(async function () {
  await this.launchBrowser();
});

After(async function () {
  await this.closeBrowser();
});
