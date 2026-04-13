import { test, expect } from '@playwright/test';

test.describe('Zone Creation', () => {
    const zoneName = `TestZone-${new Date().toISOString()}`;

    test('should create a zone and validate it', async ({ page }) => {
        // Open Create Zone dialog
        await page.click('button#create-zone');

        // Fill in zone name
        await page.fill('input[name="zoneName"]', zoneName);

        // Select zone type (assuming there is a select dropdown for zone type)
        await page.selectOption('select[name="zoneType"]', 'Type1');

        // Draw polygon on map (mock implementation)
        await page.mouse.move(100, 100);
        await page.mouse.down();
        await page.mouse.move(150, 150);
        await page.mouse.move(200, 100);
        await page.mouse.move(100, 100); // Closing the polygon
        await page.mouse.up();

        // Save zone
        await page.click('button#save-zone');

        // Verify zone appears on map
        const zoneExists = await page.isVisible(`text=${zoneName}`);
        expect(zoneExists).toBe(true);

        // Validate zone creation via API
        const response = await page.request.get(`/api/zones?name=${zoneName}`);
        expect(response.status()).toBe(200);
        const zoneData = await response.json();
        expect(zoneData).toHaveProperty('name', zoneName);
    });
});
