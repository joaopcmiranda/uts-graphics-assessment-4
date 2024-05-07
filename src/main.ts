import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.tsx";

import * as THREE from "three";
import {createCoasterMesh} from "./coaster-mesh.js";
import {exampleCoasterPath} from "./example-coaster.js";

const app = App();

const parameters = startUI();

app.setup(({scene}) => {


  // testing nonsense for coaster mesh
  var path = exampleCoasterPath();

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

app.loop(({ clock }) => {
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

});


