import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.ts";
import { AmbientLight, DirectionalLight } from "three";
import { Landscape } from "./heightMap/Landscape.ts";

const app = App();

const parameters = startUI((_parameters) => {
  console.log(parameters)
  app.reset();
});

await app.setup(async ({ scene }) => {

  const landscape = new Landscape(parameters);

  scene.add(landscape);
  // Adding an ambient light
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Adding a directional light
  const dirLight = new DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(0, 3, 0);
  scene.add(dirLight);

  scene.add(landscape);
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


