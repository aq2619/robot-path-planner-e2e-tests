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

export const MISSION_TEMPLATES: MissionTemplate[] = [
  {
    name: `mission_restricted_${Date.now()}`,
    description: 'Test mission targeting a restricted zone boundary',
    targetZoneType: 'RestrictedZone',
  },
  {
    name: `mission_avoidance_${Date.now()}`,
    description: 'Test mission with avoidance zone route',
    targetZoneType: 'AvoidanceZone',
  },
  {
    name: `mission_oneway_${Date.now()}`,
    description: 'Test mission through a one-way zone',
    targetZoneType: 'OneWayZone',
  },
];
