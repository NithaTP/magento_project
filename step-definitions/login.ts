import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { LoginPage } from '../pages/LoginPage';

let signupPage: SignupPage;
let loginPage: LoginPage;
When('I navigate to the {string} page', async function (pageName: string) {
  if (pageName === 'Create an Account') {
    await this.page.click('a[href*="customer/account/create"]');
    signupPage = new SignupPage(this.page);
    await this.page.waitForLoadState('networkidle');
  } else if (pageName === 'Sign In') {
    await this.page.click('a[href*="customer/account/login"]');
    loginPage = new LoginPage(this.page);
    await this.page.waitForSelector('form#login-form', { timeout: 20000 });
  }
});
When('I login with:', async function (dataTable) {
  const data = dataTable.hashes()[0];

  const email = data.Email === 'auto' ? this.savedEmail : data.Email;
  const password = data.Password === 'auto' ? this.savedPassword : data.Password;

  if (!email || !password) throw new Error('Missing login credentials');

  await loginPage.login(email, password);
});


Then('I should see a welcome message containing {string}', async function (name: string) {
  await this.page.waitForSelector('div.box-content p', { timeout: 10000 });
  const welcomeText = await this.page.textContent('div.box-content p');
  expect(welcomeText).toContain(name);
});

Then('I should see {string} in the dashboard', async function (expectedText: string) {
  await this.page.waitForSelector('div.box-content p', { timeout: 10000 });
  const dashboardText = await this.page.textContent('div.box-content p');
  expect(dashboardText).toContain(expectedText);
  await this.page.screenshot({ path: 'screenshot/welcome.png', fullPage: true });
});

