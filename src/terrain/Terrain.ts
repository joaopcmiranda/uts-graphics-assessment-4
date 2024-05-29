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

const { PlaneGeometry, TextureLoader, Mesh, MeshPhongMaterial } = THREE;
type PlaneGeometry = THREE.PlaneGeometry;
type MeshPhongMaterial = THREE.MeshPhongMaterial;

export class Terrain extends Mesh<PlaneGeometry, MeshPhongMaterial> {

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
  private p_edgeOffsetThreshold: number;
  private p_uTextureDensity: number;
  private p_grassSeed: number;
  private p_stoneThreshold: number;
  private p_fogDistance: number;
  private p_terrainSeed: number;

  constructor(parameters: Parameters['landscape']) {
    const geometry = new PlaneGeometry(parameters.xLength, parameters.zLength, parameters.xLength * parameters.polyCount, parameters.zLength * parameters.polyCount);

    console.log('Terrain material');
    const material = new MeshPhongMaterial({
      color: 0x00ff00,
      side: THREE.FrontSide
    });
    material.onBeforeCompile = (shader) => {

      shader.uniforms = {
        ...shader.uniforms,
        uGenerations: { value: parameters.generations },
        uDecayRate: { value: parameters.amplitudeDecayRate },
        uRoughness: { value: parameters.roughness },
        uInitialAmplitude: { value: parameters.scale },
        uInitialFrequency: { value: parameters.hillDensity },
        uOffset: { value: parameters.offset },
        uEdgeOffset: { value: parameters.edgeOffset },
        uEdgeOffsetThreshold: { value: parameters.edgeOffsetThreshold },
        uTextureDensity: { value: parameters.uTextureDensity },
        uGrassSeed: { value: parameters.grassSeed },
        uStoneThreshold: { value: parameters.stoneThreshold },
        uFogDistance: { value: parameters.fogDistance },

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
      }

      shader.defines = {
        ...shader.defines,
        WIDTH: (parameters.xLength * parameters.polyCount).toFixed(1),
        HEIGHT: (parameters.zLength * parameters.polyCount).toFixed(1),
        BOUNDSX: parameters.xLength.toFixed(1),
        BOUNDSY: parameters.zLength.toFixed(1),
        DEFAULT_SEED: parameters.terrainSeed.toFixed(6),
        SHOW_NORMAL_MAP: parameters.normalMap
      }

      shader.fragmentShader = functionsShader + terrainFragmentShader;
      shader.vertexShader = functionsShader + terrainVertexShader;
    };

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
    this.p_edgeOffsetThreshold = parameters.edgeOffsetThreshold;
    this.p_uTextureDensity = parameters.uTextureDensity;
    this.p_grassSeed = parameters.grassSeed;
    this.p_stoneThreshold = parameters.stoneThreshold;
    this.p_fogDistance = parameters.fogDistance;
    this.p_normalMap = parameters.normalMap;
  }

  updateParameters(newParameters: Parameters['landscape']) {

    if (this.p_xLength !== newParameters.xLength || this.p_zLength !== newParameters.zLength || this.p_polyCount !== newParameters.polyCount) {
      this.geometry.dispose();
      this.geometry = new PlaneGeometry(newParameters.xLength, newParameters.zLength, newParameters.xLength * newParameters.polyCount, newParameters.zLength * newParameters.polyCount);
      this.p_xLength = newParameters.xLength;
      this.p_zLength = newParameters.zLength;
      this.p_polyCount = newParameters.polyCount;
    }

    if (this.p_terrainSeed !== newParameters.terrainSeed) {
      this.material.userData.shader.defines.DEFAULT_SEED = newParameters.terrainSeed.toFixed(6);
      this.material.needsUpdate = true;
      this.p_terrainSeed = newParameters.terrainSeed;
    }
    if (this.p_generations !== newParameters.generations) {
      this.material.userData.shader.uniforms.uGenerations.value = newParameters.generations;
      this.p_generations = newParameters.generations;
    }
    if (this.p_amplitudeDecayRate !== newParameters.amplitudeDecayRate) {
      this.material.userData.shader.uniforms.uDecayRate.value = newParameters.amplitudeDecayRate;
      this.p_amplitudeDecayRate = newParameters.amplitudeDecayRate;
    }
    if (this.p_roughness !== newParameters.roughness) {
      this.material.userData.shader.uniforms.uRoughness.value = newParameters.roughness;
      this.p_roughness = newParameters.roughness;
    }
    if (this.p_scale !== newParameters.scale) {
      this.material.userData.shader.uniforms.uInitialAmplitude.value = newParameters.scale;
      this.p_scale = newParameters.scale;
    }
    if (this.p_hillDensity !== newParameters.hillDensity) {
      this.material.userData.shader.uniforms.uInitialFrequency.value = newParameters.hillDensity;
      this.p_hillDensity = newParameters.hillDensity;
    }
    if (this.p_offset !== newParameters.offset) {
      this.material.userData.shader.uniforms.uOffset.value = newParameters.offset;
      this.p_offset = newParameters.offset;
    }
    if (this.p_edgeOffset !== newParameters.edgeOffset) {
      this.material.userData.shader.uniforms.uEdgeOffset.value = newParameters.edgeOffset;
      this.p_edgeOffset = newParameters.edgeOffset;
    }
    if (this.p_edgeOffsetThreshold !== newParameters.edgeOffsetThreshold) {
      this.material.userData.shader.uniforms.uEdgeOffsetThreshold.value = newParameters.edgeOffsetThreshold;
      this.p_edgeOffsetThreshold = newParameters.edgeOffsetThreshold;
    }
    if (this.p_uTextureDensity !== newParameters.uTextureDensity) {
      this.material.userData.shader.uniforms.uTextureDensity.value = newParameters.uTextureDensity;
      this.p_uTextureDensity = newParameters.uTextureDensity;
    }
    if (this.p_grassSeed !== newParameters.grassSeed) {
      this.material.userData.shader.uniforms.uGrassSeed.value = newParameters.grassSeed;
      this.p_grassSeed = newParameters.grassSeed;
    }
    if (this.p_stoneThreshold !== newParameters.stoneThreshold) {
      this.material.userData.shader.uniforms.uStoneThreshold.value = newParameters.stoneThreshold;
      this.p_stoneThreshold = newParameters.stoneThreshold;
    }
    if (this.p_fogDistance !== newParameters.fogDistance) {
      this.material.userData.shader.uniforms.uFogDistance.value = newParameters.fogDistance;
      this.p_fogDistance = newParameters.fogDistance;
    }
    if (this.p_normalMap !== newParameters.normalMap) {
      this.material.userData.shader.defines.SHOW_NORMAL_MAP = newParameters.normalMap;
      this.material.needsUpdate = true;
      this.p_normalMap = newParameters.normalMap;
    }
  }
}
