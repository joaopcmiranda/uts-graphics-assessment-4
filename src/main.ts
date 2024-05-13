import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.ts";
import { AmbientLight, DirectionalLight } from "three";
import { Landscape } from "./heightMap/Landscape.ts";

import * as THREE from "three";
import {createCoasterMesh} from "./coaster-mesh.js";
import {exampleCoasterPath} from "./example-coaster.js";
import {setupCartController, updateCartPosition} from "./cart-location.js";

const app = App();

const parameters = startUI((_parameters) => {
  console.log(parameters)
  app.reset();
});


var path = exampleCoasterPath();
path.arcLengthDivisions = 1000;
  const landscape = new Landscape(parameters);

// var testBox = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

var cartProgress = 0;
var trackLength = path.getLength();


var firstPersonMode = true;

app.setup(({scene}) => {
  scene.add(landscape);
  // Adding an ambient light
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Adding a directional light
  const dirLight = new DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(0, 3, 0);
  scene.add(dirLight);

  scene.add(landscape);
  // testing nonsense for coaster mesh
 

  setupCartController(path);

  // var testTubeGeometry = new THREE.TubeGeometry(path, 64, 0.1);
  // var testTubeMat = new THREE.MeshBasicMaterial();
  // testTubeMat.wireframe = true;

  // scene.add(new THREE.Mesh(testTubeGeometry, testTubeMat));

  var model = createCoasterMesh(path);
  scene.add(model);


  var ambient = new THREE.AmbientLight(0x808080);
  scene.add(ambient);

  var light = new THREE.PointLight(0xffffff, 50);
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

  if (firstPersonMode) {
    cartProgress = updateCartPosition(path, clock.getDelta());
    let next_pos = path.getPoint(cartProgress / trackLength);
    // testBox.position.set(next_pos.x, next_pos.y, next_pos.z);
    camera.position.set(next_pos.x, next_pos.y + 5, next_pos.z);

    let view_direction = path.getTangent(cartProgress / trackLength);
    // view_direction.y = 0;
    view_direction.add(camera.position);

    orbit.target.set(view_direction.x, view_direction.y - 0.5, view_direction.z);
  }


});


