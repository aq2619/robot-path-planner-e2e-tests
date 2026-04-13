import { Browser, BrowserContext, Page, chromium } from 'playwright';

let browser: Browser | null = null;
let context: BrowserContext | null = null;
let page: Page | null = null;

/**
 * Initializes the Playwright browser instance.
 */
export const initBrowser = async (): Promise<void> => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
};

/**
 * Navigates to the base URL.
 * @param baseUrl - The URL to navigate to.
 */
export const navigateToBaseUrl = async (baseUrl: string): Promise<void> => {
    if (page) {
        await page.goto(baseUrl);
    } else {
        throw new Error('Browser is not initialized.');
    }
};

/**
 * Cleans up and closes the browser instances.
 */
export const cleanupBrowser = async (): Promise<void> => {
    if (page) await page.close();
    if (context) await context.close();
    if (browser) await browser.close();
};

/**
 * Returns the current Playwright page instance.
 * @returns Page instance.
 */
export const getPage = (): Page | null => {
    return page;
};
