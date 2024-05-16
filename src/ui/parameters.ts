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
    heightMap: {
      regenerate: () => void;
      xLength: number;
      zLength: number;
      hillDensity: number;
      roughness: number;
    },
    scale: number;
    polyCount: number;
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
  onGenerateHeightMap: () => void;
}

/**
 * fields definition for the GUI
 *
 * This is the object that defines the fields that will be displayed in the GUI.
 *
 * @param props - Props passed to the GUI for interaction
 * e.g. { onGenerateHeightMap: () => void }
 */
export const fields = (props: Props): GUIFields<Parameters> => ({
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
      polyCount: {
        type: "number",
        name: "Poly Count",
        min: 1,
        max: 100,
        step: 1,
        default: 10,
        slowUpdate: true
      },
      scale: {
        type: "number",
        name: "Hill Scale",
        min: 1,
        max: 100,
        step: 1,
        default: 10,
        slowUpdate: true
      },
      heightMap: {
        type: "folder",
        name: "Height Map",
        children: {
          regenerate: {
            type: "button",
            name: "Regenerate",
            onClick: () => {
              props.onGenerateHeightMap();
            }
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
          hillDensity: {
            type: "number",
            name: "Hill Density",
            min: 1,
            max: 20,
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
      },
    }
  }
})


