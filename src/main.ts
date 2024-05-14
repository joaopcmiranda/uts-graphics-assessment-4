import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.ts";
import * as THREE from "three";
import { AmbientLight, DirectionalLight } from "three";
import { Landscape } from "./heightMap/Landscape.ts";
import { createCoasterMesh } from "./coaster-mesh.js";
import { exampleCoasterPath } from "./example-coaster.js";
import { setupCartController, updateCartPosition } from "./cart-location.js";

const app = App();

const parameters = startUI((changes, _parameters) => {
  if ( // add here any changes that should not reset the app
    changes.paused === undefined
    && changes.fpv === undefined
    && changes.gravity === undefined
    && changes.friction === undefined
    && changes.liftSpeed === undefined
  ) {
    app.reset();
  }
  if (changes.fpv === false){
    app.resetCameraToDefault();
  }
});


const path = exampleCoasterPath();
path.arcLengthDivisions = 1000;

// var testBox = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

let cartProgress = 0;
const trackLength = path.getLength();

await app.setup(async ({ scene }) => {

  // Landscape
  const landscape = new Landscape(parameters);
  scene.add(landscape);

  // Adding an ambient light
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Adding a directional light
  const dirLight = new DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(6, 3, 0);
  scene.add(dirLight);

  if(parameters.showCoaster){
    setupCartController(path);

    const model = createCoasterMesh(path);
    scene.add(model);
  }
  const ambient = new THREE.AmbientLight(0x808080);
  scene.add(ambient);

  const light = new THREE.PointLight(0xffffff, 50);
  light.position.set(0, 15, 0);
  scene.add(light);


});


app.loop(({ clock, camera, orbit }) => {
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

  if (parameters.fpv) {
    cartProgress = updateCartPosition(path, parameters);
    let next_pos = path.getPoint(cartProgress / trackLength);
    // testBox.position.set(next_pos.x, next_pos.y, next_pos.z);
    camera.position.set(next_pos.x, next_pos.y + 5, next_pos.z);

    let view_direction = path.getTangent(cartProgress / trackLength);
    // view_direction.y = 0;
    view_direction.add(camera.position);

    orbit.target.set(view_direction.x, view_direction.y - 0.5, view_direction.z);
  }


});


