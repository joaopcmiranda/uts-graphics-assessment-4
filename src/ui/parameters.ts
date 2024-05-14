export type Parameters = {
  paused: boolean;
  wireframe: boolean;
  showCoaster: boolean;
  fpv: boolean;
  xLength: number;
  zLength: number;
  polyCount: number;
  hillDensity: number;
  hillScale: number;
  roughness: number;
  gravity: number;
  friction: number;
  liftSpeed: number;
}

export const fields: { [key in keyof Parameters]: Field} = {
  paused: {
    type: "boolean",
    name: "Paused Simulation",
    default: false
  },

  showCoaster:{
    type: "boolean",
    name: "Show Coaster",
    folder: "Coaster",
    default: true
  },
  fpv: {
    type: "boolean",
    name: "First Person View",
    folder: "Coaster",
    default: false
  },
  gravity: {
    type: "number",
    name: "Gravity",
    folder: "Coaster",
    min: 0,
    max: 200,
    step: 0.1,
    default: 10
  },
  friction: {
    type: "number",
    name: "Friction",
    folder: "Coaster",
    min: 0,
    max: 0.1,
    step: 0.001,
    default: 0.005
  },
  liftSpeed: {
    type: "number",
    name: "Lift Speed",
    folder: "Coaster",
    min: 0,
    max: 20,
    step: 0.1,
    default: 10
  },

  wireframe: {
    type: "boolean",
    name: "Wireframe",
    folder: "Terrain",
    default: false
  },
  xLength: {
    type: "number",
    name: "X Length",
    folder: "Terrain",
    min: 10,
    max: 1000,
    step: 1,
    default: 100
  },
  zLength: {
    type: "number",
    name: "Z Length",
    folder: "Terrain",
    min: 10,
    max: 1000,
    step: 1,
    default: 100
  },

  polyCount: {
    type: "number",
    name: "Poly Count",
    folder: "Terrain",
    min: 1,
    max: 100,
    step: 1,
    default: 10
  },

  hillDensity: {
    type: "number",
    name: "Hill Density",
    folder: "Terrain",
    min: 1,
    max: 20,
    step: 1,
    default: 10
  },
  hillScale: {
    type: "number",
    name: "Hill Scale",
    folder: "Terrain",
    min: 1,
    max: 100,
    step: 1,
    default: 10
  },

  roughness: {
    type: "number",
    name: "Roughness",
    folder: "Terrain",
    min: 1,
    max: 10,
    step: 1,
    default: 5
  }
}

const getDefaultParams = (): Parameters => {
  return Object.keys(fields).reduce((params, key) => {
    (params as Record<string, string | boolean | number | null>)[key] = fields[key as keyof Parameters].default;
    return params;
  }, {} as Parameters);
}

export const _parameters: Parameters = getDefaultParams();

export type Field = {
  name: string;
  folder?: string;
} & ({
  type: "boolean",
  default: boolean;
} | {
  type: "number",
  min?: number;
  max?: number;
  step?: number;
  default: number;
} | {
  type: "select",
  options: (string | number)[];
  default: string | number;
} | {
  type: "string",
  default: string;
} | {
  type: "color",
  default: string;
} | {
  type: "button",
  onClick: (parameters: Parameters) => void;
  default: null;
});
