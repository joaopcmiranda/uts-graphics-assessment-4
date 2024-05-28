uniform int uGenerations;
uniform float uDecayRate;
uniform float uRoughness;
uniform float uInitialAmplitude;
uniform float uInitialFrequency;
uniform float uOffset;
uniform float uEdgeOffset;
uniform float uEdgeOffsetThreshold;

varying vec2 vUv;
varying vec3 vNormal;
varying float vFlatness;
varying vec3 vPosition;
varying vec3 vViewPosition;

float getHeight(vec2 uv) {
    float height = getHeight(uv, uInitialAmplitude, uInitialFrequency, uRoughness, uDecayRate, uGenerations, DEFAULT_SEED);

    vec2 centeredUv = uv * 2.0 - 1.0;

    if (length(centeredUv) > uEdgeOffsetThreshold) {
        height += smoothstep(0., 1., bias(.1, length(centeredUv))) * uEdgeOffset;
    }

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

void main() {

    vUv = uv;

    // get the height
    float height = getHeight(uv) + uOffset;

    vNormal = getNormal(uv, 0.000001).xyz;
    vFlatness = getFlatness(uv, .1);

    // move the position along the normal and transform it
    vec3 newPosition = position + normal * height;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vPosition = gl_Position.xyz;
}
