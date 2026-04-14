import { Page, expect } from '@playwright/test';
import { getMonitorUrl } from '../config/test-environments';

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
 * Opens the Create Mission dialog via the toolbar mission icon button.
 * The button contains an icon with class "node-icon-mission".
 */
export async function openCreateMissionDialog(page: Page): Promise<void> {
  await page.locator('lib-button:has(i.node-icon-mission) button').click();
  await page.waitForSelector(
    '[role="dialog"], .modal, [data-testid="create-mission-dialog"]',
    { timeout: 10000 }
  );
}

/**
 * Opens the Mission Library panel via the toolbar map management icon button.
 * The button contains an icon with class "node-icon-map_management".
 */
export async function openMissionLibrary(page: Page): Promise<void> {
  await page.locator('lib-button:has(i.node-icon-map_management) button').click();
}

/**
 * Switches from edit mode to monitor mode for the given environment.
 */
export async function switchToMonitorMode(page: Page, environmentId: string): Promise<void> {
  await page.goto(`${BASE_URL}${getMonitorUrl(environmentId)}`);
  await page.waitForSelector('canvas', { timeout: 30000 });
}

/**
 * Selects a mission from the Mission Library by name and executes it.
 * Assumes the Mission Library panel is already open (call openMissionLibrary first).
 *
 * Flow:
 * 1. Click the checkbox label for the mission name.
 * 2. If an Execute button is immediately visible, click it.
 * 3. Otherwise find the mission dropdown button (contains the UUID) and click it,
 *    then click Execute from the revealed options.
 */
export async function selectAndExecuteMission(page: Page, missionName: string): Promise<void> {
  // Select the mission by clicking its label in the library
  await page.locator(`label:has-text("${missionName}")`).click();

  // Check if Execute button is directly visible
  const executeBtn = page.locator('button:has-text("Execute")');
  if (await executeBtn.first().isVisible()) {
    await executeBtn.first().click();
    return;
  }

  // Otherwise open the mission dropdown (the button shows the mission UUID)
  const missionDropdown = page.locator('button.icon-small').first();
  await missionDropdown.click();

  // Click Execute from the dropdown options
  await page.locator('button:has-text("Execute")').first().click();
}

/**
 * Fills the mission name field in the Create Mission dialog.
 */
export async function fillMissionName(page: Page, name: string): Promise<void> {
  await page.fill(
    'input#name, input[placeholder="Enter mission name"]',
    name
  );
}

/**
 * Selects a station from the ng-select "Select Station" dropdown.
 * Must be called while the Create Mission dialog is open.
 */
export async function selectStation(page: Page, stationName: string): Promise<void> {
  await page.locator('ng-select#autocomplete').click();
  await page.waitForSelector('.ng-dropdown-panel', { timeout: 5000 });
  await page.locator('.ng-option').filter({ hasText: stationName }).first().click();
}

/**
 * Selects an action from the ng-select "Select Action" dropdown.
 * Must be called while the Create Mission dialog is open.
 */
export async function selectAction(page: Page, actionName: string): Promise<void> {
  await page.locator('ng-select#select-input').click();
  await page.waitForSelector('.ng-dropdown-panel', { timeout: 5000 });
  await page.locator('.ng-option').filter({ hasText: actionName }).first().click();
}

/**
 * Submits the current dialog form by clicking the primary action button.
 */
export async function submitDialog(page: Page): Promise<void> {
  const button = page.locator('button:has-text("Save")')
    .or(page.locator('button:has-text("Create")'))
    .or(page.locator('button:has-text("Submit")'))
    .or(page.locator('[data-testid="dialog-submit-btn"]'));
  await button.first().click();
}
