import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.ts";
import { exampleCoasterPath } from "./example-coaster.js";
import { setupCartController, updateCartPosition } from "./cart-location.js";
import { Props } from "./ui/parameters.ts";
import { CoasterMesh } from "./tracks/CoasterMesh.ts";
import { Terrain } from "./terrain/Terrain.ts";
import { SkyBox } from "./skybox/SkyBox.ts";
import { Lighting } from "./lighting/Lighting.ts";


(async () => {

// App initialization
  console.log('App initialization...');
  const app = App();

// UI initialization
  console.log('UI initialization...');
  const uiProps: Props = {};

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
      terrain.material.wireframe = changes.wireframe;
    }
  });

// Initial coaster track setup
  console.log('Initial coaster track setup...');
  const initialCoasterPath = exampleCoasterPath();
  initialCoasterPath.arcLengthDivisions = 1000;

  let cartProgress = 0;
  const trackLength = initialCoasterPath.getLength();

  const coasterTracks = new CoasterMesh(initialCoasterPath, parameters.coaster);

// Lighting setup
  console.log('Lighting setup...');
  const lighting = new Lighting(parameters.lighting);

// Terrain setup
  console.log('Terrain setup...');
  const terrain = new Terrain(parameters.landscape);

  console.log('Starting app...');

  /**
   * Start function, runs once
   */
  await app.start(async ({ scene }) => {

    if (parameters.coaster.enabled) {
      console.log('Coaster cart setup...');
      setupCartController(initialCoasterPath);

      scene.add(coasterTracks);
    }

    // Skybox
    console.log('Skybox setup...');
    const skybox = new SkyBox();
    scene.add(skybox);

    // Lighting
    console.log('Adding lighting...');
    scene.add(lighting);

    // rotate terrain to face up
    console.log('Rotating terrain to face up...');
    terrain.lookAt(0, 1, 0);
    scene.add(terrain);
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

    lighting.updateParameters(parameters.lighting);
    terrain.updateParameters(parameters.landscape);


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

})().then();
