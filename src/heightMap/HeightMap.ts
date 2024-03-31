import { decode } from "fast-png";

export class HeightMap {
  private readonly _heightMap: number[][];
  public readonly xLength;
  public readonly zLength;

  constructor(
    _heightMap: number[][],
    xLength: number = _heightMap.length,
    zLength: number = _heightMap[0].length) {
    this._heightMap = _heightMap;
    this.xLength = xLength;
    this.zLength = zLength;
  }

  private getHeight(i: number, j: number): number {
    return this._heightMap[i][j];
  }

  public getHeightAt(x: number, z: number): number {
    // Out of bounds
    if (x < 0 || x >= this.zLength || z < 0 || z >= this.xLength) {
      return 0;
    }

    // Exact point
    if (x % 1 === 0 && z % 1 === 0) {
      return this._heightMap[x][z];
    }

    // Interpolate between the 4 points
    const minX = Math.floor(x);
    const minZ = Math.floor(z);
    const maxX = Math.min(this.zLength - 1, minX + 1);
    const maxZ = Math.min(this.xLength - 1, minZ + 1);

    const a = this.getHeight(minX, minZ);
    const b = this.getHeight(maxX, minZ);
    const c = this.getHeight(minX, maxZ);
    const d = this.getHeight(maxX, maxZ);

    // linear interpolation

    return linearInterpolation(a, b, c, d, x, z);


  }

  public add(heightMap: HeightMap): this {
    const maxI = Math.min(this.zLength, heightMap.zLength);
    const maxJ = Math.min(this.xLength, heightMap.xLength);

    for (let i = 0; i < maxI; i++) {
      for (let j = 0; j < maxJ; j++) {
        this._heightMap[i][j] += heightMap.getHeight(i, j);
      }
    }

    return this;
  }

  static async fromPng(png: string): Promise<HeightMap> {
    const pngFile = await fetch(png);
    const heightMapPng = decode(await pngFile.arrayBuffer());
    const heightMapHeight = heightMapPng.height;
    const heightMapWidth = heightMapPng.width;
    const heightMap: number[][] = [];
    for (let i = 0; i < heightMapHeight; i++) {
      heightMap.push([]);
      for (let j = 0; j < heightMapWidth; j++) {
        const data = heightMapPng.data[i * heightMapWidth + j];
        heightMap[i].push(data / Math.pow(2, heightMapPng.depth));
      }
    }

    return new HeightMap(heightMap);
  };

  static flat(xLength: number, zLength: number): HeightMap {
    const heightMap: number[][] = [];
    for (let i = 0; i < xLength; i++) {
      heightMap.push([]);
      for (let j = 0; j < zLength; j++) {
        heightMap[i].push(0);
      }
    }

    return new HeightMap(heightMap);
  }

  static random(xLength: number, ZLength: number, min: number, max: number): HeightMap {
    const heightMap: number[][] = [];
    for (let i = 0; i < xLength; i++) {
      heightMap.push([]);
      for (let j = 0; j < ZLength; j++) {
        heightMap[i].push(Math.random() * (max - min) + min);
      }
    }

    return new HeightMap(heightMap);
  }

  static generate(_xLength: number, _ZLength: number, generations: number = 1): HeightMap {
    const xLength = Math.max(1, _xLength);
    const zLength = Math.max(1, _ZLength);

    const finalHeightMap = HeightMap.flat(xLength, zLength);
    const initialDensity = 0.01;
    const initialMax = 1;

    for (let i = 0; i < generations; i++) {

      const density = initialDensity * Math.pow(2, i);
      const max = initialMax / Math.pow(2, i);

      const randomXLength = Math.max(1, Math.floor(density * xLength));
      const randomZLength = Math.max(1, Math.floor(density * zLength));

      const randomMap = HeightMap.random(randomXLength, randomZLength, 0, max);

      const heightMap: number[][] = [];

      for (let i = 0; i < xLength; i++) {
        heightMap.push([]);
        for (let j = 0; j < zLength; j++) {
          const x = ((randomMap.zLength - 1) / xLength) * i;
          const z = ((randomMap.xLength - 1) / zLength) * j;

          const minI = Math.min(0, Math.floor(x));
          const minJ = Math.min(0, Math.floor(z));
          const maxI = Math.max(randomMap.xLength - 1, Math.ceil(x));
          const maxJ = Math.max(randomMap.zLength - 1, Math.ceil(z));

          const a = randomMap.getHeight(minI, minJ);
          const b = randomMap.getHeight(maxI, minJ);
          const c = randomMap.getHeight(minI, maxJ);
          const d = randomMap.getHeight(maxI, maxJ);

          heightMap[i][j] = smoothInterpolation(a, b, c, d, x, z);

        }
      }

      finalHeightMap.add(new HeightMap(heightMap));

    }
    return finalHeightMap;
  }
}

const smoothInterpolation = (a: number, b: number, c: number, d: number, x: number, z: number) => {
  const i = Math.floor(x);
  const j = Math.floor(z);

  return a
    + (b - a) * gS(x - i)
    + (c - a) * gS(z - j)
    + (a - b - c + d) * gS(x - i) * gS(z - j)
};

const linearInterpolation = (a: number, b: number, c: number, d: number, x: number, z: number) => {
  const i = Math.floor(x);
  const j = Math.floor(z);

  return a
    + (b - a) * (x - i)
    + (c - a) * (z - j)
    + (a - b - c + d) * (x - i) * (z - j)

}

// Smoothstep function
export const gS = (lambda: number) => 3 * Math.pow(lambda, 2) - 2 * Math.pow(lambda, 3);
export const S = (a: number, b: number, x: number) => Math.min(Math.max((x - a) / (b - a), 0), 1);
