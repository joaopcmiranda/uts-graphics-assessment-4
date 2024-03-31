import { BufferAttribute, BufferGeometry } from "three";
import { HeightMap } from "./HeightMap.ts";

export const generateGeometryFromHeightMap = (params: {
  heightMap: HeightMap,
  xLength: number,
  zLength: number,
  heightScale: number,
  density: number
}): BufferGeometry => {

  const { heightMap, xLength, zLength, heightScale, density } = params;

  // Get the height map dimensions
  const heightMapXLength = heightMap.xLength;
  const heightMapZLength = heightMap.zLength;

  // Calculate the number of points in the x and z directions
  const xPointCount = Math.floor(xLength * density);
  const zPointCount = Math.floor(zLength * density);

  // Calculate the ratio that will translate the height map to the x and z directions
  const xPointToHeightMapRatio = heightMapXLength / xPointCount;
  const zPointToHeightMapRatio = heightMapZLength / zPointCount;

  const pointArray: number[] = [];

  const geometry = new BufferGeometry();

  const heightMatrix: number[][] = [];

  for (let i = 0; i < xPointCount; i++) {
    heightMatrix.push([]);
    const x = i * xPointToHeightMapRatio;
    for (let j = 0; j < zPointCount; j++) {
      const z = j * zPointToHeightMapRatio;
      heightMatrix[i].push(heightMap.getHeightAt(x, z));
    }
  }

  // Now we have the height matrix with dimensions (maxX, maxZ)
  // We need a way to translate the indexes of the height matrix to the x, z coordinates

  const xRatio = xLength / xPointCount;
  const zRatio = zLength / zPointCount;

  const origin = { x: -xLength / 2, y: 0, z: -zLength / 2 };

  for (let i = 0; i < xPointCount - 1; i += 1) {
    for (let j = 0; j < zPointCount - 1; j += 1) {
      const startX = origin.x + (i * xRatio);
      const startZ = origin.z + (j * zRatio);

      const endX = origin.x + ((i + 1) * xRatio);
      const endZ = origin.z + ((j + 1) * zRatio);

      const a = { x: startX, y: origin.y + (heightMatrix[i][j]) * heightScale, z: startZ };
      const b = { x: endX, y: origin.y + (heightMatrix[i + 1][j]) * heightScale, z: startZ };
      const c = { x: endX, y: origin.y + (heightMatrix[i + 1][j + 1]) * heightScale, z: endZ };
      const d = { x: startX, y: origin.y + (heightMatrix[i][j + 1]) * heightScale, z: endZ };

      pointArray.push(
        a.x, a.y, a.z,
        c.x, c.y, c.z,
        b.x, b.y, b.z,

        a.x, a.y, a.z,
        d.x, d.y, d.z,
        c.x, c.y, c.z
      )
    }
  }

  const vertices = new Float32Array(pointArray);
  geometry.setAttribute('position', new BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}
