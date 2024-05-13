import { Mesh, MeshLambertMaterial, Vector2 } from 'three';
import { HeightMap } from "./HeightMap.ts";
import { generateGeometryFromHeightMap } from "./generateGeometryFromHeightMap.ts";

export type LandscapeParameters = {
  xLength: number;
  zLength: number;
  polyCount: number;
  hillDensity: number;
  hillScale: number;
  roughness: number;
  wireframe: boolean;
}

export class Landscape extends Mesh {
  constructor({
    xLength: _xLength = 1,
    zLength: _zLength = 1,
    polyCount: _polyCount = 10,
    hillDensity: _hillDensity = 10,
    hillScale: _hillScale = 10,
    roughness: _roughness = 10,
    wireframe: _wireframe = false
  }: LandscapeParameters) {

    const xLength = Math.floor(_xLength);
    const zLength = Math.floor(_zLength);
    const polyCount = Math.floor(_polyCount);
    const hillDensity = Math.floor(_hillDensity);
    const hillScale = Math.floor(_hillScale);
    const roughness = Math.floor(_roughness);

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
    material.wireframe = _wireframe;

    super(geometry, material);
  }


}
