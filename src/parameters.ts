export type Parameters = {
  paused: boolean;
  wireframe: boolean;

  xLength: number;
  zLength: number;

  polyCount: number;

  hillDensity: number;
  hillScale: number;

  roughness: number;

}

export const parametersLimits: { [key: string] : {min: number, max: number, precision?: number} } = {

  // Height Map
  xLength: { min: 10, max: 1000, precision: 0 },
  zLength: { min: 10, max: 1000, precision: 0 },

  polyCount: { min: 1, max: 100, precision: 0 },

  hillDensity: { min: 1, max: 20, precision: 0 },
  hillScale: { min: 1, max: 100, precision: 0 },

  roughness: { min: 1, max: 10, precision: 0 }

};

export const parametersDefaults: Parameters = {
  // Simulation
  paused: false,
  wireframe: false,

  // Height Map
  xLength: 100,
  zLength: 100,

  polyCount: 10,

  hillDensity: 10,
  hillScale: 10,

  roughness: 5

};
