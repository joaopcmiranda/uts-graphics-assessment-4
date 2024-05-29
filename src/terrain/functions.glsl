uniform vec2 resolution;
uniform float opacity;
uniform float shininess;
uniform float uDecayRate;
uniform float uEdgeOffset;
uniform float uEdgeOffsetThreshold;
uniform float uFogDistance;
uniform float uGrassSeed;
uniform float uInitialAmplitude;
uniform float uInitialFrequency;
uniform float uOffset;
uniform float uRoughness;
uniform float uStoneThreshold;
uniform float uTextureDensity;
uniform int uGenerations;
uniform sampler2D uGrass1Texture;
uniform sampler2D uGrass1TextureNormal;
uniform sampler2D uGrass1TextureRoughness;
uniform sampler2D uGrass3Texture;
uniform sampler2D uGrass3TextureNormal;
uniform sampler2D uGrass3TextureRoughness;
uniform sampler2D uGrass4Texture;
uniform sampler2D uGrass4TextureNormal;
uniform sampler2D uGrass4TextureRoughness;
uniform sampler2D uGrass5Texture;
uniform sampler2D uGrass5TextureNormal;
uniform sampler2D uGrass5TextureRoughness;
uniform sampler2D uStoneTexture;
uniform sampler2D uStoneTextureNormal;
uniform sampler2D uStoneTextureRoughness;
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
varying vec2 vUv;
varying vec3 vPosition;

float bias(float b, float x) {
    return pow(x, log(b) / log(0.5));
}

float noise(vec2 uv0, float seed) {
    return fract(sin(dot(uv0, vec2(12.9898, 78.233))) * seed);
}

/**
    * Fractal Brownian Motion
    * @param uv - the position
    * @return the smoothstep value for that position
    */
float fbm(vec2 uv0, float seed) {
    vec2 va = floor(uv0);
    vec2 vb = va + vec2(1.0, 0.0);
    vec2 vc = va + vec2(0.0, 1.0);
    vec2 vd = va + vec2(1.0, 1.0);

    float a = noise(va, seed);
    float b = noise(vb, seed);
    float c = noise(vc, seed);
    float d = noise(vd, seed);

    vec2 f = fract(uv0);

    return a +
    (b - a) * smoothstep(0.0, 1.0, f.x) +
    (c - a) * smoothstep(0.0, 1.0, f.y) +
    (a - b - c + d) * smoothstep(0.0, 1.0, f.x) * smoothstep(0.0, 1.0, f.y);
}

float getHeight(vec2 uv, float initialAmplitude, float initialFrequency, float roughness, float decayRate, int generations, float seed) {
    float height = 0.0;
    float amplitude = initialAmplitude;
    float frequency = initialFrequency;

    for (int i = 0; i < generations; i++) {
        float n = fbm(uv * frequency, seed);
        float v = n * amplitude;
        height += v;
        frequency *= pow(2.0, roughness);
        amplitude /= pow(2.0, decayRate);
    }

    return height;
}


float getHeight(vec2 uv) {
    float height = getHeight(uv, uInitialAmplitude, uInitialFrequency, uRoughness, uDecayRate, uGenerations, DEFAULT_SEED);

    vec2 centeredUv = uv * 2.0 - 1.0;

    height += smoothstep(0., 1., bias(.1, length(centeredUv))) * uEdgeOffset;

    return height;

}

vec3 getNormal(vec2 uv, float d) {
    vec2 neighbour1 = vec2(uv.x + d, uv.y);
    vec2 neighbour2 = vec2(uv.x, uv.y + d);

    vec3 edge1 = vec3(neighbour1 - uv, getHeight(neighbour1) - getHeight(uv));
    vec3 edge2 = vec3(neighbour2 - uv, getHeight(neighbour2) - getHeight(uv));

    return normalize(cross(edge1, edge2));
}


float getFlatness(vec2 uv, float d) {
    vec3 normal = getNormal(uv, d);
    //compare with vector pointing up
    return dot(normal, vec3(0.0, 0.0, 1.0));
}

vec2 getUv(vec2 position) {
    return vec2(position.x / resolution.x, position.y / resolution.y);
}
