import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.ts";
import { AmbientLight, DirectionalLight, Mesh, MeshLambertMaterial, Vector2 } from "three";
import { generateGeometryFromHeightMap } from "./heightMap/generateGeometryFromHeightMap.ts";
import { HeightMap } from "./heightMap/HeightMap.ts";

const app = App();

const parameters = startUI((_parameters) => {
  console.log(parameters)
  app.reset();
});

await app.setup(async ({ scene }) => {

  const xLength = Math.floor(parameters.xLength);
  const zLength = Math.floor(parameters.zLength);
  const polyCount = Math.floor(parameters.polyCount);
  const hillDensity = Math.floor(parameters.hillDensity);
  const hillScale = Math.floor(parameters.hillScale);
  const roughness = Math.floor(parameters.roughness);

  const heightMap = HeightMap.generate(
    new Vector2(
      xLength * polyCount,
      zLength * polyCount
    ),
    hillDensity,
    roughness
  );

  console.log(heightMap);

  const geometry = generateGeometryFromHeightMap({
    heightMap,
    xLength: xLength,
    zLength: zLength,
    density: polyCount,
    heightScale: hillScale
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


