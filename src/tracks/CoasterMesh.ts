import * as THREE from "three";
import { Parameters } from "../ui/parameters.ts";

const {
  Group,
  Mesh,
  MeshPhongMaterial,
  Color,
  TextureLoader,
  TubeGeometry,
  CurvePath,
  Vector3,
  LineCurve3,
  QuadraticBezierCurve3,
  BoxGeometry
} = THREE;
type CurvePath = THREE.CurvePath<Vector3>;
type LineCurve3 = THREE.LineCurve3;
type Mesh = THREE.Mesh;
type MeshPhongMaterial = THREE.MeshPhongMaterial;
type QuadraticBezierCurve3 = THREE.QuadraticBezierCurve3;
type Texture = THREE.Texture;
type Vector3 = THREE.Vector3;

export class CoasterMesh extends Group {

  enabled: boolean = true;

  // Cached Parameters
  halfTrackWidth: number = 1;
  trackRadius: number = .3;

  crossbarSpacing: number = 5;
  crossbarRadius: number = .2;

  supportSpacing: number = 8;
  supportWidth: number = .2;
  supportRadius: number = 5;


  metalTexture: Texture = new TextureLoader().load("textures/steel.jpg");

  // Materials
  trackMaterial: MeshPhongMaterial;
  crossbarMaterial: MeshPhongMaterial;
  supportMaterial: MeshPhongMaterial;

  // Meshes
  leftTrackModel: Mesh = new Mesh();
  rightTrackModel: Mesh = new Mesh();
  crossbarMeshes: Mesh[] = [];
  supportMeshes: Mesh[] = [];

  constructor(private path: CurvePath, private parameters: Parameters['coaster']) {
    super();
    this.trackMaterial = this.setUpHalfTrack();
    this.crossbarMaterial = this.setUpCrossbar();
    this.supportMaterial = this.setUpSupports();
    this.createCoasterMesh();
  }

  setUpHalfTrack() {
    const trackMaterial = new MeshPhongMaterial();
    trackMaterial.shininess = 100;
    trackMaterial.map = this.metalTexture;
    trackMaterial.color = new Color(1.0, 0.1, 0.1);
    return trackMaterial;
  }

  setUpCrossbar() {
    const crossbarMaterial = new MeshPhongMaterial();
    crossbarMaterial.shininess = 30;
    crossbarMaterial.map = this.metalTexture;
    crossbarMaterial.color = new Color(0.5, 0.15, 0.15);
    return crossbarMaterial;
  }

  setUpSupports() {
    const supportMaterial = new MeshPhongMaterial();
    supportMaterial.shininess = 60;
    supportMaterial.map = this.metalTexture;
    supportMaterial.color = new Color(0.4, 0.4, 0.7);
    return supportMaterial;
  }

  createCoasterMesh() {

    // Parameters
    this.halfTrackWidth = this.parameters.tracks.halfTrackWidth;
    this.trackRadius = this.parameters.tracks.trackRadius;

    this.crossbarSpacing = this.parameters.tracks.crossbarSpacing;
    this.crossbarRadius = this.parameters.tracks.crossbarRadius;

    this.supportSpacing = this.parameters.tracks.supportSpacing;
    this.supportWidth = this.parameters.tracks.supportWidth;
    this.supportRadius = this.parameters.tracks.supportRadius;

    this.generateTracks(this.halfTrackWidth, this.trackRadius);

    this.generateCrossbars(this.crossbarSpacing, this.halfTrackWidth, this.crossbarRadius);

    this.generateSupports(this.supportSpacing, this.supportWidth, this.trackRadius, this.supportRadius);

    this.add(this.leftTrackModel);
    this.add(this.rightTrackModel);
  }

  private generateTracks(halfTrackWidth: number, trackRadius: number) {
    // take a path, create the appropriate meshes
    // takes a single CurvePath

    // Generate side track curves

    const leftTrackPath = new CurvePath<Vector3>();

    const rightTrackPath = new CurvePath<Vector3>();

    const curves = this.path.curves as (LineCurve3 | QuadraticBezierCurve3)[];


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

    this.leftTrackModel.geometry = new TubeGeometry(leftTrackPath, 64, trackRadius);
    this.leftTrackModel.material = this.trackMaterial;

    this.rightTrackModel.geometry = new TubeGeometry(rightTrackPath, 64, trackRadius);
    this.rightTrackModel.material = this.trackMaterial;

  }

  private generateSupports(supportSpacing: number, supportWidth: number, trackRadius: number, supportRadius: number) {
    const nSupports = Math.floor(this.path.getLength() / supportSpacing);

    this.supportMeshes = [];

    for (let i = 0; i < nSupports; i++) {
      // supports look like crossbar just below track with poles reaching down to ground
      // TubeGeometry probably

      let centrePoint = this.path.getPointAt((i + 0.5) / nSupports);
      let forwardDir = this.path.getTangent((i + 0.5) / nSupports);
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

      this.supportMeshes[i] = new Mesh(supportGeom, this.supportMaterial);

    }

    for (let i = 0; i < this.supportMeshes.length; i++) {
      this.add(this.supportMeshes[i]);
    }
  }

  private generateCrossbars(crossbarSpacing: number, halfTrackWidth: number, crossbarRadius: number) {
    const nCrossbars = Math.floor(this.path.getLength() / crossbarSpacing);

    this.crossbarMeshes = [];

    for (let i = 0; i < nCrossbars; i++) {

      let crossbarGeom = new BoxGeometry(halfTrackWidth * 2, crossbarRadius, crossbarRadius);
      // may replace box geometry with a better one later
      // box is just easy since you can directly set its width

      this.crossbarMeshes[i] = new Mesh(crossbarGeom, this.crossbarMaterial);

      this.crossbarMeshes[i].lookAt(this.path.getTangent((i + 0.5) / nCrossbars));
      let newPosition = this.path.getPointAt((i + 0.5) / nCrossbars);

      // i + 0.5 avoids the crossbars being placed directly on the ends of the path
      // effectively, you divide the track into i equally spaced regions,
      // then place crossbars in the middle of each region
      this.crossbarMeshes[i].position.x = newPosition.x;
      this.crossbarMeshes[i].position.y = newPosition.y;
      this.crossbarMeshes[i].position.z = newPosition.z;

      for (let i = 0; i < this.crossbarMeshes.length; i++) {
        this.add(this.crossbarMeshes[i]);
      }
    }
  }

  update() {
    // update the coaster
    if (this.parameters.enabled !== this.enabled) {
      this.enabled = this.parameters.enabled;
      this.visible = this.enabled;
    }
    if (this.enabled) {

      const trackRadiusChanged = this.parameters.tracks.trackRadius !== this.trackRadius;
      const crossbarSpacingChanged = this.parameters.tracks.crossbarSpacing !== this.crossbarSpacing;
      const halfTrackWidthChanged = this.parameters.tracks.halfTrackWidth !== this.halfTrackWidth;
      const crossbarRadiusChanged = this.parameters.tracks.crossbarRadius !== this.crossbarRadius;
      const supportSpacingChanged = this.parameters.tracks.supportSpacing !== this.supportSpacing;
      const supportWidthChanged = this.parameters.tracks.supportWidth !== this.supportWidth;
      const supportRadiusChanged = this.parameters.tracks.supportRadius !== this.supportRadius;

      // changes to halfTrackWidth or trackRadius
      if (halfTrackWidthChanged || trackRadiusChanged) {
        this.halfTrackWidth = this.parameters.tracks.halfTrackWidth;
        this.trackRadius = this.parameters.tracks.trackRadius;

        this.leftTrackModel?.geometry.dispose();
        this.rightTrackModel?.geometry.dispose();

        this.generateTracks(this.halfTrackWidth, this.trackRadius);
      }

      // changes to supportSpacing or supportWidth or trackRadius or supportRadius
      if (supportSpacingChanged || supportWidthChanged || trackRadiusChanged || supportRadiusChanged) {
        this.supportSpacing = this.parameters.tracks.supportSpacing;
        this.supportWidth = this.parameters.tracks.supportWidth;
        this.trackRadius = this.parameters.tracks.trackRadius;
        this.supportRadius = this.parameters.tracks.supportRadius;

        this.supportMeshes.forEach(mesh => {
          this.remove(mesh);
          mesh.geometry.dispose();
        });

        this.supportMeshes = [];

        this.generateSupports(this.supportSpacing, this.supportWidth, this.trackRadius, this.supportRadius);
      }

      // changes to crossbarSpacing or halfTrackWidth or crossbarRadius
      if (crossbarSpacingChanged || halfTrackWidthChanged || crossbarRadiusChanged) {
        this.crossbarSpacing = this.parameters.tracks.crossbarSpacing;
        this.halfTrackWidth = this.parameters.tracks.halfTrackWidth;
        this.crossbarRadius = this.parameters.tracks.crossbarRadius;

        this.crossbarMeshes.forEach(mesh => {
          this.remove(mesh);
          mesh.geometry.dispose();
        });

        this.crossbarMeshes = [];

        this.generateCrossbars(this.crossbarSpacing, this.halfTrackWidth, this.crossbarRadius);
      }
    }
  }
}




