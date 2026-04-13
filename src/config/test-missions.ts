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
    },
    {
      name: `mission_avoidance_${timestamp}_2`,
      description: 'Test mission with avoidance zone route',
      targetZoneType: 'AvoidanceZone',
    },
    {
      name: `mission_oneway_${timestamp}_3`,
      description: 'Test mission through a one-way zone',
      targetZoneType: 'OneWayZone',
    },
  ];
}

