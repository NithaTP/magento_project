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
  await menuButton.waitFor({ state: 'visible', timeout: 8000 });
  await menuButton.click();
  const signOutLink = this.page.getByRole('link', { name: 'Sign Out' }).first();
  await signOutLink.waitFor({ state: 'visible', timeout: 8000 });
  await signOutLink.click();
  await this.page.waitForURL('**/customer/account/logoutSuccess/**', { timeout: 15000 });
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
  await menuButton.waitFor({ state: 'visible', timeout: 8000 });
  await menuButton.click();
  const signOutLink = this.page.getByRole('link', { name: 'Sign Out' }).first();
  await signOutLink.waitFor({ state: 'visible', timeout: 8000 });
  await signOutLink.click();
  await this.page.waitForURL('**/customer/account/logoutSuccess/**', { timeout: 15000 });
});






