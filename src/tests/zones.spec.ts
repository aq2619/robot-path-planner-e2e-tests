import { test, expect } from '@playwright/test';

// Test case: Opening Create Zone dialog
 test('Open Create Zone dialog', async ({ page }) => {
     await page.goto('http://your-application-url'); // Replace with your app's URL
     await page.click('text=Create Zone');
     const dialogVisible = await page.isVisible('#create-zone-dialog');
     expect(dialogVisible).toBe(true);
 });

// Test case: Filling zone name with repeatable naming convention
 test('Fill zone name', async ({ page }) => {
     await page.fill('#zone-name', 'Zone 1'); // Adjust selector as needed
 });

// Test case: Selecting zone type
 test('Select zone type', async ({ page }) => {
     await page.selectOption('#zone-type', 'Residential'); // Adjust selector and value as needed
 });

// Test case: Drawing polygon with 3+ points on the map
 test('Draw polygon on map', async ({ page }) => {
     await page.click('text=Draw'); // Click on draw button
     await page.mouse.move(100, 100);
     await page.mouse.down();
     await page.mouse.move(200, 100);
     await page.mouse.move(200, 200);
     await page.mouse.move(100, 200);
     await page.mouse.move(100, 100);
     await page.mouse.up();
 });

// Test case: Saving the zone
 test('Save zone', async ({ page }) => {
     await page.click('text=Save');
     const successMessageVisible = await page.isVisible('text=Zone saved successfully!');
     expect(successMessageVisible).toBe(true);
 });

// Test case: Verifying zone appears on map
 test('Verify zone appears on map', async ({ page }) => {
     const zoneVisible = await page.isVisible('text=Zone 1'); // Adjust as necessary
     expect(zoneVisible).toBe(true);
 });

// Test case: Validating zone via API endpoint
 test('Validate zone via API endpoint', async () => {
     const response = await fetch('http://your-api-endpoint/zones/Zone 1'); // Replace with your API endpoint
     expect(response.ok).toBe(true);
     const zone = await response.json();
     expect(zone.name).toBe('Zone 1');
 });
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
