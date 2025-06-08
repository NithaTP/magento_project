import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { LoginPage } from '../pages/LoginPage';

let signupPage: SignupPage;
let loginPage: LoginPage;

Given('I am on the Magento homepage', async function () {
  await this.page.goto('https://magento.softwaretestingboard.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 20000
  });
});

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

When('I enter valid registration details:', async function (dataTable) {
  const data = dataTable.hashes()[0];
  const uniqueEmail = data.Email === 'auto'
    ? `user_${Date.now()}@mailinator.com`
    : data.Email;

  this.savedEmail = uniqueEmail;
  this.savedPassword = data.Password;

  await signupPage.signUp(data.FirstName, data.LastName, uniqueEmail, data.Password);
});


When('I submit the registration form', async function () {
  await signupPage.submitForm();
});
When('I log out', async function () {
  const menuButton = this.page.getByRole('button', { name: 'Change' });
  await menuButton.waitFor({ state: 'visible', timeout: 10000 });
  await menuButton.click();
  const signOutLink = this.page.getByRole('link', { name: 'Sign Out' }).first();
  await signOutLink.waitFor({ state: 'visible', timeout: 10000 });
  await signOutLink.click();
  await this.page.waitForURL('**/customer/account/logoutSuccess/**', { timeout: 15000 });
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

