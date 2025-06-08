import { Page } from '@playwright/test';

export class SignupPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async signUp(firstName: string, lastName: string, email: string, password: string): Promise<void> {
    await this.page.fill('#firstname', firstName);
    await this.page.fill('#lastname', lastName);
    await this.page.fill('#email_address', email);
    await this.page.fill('#password', password);
    await this.page.fill('#password-confirmation', password);
  }

  async submitForm(): Promise<void> {
    await this.page.click('button[title="Create an Account"]');
  }
}
