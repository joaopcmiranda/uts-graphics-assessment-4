varying vec3 vNormal;
varying vec3 vViewPosition;

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
