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
    // Accept either { status: 'healthy' } or { status: 'ok' } conventions
    expect(body).toHaveProperty('status');
    expect(String(body.status).toLowerCase()).toMatch(/healthy|ok/);
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

