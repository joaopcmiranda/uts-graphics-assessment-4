varying vec3 vViewPosition;

void main() {

    vUv = uv;

    // get the height
    float height = getHeight(uv) + uOffset;

    // move the position along the normal and transform it
    vec3 newPosition = position + normal * height;
    vPosition = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
