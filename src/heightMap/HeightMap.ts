import { decode } from "fast-png";
import { Vector2 } from "three";

export class HeightMap {
  private readonly _heightMap: Float32Array;
  public readonly xLength;
  public readonly zLength;

  constructor(
    _heightMap: Float32Array,
    xLength: number,
    zLength: number) {
    this._heightMap = _heightMap;
    this.xLength = xLength;
    this.zLength = zLength;
  }

  /**
   * Returns the height at the specified coordinates.
   *
   * @param {number} i - The x-coordinate
   * @param {number} j - The z-coordinate
   * @return {number} - The height at the specified coordinates
   */
  private getHeight(i: number, j: number): number {
    // Use 1D indexing for 2D data
    return this._heightMap[i * this.zLength + j];
  }

  /**
   * Returns the height at the normalized coordinates (x, z).
   * Dimensions are normalized to the range [0, 1].
   * If the coordinates are out of bounds, the height is 0.
   * Height in unknown areas is interpolated using smooth interpolation.
   *
   * @param {number} x - The x-coordinate
   * @param {number} z - The z-coordinate
   * @return {number} - The height at the specified coordinates
   */
  public getSmoothHeightAt(x: number, z: number): number {
    // Out of bounds
    if (x < 0 || x >= 1 || z < 0 || z >= 1) {
      return 0;
    }

    const xPos = x * (this.xLength - 1);
    const zPos = z * (this.zLength - 1);

    // Interpolate between the 4 points
    const minX = Math.floor(xPos);
    const minZ = Math.floor(zPos);
    const maxX = Math.min(this.zLength - 1, minX + 1);
    const maxZ = Math.min(this.xLength - 1, minZ + 1);

    const a = this.getHeight(minX, minZ);
    const b = this.getHeight(maxX, minZ);
    const c = this.getHeight(minX, maxZ);
    const d = this.getHeight(maxX, maxZ);

    // linear interpolation

    return smoothInterpolation(a, b, c, d, xPos, zPos);

  }

  /**
   * Returns the height at the normalized coordinates (x, z).
   * Dimensions are normalized to the range [0, 1].
   * If the coordinates are out of bounds, the height is 0.
   * Height in unknown areas is interpolated using linear interpolation.
   *
   * @param {number} x - The x-coordinate
   * @param {number} z - The z-coordinate
   * @return {number} - The height at the specified coordinates
   */
  public getHeightAt(x: number, z: number): number {
    // Out of bounds
    if (x < 0 || x >= 1 || z < 0 || z >= 1) {
      return 0;
    }

    const xPos = x * (this.xLength - 1);
    const zPos = z * (this.zLength - 1);

    // Interpolate between the 4 points
    const minX = Math.floor(xPos);
    const minZ = Math.floor(zPos);
    const maxX = Math.min(this.zLength - 1, minX + 1);
    const maxZ = Math.min(this.xLength - 1, minZ + 1);

    const a = this.getHeight(minX, minZ);
    const b = this.getHeight(maxX, minZ);
    const c = this.getHeight(minX, maxZ);
    const d = this.getHeight(maxX, maxZ);

    // linear interpolation
    const xLambda = xPos - minX;
    const zLambda = zPos - minZ;

    const ab = a + (b - a) * xLambda;
    const cd = c + (d - c) * xLambda;

    return ab + (cd - ab) * zLambda;
  }

  /**
   * Adds the values from a given height map to the current height map.
   * Fills missing values with 0.
   *
   * MODIFIES THE CURRENT HEIGHT MAP
   *
   * @param {HeightMap} heightMap - The height map to be added.
   * @return {this} - The current instance of the height map after the addition.
   */
  public add(heightMap: HeightMap): this {
    const maxI = Math.min(this.zLength, heightMap.zLength);
    const maxJ = Math.min(this.xLength, heightMap.xLength);

    for (let i = 0; i < maxI; i++) {
      for (let j = 0; j < maxJ; j++) {
        this._heightMap[i * this.zLength + j] += heightMap.getHeight(i, j);
      }
    }

    return this;
  }

  public clone(): HeightMap {
    return new HeightMap(this._heightMap.slice(), this.xLength, this.zLength);
  }

  public trim(): this {
    // find the min height;
    let min = Infinity;

    for (let i = 0; i < this._heightMap.length; i++) {
      min = Math.min(min, this._heightMap[i]);
    }

    // subtract the min height from all heights
    for (let i = 0; i < this._heightMap.length; i++) {
      this._heightMap[i] -= min;
    }

    return this;
  }

  /**
   * Adds the heights from the given HeightMap to this HeightMap.
   * The map is scaled to fit the dimensions of this HeightMap.
   *
   * MODIFIES THE CURRENT HEIGHT MAP
   *
   * @param {HeightMap} heightMap - The HeightMap to add.
   * @return {this} - Returns this HeightMap with the added heights.
   */
  public scaledAdd(heightMap: HeightMap): this {
    const maxI = this.zLength;
    const maxJ = this.xLength;

    for (let i = 0; i < maxI; i++) {
      const x = i / maxI;
      for (let j = 0; j < maxJ; j++) {
        const z = j / maxJ;
        this._heightMap[i * this.zLength + j] += heightMap.getSmoothHeightAt(x, z);
      }
    }

    return this;
  }

  /**
   * Converts a PNG file into a HeightMap object.
   *
   * @param {string} png - The PNG file to convert.
   * @return {Promise<HeightMap>} - A Promise that resolves with the generated HeightMap object.
   */
  static async fromPng(png: string): Promise<HeightMap> {
    const pngFile = await fetch(png);
    const { width, height, data: pngData, depth } = decode(await pngFile.arrayBuffer());

    const heightMap = new Float32Array(width * height);

    for (let i = 0; i < heightMap.length; i++) {
      const data = pngData[i];
      heightMap[i] = data / Math.pow(2, depth);
    }

    return new HeightMap(heightMap, height, width);
  };

  /**
   * Generates a flat HeightMap object with the specified dimensions.
   *
   * @param {number} xLength - The x-dimension of the HeightMap.
   * @param {number} zLength - The z-dimension of the HeightMap.
   * @param {number} height - The height of the flat HeightMap.
   * @return {HeightMap} - The generated flat HeightMap object.
   */
  static flat(xLength: number, zLength: number, height: number = 0): HeightMap {
    // Create a flat typed array instead of a 2D array
    const heightMap = new Float32Array(xLength * zLength);

    // Initialize the array with the height
    heightMap.fill(height);

    return new HeightMap(heightMap, xLength, zLength);
  }

  /**
   * Generates a random HeightMap object with the specified dimensions.
   *
   * @param {number} xLength - The x-dimension of the HeightMap.
   * @param {number} ZLength - The z-dimension of the HeightMap.
   * @param {number} min - The minimum height of the random HeightMap.
   * @param {number} max - The maximum height of the random HeightMap.
   * @return {HeightMap} - The generated random HeightMap object.
   */
  static random(xLength: number, zLength: number, min: number = 0, max: number = 1): HeightMap {
    const heightMap = new Float32Array(xLength * zLength);

    for (let i = 0; i < heightMap.length; i++) {
      heightMap[i] = Math.random() * (max - min) + min;
    }

    return new HeightMap(heightMap, xLength, zLength);
  }

  /**
   * Generates a HeightMap object with the specified dimensions.
   *
   * @param {number} xLength - The x-dimension of the HeightMap.
   * @param {number} _ZLength - The z-dimension of the HeightMap.
   * @param {number} generations - The number of generations to perform.
   * @return {HeightMap} - The generated HeightMap object.
   */
  static generate(resolution: Vector2, initialDensity: number, generations: number = 1): HeightMap {
    if (generations < 1) {
      throw new Error("Generations must be greater than 0.");
    }
    if (initialDensity < 1) {
      throw new Error("Density must be greater than 0.");
    }

    initialDensity /= 10;

    let ratio = resolution.x / resolution.y;
    let _xLength;
    let _zLength;
    // Ensure the ratio is greater than 1
    if (ratio >= 1) {

      _xLength = Math.floor(ratio * initialDensity);
      _zLength = Math.floor(initialDensity);
    } else {

      _xLength = Math.floor(initialDensity);
      _zLength = Math.floor((1 / ratio) * initialDensity);
    }


    const xLength = Math.max(1, _xLength);
    const zLength = Math.max(1, _zLength);

    const finalHeightMap = HeightMap.flat(resolution.x, resolution.y);

    const initialMax = 0.1;

    for (let i = 0; i < generations; i++) {

      finalHeightMap.trim();

      const density = initialDensity * Math.pow(2, i);
      const max = initialMax / Math.pow(2, i);

      const randomXLength = Math.max(1, Math.floor(density * xLength));
      const randomZLength = Math.max(1, Math.floor(density * zLength));

      if (randomXLength > 4 * resolution.x || randomZLength > 4 * resolution.y) {
        break;
      }

      const randomMap = HeightMap.random(randomXLength, randomZLength, 0, max);
      finalHeightMap.scaledAdd(randomMap);

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

// Smoothstep function
export const gS = (lambda: number) => 3 * Math.pow(lambda, 2) - 2 * Math.pow(lambda, 3);
export const S = (a: number, b: number, x: number) => Math.min(Math.max((x - a) / (b - a), 0), 1);
