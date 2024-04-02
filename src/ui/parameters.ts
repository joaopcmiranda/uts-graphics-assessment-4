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

export const fields: Record<keyof Parameters, Field> = {
  paused: {
    type: "boolean",
    name: "Paused Simulation",
    default: false
  },
  wireframe: {
    type: "boolean",
    name: "Wireframe",
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
