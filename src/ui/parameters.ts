import { getDefaultValueFromFields, GUIFields } from "./Field.ts";

export type Parameters = {
  paused: boolean;
  coaster: {
    enabled: boolean;
    fpv: boolean;
    gravity: number;
    friction: number;
    liftSpeed: number;
  },
  landscape: {
    regenerate: () => void;
    wireframe: string;
    xLength: number;
    zLength: number;
    polyCount: number;
    hillDensity: number;
    hillScale: number;
    roughness: number;
  }
}

export const fields: GUIFields<Parameters> = {
  paused: {
    type: "boolean",
    name: "Paused Simulation",
    default: false
  },

  coaster: {
    name: "Coaster",
    type: "folder",
    children: {
      enabled: {
        type: "boolean",
        name: "Show Coaster",
        default: true
      },
      fpv: {
        type: "boolean",
        name: "First Person View",
        default: false
      },
      gravity: {
        type: "number",
        name: "Gravity",
        min: 0,
        max: 200,
        step: 0.1,
        default: 10
      },
      friction: {
        type: "number",
        name: "Friction",
        min: 0,
        max: 0.1,
        step: 0.001,
        default: 0.005
      },
      liftSpeed: {
        type: "number",
        name: "Lift Speed",
        min: 0,
        max: 20,
        step: 0.1,
        default: 10
      }
    }
  },

  landscape: {
    name: "Landscape",
    type: "folder",
    children: {
      regenerate:{
        type: "button",
        name: "Regenerate Height Map",
        onClick: (_: Parameters['landscape']) => {
          console.log("Regenerate");
        }
      },
      wireframe: {
        type: "boolean",
        name: "Wireframe",
        default: false
      },
      xLength: {
        type: "number",
        name: "X Length",
        min: 10,
        max: 1000,
        step: 1,
        default: 100
      },
      zLength: {
        type: "number",
        name: "Z Length",
        min: 10,
        max: 1000,
        step: 1,
        default: 100
      },

      polyCount: {
        type: "number",
        name: "Poly Count",
        min: 1,
        max: 100,
        step: 1,
        default: 10
      },

      hillDensity: {
        type: "number",
        name: "Hill Density",
        min: 1,
        max: 20,
        step: 1,
        default: 10
      },
      hillScale: {
        type: "number",
        name: "Hill Scale",
        min: 1,
        max: 100,
        step: 1,
        default: 10
      },
      roughness: {
        type: "number",
        name: "Roughness",
        min: 1,
        max: 10,
        step: 1,
        default: 5
      }
    }
  }
}

export const _parameters: Parameters = getDefaultValueFromFields(fields);

