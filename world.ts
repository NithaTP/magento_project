import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext, chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  private videoDir = path.resolve(process.cwd(), 'video');

  constructor(options: IWorldOptions) {
    super(options);

    if (!fs.existsSync(this.videoDir)) {
      fs.mkdirSync(this.videoDir, { recursive: true });
      console.log(`📁 Created video directory at: ${this.videoDir}`);
    }
  }

  async launchBrowser() {
    this.browser = await chromium.launch({ headless: false });

    this.context = await this.browser.newContext({
      recordVideo: {
        dir: this.videoDir,
        size: { width: 1280, height: 720 }
      }
    });

    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    try {
      if (!this.page) return;
      await this.page.close();
      const video = this.page.video();

      if (video) {
        const videoPath = await video.path();
        console.log('🎥 Video saved at:', path.resolve(videoPath));
      } else {
        console.warn('⚠️ No video found for this page');
      }

      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (error) {
      console.error('Error during browser close:', error);
    }
  }
}

setWorldConstructor(CustomWorld);
