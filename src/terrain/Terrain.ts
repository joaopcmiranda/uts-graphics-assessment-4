import * as THREE from "three";
import terrainVertexShader from "./terrain.vert?raw";
import terrainFragmentShader from "./terrain.frag?raw";
import functionsShader from "./functions.glsl?raw";
import grass1ColorTexture from "./texture/grass1/Grass_001_COLOR.jpg";
import grass1NormalTexture from "./texture/grass1/Grass_001_NORM.jpg";
import grass1RoughnessTexture from "./texture/grass1/Grass_001_ROUGH.jpg";

import grass3ColorTexture from "./texture/grass3/Grass_003_COLOR.jpg";
import grass3NormalTexture from "./texture/grass3/Grass_003_NRM.jpg";
import grass3RoughnessTexture from "./texture/grass3/Grass_003_ROUGH.jpg";

import grass4ColorTexture from "./texture/grass4/Grass_004_COLOR.jpg";
import grass4NormalTexture from "./texture/grass4/Grass_004_NORM.jpg";
import grass4RoughnessTexture from "./texture/grass4/Grass_004_ROUGH.jpg";

import grass5ColorTexture from "./texture/grass5/Grass_005_BaseColor.jpg";
import grass5NormalTexture from "./texture/grass5/Grass_005_Normal.jpg";
import grass5RoughnessTexture from "./texture/grass5/Grass_005_Roughness.jpg";

import stoneColorTexture from "./texture/stone/Stone_001_COLOR.jpg";
import stoneNormalTexture from "./texture/stone/Stone_001_NRM.jpg";
import stoneRoughnessTexture from "./texture/stone/Stone_001_ROUGH.jpg";
import { Parameters } from "../ui/parameters.ts";

const { PlaneGeometry, TextureLoader, Mesh, ShaderMaterial, Vector2 } = THREE;
type PlaneGeometry = THREE.PlaneGeometry;
type ShaderMaterial = THREE.ShaderMaterial;
type Vector3 = THREE.Vector3;

export class Terrain extends Mesh<PlaneGeometry, ShaderMaterial> {

  private p_normalMap: boolean;
  private p_xLength: number;
  private p_zLength: number;
  private p_hillDensity: number;
  private p_roughness: number;
  private p_scale: number;
  private p_polyCount: number;
  private p_generations: number;
  private p_amplitudeDecayRate: number;
  private p_offset: number;
  private p_edgeOffset: number;
  private p_uTextureDensity: number;
  private p_grassSeed: number;
  private p_stoneThreshold: number;
  private p_fogDistance: number;
  private p_terrainSeed: number;

  // sun
  private p_sunIntensity: number;
  private p_sunColor: string;
  private p_sunPosition: Vector3;
  private p_raymarchingSteps: number;

  // ambient light
  private p_ambientIntensity: number;
  private p_ambientColor: string;

  constructor(parameters: Parameters['landscape'], sunPosition: Vector3, lightingParameters: Parameters['lighting']) {
    const geometry = new PlaneGeometry(parameters.xLength, parameters.zLength, parameters.xLength * parameters.polyCount, parameters.zLength * parameters.polyCount);

    console.log('Terrain material');
    const material = new ShaderMaterial({
      uniforms:
        {
          resolution: { value: new Vector2( parameters.xLength, parameters.zLength ) },
          uGenerations: { value: parameters.generations },
          uDecayRate: { value: parameters.amplitudeDecayRate },
          uRoughness: { value: parameters.roughness },
          uInitialAmplitude: { value: parameters.scale },
          uInitialFrequency: { value: parameters.hillDensity },
          uOffset: { value: parameters.offset },
          uEdgeOffset: { value: parameters.edgeOffset },
          uTextureDensity: { value: parameters.uTextureDensity },
          uGrassSeed: { value: parameters.grassSeed },
          uStoneThreshold: { value: parameters.stoneThreshold },
          uFogDistance: { value: parameters.fogDistance },

          // lighting
          uSunIntensity: { value: lightingParameters.sun.intensity },
          uSunColor: { value: new THREE.Color(lightingParameters.sun.color) },
          uSunPosition: { value: sunPosition.clone() },
          uAmbientLightIntensity: { value: lightingParameters.ambientLight.intensity },
          uAmbientLightColor: { value: new THREE.Color(lightingParameters.ambientLight.color) },
          uRaymarchingSteps: { value: lightingParameters.sun.raymarchingSteps },


          // textures
          uGrass1Texture: { value: new TextureLoader().load(grass1ColorTexture) },
          uGrass1TextureNormal: { value: new TextureLoader().load(grass1NormalTexture) },
          uGrass1TextureRoughness: { value: new TextureLoader().load(grass1RoughnessTexture) },
          uGrass3Texture: { value: new TextureLoader().load(grass3ColorTexture) },
          uGrass3TextureNormal: { value: new TextureLoader().load(grass3NormalTexture) },
          uGrass3TextureRoughness: { value: new TextureLoader().load(grass3RoughnessTexture) },
          uGrass4Texture: { value: new TextureLoader().load(grass4ColorTexture) },
          uGrass4TextureNormal: { value: new TextureLoader().load(grass4NormalTexture) },
          uGrass4TextureRoughness: { value: new TextureLoader().load(grass4RoughnessTexture) },
          uGrass5Texture: { value: new TextureLoader().load(grass5ColorTexture) },
          uGrass5TextureNormal: { value: new TextureLoader().load(grass5NormalTexture) },
          uGrass5TextureRoughness: { value: new TextureLoader().load(grass5RoughnessTexture) },
          uStoneTexture: { value: new TextureLoader().load(stoneColorTexture) },
          uStoneTextureNormal: { value: new TextureLoader().load(stoneNormalTexture) },
          uStoneTextureRoughness: { value: new TextureLoader().load(stoneRoughnessTexture) }
        },
      defines: {
        WIDTH: (parameters.xLength * parameters.polyCount).toFixed(1),
        HEIGHT: (parameters.zLength * parameters.polyCount).toFixed(1),
        BOUNDSX: parameters.xLength.toFixed(1),
        BOUNDSY: parameters.zLength.toFixed(1),
        DEFAULT_SEED: parameters.terrainSeed.toFixed(6),
        SHOW_NORMAL_MAP: parameters.normalMap,
        PI: Math.PI.toFixed(6)
      },
      fragmentShader: functionsShader + terrainFragmentShader,
      vertexShader: functionsShader + terrainVertexShader
    });

    console.log('Terrain super');

    super(geometry, material);

    console.log('Terrain cache');

    // cache the values
    this.p_terrainSeed = parameters.terrainSeed;
    this.p_xLength = parameters.xLength;
    this.p_zLength = parameters.zLength;
    this.p_polyCount = parameters.polyCount;
    this.p_generations = parameters.generations;
    this.p_amplitudeDecayRate = parameters.amplitudeDecayRate;
    this.p_roughness = parameters.roughness;
    this.p_scale = parameters.scale;
    this.p_hillDensity = parameters.hillDensity;
    this.p_offset = parameters.offset;
    this.p_edgeOffset = parameters.edgeOffset;
    this.p_uTextureDensity = parameters.uTextureDensity;
    this.p_grassSeed = parameters.grassSeed;
    this.p_stoneThreshold = parameters.stoneThreshold;
    this.p_fogDistance = parameters.fogDistance;
    this.p_normalMap = parameters.normalMap;
    this.p_sunIntensity = lightingParameters.sun.intensity;
    this.p_sunColor = lightingParameters.sun.color;
    this.p_sunPosition = sunPosition.clone();
    this.p_ambientIntensity = lightingParameters.ambientLight.intensity;
    this.p_ambientColor = lightingParameters.ambientLight.color;
    this.p_raymarchingSteps = lightingParameters.sun.raymarchingSteps;
  }

  updateParameters(newParameters: Parameters['landscape'], sunPosition: Vector3, lightingParameters: Parameters['lighting']) {

    if (this.p_xLength !== newParameters.xLength || this.p_zLength !== newParameters.zLength || this.p_polyCount !== newParameters.polyCount) {
      this.geometry.dispose();
      this.geometry = new PlaneGeometry(newParameters.xLength, newParameters.zLength, newParameters.xLength * newParameters.polyCount, newParameters.zLength * newParameters.polyCount);
      this.p_xLength = newParameters.xLength;
      this.p_zLength = newParameters.zLength;
      this.p_polyCount = newParameters.polyCount;
      this.material.uniforms.resolution.value = new Vector2(newParameters.xLength, newParameters.zLength);
    }

    if (this.p_terrainSeed !== newParameters.terrainSeed) {
      this.material.defines.DEFAULT_SEED = newParameters.terrainSeed.toFixed(6);
      this.material.needsUpdate = true;
      this.p_terrainSeed = newParameters.terrainSeed;
    }
    if (this.p_generations !== newParameters.generations) {
      this.material.uniforms.uGenerations.value = newParameters.generations;
      this.p_generations = newParameters.generations;
    }
    if (this.p_amplitudeDecayRate !== newParameters.amplitudeDecayRate) {
      this.material.uniforms.uDecayRate.value = newParameters.amplitudeDecayRate;
      this.p_amplitudeDecayRate = newParameters.amplitudeDecayRate;
    }
    if (this.p_roughness !== newParameters.roughness) {
      this.material.uniforms.uRoughness.value = newParameters.roughness;
      this.p_roughness = newParameters.roughness;
    }
    if (this.p_scale !== newParameters.scale) {
      this.material.uniforms.uInitialAmplitude.value = newParameters.scale;
      this.p_scale = newParameters.scale;
    }
    if (this.p_hillDensity !== newParameters.hillDensity) {
      this.material.uniforms.uInitialFrequency.value = newParameters.hillDensity;
      this.p_hillDensity = newParameters.hillDensity;
    }
    if (this.p_offset !== newParameters.offset) {
      this.material.uniforms.uOffset.value = newParameters.offset;
      this.p_offset = newParameters.offset;
    }
    if (this.p_edgeOffset !== newParameters.edgeOffset) {
      this.material.uniforms.uEdgeOffset.value = newParameters.edgeOffset;
      this.p_edgeOffset = newParameters.edgeOffset;
    }
    if (this.p_uTextureDensity !== newParameters.uTextureDensity) {
      this.material.uniforms.uTextureDensity.value = newParameters.uTextureDensity;
      this.p_uTextureDensity = newParameters.uTextureDensity;
    }
    if (this.p_grassSeed !== newParameters.grassSeed) {
      this.material.uniforms.uGrassSeed.value = newParameters.grassSeed;
      this.p_grassSeed = newParameters.grassSeed;
    }
    if (this.p_stoneThreshold !== newParameters.stoneThreshold) {
      this.material.uniforms.uStoneThreshold.value = newParameters.stoneThreshold;
      this.p_stoneThreshold = newParameters.stoneThreshold;
    }
    if (this.p_fogDistance !== newParameters.fogDistance) {
      this.material.uniforms.uFogDistance.value = newParameters.fogDistance;
      this.p_fogDistance = newParameters.fogDistance;
    }
    if (this.p_normalMap !== newParameters.normalMap) {
      this.material.defines.SHOW_NORMAL_MAP = newParameters.normalMap;
      this.material.needsUpdate = true;
      this.p_normalMap = newParameters.normalMap;
    }
    if (this.p_sunIntensity !== lightingParameters.sun.intensity) {
      this.material.uniforms.uSunIntensity.value = lightingParameters.sun.intensity;
      this.p_sunIntensity = lightingParameters.sun.intensity;
    }
    if (this.p_sunColor !== lightingParameters.sun.color) {
      this.material.uniforms.uSunColor.value = new THREE.Color(lightingParameters.sun.color);
      this.p_sunColor = lightingParameters.sun.color;
    }
    if (this.p_sunPosition.x !== sunPosition.x || this.p_sunPosition.y !== sunPosition.y || this.p_sunPosition.z !== sunPosition.z) {
      console.log('updating sun position', sunPosition.clone());
      this.material.uniforms.uSunPosition.value = sunPosition.clone();
      this.p_sunPosition = sunPosition.clone();
    }
    if (this.p_ambientIntensity !== lightingParameters.ambientLight.intensity) {
      this.material.uniforms.uAmbientLightIntensity.value = lightingParameters.ambientLight.intensity;
      this.p_ambientIntensity = lightingParameters.ambientLight.intensity;
    }
    if (this.p_ambientColor !== lightingParameters.ambientLight.color) {
      this.material.uniforms.uAmbientLightColor.value = new THREE.Color(lightingParameters.ambientLight.color);
      this.p_ambientColor = lightingParameters.ambientLight.color;
    }
    if (this.p_raymarchingSteps !== lightingParameters.sun.raymarchingSteps) {
      this.material.uniforms.uRaymarchingSteps.value = lightingParameters.sun.raymarchingSteps;
      this.p_raymarchingSteps = lightingParameters.sun.raymarchingSteps;
    }
  }
}
