import { BufferGeometry, Mesh, MeshLambertMaterial, Vector2 } from 'three';
import { HeightMap } from "./HeightMap.ts";
import { generateGeometryFromHeightMap } from "./generateGeometryFromHeightMap.ts";
import { Parameters } from "../ui/parameters.ts";

export class Landscape extends Mesh<BufferGeometry, MeshLambertMaterial> {
  private heightMap: HeightMap;

  constructor(private parameters: Parameters['landscape'], wireframe: boolean) {
    super();

    this.heightMap = this.generateHeightMap();
    this.geometry = this.generateGeometry();

    this.material = new MeshLambertMaterial({ color: 0xcccccc });
    this.material.wireframe = wireframe;
  }

  regenerateHeightMap() {
    this.heightMap = this.generateHeightMap();
    this.geometry = this.generateGeometry();
  }

  updateGeometry() {
    this.geometry.dispose();
    this.geometry = this.generateGeometry();
  }

  setWireframe(wireframe: boolean) {
    this.material.wireframe = wireframe;
  }

  private generateHeightMap(): HeightMap {

    const xLength = Math.floor(this.parameters.heightMap.xLength);
    const zLength = Math.floor(this.parameters.heightMap.zLength);
    const polyCount = Math.floor(this.parameters.polyCount);
    const hillDensity = Math.floor(this.parameters.heightMap.hillDensity);
    const roughness = Math.floor(this.parameters.heightMap.roughness);

    return HeightMap.generate(
      new Vector2(
        xLength * polyCount,
        zLength * polyCount
      ),
      hillDensity,
      roughness
    );
  }

  private generateGeometry(): BufferGeometry {

    const xLength = Math.floor(this.parameters.heightMap.xLength);
    const zLength = Math.floor(this.parameters.heightMap.zLength);
    const polyCount = Math.floor(this.parameters.polyCount);

    return generateGeometryFromHeightMap({
      heightMap: this.heightMap,
      xLength: xLength,
      zLength: zLength,
      density: polyCount,
      scale: this.parameters.scale
    });
  }
}
