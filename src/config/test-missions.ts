/**
 * Mission templates used for automated mission creation tests.
 *
 * Missions are created against pre-saved environments (no zone creation required).
 * Each template defines a mission that can be submitted via the UI.
 *
 * `station` must match a station name available in the pre-saved environment.
 * `action`  must match an action name available in the pre-saved environment.
 * Override the defaults via the TEST_STATION and TEST_ACTION environment variables.
 */

export interface MissionTemplate {
  name: string;
  description: string;
  targetZoneType: string;
  station: string;
  action: string;
}

/**
 * Returns a fresh set of mission templates with unique timestamped names.
 * Call this inside each test to avoid name collisions between runs.
 */
export function getMissionTemplates(): MissionTemplate[] {
  const timestamp = Date.now();
  const station = process.env.TEST_STATION || 'Station A';
  const action = process.env.TEST_ACTION || 'Pick';
  return [
    {
      name: `mission_restricted_${timestamp}_1`,
      description: 'Test mission targeting a restricted zone boundary',
      targetZoneType: 'RestrictedZone',
      station,
      action,
    },
    {
      name: `mission_avoidance_${timestamp}_2`,
      description: 'Test mission with avoidance zone route',
      targetZoneType: 'AvoidanceZone',
      station,
      action,
    },
    {
      name: `mission_oneway_${timestamp}_3`,
      description: 'Test mission through a one-way zone',
      targetZoneType: 'OneWayZone',
      station,
      action,
    },
  ];
}

