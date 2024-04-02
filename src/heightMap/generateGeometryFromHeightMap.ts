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

  // Calculate the number of points in the x and z directions
  const xPointCount = Math.floor(xLength * density);
  const zPointCount = Math.floor(zLength * density);

  // Calculate total number of vertices needed
  const totalVertices = 6 * (xPointCount - 1) * (zPointCount - 1);

  // Initialize Float32Array with the total number of vertices needed
  const pointArray = new Float32Array(totalVertices * 3); // multiply by 3 for x,y,z

  const heightMatrix = new Float32Array(xPointCount * zPointCount);

  const geometry = new BufferGeometry();

  for (let i = 0; i < xPointCount; i += 1) {
    for (let j = 0; j < zPointCount; j += 1) {
      heightMatrix[i * zPointCount + j] = heightMap.getHeightAt(i / xPointCount, j / zPointCount) * heightScale;
    }
  }

  // Now we have the height matrix with dimensions (maxX, maxZ)
  // We need a way to translate the indexes of the height matrix to the x, z coordinates

  const xRatio = xLength / xPointCount;
  const zRatio = zLength / zPointCount;

  const origin = { x: -xLength / 2, y: 0, z: -zLength / 2 };

  let vertexIndex = 0;

  for (let i = 0; i < xPointCount - 1; i += 1) {
    for (let j = 0; j < zPointCount - 1; j += 1) {
      const startX = origin.x + (i * xRatio);
      const startZ = origin.z + (j * zRatio);

      const endX = origin.x + ((i + 1) * xRatio);
      const endZ = origin.z + ((j + 1) * zRatio);

      const a = { x: startX, y: origin.y + (heightMatrix[i * zPointCount + j]) * heightScale, z: startZ };
      const b = { x: endX, y: origin.y + (heightMatrix[(i + 1) * zPointCount + j]) * heightScale, z: startZ };
      const c = { x: startX, y: origin.y + (heightMatrix[i * zPointCount +(j + 1)]) * heightScale, z: endZ };
      const d = { x: endX, y: origin.y + (heightMatrix[(i + 1) * zPointCount +(j + 1)]) * heightScale, z: endZ };

      pointArray[vertexIndex++] = c.x
      pointArray[vertexIndex++] = c.y
      pointArray[vertexIndex++] = c.z

      pointArray[vertexIndex++] = b.x
      pointArray[vertexIndex++] = b.y
      pointArray[vertexIndex++] = b.z

      pointArray[vertexIndex++] = a.x
      pointArray[vertexIndex++] = a.y
      pointArray[vertexIndex++] = a.z

      pointArray[vertexIndex++] = d.x
      pointArray[vertexIndex++] = d.y
      pointArray[vertexIndex++] = d.z

      pointArray[vertexIndex++] = b.x
      pointArray[vertexIndex++] = b.y
      pointArray[vertexIndex++] = b.z

      pointArray[vertexIndex++] = c.x
      pointArray[vertexIndex++] = c.y
      pointArray[vertexIndex++] = c.z
    }
  }

  const vertices = new Float32Array(pointArray);
  geometry.setAttribute('position', new BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}
