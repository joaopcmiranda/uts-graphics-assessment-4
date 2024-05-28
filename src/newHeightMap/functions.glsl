

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

