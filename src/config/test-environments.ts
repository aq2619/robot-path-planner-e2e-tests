/**
 * Pre-saved environment IDs for testing.
 *
 * Setup (one-time manual step):
 * 1. Navigate to http://localhost:1000/node-frontend/maps/edit/{environment_id}
 * 2. Add the desired zone types (RestrictedZone, OneWayZone, AvoidanceZone, etc.)
 * 3. Save the environment
 * 4. Copy the environment_id from the URL and add it below
 */

export interface TestEnvironment {
  id: string;
  name: string;
  description: string;
}

export const TEST_ENVIRONMENTS: Record<string, TestEnvironment> = {
  PRIMARY: {
    id: process.env.PRIMARY_ENV_ID || '511624c3-1e4e-4d2c-a074-12725e3327e2',
    name: 'Primary Test Environment',
    description: 'Main environment with all zone types pre-configured',
  },
};

/**
 * Returns the URL path for editing/viewing an environment.
 */
export const getEnvironmentUrl = (environmentId: string): string =>
  `/node-frontend/maps/edit/${environmentId}`;

/**
 * Returns the URL path for monitoring an environment.
 */
export const getMonitorUrl = (environmentId: string): string =>
  `/node-frontend/maps/monitor/${environmentId}`;
