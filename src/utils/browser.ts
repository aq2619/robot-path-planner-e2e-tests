import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export class BrowserManager {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  async initialize(headless = true): Promise<Page> {
    this.browser = await chromium.launch({ headless });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    return this.page;
  }

  getPage(): Page {
    if (!this.page) throw new Error('Browser not initialized. Call initialize() first.');
    return this.page;
  }

  async teardown(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    this.page = null;
    this.context = null;
    this.browser = null;
  }
}

