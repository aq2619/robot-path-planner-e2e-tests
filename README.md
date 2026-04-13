# Robot Path Planner E2E Tests

Automated end-to-end testing framework for the robot path planner frontend. Tests focus on pre-saved environments, mission workflows, alert monitoring, and API health validation.

## Architecture

- **Playwright** – browser automation and HTTP request testing
- **TypeScript** – type-safe test code
- **Axios** – API client utility
- **GitHub Actions** – CI/CD on release cycles

## Project Structure

```
robot-path-planner-e2e-tests/
├── .github/workflows/
│   └── e2e-tests.yml              # CI/CD – runs on release events
├── src/
│   ├── config/
│   │   ├── test-environments.ts   # Pre-saved environment IDs
│   │   └── test-missions.ts       # Mission templates
│   ├── tests/
│   │   ├── environment.spec.ts    # Environment loading & persistence
│   │   ├── missions.spec.ts       # Mission creation & queuing
│   │   ├── alerts.spec.ts         # Alert monitoring
│   │   └── health.spec.ts         # API health checks
│   └── utils/
│       ├── browser.ts             # Browser setup (Playwright)
│       ├── api-client.ts          # Axios API client
│       └── test-helpers.ts        # Shared test utilities
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

## One-Time Setup (Manual)

Before running tests you must have a saved test environment:

1. Navigate to `http://localhost:1000/node-frontend/maps/edit/<your-uuid>`
2. Add zone types: RestrictedZone, OneWayZone, AvoidanceZone, etc.
3. Save the environment
4. Copy the UUID from the URL

Update `src/config/test-environments.ts` with your environment ID, or set the `PRIMARY_ENV_ID` environment variable.

## Installation

```bash
npm install
npx playwright install --with-deps chromium
```

## Running Tests

```bash
# Run all E2E tests
npm test

# Run a specific suite
npm run test:health
npm run test:environment
npm run test:missions
npm run test:alerts

# Run in headed mode (watch the browser)
npm run test:headed

# View the HTML report
npm run test:report
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `BASE_URL` | `http://localhost:1000` | Frontend base URL |
| `API_BASE_URL` | `http://localhost:1000/node-api/edge` | Backend API base URL |
| `PRIMARY_ENV_ID` | `511624c3-...` | Pre-saved environment UUID |

## Test Suites

### `health.spec.ts` – API Health & Endpoint Validation
- `GET /health` – system health check
- `GET /version` – API version information
- `GET /missions` – list queued/completed missions
- All critical endpoints respond without 5xx errors

### `environment.spec.ts` – Environment Loading & Persistence
- Load a pre-saved environment from the map editor URL
- Verify the map canvas renders
- Reload and confirm zones are still present

### `missions.spec.ts` – Mission Creation & Queuing
- Open the Create Mission dialog
- Create missions targeting different zone types
- Verify missions appear in the missions list
- Validate mission queue via API

### `alerts.spec.ts` – Alert Monitoring
- No warnings or errors on environment load
- Healthy alerts section state throughout operations
- No alerts produced after UI interactions

## CI/CD

Tests run automatically on every GitHub release (`published` event). You can also trigger them manually via **Actions → Run workflow**.

Reports and artifacts are retained for 30 days.

## Notes

- Zone creation is **not automated** – zones are pre-configured in saved environments
- Tests are designed to run against a live instance of the robot path planner
- UI selectors use flexible matching; update `src/utils/test-helpers.ts` if the UI changes
