import {
  BoxGeometry,
  Color,
  CurvePath,
  Group,
  LineCurve3,
  Mesh,
  MeshPhongMaterial,
  QuadraticBezierCurve3,
  TextureLoader,
  TubeGeometry,
  Vector3
} from "three";

const metalTexture = new TextureLoader().load("textures/steel.jpg");

const halfTrackWidth = 1;
// half track width to avoid /2 later (may change?)
const trackRadius = 0.3;
const trackMaterial = new MeshPhongMaterial();
trackMaterial.shininess = 100;
trackMaterial.map = metalTexture;
trackMaterial.color = new Color(1.0, 0.1, 0.1);


const crossbarSpacing = 5;
// really more approximate spacing, to avoid two oddly close / far crossbars at the "end" of a closed loop
const crossbarRadius = 0.2;
const crossbarMaterial = new MeshPhongMaterial();
crossbarMaterial.shininess = 30;
crossbarMaterial.map = metalTexture;
crossbarMaterial.color = new Color(0.5, 0.15, 0.15);


const supportSpacing = 8;
// approximate spacing
const supportRadius = 0.2;
const supportWidth = 5;
const supportMaterial = new MeshPhongMaterial();
supportMaterial.shininess = 60;
supportMaterial.map = metalTexture;
supportMaterial.color = new Color(0.4, 0.4, 0.7);


export const createCoasterMesh = function (path: CurvePath<Vector3>) {
  // take a path, create the appropriate meshes
  // takes a single CurvePath

  // Generate side track curves

  const leftTrackPath = new CurvePath<Vector3>();

  const rightTrackPath = new CurvePath<Vector3>();

  const curves = path.curves as (LineCurve3 | QuadraticBezierCurve3)[];

  for (const item of curves) {


    if (item instanceof LineCurve3) {
      // line curves have no v0
      // this feels cursed but javascript has forced my hand


      // Line curve: v1, v2

      // get direction from v1 to v2
      let dir = new Vector3().subVectors(item.v2, item.v1);
      dir.normalize();

      // get perpendicular direction to track: cross with up vector
      // should be pointing "right" from the track
      let perp = new Vector3().crossVectors(dir, new Vector3(0, 1, 0));
      perp.normalize();

      // add paths offset by perp distance

      let rightV1 = item.v1.clone();
      rightV1.addScaledVector(perp, halfTrackWidth);

      let rightV2 = item.v2.clone();
      rightV2.addScaledVector(perp, halfTrackWidth);

      rightTrackPath.add(new LineCurve3(rightV1, rightV2));


      let leftV1 = item.v1.clone();
      leftV1.addScaledVector(perp, -halfTrackWidth);

      let leftV2 = item.v2.clone();
      leftV2.addScaledVector(perp, -halfTrackWidth);

      leftTrackPath.add(new LineCurve3(leftV1, leftV2));


    } else {
      // Quadratic curve: v0, v1, v2

      // get direction from v0 to v1
      // let dir1 = new Vector3().subVectors(path.curves[i].v1, path.curves[i].v0);
      // dir1.normalize();

      // // get perpendicular direction to track: cross with up vector
      // // should be pointing "right" from the track
      // let perp1 = new Vector3().crossVectors(dir1, new Vector3(0, 1, 0));
      // perp1.normalize();


      // // get direction from v1 to v2
      // let dir2 = new Vector3().subVectors(path.curves[i].v2, path.curves[i].v1);
      // dir2.normalize();

      // // get perpendicular direction to track: cross with up vector
      // // should be pointing "right" from the track
      // let perp2 = new Vector3().crossVectors(dir2, new Vector3(0, 1, 0));
      // perp2.normalize();

      let dir0 = item.getTangent(0.0);
      let perp0 = new Vector3().crossVectors(dir0, new Vector3(0, 1, 0));
      perp0.normalize();

      let dir1 = item.getTangent(0.5);
      let perp1 = new Vector3().crossVectors(dir1, new Vector3(0, 1, 0));
      perp1.normalize();

      let dir2 = item.getTangent(1.0);
      let perp2 = new Vector3().crossVectors(dir2, new Vector3(0, 1, 0));
      perp2.normalize();


      // add paths offset by perp distance

      let rightV0 = item.v0.clone();
      rightV0.addScaledVector(perp0, halfTrackWidth);

      let rightV1 = item.v1.clone();
      rightV1.addScaledVector(perp1, halfTrackWidth);

      let rightV2 = item.v2.clone();
      rightV2.addScaledVector(perp2, halfTrackWidth);

      rightTrackPath.add(new QuadraticBezierCurve3(rightV0, rightV1, rightV2));

      let leftV0 = item.v0.clone();
      leftV0.addScaledVector(perp0, -halfTrackWidth);

      let leftV1 = item.v1.clone();
      leftV1.addScaledVector(perp1, -halfTrackWidth);

      let leftV2 = item.v2.clone();
      leftV2.addScaledVector(perp2, -halfTrackWidth);

      leftTrackPath.add(new QuadraticBezierCurve3(leftV0, leftV1, leftV2));


    }
  }

  const leftTrackModel = new Mesh(
    new TubeGeometry(leftTrackPath, 64, trackRadius),
    trackMaterial
  );

  const rightTrackModel = new Mesh(
    new TubeGeometry(rightTrackPath, 64, trackRadius),
    trackMaterial
  );


  // Generate crossbars

  const nCrossbars = Math.floor(path.getLength() / crossbarSpacing);

  const crossbarMeshes = [];

  for (let i = 0; i < nCrossbars; i++) {

    let crossbarGeom = new BoxGeometry(halfTrackWidth * 2, crossbarRadius, crossbarRadius);
    // may replace box geometry with a better one later
    // box is just easy since you can directly set its width
    crossbarMeshes[i] = new Mesh(crossbarGeom, crossbarMaterial);

    crossbarMeshes[i].lookAt(path.getTangent((i + 0.5) / nCrossbars));
    let newPosition = path.getPointAt((i + 0.5) / nCrossbars);
    // i + 0.5 avoids the crossbars being placed directly on the ends of the path
    // effectively, you divide the track into i equally spaced regions,
    // then place crossbars in the middle of each region
    crossbarMeshes[i].position.x = newPosition.x;
    crossbarMeshes[i].position.y = newPosition.y;
    crossbarMeshes[i].position.z = newPosition.z;

  }


  // TODO: Generate supports

  const nSupports = Math.floor(path.getLength() / supportSpacing);


  const supportMeshes = [];

  for (let i = 0; i < nSupports; i++) {
    // supports look like crossbar just below track with poles reaching down to ground
    // TubeGeometry probably

    let centrePoint = path.getPointAt((i + 0.5) / nSupports);
    let forwardDir = path.getTangent((i + 0.5) / nSupports);
    let rightDir = new Vector3().crossVectors(forwardDir, new Vector3(0, 1, 0));
    rightDir.normalize();

    let point1 = new Vector3(centrePoint.x - (rightDir.x * supportWidth / 2), 0, centrePoint.z - (rightDir.z * supportWidth / 2));
    let point2 = new Vector3(centrePoint.x - (rightDir.x * supportWidth / 2), centrePoint.y - (trackRadius / 2), centrePoint.z - (rightDir.z * supportWidth / 2));
    let point3 = new Vector3(centrePoint.x + (rightDir.x * supportWidth / 2), centrePoint.y - (trackRadius / 2), centrePoint.z + (rightDir.z * supportWidth / 2));
    let point4 = new Vector3(centrePoint.x + (rightDir.x * supportWidth / 2), 0, centrePoint.z + (rightDir.z * supportWidth / 2));

    let supportCurve = new CurvePath<Vector3>();
    supportCurve.add(new LineCurve3(point1, point2));
    supportCurve.add(new LineCurve3(point2, point3));
    supportCurve.add(new LineCurve3(point3, point4));

    let supportGeom = new TubeGeometry(supportCurve, 64, supportRadius);

    supportMeshes[i] = new Mesh(supportGeom, supportMaterial);

  }


  // Group everything up and return it as one object

  const output = new Group();

  output.add(leftTrackModel);
  output.add(rightTrackModel);

  for (let i = 0; i < crossbarMeshes.length; i++) {
    output.add(crossbarMeshes[i]);
  }

  for (let i = 0; i < supportMeshes.length; i++) {
    output.add(supportMeshes[i]);
  }


  return output;


};

