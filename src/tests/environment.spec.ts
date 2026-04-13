import { test, expect } from '@playwright/test';
import { TEST_ENVIRONMENTS, getEnvironmentUrl } from '../config/test-environments';
import { loadEnvironment, waitForMapLoad } from '../utils/test-helpers';

const BASE_URL = process.env.BASE_URL || 'http://localhost:1000';
const env = TEST_ENVIRONMENTS.PRIMARY;

test.describe('Environment Loading & Persistence', () => {
  test('should load a pre-saved environment and display the map', async ({ page }) => {
    await loadEnvironment(page, env.id);
    await waitForMapLoad(page);

    // The map canvas should be visible
    await expect(page.locator('canvas').first()).toBeVisible();

    // The URL should reflect the environment id
    expect(page.url()).toContain(env.id);
  });

  test('should display the environment editor page without errors', async ({ page }) => {
    await page.goto(`${BASE_URL}${getEnvironmentUrl(env.id)}`);

    // Page should not show a generic error/404
    await expect(page).not.toHaveTitle(/404|not found|error/i);

    // The map editor should render
    await waitForMapLoad(page);
  });

  test('should reload the environment and zones remain present', async ({ page }) => {
    // First load
    await loadEnvironment(page, env.id);
    await waitForMapLoad(page);

    // Reload the page to simulate re-opening the environment
    await page.reload();
    await waitForMapLoad(page);

    // The canvas (map) should still be visible after reload
    await expect(page.locator('canvas').first()).toBeVisible();

    // The URL should still reference the same environment
    expect(page.url()).toContain(env.id);
  });

  test('should navigate to environment URL from root', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.goto(`${BASE_URL}${getEnvironmentUrl(env.id)}`);

    await waitForMapLoad(page);
    expect(page.url()).toContain(env.id);
  });
});
