import request from 'supertest';
import app from '../app'; // Ensure to adjust import according to your app structure

describe('Health Checks', () => {
  test('GET /health returns healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('GET /version returns version info', async () => {
    const response = await request(app).get('/version');
    expect(response.status).toBe(200);
    expect(response.body.version).toBeDefined(); // Adjust according to the actual response
  });

  test('No alerts or errors on frontend after zone creation', async () => {
    // Implement zone creation logic, possibly using supertest as well
    const createZoneResponse = await request(app).post('/zones').send({ /* zone creation data */ });
    expect(createZoneResponse.status).toBe(201);

    // Check the frontend or UI after zone creation
    const frontendCheckResponse = await request(app).get('/frontend/check'); // Adjust this endpoint appropriately
    expect(frontendCheckResponse.body.alerts.length).toBe(0);
    expect(frontendCheckResponse.body.errors.length).toBe(0);
  });
});
