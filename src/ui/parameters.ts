import { GUIFields } from "./Field.ts";

/**
 *  Type for the parameters object
 *
 *  use this to define the parameters used by the application.
 *  Available types are:
 *  - boolean
 *  - number
 *  - select (string | number)
 *  - string
 *  - color (string)
 *  - button (function)
 *  - folder (nested object)
 */
export type Parameters = {
  paused: boolean;
  wireframe: boolean;
  coaster: {
    tracks: {
      halfTrackWidth: number;
      trackRadius: number;
      crossbarSpacing: number;
      crossbarRadius: number;
      supportSpacing: number;
      supportRadius: number;
      supportWidth: number;
    },
    enabled: boolean;
    fpv: boolean;
    gravity: number;
    friction: number;
    liftSpeed: number;
  },
  landscape: {
    normalMap: boolean;
    xLength: number;
    zLength: number;
    hillDensity: number;
    roughness: number;
    scale: number;
    polyCount: number;
    generations: number;
    amplitudeDecayRate: number;
    offset: number;
    edgeOffset: number;
    edgeOffsetThreshold: number;
    uTextureDensity: number;
    grassSeed: number;
    terrainSeed: number;
    stoneThreshold: number;
    fogDistance: number;
  },
  lighting:{
    ambientLight: {
      color: string;
      intensity: number;
    },
    sun: {
      color: string;
      intensity: number;
      cardinalAngle: number;
      heightAngle: number;
    }
  }
}


/**
 *  Props passed to the GUI for interaction
 *
 * Use these on your buttons or other interactive elements
 *
 * Notes:
 * - 2 way binding is done by the GUI
 * - this is passed only once at the start of the UI.
 * - Use only parameters to update the GUI
 */
export type Props = {
}

/**
 * fields definition for the GUI
 *
 * This is the object that defines the fields that will be displayed in the GUI.
 *
 * @param _props - Props passed to the GUI for interaction
 * e.g. { onGenerateHeightMap: () => void }
 */
export const fields = (_props: Props): GUIFields<Parameters> => ({
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

  coaster: {
    name: "Coaster",
    type: "folder",
    children: {
      tracks: {
        name: "Tracks",
        type: "folder",
        children: {
          halfTrackWidth: {
            type: "number",
            name: "Half Track Width",
            min: 0.1,
            max: 5,
            step: 0.1,
            default: 1
          },
          trackRadius: {
            type: "number",
            name: "Track Radius",
            min: 0.1,
            max: 2,
            step: 0.1,
            default: 0.3
          },
          crossbarSpacing: {
            type: "number",
            name: "Crossbar Spacing",
            min: 0.1,
            max: 10,
            step: 0.1,
            default: 5
          },
          crossbarRadius: {
            type: "number",
            name: "Crossbar Radius",
            min: 0.1,
            max: 1,
            step: 0.1,
            default: 0.2
          },
          supportSpacing: {
            type: "number",
            name: "Support Spacing",
            min: 0,
            max: 30,
            step: 1,
            default: 8
          },
          supportRadius: {
            type: "number",
            name: "Support Radius",
            min: 0.1,
            max: 1,
            step: 0.1,
            default: 0.2
          },
          supportWidth: {
            type: "number",
            name: "Support Width",
            min: 0.1,
            max: 10,
            step: 0.1,
            default: 5
          }
        }
      },
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
      normalMap: {
        type: "boolean",
        name: "Normal Map",
        default: false
      },
      terrainSeed: {
        type: "number",
        name: "Terrain Seed",
        default: 43758.5453,
        slowUpdate: true
      },
      xLength: {
        type: "number",
        name: "X Length",
        min: 100,
        max: 2000,
        step: 100,
        default: 2000,
        slowUpdate: true
      },
      zLength: {
        type: "number",
        name: "Z Length",
        min: 100,
        max: 2000,
        step: 100,
        default: 2000,
        slowUpdate: true
      },
      polyCount: {
        type: "number",
        name: "Poly Count",
        min: 0.1,
        max: 2,
        step: 0.1,
        default: 1,
        slowUpdate: true
      },
      scale: {
        type: "number",
        name: "Hill Scale",
        min: 1,
        max: 1000,
        step: 1,
        default: 200,
        slowUpdate: true
      },
      hillDensity: {
        type: "number",
        name: "Hill Density",
        min: 1,
        max: 20,
        step: 1,
        default: 2,
        slowUpdate: true
      },
      roughness: {
        type: "number",
        name: "Roughness",
        min: 1,
        max: 2,
        step: 0.01,
        default: 1.5,
        slowUpdate: true
      },
      generations: {
        type: "number",
        name: "Generations",
        min: 1,
        max: 100,
        step: 1,
        default: 20,
        slowUpdate: true
      },
      amplitudeDecayRate: {
        type: "number",
        name: "Amplitude Decay Rate",
        min: 1,
        max: 5,
        step: 0.1,
        default: 1.5,
        slowUpdate: true
      },
      offset: {
        type: "number",
        name: "Offset",
        min: -1000,
        max: 1000,
        step: 1,
        default: -170,
        slowUpdate: true
      },
      edgeOffset: {
        type: "number",
        name: "Edge Offset",
        min: 0,
        max: 1000,
        step: 1,
        default: 200,
        slowUpdate: true
      },
      edgeOffsetThreshold: {
        type: "number",
        name: "Edge Offset Threshold",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.4,
        slowUpdate: true
      },
      uTextureDensity: {
        type: "number",
        name: "Texture scale",
        min: 1,
        max: 1000,
        step: 1,
        default: 100,
        slowUpdate: true
      },
      grassSeed: {
        type: "number",
        name: "Grass placement seed",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.1,
        slowUpdate: true
      },
      stoneThreshold: {
        type: "number",
        name: "Stone Threshold",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.07,
        slowUpdate: true
      },
      fogDistance: {
        type: "number",
        name: "Fog Distance",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.9,
        slowUpdate: true
      }
    }
  },
  lighting: {
    name: "Lighting",
    type: "folder",
    children: {
      ambientLight: {
        name: "Ambient Light",
        type: "folder",
        children: {
          color: {
            type: "color",
            name: "Color",
            default: "#ffffff"
          },
          intensity: {
            type: "number",
            name: "Intensity",
            min: 0,
            max: 1,
            step: 0.01,
            default: 0.7
          }
        }
      },
      sun: {
        name: "Sun",
        type: "folder",
        children: {
          color: {
            type: "color",
            name: "Color",
            default: "#ffffff"
          },
          intensity: {
            type: "number",
            name: "Intensity",
            min: 0,
            max: 1,
            step: 0.01,
            default: 1
          },
          cardinalAngle: {
            type: "number",
            name: "Cardinal Angle",
            min: 0,
            max: 360,
            step: 1,
            default: 0
          },
          heightAngle: {
            type: "number",
            name: "Height Angle",
            min: 0,
            max: 90,
            step: 1,
            default: 45
          }
        }
      }
    }
  }
})


