// Zone Type Definitions

type RestrictedZone = {
    name: string;
    area: string;
    restrictions: string;
};

type OneWayZone = {
    name: string;
    direction: string;
};

type AvoidanceZone = {
    name: string;
    reason: string;
};

type MaxCapacityZone = {
    name: string;
    capacity: number;
};

type MaxVelocityZone = {
    name: string;
    maxVelocity: number;
};

type NoPassingZone = {
    name: string;
};

// Helper functions for generating zone names
function generateZoneName(type: string, id: number): string {
    const timestamp = new Date(1681383625000).toISOString().replace(/[-:.]/g, '_').split('T').join('_');
    return `test_zone_${type}_${timestamp}_${id}`;
}

export { RestrictedZone, OneWayZone, AvoidanceZone, MaxCapacityZone, MaxVelocityZone, NoPassingZone, generateZoneName };// Zone Type Definitions

export type RestrictedZone = {
  id: string;
  name: string;
  coordinates: number[][]; // List of [x, y] points
};

export type OneWayZone = {
  id: string;
  name: string;
  coordinates: number[][];
};

export type AvoidanceZone = {
  id: string;
  name: string;
  coordinates: number[][];
};

// Naming convention function
export const getZoneName = (type: string, id: string): string => {
  const timestamp = new Date().toISOString().replace(/[-:T\.!Z]/g, '').slice(0, 14);
  return `test_zone_${type}_${timestamp}_${id}`;
};

// Helper for creating polygons
export const createPolygon = (points: number[][]): string => {
  if (points.length < 3) throw new Error('A polygon must have at least 3 points.');
  return `POLYGON((${points.map(point => point.join(' ')).join(', ')}))`;
};

// Zone Configuration Objects
export const restrictedZoneConfig = (id: string, name: string, coordinates: number[][]): RestrictedZone => ({
  id,
  name,
  coordinates,
});

export const oneWayZoneConfig = (id: string, name: string, coordinates: number[][]): OneWayZone => ({
  id,
  name,
  coordinates,
});

export const avoidanceZoneConfig = (id: string, name: string, coordinates: number[][]): AvoidanceZone => ({
  id,
  name,
  coordinates,
});
