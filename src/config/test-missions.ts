/**
 * Mission templates used for automated mission creation tests.
 *
 * Missions are created against pre-saved environments (no zone creation required).
 * Each template defines a mission that can be submitted via the UI.
 */

export interface MissionTemplate {
  name: string;
  description: string;
  targetZoneType: string;
  /** Station name to select in the ng-select "Select Station" dropdown */
  station?: string;
  /** Action name to select in the ng-select "Select Action" dropdown */
  action?: string;
}

/**
 * Returns a fresh set of mission templates with unique timestamped names.
 * Call this inside each test to avoid name collisions between runs.
 */
export function getMissionTemplates(): MissionTemplate[] {
  const timestamp = Date.now();
  return [
    {
      name: `mission_restricted_${timestamp}_1`,
      description: 'Test mission targeting a restricted zone boundary',
      targetZoneType: 'RestrictedZone',
      station: process.env.TEST_STATION_1 || 'Station 1',
      action: process.env.TEST_ACTION_1 || 'Dock',
    },
    {
      name: `mission_avoidance_${timestamp}_2`,
      description: 'Test mission with avoidance zone route',
      targetZoneType: 'AvoidanceZone',
      station: process.env.TEST_STATION_2 || 'Station 2',
      action: process.env.TEST_ACTION_2 || 'Dock',
    },
    {
      name: `mission_oneway_${timestamp}_3`,
      description: 'Test mission through a one-way zone',
      targetZoneType: 'OneWayZone',
      station: process.env.TEST_STATION_3 || 'Station 3',
      action: process.env.TEST_ACTION_3 || 'Dock',
    },
  ];
}

