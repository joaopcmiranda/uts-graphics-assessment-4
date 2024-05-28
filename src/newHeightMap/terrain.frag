#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
varying float vFlatness;
varying vec2 vUv;
varying vec3 vPosition;

uniform float uFogDistance;

// Ambient light
uniform vec3 uAmbientLightColor;
uniform float uAmbientLightIntensity;

// Sun
uniform vec3 uSunPosition;
uniform vec3 uSunColor;
uniform float uSunIntensity;

// Textures
uniform float uStoneThreshold;
uniform float uTextureDensity;
uniform float uGrassSeed;
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

#include <common>


#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {


    #ifndef SHOW_NORMAL_MAP
    vec3 sunPos = uSunPosition.xzy;
    vec3 lightDir = normalize(sunPos - vPosition);
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 halfDir = normalize(lightDir + viewDir);

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

    // Stone texture
    vec3 stoneColor = texture2D(uStoneTexture, tile).rgb;
    float stoneRoughness = texture2D(uStoneTextureRoughness, tile).r;
    float stoneFactor = max(min((1.0 / vFlatness * (uStoneThreshold / 100.)), 1.0), 0.0);

    // Final mixes
    vec4 diffuseColor = vec4(mix(grassColor, stoneColor, stoneFactor), opacity);


    #include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    vec3 totalEmissiveRadiance = emissive;
    #include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
     normal = normalize(vNormal + grassNormal * .1);
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
    #include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

    #include <dithering_fragment>
    // diffuse the color with light grey as it gets further away from the center
    float distance = length(vUv - vec2(0.5, 0.5));
    float fade = distance * 2.0;
    vec3 fragColor = mix(gl_FragColor.rgb, vec3(0.7, 0.7, 0.7), smoothstep(0.0, 1., bias(1. - uFogDistance, fade)));

    gl_FragColor = vec4(fragColor, 1.0);

    #else
    gl_FragColor = vec4(vNormal, 1.0);
    #endif


}
