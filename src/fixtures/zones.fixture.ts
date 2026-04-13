// src/fixtures/zones.fixture.ts

export const RestrictedZone = [
    { x: 1, y: 1 },
    { x: 1, y: 5 },
    { x: 5, y: 5 },
    { x: 5, y: 1 }
];

export const OneWayZone = [
    { x: 2, y: 2 },
    { x: 2, y: 4 },
    { x: 4, y: 4 },
    { x: 4, y: 2 }
];

export const AvoidanceZone = [
    { x: 0, y: 0 },
    { x: 0, y: 3 },
    { x: 3, y: 3 },
    { x: 3, y: 0 },
    { x: 1.5, y: -1 }
];
