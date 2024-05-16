import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.ts";
import { AmbientLight, DirectionalLight } from "three";
import { exampleCoasterPath } from "./example-coaster.js";
import { setupCartController, updateCartPosition } from "./cart-location.js";
import { Props } from "./ui/parameters.ts";
import { Landscape } from "./heightMap/Landscape.ts";
import { CoasterMesh } from "./tracks/CoasterMesh.ts";

const app = App();

let landscape: Landscape;

const uiProps: Props = {
  onGenerateHeightMap: () => {
    landscape.regenerateHeightMap();
  }
};

const parameters = startUI(uiProps, (changes, _parameters, field) => {

  // Restart everything in case of a reset
  if (field?.requiresReset) {
    app.reset();
  }

  // Reset the camera to default if fpv is disabled
  if (field?.name === 'First Person View' && !_parameters.coaster.fpv) {
    app.resetCameraToDefault();
  }

  // Update the models to show/hide wireframe if it changes
  if (changes.wireframe !== undefined) {
    landscape.setWireframe(changes.wireframe);
  }

  // Update the landscape's geometry if the polycount or scale changes
  if (field?.name === 'Poly Count'
    || field?.name === 'Hill Scale') {
    console.log("Changes")
    landscape.updateGeometry();
  }
});

// Landscape setup
landscape = new Landscape(parameters.landscape, parameters.wireframe);


// Initial coaster track setup
const initialCoasterPath = exampleCoasterPath();
initialCoasterPath.arcLengthDivisions = 1000;


let cartProgress = 0;
const trackLength = initialCoasterPath.getLength();


const coasterTracks = new CoasterMesh(initialCoasterPath, parameters.coaster);

/**
 * Start function, runs once
 */
await app.start(async ({ scene }) => {


  // Add the meshes to the scene
  scene.add(landscape);

  if (parameters.coaster.enabled) {
    setupCartController(initialCoasterPath);

    scene.add(coasterTracks);
  }

  // Adding an ambient light
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Adding a directional light
  const dirLight = new DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(6, 3, 0);
  scene.add(dirLight);
});


/**
 * Update function, runs every frame, use clock and deltaTime for time
 */
app.update(({ clock, camera, orbit }) => {
  if (parameters.paused) {
    if (clock.running) {
      clock.stop()
    }
    return
  } else {
    if (!clock.running) {
      clock.start()
    }
  }

  coasterTracks.update();
  // fpv.update();
  // landscape.update();


  if (parameters.coaster.fpv) {
    cartProgress = updateCartPosition(initialCoasterPath, parameters.coaster);
    let next_pos = initialCoasterPath.getPoint(cartProgress / trackLength);
    // testBox.position.set(next_pos.x, next_pos.y, next_pos.z);
    camera.position.set(next_pos.x, next_pos.y + 5, next_pos.z);

    let view_direction = initialCoasterPath.getTangent(cartProgress / trackLength);
    // view_direction.y = 0;
    view_direction.add(camera.position);

    orbit.target.set(view_direction.x, view_direction.y - 0.5, view_direction.z);
  }
});


