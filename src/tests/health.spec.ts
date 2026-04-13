import { test, expect } from '@playwright/test';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:1000/node-api/edge';

test.describe('API Health & Endpoint Validation', () => {
  test('GET /health – should return a successful response', async ({ request }) => {
    const response = await request.get(`${API_BASE}/health`);
    expect(response.status()).toBe(200);
  });

  test('GET /health – response should indicate healthy status', async ({ request }) => {
    const response = await request.get(`${API_BASE}/health`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    // The health endpoint returns a { checks: [...] } structure where each entry has a `health` field
    expect(body).toHaveProperty('checks');
    expect(Array.isArray(body.checks)).toBe(true);
    expect(body.checks.length).toBeGreaterThan(0);
    // All checks should report HEALTHY
    for (const check of body.checks) {
      expect(check.health).toBe('HEALTHY');
    }
  });

  test('GET /version – should return version information', async ({ request }) => {
    const response = await request.get(`${API_BASE}/version`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('version');
  });

  test('GET /missions – should return a list of missions', async ({ request }) => {
    const response = await request.get(`${API_BASE}/missions`);
    expect([200, 204]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
    }
  });

  test('all critical endpoints should respond without 5xx errors', async ({ request }) => {
    const endpoints = ['/health', '/version', '/missions'];

    for (const endpoint of endpoints) {
      const response = await request.get(`${API_BASE}${endpoint}`);
      expect(response.status()).toBeLessThan(500);
    }
  });
});

