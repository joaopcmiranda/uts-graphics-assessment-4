import { App } from "./core/App.ts";
import { startUI } from "./ui/UI.tsx";

const app = App();

const parameters = startUI();

app.setup(() => {


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


