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

  private calculateSunPosition(cardinalDirection: number, elevation: number): Vector3 {
    const x = Math.cos(cardinalDirection * Math.PI / 180) * Math.cos(elevation * Math.PI / 180);
    const y = Math.sin(elevation * Math.PI / 180);
    const z = Math.sin(cardinalDirection * Math.PI / 180) * Math.cos(elevation * Math.PI / 180);
    return new Vector3(x, y, z);
  }
}
