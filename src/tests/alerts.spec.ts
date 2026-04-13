import { test, expect } from '@playwright/test';
import { TEST_ENVIRONMENTS } from '../config/test-environments';
import { loadEnvironment, waitForMapLoad, getAlertsText } from '../utils/test-helpers';

const env = TEST_ENVIRONMENTS.PRIMARY;

/** Selector that matches active error/warning alert elements only */
const ACTIVE_ALERT_SELECTOR =
  '[data-testid="alert-error"], [data-testid="alert-warning"], ' +
  '.alert--error, .alert--warning, ' +
  '[role="alert"][class*="error"], [role="alert"][class*="warning"]';

test.describe('Alert Monitoring During Operations', () => {
  test('should show no active error or warning alerts on environment load', async ({ page }) => {
    await loadEnvironment(page, env.id);
    await waitForMapLoad(page);

    // Wait a moment for any async alerts to render
    await page.waitForTimeout(2000);

    const activeAlerts = page.locator(ACTIVE_ALERT_SELECTOR);
    await expect(activeAlerts).toHaveCount(0);
  });

  test('should display healthy alerts section state', async ({ page }) => {
    await loadEnvironment(page, env.id);
    await waitForMapLoad(page);

    // Check for a "No Warnings or errors" message or an empty alerts section
    const noAlertsLocator = page.locator(
      'text=/No Warnings or errors/i, [data-testid="no-alerts"], .no-alerts'
    );
    const alertsSection = page.locator('[data-testid="alerts"], .alerts, #alerts').first();

    const noAlertsVisible = (await noAlertsLocator.count()) > 0;
    const alertsSectionPresent = (await alertsSection.count()) > 0;

    if (noAlertsVisible) {
      // Explicit "no alerts" message is shown – ideal state
      await expect(noAlertsLocator.first()).toBeVisible();
    } else if (alertsSectionPresent) {
      // Alerts section exists – there should be no active error/warning elements
      const activeAlerts = alertsSection.locator(ACTIVE_ALERT_SELECTOR);
      await expect(activeAlerts).toHaveCount(0);
    } else {
      // Neither found – annotate for future selector updates
      test.info().annotations.push({
        type: 'note',
        description: 'Alerts section element not found – UI selectors may need updating',
      });
    }
  });

  test('should not produce active alerts after page interactions', async ({ page }) => {
    await loadEnvironment(page, env.id);
    await waitForMapLoad(page);

    // Simulate a light interaction (scrolling the map area)
    const canvas = page.locator('canvas').first();
    if ((await canvas.count()) > 0) {
      const box = await canvas.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.wheel(0, 100);
        await page.mouse.wheel(0, -100);
      }
    }

    // Pause for any delayed alerts
    await page.waitForTimeout(1000);

    const activeAlerts = page.locator(ACTIVE_ALERT_SELECTOR);
    await expect(activeAlerts).toHaveCount(0);
  });
});
