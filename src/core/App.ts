import { Clock, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// Main function, responsible for setting up the app, and running the loop
const windowWidth = window.innerWidth * .7;
export const App = () => {

  // declare variables for WebGL renderer, scene, input and perspective camera
  let _renderer: WebGLRenderer;
  let _scene: Scene;
  let _orbitControls: OrbitControls;
  let _camera: PerspectiveCamera;
  let _setupFn: SetupFunction | undefined
  let _loopFn: LoopFunction

  // Renderer defaults set up
  _renderer = new WebGLRenderer();
  _renderer.setSize(windowWidth, window.innerHeight);
  document.getElementById("app")?.appendChild(_renderer.domElement); // Add the renderer to the current document

  // Resizing screen handling
  const OnResize = () => {
    const width = window.innerWidth * .7;
    const height = window.innerHeight;
    _renderer.setSize(width, height);
    _camera.aspect = width / height;
    _camera.updateProjectionMatrix();
    _renderer.render(_scene, _camera);
  }

  // Attach resize event to window
  window.addEventListener('resize', OnResize, false);

  // Scene defaults set up
  _scene = new Scene();

  _camera = new PerspectiveCamera(45, windowWidth / window.innerHeight, 0.1, 1000);

  _orbitControls = new OrbitControls(_camera, _renderer.domElement);

  // setup function, responsible for setting up renderer, scene, input, camera and running the user's setup function
  const setup = (run?: SetupFunction) => {

    _setupFn = run;

    // Camera defaults set up
    const Pos = new Vector3(0, 0, 15);
    _camera.position.set(Pos.x, Pos.y, Pos.z);
    const Dir = new Vector3(0, 0, 1);
    _camera.lookAt(Dir.x, Dir.y, Dir.z);

    // Input defaults set up
    _orbitControls.minDistance = 1;
    _orbitControls.maxPolarAngle = Math.PI / 2;

    // Custom setup
    // allow custom overrides and any additional setup the user desires.
    // Runs the 'run' function, if provided, ONCE
    return {
      renderer: _renderer,
      scene: _scene,
      orbit: _orbitControls,
      camera: _camera,
      ...(run?.({ renderer: _renderer, scene: _scene, orbit: _orbitControls, camera: _camera }) ?? {})
    }
  }

  let _loop: { ID: number } = { ID: 0 };

  // Loop function, this will keep the app running, and calling the provided `run` function every frame
  const loop = (run: LoopFunction) => {
    _loopFn = run;
    _loop.ID++; // increases the loop id
    console.log('loopID', _loop);

    const clock = new Clock(); // a clock for tracking time

    const thisLoopID = _loop.ID; // store the current loop ID
    // Actual looping functionality
    const Update = () => {
      if (_loop.ID !== thisLoopID) {
        console.log('Loop ID changed, stopping loop #', thisLoopID, 'current loop ID', _loop.ID);
        return;
      }// if the loop ID has changed, stop the loop

      const delta = clock.getDelta(); // calculate time delta

      // Run the provided function every frame
      _loopFn({
        clock,
        delta: delta,
        renderer: _renderer,
        orbit: _orbitControls,
        camera: _camera,
        scene: _scene
      });

      if (_loop.ID !== thisLoopID) return; // if the provided function returns false, stop the loop

      _orbitControls.update(delta); // Update the orbit controls

      // Render the scene
      _renderer.render(_scene, _camera);

      // Request next animation frame, and call Update again
      if (_loop.ID === thisLoopID) {
        requestAnimationFrame(Update);
      }
    };

    requestAnimationFrame(Update); // Request initial animation frame
  }

  const reset = () => {
    // clear the scene
    _scene.remove.apply(_scene, _scene.children);

    setup(_setupFn);
    loop(_loopFn);
  }

  // expose setup and loop function
  return {
    setup,
    loop,
    reset
  }
}


type SetupFunction = (defaults: {
  renderer: WebGLRenderer;
  orbit: OrbitControls;
  camera: PerspectiveCamera;
  scene: Scene
}) => { renderer?: WebGLRenderer; scene?: Scene; input?: ReturnType<any>; camera?: PerspectiveCamera } | void

type LoopFunction = ({ clock, delta, renderer, orbit, camera, scene }: {
  clock: Clock,
  delta: number,
  renderer: WebGLRenderer,
  orbit: OrbitControls,
  camera: PerspectiveCamera,
  scene: Scene
}) => void
