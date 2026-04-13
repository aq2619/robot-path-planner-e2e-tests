import { Page, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:1000';

/**
 * Navigates to a pre-saved environment in the map editor.
 */
export async function loadEnvironment(page: Page, environmentId: string): Promise<void> {
  await page.goto(`${BASE_URL}/node-frontend/maps/edit/${environmentId}`);
}

/**
 * Waits for the map canvas to be visible, indicating the environment has loaded.
 */
export async function waitForMapLoad(page: Page): Promise<void> {
  await page.waitForSelector('canvas', { timeout: 30000 });
}

/**
 * Checks the alerts section and asserts no active warnings or errors are present.
 * Uses targeted selectors for error/warning state rather than broad text matching
 * to avoid false positives from messages like "No warnings or errors found".
 */
export async function assertNoAlerts(page: Page): Promise<void> {
  const activeAlertLocator = page.locator(
    '[data-testid="alert-error"], [data-testid="alert-warning"], ' +
    '.alert--error, .alert--warning, ' +
    '[role="alert"][class*="error"], [role="alert"][class*="warning"]'
  );
  const count = await activeAlertLocator.count();
  expect(count, 'Expected no active error/warning alert elements').toBe(0);
}

/**
 * Returns the visible text content of the alerts section, or an empty string
 * if no alerts section is found.
 */
export async function getAlertsText(page: Page): Promise<string> {
  const alertsLocator = page.locator('[data-testid="alerts"], .alerts, #alerts').first();
  const count = await alertsLocator.count();
  if (count === 0) return '';
  return (await alertsLocator.textContent()) ?? '';
}

/**
 * Opens the Create Mission dialog via the UI.
 */
export async function openCreateMissionDialog(page: Page): Promise<void> {
  await page.click('button:has-text("Create Mission"), [data-testid="create-mission-btn"]');
  await page.waitForSelector(
    '[role="dialog"], .modal, [data-testid="create-mission-dialog"]',
    { timeout: 10000 }
  );
}

/**
 * Fills the mission name field in the Create Mission dialog.
 */
export async function fillMissionName(page: Page, name: string): Promise<void> {
  await page.fill(
    'input[placeholder*="mission" i], input[name*="mission" i], [data-testid="mission-name-input"]',
    name
  );
}

/**
 * Submits the current dialog form by clicking the primary action button.
 */
export async function submitDialog(page: Page): Promise<void> {
  await page.click(
    'button:has-text("Save"), button:has-text("Create"), button:has-text("Submit"), [data-testid="dialog-submit-btn"]'
  );
}
