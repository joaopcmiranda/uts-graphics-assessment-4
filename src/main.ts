import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.tsx";
import { parametersDefaults } from "./ui/ParameterPanel.tsx";


const app = App();

const parameters = parametersDefaults;

app.setup(() => {

  startUI(
    (_parameters) => {
      Object.assign(parameters, _parameters)
    },
    () => {}
  );

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


