import { chromium, Browser, Page } from 'playwright';

export class BrowserManager {
    private browser: Browser | null = null;
    private page: Page | null = null;

    async initialize() {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
    }

    async getPage(): Promise<Page | null> {
        return this.page;
    }

    async teardown() {
        if (this.page) {
            await this.page.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
    }
}
