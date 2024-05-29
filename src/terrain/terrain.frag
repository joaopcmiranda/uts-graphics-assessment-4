uniform float uAmbientLightIntensity;
uniform vec3 uAmbientLightColor;
uniform vec3 uSunColor;
uniform vec3 uSunPosition;
uniform float uSunIntensity;
uniform float uRaymarchingSteps;


float terrainOcclusion(vec3 sunPos) {
    float samples = uRaymarchingSteps;
    vec3 position = vec3(vUv, getHeight(vUv));
    float occlusion = 0.0;
    float step = 0.5 / samples;
    for (float i = 0.0; i < samples; i++) {
        vec3 samplePos = position + sunPos * i * step;
        float sampleHeight = getHeight(samplePos.xy);
        if (samplePos.z < sampleHeight) {
            occlusion += smoothstep(0.0, 1.0, (sampleHeight - samplePos.z) / 0.1);
        }
    }
    return occlusion / samples;
}


void main() {


    #ifndef SHOW_NORMAL_MAP

    // Texture calculations
    float noiseFactor = noise(vUv, DEFAULT_SEED) * 0.3;

    vec2 tile = fract(vUv * uTextureDensity);

    vec3 grassColor;
    vec3 grassNormal;
    float grassRoughness;

    // texture mixing
    float grass3amount = smoothstep(0.8, 1.0, fract(getHeight(vUv, 1.0, 5.0, 1.0, 1.0, 1, 300.0 * uGrassSeed)));
    float grass4amount = smoothstep(0.8, 1.0, fract(getHeight(vUv, 1.0, 5.0, 1.0, 1.0, 1, 4000.0 * uGrassSeed)));
    float grass5amount = smoothstep(0.8, 1.0, fract(getHeight(vUv, 1.0, 5.0, 1.0, 1.0, 1, 50000.0 * uGrassSeed)));

    // mix in other textures
    grassColor = mix(texture2D(uGrass1Texture, tile).rgb, texture2D(uGrass3Texture, tile).rgb, grass3amount);
    grassColor = mix(grassColor, texture2D(uGrass4Texture, tile).rgb, grass4amount);
    grassColor = mix(grassColor, texture2D(uGrass5Texture, tile).rgb, grass5amount);

    // Roughness
    grassRoughness = .5 * texture2D(uGrass1TextureRoughness, tile).r;
    grassRoughness += .5 * texture2D(uGrass3TextureRoughness, tile).r * grass3amount;
    grassRoughness += .5 * texture2D(uGrass4TextureRoughness, tile).r * grass4amount;
    grassRoughness += .5 * texture2D(uGrass5TextureRoughness, tile).r * grass5amount;
    grassRoughness /= 4.0;

    // apply normal map
    grassNormal = texture2D(uGrass1TextureNormal, tile).rgb * (1.0 - grass3amount);
    grassNormal += texture2D(uGrass3TextureNormal, tile).rgb * grass3amount;
    grassNormal += texture2D(uGrass4TextureNormal, tile).rgb * grass4amount;
    grassNormal += texture2D(uGrass5TextureNormal, tile).rgb * grass5amount;
    grassNormal = normalize(grassNormal);

    vec3 explicitNormal = getNormal(vUv, .001);
    explicitNormal = vec3(-explicitNormal.x, -explicitNormal.z, explicitNormal.y);
    vec3 normal = mix(explicitNormal, grassNormal, 0.7);

    // Stone texture
    vec3 stoneColor = texture2D(uStoneTexture, tile).rgb;
    float stoneRoughness = texture2D(uStoneTextureRoughness, tile).r;
    float stoneFactor = max(min((1.0 / getFlatness(vUv, 0.0001) * (uStoneThreshold / 100.)), 1.0), 0.0);

    // Final mixes
    vec4 diffuseColor = vec4(mix(grassColor, stoneColor, stoneFactor), opacity);

    // lighting
    vec3 sunPos = vec3(-uSunPosition.x, uSunPosition.z, -uSunPosition.y);
    vec3 lightDir = normalize(sunPos - vPosition);
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 halfDir = normalize(lightDir + viewDir);

    vec3 sunUv = vec3(sunPos.xy / 500. + .5, sunPos.z);

    float NdotL = terrainOcclusion(sunUv);

    vec3 color = diffuseColor.rgb *
    (uAmbientLightColor * uAmbientLightIntensity + uSunColor * uSunIntensity * NdotL);

    // diffuse the color with light grey as it gets further away from the center
    float distance = length(vUv - vec2(0.5, 0.5));
    float fade = distance * 1.5;
    vec3 fragColor = mix(color, vec3(0.7, 0.7, 0.7), smoothstep(0.0, 1., bias(1. - uFogDistance, fade)));

    gl_FragColor = vec4(fragColor, 1.0);

    #else
    gl_FragColor = vec4(vec3(dot(getNormal(vUv, .001), vec3(0., 0., 1.))), 1.0);
    #endif


}
