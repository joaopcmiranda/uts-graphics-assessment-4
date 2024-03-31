import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.tsx";
import { parametersDefaults } from "./ui/ParameterPanel.tsx";
import { AmbientLight, DirectionalLight, Mesh, MeshLambertMaterial } from "three";
import { generateGeometryFromHeightMap } from "./heightMap/generateGeometryFromHeightMap.ts";
import { HeightMap } from "./heightMap/HeightMap.ts";

const app = App();

const parameters = parametersDefaults;

startUI(
  (_parameters) => {
    Object.assign(parameters, _parameters)
    app.reset();
  },
  () => {}
);

await app.setup(async ({ scene }) => {

  const heightMap = HeightMap.generate(
    parameters.zLength,
    parameters.xLength,
    parameters.generationCount
  );

  const geometry = generateGeometryFromHeightMap({
    heightMap,
    xLength: parameters.xLength,
    zLength: parameters.zLength,
    density: parameters.density,
    heightScale: parameters.heightScale
  })

  const material = new MeshLambertMaterial({ color: 0xcccccc });
  material.wireframe = parameters.wireframe;
  const mesh = new Mesh(geometry, material);

  scene.add(mesh);
  // Adding an ambient light
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Adding a directional light
  const dirLight = new DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(0, 3, 0);
  scene.add(dirLight);

  scene.add(mesh);
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


