import * as THREE from "three";
import { Parameters } from "../ui/parameters.ts";

const { AmbientLight, DirectionalLight, Group, Vector3 } = THREE;
type AmbientLight = THREE.AmbientLight;
type DirectionalLight = THREE.DirectionalLight;
type Vector3 = THREE.Vector3;

export class Lighting extends Group {

  ambientLight: AmbientLight;
  sun: DirectionalLight;

  // cached values
  ambientLightColor: string;
  ambientLightIntensity: number;

  sunColor: string;
  sunIntensity: number;
  sunCardinalAngle: number;
  sunHeightAngle: number;

  get sunPosition(): Vector3 {
    return this.sun.position;
  }

  constructor({ ambientLight, sun }: Parameters['lighting']) {
    super();

    this.ambientLight = new AmbientLight(ambientLight.color, ambientLight.intensity);
    this.add(this.ambientLight);

    this.sun = new DirectionalLight(sun.color, sun.intensity);
    const sunPosition = this.calculateSunPosition(sun.cardinalAngle, sun.heightAngle);
    this.sun.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
    this.add(this.sun);

    this.ambientLightColor = ambientLight.color;
    this.ambientLightIntensity = ambientLight.intensity;

    this.sunColor = sun.color;
    this.sunIntensity = sun.intensity;
    this.sunCardinalAngle = sun.cardinalAngle;
    this.sunHeightAngle = sun.heightAngle;
  }

  updateParameters(newParameters: Parameters['lighting']) {
    if (this.ambientLightColor !== newParameters.ambientLight.color) {
      this.ambientLight.color.set(newParameters.ambientLight.color);
      this.ambientLightColor = newParameters.ambientLight.color;
    }

    if (this.ambientLightIntensity !== newParameters.ambientLight.intensity) {
      this.ambientLight.intensity = newParameters.ambientLight.intensity;
      this.ambientLightIntensity = newParameters.ambientLight.intensity;
    }

    if (this.sunColor !== newParameters.sun.color) {
      this.sun.color.set(newParameters.sun.color);
      this.sunColor = newParameters.sun.color;
    }

    if (this.sunIntensity !== newParameters.sun.intensity) {
      this.sun.intensity = newParameters.sun.intensity;
      this.sunIntensity = newParameters.sun.intensity;
    }

    if (this.sunCardinalAngle !== newParameters.sun.cardinalAngle || this.sunHeightAngle !== newParameters.sun.heightAngle) {
      const sunPosition = this.calculateSunPosition(newParameters.sun.cardinalAngle, newParameters.sun.heightAngle);
      this.sun.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
      this.sunCardinalAngle = newParameters.sun.cardinalAngle;
      this.sunHeightAngle = newParameters.sun.heightAngle;
    }
  }

  /**
   * Calculate the sun position based on the cardinal and height angles
   * @param azimuth in degrees, 0-360
   * @param inversePolar in degrees, 0-90 counts from the horizon to the top of the sky
   * @private
   */
  private calculateSunPosition(azimuth: number, inversePolar: number): Vector3 {
    const azimuthRad =  azimuth * Math.PI / 180;
    const polarRad = (90 - inversePolar) * Math.PI / 180;
    const radis = 500;

    const x = radis * Math.sin(polarRad) * Math.cos(azimuthRad);
    const y = radis * Math.cos(polarRad);
    const z = radis * Math.sin(polarRad) * Math.sin(azimuthRad);

    return new Vector3(x, y, z);
  }
}
