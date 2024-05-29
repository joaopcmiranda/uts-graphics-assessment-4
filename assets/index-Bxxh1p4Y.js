(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const q="/assets/three.module-Bo3fKqwW.js",T=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"})),{Clock:j,PerspectiveCamera:$,Scene:K,Vector3:N,WebGLRenderer:Q}=T,F=window.innerWidth,X=()=>{var p;let r,e,s,t,n,o;r=new Q,r.setSize(F,window.innerHeight),(p=document.getElementById("app"))==null||p.appendChild(r.domElement);const a=()=>{const f=window.innerWidth,d=window.innerHeight;r.setSize(f,d),t.aspect=f/d,t.updateProjectionMatrix(),r.render(e,t)};window.addEventListener("resize",a,!1),e=new K,t=new $(45,F/window.innerHeight,.1,3e3),s=new(void 0)(t,r.domElement);const i=async f=>{n=f;const d=new N(0,150,150);t.position.set(d.x,d.y,d.z);const g=new N(0,0,0);t.lookAt(g.x,g.y,g.z),s.minDistance=1,s.maxDistance=500,s.enableDamping=!0;try{const b=await(f==null?void 0:f({renderer:r,scene:e,orbit:s,camera:t}))??{};return{renderer:r,scene:e,orbit:s,camera:t,...b}}catch(b){console.trace(),console.error(b)}};let l={ID:0};const c=f=>{o=f,l.ID++,console.log("loopID",l);const d=new j,g=l.ID,b=()=>{if(l.ID!==g){console.log("Loop ID changed, stopping loop #",g,"current loop ID",l.ID);return}const D=d.getDelta();try{o({clock:d,delta:D,renderer:r,orbit:s,camera:t,scene:e})}catch(L){console.error(L);return}l.ID===g&&(s.update(D),r.render(e,t),l.ID===g&&requestAnimationFrame(b))};requestAnimationFrame(b)};return{start:i,update:c,reset:()=>{e.remove.apply(e,e.children),i(n),c(o)},resetCameraToDefault:()=>{t.position.set(0,150,150),t.lookAt(0,0,0)}}},Y="/assets/lil-gui.esm-DHz0mpAs.js",Z=r=>({paused:{type:"boolean",name:"Paused Simulation",default:!1},wireframe:{type:"boolean",name:"Wireframe",default:!1},coaster:{name:"Coaster",type:"folder",children:{tracks:{name:"Tracks",type:"folder",children:{halfTrackWidth:{type:"number",name:"Half Track Width",min:.1,max:5,step:.1,default:1},trackRadius:{type:"number",name:"Track Radius",min:.1,max:2,step:.1,default:.3},crossbarSpacing:{type:"number",name:"Crossbar Spacing",min:.1,max:10,step:.1,default:5},crossbarRadius:{type:"number",name:"Crossbar Radius",min:.1,max:1,step:.1,default:.2},supportSpacing:{type:"number",name:"Support Spacing",min:0,max:30,step:1,default:8},supportRadius:{type:"number",name:"Support Radius",min:.1,max:1,step:.1,default:.2},supportWidth:{type:"number",name:"Support Width",min:.1,max:10,step:.1,default:5}}},enabled:{type:"boolean",name:"Show Coaster",default:!0},fpv:{type:"boolean",name:"First Person View",default:!1},gravity:{type:"number",name:"Gravity",min:0,max:200,step:.1,default:10},friction:{type:"number",name:"Friction",min:0,max:.1,step:.001,default:.005},liftSpeed:{type:"number",name:"Lift Speed",min:0,max:20,step:.1,default:10}}},landscape:{name:"Landscape",type:"folder",children:{normalMap:{type:"boolean",name:"Normal Map",default:!1},terrainSeed:{type:"number",name:"Terrain Seed",default:43758.5453,slowUpdate:!0},xLength:{type:"number",name:"X Length",min:100,max:500,step:100,default:500,slowUpdate:!0},zLength:{type:"number",name:"Z Length",min:100,max:500,step:100,default:500,slowUpdate:!0},polyCount:{type:"number",name:"Poly Count",min:.1,max:5,step:.1,default:1,slowUpdate:!0},scale:{type:"number",name:"Hill Scale",min:1,max:400,step:1,default:50,slowUpdate:!0},hillDensity:{type:"number",name:"Hill Density",min:1,max:20,step:.1,default:3.3,slowUpdate:!0},roughness:{type:"number",name:"Roughness",min:1,max:2,step:.01,default:1.46,slowUpdate:!0},generations:{type:"number",name:"Generations",min:1,max:100,step:1,default:20,slowUpdate:!0},amplitudeDecayRate:{type:"number",name:"Amplitude Decay Rate",min:1,max:5,step:.1,default:1.5,slowUpdate:!0},offset:{type:"number",name:"Offset",min:-300,max:300,step:1,default:-30,slowUpdate:!0},edgeOffset:{type:"number",name:"Edge Offset",min:0,max:400,step:1,default:20,slowUpdate:!0},uTextureDensity:{type:"number",name:"Texture scale",min:1,max:1e3,step:1,default:50,slowUpdate:!0},grassSeed:{type:"number",name:"Grass placement seed",min:0,max:1,step:.01,default:.1,slowUpdate:!0},stoneThreshold:{type:"number",name:"Stone Threshold",min:0,max:1,step:.01,default:.16,slowUpdate:!0},fogDistance:{type:"number",name:"Fog Distance",min:.8,max:1,step:.001,default:.95,slowUpdate:!0}}},lighting:{name:"Lighting",type:"folder",children:{ambientLight:{name:"Ambient Light",type:"folder",children:{color:{type:"color",name:"Color",default:"#ffffff"},intensity:{type:"number",name:"Intensity",min:0,max:1,step:.01,default:.7}}},sun:{name:"Sun",type:"folder",children:{color:{type:"color",name:"Color",default:"#ffffff"},intensity:{type:"number",name:"Intensity",min:0,max:1,step:.01,default:1},cardinalAngle:{type:"number",name:"Cardinal Angle",min:0,max:360,step:1,default:0},heightAngle:{type:"number",name:"Height Angle",min:0,max:90,step:1,default:15},raymarchingSteps:{type:"number",name:"Raymarching Steps",min:5,max:100,step:1,default:50}}}}}}),E=r=>Object.keys(r).reduce((e,s)=>{const t=r[s];return t&&t.type==="folder"&&t.children?e[s]=E(t.children):t&&(t.type!=="folder"&&t.type!=="button"&&(e[s]=t.default),t.type==="button"&&(e[s]=t.onClick)),e},{});let R;const J=(r,e)=>{const s=new Y,t=Z();R=E(t);for(const n of Object.keys(t))W(s,R,n,t[n],e);return R},W=(r,e,s,t,n)=>{switch(t.type){case"boolean":{const i=r.add(e,s.toString()).name(t.name);return _(i,e,s,t,n)}case"number":{const i=r.add(e,s.toString(),t.min,t.max,t.step).name(t.name);return _(i,e,s,t,n)}case"select":{const i=r.add(e,s.toString(),t.options).name(t.name);return _(i,e,s,t,n)}case"string":{const i=r.add(e,s.toString()).name(t.name);return _(i,e,s,t,n)}case"color":{const i=r.addColor(e,s.toString()).name(t.name);return _(i,e,s,t,n)}case"button":return r.add(e,s.toString()).name(t.name);case"folder":if(!t.children)return;const o=r.addFolder(t.name),a=e[s];for(const i of Object.keys(t.children)){const l=t.children[i];l!==void 0&&W(o,a,i,l,n)}return o}},_=(r,e,s,t,n)=>t.slowUpdate?r.onFinishChange(()=>{n==null||n({[s]:e[s]},R,t)}):r.onChange(()=>{n==null||n({[s]:e[s]},R,t)}),{LineCurve3:O,QuadraticBezierCurve3:x,Vector3:u,CurvePath:P}=T,ee=()=>{const r=new P;return r.add(new O(new u(-20,20,0),new u(0,20,0))),r.add(new x(new u(0,20,0),new u(5,20,0),new u(10,25,0))),r.add(new O(new u(10,25,0),new u(20,35,0))),r.add(new x(new u(20,35,0),new u(25,40,0),new u(30,40,0))),r.add(new x(new u(30,40,0),new u(35,40,0),new u(35,40,10))),r.add(new x(new u(35,40,10),new u(35,40,20),new u(30,30,20))),r.add(new x(new u(30,30,20),new u(20,10,20),new u(10,20,20))),r.add(new x(new u(10,20,20),new u(5,25,20),new u(-5,15,20))),r.add(new x(new u(-5,15,20),new u(-10,10,20),new u(-15,15,20))),r.add(new x(new u(-15,15,20),new u(-20,20,20),new u(-25,20,20))),r.add(new x(new u(-25,20,20),new u(-30,20,20),new u(-30,20,10))),r.add(new x(new u(-30,20,10),new u(-30,20,0),new u(-20,20,0))),r};let C=0,w=0,I=1;const te=r=>{I=r.getLength()},se=(r,{gravity:e,friction:s,liftSpeed:t},n)=>{let o=r.getTangent(C/I).y;return w-=e*o*.01,w*=1-s,w=Math.max(w,t),C+=w*n,C=C%I,C},{Group:ne,Mesh:M,MeshPhongMaterial:G,Color:k,TextureLoader:re,TubeGeometry:A,CurvePath:z,Vector3:v,LineCurve3:S,QuadraticBezierCurve3:H,BoxGeometry:oe}=T;class ie extends ne{constructor(e,s){super(),this.path=e,this.parameters=s,this.enabled=!0,this.halfTrackWidth=1,this.trackRadius=.3,this.crossbarSpacing=5,this.crossbarRadius=.2,this.supportSpacing=8,this.supportWidth=.2,this.supportRadius=5,this.metalTexture=new re().load("textures/steel.jpg"),this.leftTrackModel=new M,this.rightTrackModel=new M,this.crossbarMeshes=[],this.supportMeshes=[],this.trackMaterial=this.setUpHalfTrack(),this.crossbarMaterial=this.setUpCrossbar(),this.supportMaterial=this.setUpSupports(),this.createCoasterMesh()}setUpHalfTrack(){const e=new G;return e.shininess=100,e.map=this.metalTexture,e.color=new k(1,.1,.1),e}setUpCrossbar(){const e=new G;return e.shininess=30,e.map=this.metalTexture,e.color=new k(.5,.15,.15),e}setUpSupports(){const e=new G;return e.shininess=60,e.map=this.metalTexture,e.color=new k(.4,.4,.7),e}createCoasterMesh(){this.halfTrackWidth=this.parameters.tracks.halfTrackWidth,this.trackRadius=this.parameters.tracks.trackRadius,this.crossbarSpacing=this.parameters.tracks.crossbarSpacing,this.crossbarRadius=this.parameters.tracks.crossbarRadius,this.supportSpacing=this.parameters.tracks.supportSpacing,this.supportWidth=this.parameters.tracks.supportWidth,this.supportRadius=this.parameters.tracks.supportRadius,this.generateTracks(this.halfTrackWidth,this.trackRadius),this.generateCrossbars(this.crossbarSpacing,this.halfTrackWidth,this.crossbarRadius),this.generateSupports(this.supportSpacing,this.supportWidth,this.trackRadius,this.supportRadius),this.add(this.leftTrackModel),this.add(this.rightTrackModel)}generateTracks(e,s){const t=new z,n=new z,o=this.path.curves;for(const a of o)if(a instanceof S){let i=new v().subVectors(a.v2,a.v1);i.normalize();let l=new v().crossVectors(i,new v(0,1,0));l.normalize();let c=a.v1.clone();c.addScaledVector(l,e);let h=a.v2.clone();h.addScaledVector(l,e),n.add(new S(c,h));let m=a.v1.clone();m.addScaledVector(l,-e);let p=a.v2.clone();p.addScaledVector(l,-e),t.add(new S(m,p))}else{let i=a.getTangent(0),l=new v().crossVectors(i,new v(0,1,0));l.normalize();let c=a.getTangent(.5),h=new v().crossVectors(c,new v(0,1,0));h.normalize();let m=a.getTangent(1),p=new v().crossVectors(m,new v(0,1,0));p.normalize();let f=a.v0.clone();f.addScaledVector(l,e);let d=a.v1.clone();d.addScaledVector(h,e);let g=a.v2.clone();g.addScaledVector(p,e),n.add(new H(f,d,g));let b=a.v0.clone();b.addScaledVector(l,-e);let D=a.v1.clone();D.addScaledVector(h,-e);let L=a.v2.clone();L.addScaledVector(p,-e),t.add(new H(b,D,L))}this.leftTrackModel.geometry=new A(t,64,s),this.leftTrackModel.material=this.trackMaterial,this.rightTrackModel.geometry=new A(n,64,s),this.rightTrackModel.material=this.trackMaterial}generateSupports(e,s,t,n){const o=Math.floor(this.path.getLength()/e);this.supportMeshes=[];for(let a=0;a<o;a++){let i=this.path.getPointAt((a+.5)/o),l=this.path.getTangent((a+.5)/o),c=new v().crossVectors(l,new v(0,1,0));c.normalize();let h=new v(i.x-c.x*s/2,0,i.z-c.z*s/2),m=new v(i.x-c.x*s/2,i.y-t/2,i.z-c.z*s/2),p=new v(i.x+c.x*s/2,i.y-t/2,i.z+c.z*s/2),f=new v(i.x+c.x*s/2,0,i.z+c.z*s/2),d=new z;d.add(new S(h,m)),d.add(new S(m,p)),d.add(new S(p,f));let g=new A(d,64,n);this.supportMeshes[a]=new M(g,this.supportMaterial)}for(let a=0;a<this.supportMeshes.length;a++)this.add(this.supportMeshes[a])}generateCrossbars(e,s,t){const n=Math.floor(this.path.getLength()/e);this.crossbarMeshes=[];for(let o=0;o<n;o++){let a=new oe(s*2,t,t);this.crossbarMeshes[o]=new M(a,this.crossbarMaterial),this.crossbarMeshes[o].lookAt(this.path.getTangent((o+.5)/n));let i=this.path.getPointAt((o+.5)/n);this.crossbarMeshes[o].position.x=i.x,this.crossbarMeshes[o].position.y=i.y,this.crossbarMeshes[o].position.z=i.z;for(let l=0;l<this.crossbarMeshes.length;l++)this.add(this.crossbarMeshes[l])}}update(){var e,s;if(this.parameters.enabled!==this.enabled&&(this.enabled=this.parameters.enabled,this.visible=this.enabled),this.enabled){const t=this.parameters.tracks.trackRadius!==this.trackRadius,n=this.parameters.tracks.crossbarSpacing!==this.crossbarSpacing,o=this.parameters.tracks.halfTrackWidth!==this.halfTrackWidth,a=this.parameters.tracks.crossbarRadius!==this.crossbarRadius,i=this.parameters.tracks.supportSpacing!==this.supportSpacing,l=this.parameters.tracks.supportWidth!==this.supportWidth,c=this.parameters.tracks.supportRadius!==this.supportRadius;(o||t)&&(this.halfTrackWidth=this.parameters.tracks.halfTrackWidth,this.trackRadius=this.parameters.tracks.trackRadius,(e=this.leftTrackModel)==null||e.geometry.dispose(),(s=this.rightTrackModel)==null||s.geometry.dispose(),this.generateTracks(this.halfTrackWidth,this.trackRadius)),(i||l||t||c)&&(this.supportSpacing=this.parameters.tracks.supportSpacing,this.supportWidth=this.parameters.tracks.supportWidth,this.trackRadius=this.parameters.tracks.trackRadius,this.supportRadius=this.parameters.tracks.supportRadius,this.supportMeshes.forEach(h=>{this.remove(h),h.geometry.dispose()}),this.supportMeshes=[],this.generateSupports(this.supportSpacing,this.supportWidth,this.trackRadius,this.supportRadius)),(n||o||a)&&(this.crossbarSpacing=this.parameters.tracks.crossbarSpacing,this.halfTrackWidth=this.parameters.tracks.halfTrackWidth,this.crossbarRadius=this.parameters.tracks.crossbarRadius,this.crossbarMeshes.forEach(h=>{this.remove(h),h.geometry.dispose()}),this.crossbarMeshes=[],this.generateCrossbars(this.crossbarSpacing,this.halfTrackWidth,this.crossbarRadius))}}}const ae=`varying vec3 vViewPosition;\r
\r
void main() {\r
\r
    vUv = uv;\r
\r
    // get the height\r
    float height = getHeight(uv) + uOffset;\r
\r
    // move the position along the normal and transform it\r
    vec3 newPosition = position + normal * height;\r
    vPosition = newPosition;\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);\r
}\r
`,ue=`uniform float uAmbientLightIntensity;\r
uniform vec3 uAmbientLightColor;\r
uniform vec3 uSunColor;\r
uniform vec3 uSunPosition;\r
uniform float uSunIntensity;\r
uniform float uRaymarchingSteps;\r
\r
\r
float terrainOcclusion(vec3 sunPos) {\r
    float samples = uRaymarchingSteps;\r
    vec3 position = vec3(vUv, getHeight(vUv));\r
    float occlusion = 0.0;\r
    float step = 0.5 / samples;\r
    for (float i = 0.0; i < samples; i++) {\r
        vec3 samplePos = position + sunPos * i * step;\r
        float sampleHeight = getHeight(samplePos.xy);\r
        if (samplePos.z < sampleHeight) {\r
            occlusion += smoothstep(0.0, 1.0, (sampleHeight - samplePos.z) / 0.1);\r
        }\r
    }\r
    return occlusion / samples;\r
}\r
\r
\r
void main() {\r
\r
\r
    #ifndef SHOW_NORMAL_MAP\r
\r
    // Texture calculations\r
    float noiseFactor = noise(vUv, DEFAULT_SEED) * 0.3;\r
\r
    vec2 tile = fract(vUv * uTextureDensity);\r
\r
    vec3 grassColor;\r
    vec3 grassNormal;\r
    float grassRoughness;\r
\r
    // texture mixing\r
    float grass3amount = smoothstep(0.8, 1.0, fract(getHeight(vUv, 1.0, 5.0, 1.0, 1.0, 1, 300.0 * uGrassSeed)));\r
    float grass4amount = smoothstep(0.8, 1.0, fract(getHeight(vUv, 1.0, 5.0, 1.0, 1.0, 1, 4000.0 * uGrassSeed)));\r
    float grass5amount = smoothstep(0.8, 1.0, fract(getHeight(vUv, 1.0, 5.0, 1.0, 1.0, 1, 50000.0 * uGrassSeed)));\r
\r
    // mix in other textures\r
    grassColor = mix(texture2D(uGrass1Texture, tile).rgb, texture2D(uGrass3Texture, tile).rgb, grass3amount);\r
    grassColor = mix(grassColor, texture2D(uGrass4Texture, tile).rgb, grass4amount);\r
    grassColor = mix(grassColor, texture2D(uGrass5Texture, tile).rgb, grass5amount);\r
\r
    // Roughness\r
    grassRoughness = .5 * texture2D(uGrass1TextureRoughness, tile).r;\r
    grassRoughness += .5 * texture2D(uGrass3TextureRoughness, tile).r * grass3amount;\r
    grassRoughness += .5 * texture2D(uGrass4TextureRoughness, tile).r * grass4amount;\r
    grassRoughness += .5 * texture2D(uGrass5TextureRoughness, tile).r * grass5amount;\r
    grassRoughness /= 4.0;\r
\r
    // apply normal map\r
    grassNormal = texture2D(uGrass1TextureNormal, tile).rgb * (1.0 - grass3amount);\r
    grassNormal += texture2D(uGrass3TextureNormal, tile).rgb * grass3amount;\r
    grassNormal += texture2D(uGrass4TextureNormal, tile).rgb * grass4amount;\r
    grassNormal += texture2D(uGrass5TextureNormal, tile).rgb * grass5amount;\r
    grassNormal = normalize(grassNormal);\r
\r
    vec3 explicitNormal = getNormal(vUv, .001);\r
    explicitNormal = vec3(-explicitNormal.x, -explicitNormal.z, explicitNormal.y);\r
    vec3 normal = mix(explicitNormal, grassNormal, 0.7);\r
\r
    // Stone texture\r
    vec3 stoneColor = texture2D(uStoneTexture, tile).rgb;\r
    float stoneRoughness = texture2D(uStoneTextureRoughness, tile).r;\r
    float stoneFactor = max(min((1.0 / getFlatness(vUv, 0.0001) * (uStoneThreshold / 100.)), 1.0), 0.0);\r
\r
    // Final mixes\r
    vec4 diffuseColor = vec4(mix(grassColor, stoneColor, stoneFactor), opacity);\r
\r
    // lighting\r
    vec3 sunPos = vec3(-uSunPosition.x, uSunPosition.z, -uSunPosition.y);\r
    vec3 lightDir = normalize(sunPos - vPosition);\r
    vec3 viewDir = normalize(cameraPosition - vPosition);\r
    vec3 halfDir = normalize(lightDir + viewDir);\r
\r
    vec3 sunUv = vec3(sunPos.xy / 500. + .5, sunPos.z);\r
\r
    float NdotL = terrainOcclusion(sunUv);\r
\r
    vec3 color = diffuseColor.rgb *\r
    (uAmbientLightColor * uAmbientLightIntensity + uSunColor * uSunIntensity * NdotL);\r
\r
    // diffuse the color with light grey as it gets further away from the center\r
    float distance = length(vUv - vec2(0.5, 0.5));\r
    float fade = distance * 1.5;\r
    vec3 fragColor = mix(color, vec3(0.7, 0.7, 0.7), smoothstep(0.0, 1., bias(1. - uFogDistance, fade)));\r
\r
    gl_FragColor = vec4(fragColor, 1.0);\r
\r
    #else\r
    gl_FragColor = vec4(vec3(dot(getNormal(vUv, .001), vec3(0., 0., 1.))), 1.0);\r
    #endif\r
\r
\r
}\r
`,U=`uniform vec2 resolution;\r
uniform float opacity;\r
uniform float shininess;\r
uniform float uDecayRate;\r
uniform float uEdgeOffset;\r
uniform float uEdgeOffsetThreshold;\r
uniform float uFogDistance;\r
uniform float uGrassSeed;\r
uniform float uInitialAmplitude;\r
uniform float uInitialFrequency;\r
uniform float uOffset;\r
uniform float uRoughness;\r
uniform float uStoneThreshold;\r
uniform float uTextureDensity;\r
uniform int uGenerations;\r
uniform sampler2D uGrass1Texture;\r
uniform sampler2D uGrass1TextureNormal;\r
uniform sampler2D uGrass1TextureRoughness;\r
uniform sampler2D uGrass3Texture;\r
uniform sampler2D uGrass3TextureNormal;\r
uniform sampler2D uGrass3TextureRoughness;\r
uniform sampler2D uGrass4Texture;\r
uniform sampler2D uGrass4TextureNormal;\r
uniform sampler2D uGrass4TextureRoughness;\r
uniform sampler2D uGrass5Texture;\r
uniform sampler2D uGrass5TextureNormal;\r
uniform sampler2D uGrass5TextureRoughness;\r
uniform sampler2D uStoneTexture;\r
uniform sampler2D uStoneTextureNormal;\r
uniform sampler2D uStoneTextureRoughness;\r
uniform vec3 diffuse;\r
uniform vec3 emissive;\r
uniform vec3 specular;\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
float bias(float b, float x) {\r
    return pow(x, log(b) / log(0.5));\r
}\r
\r
float noise(vec2 uv0, float seed) {\r
    return fract(sin(dot(uv0, vec2(12.9898, 78.233))) * seed);\r
}\r
\r
/**\r
    * Fractal Brownian Motion\r
    * @param uv - the position\r
    * @return the smoothstep value for that position\r
    */\r
float fbm(vec2 uv0, float seed) {\r
    vec2 va = floor(uv0);\r
    vec2 vb = va + vec2(1.0, 0.0);\r
    vec2 vc = va + vec2(0.0, 1.0);\r
    vec2 vd = va + vec2(1.0, 1.0);\r
\r
    float a = noise(va, seed);\r
    float b = noise(vb, seed);\r
    float c = noise(vc, seed);\r
    float d = noise(vd, seed);\r
\r
    vec2 f = fract(uv0);\r
\r
    return a +\r
    (b - a) * smoothstep(0.0, 1.0, f.x) +\r
    (c - a) * smoothstep(0.0, 1.0, f.y) +\r
    (a - b - c + d) * smoothstep(0.0, 1.0, f.x) * smoothstep(0.0, 1.0, f.y);\r
}\r
\r
float getHeight(vec2 uv, float initialAmplitude, float initialFrequency, float roughness, float decayRate, int generations, float seed) {\r
    float height = 0.0;\r
    float amplitude = initialAmplitude;\r
    float frequency = initialFrequency;\r
\r
    for (int i = 0; i < generations; i++) {\r
        float n = fbm(uv * frequency, seed);\r
        float v = n * amplitude;\r
        height += v;\r
        frequency *= pow(2.0, roughness);\r
        amplitude /= pow(2.0, decayRate);\r
    }\r
\r
    return height;\r
}\r
\r
\r
float getHeight(vec2 uv) {\r
    float height = getHeight(uv, uInitialAmplitude, uInitialFrequency, uRoughness, uDecayRate, uGenerations, DEFAULT_SEED);\r
\r
    vec2 centeredUv = uv * 2.0 - 1.0;\r
\r
    height += smoothstep(0., 1., bias(.1, length(centeredUv))) * uEdgeOffset;\r
\r
    return height;\r
\r
}\r
\r
vec3 getNormal(vec2 uv, float d) {\r
    vec2 neighbour1 = vec2(uv.x + d, uv.y);\r
    vec2 neighbour2 = vec2(uv.x, uv.y + d);\r
\r
    vec3 edge1 = vec3(neighbour1 - uv, getHeight(neighbour1) - getHeight(uv));\r
    vec3 edge2 = vec3(neighbour2 - uv, getHeight(neighbour2) - getHeight(uv));\r
\r
    return normalize(cross(edge1, edge2));\r
}\r
\r
\r
float getFlatness(vec2 uv, float d) {\r
    vec3 normal = getNormal(uv, d);\r
    //compare with vector pointing up\r
    return dot(normal, vec3(0.0, 0.0, 1.0));\r
}\r
\r
vec2 getUv(vec2 position) {\r
    return vec2(position.x / resolution.x, position.y / resolution.y);\r
}\r
`,le="/assets/Grass_001_COLOR-6oKnaf1c.jpg",he="/assets/Grass_001_NORM-CPQSo9tw.jpg",ce="/assets/Grass_001_ROUGH-CTDwauKS.jpg",pe="/assets/Grass_003_COLOR-8oLL1ZSl.jpg",de="/assets/Grass_003_NRM-B2xO9-gM.jpg",ge="/assets/Grass_003_ROUGH-rGqL3s7p.jpg",fe="/assets/Grass_004_COLOR-D6hsZBPO.jpg",me="/assets/Grass_004_NORM-BuTgc94l.jpg",ve="/assets/Grass_004_ROUGH-DkFBD5h2.jpg",ye="/assets/Grass_005_BaseColor-CqrDJsFm.jpg",xe="/assets/Grass_005_Normal-CiCIei8R.jpg",be="/assets/Grass_005_Roughness-CqkWq6-W.jpg",Se="/assets/Stone_001_COLOR-BVfsPkw_.jpg",Te="/assets/Stone_001_NRM-C30OA90B.jpg",De="/assets/Stone_001_ROUGH-BLrXopVA.jpg",{PlaneGeometry:V,TextureLoader:y,Mesh:_e,ShaderMaterial:Ce,Vector2:B}=T;class we extends _e{constructor(e,s,t){const n=new V(e.xLength,e.zLength,e.xLength*e.polyCount,e.zLength*e.polyCount);console.log("Terrain material");const o=new Ce({uniforms:{resolution:{value:new B(e.xLength,e.zLength)},uGenerations:{value:e.generations},uDecayRate:{value:e.amplitudeDecayRate},uRoughness:{value:e.roughness},uInitialAmplitude:{value:e.scale},uInitialFrequency:{value:e.hillDensity},uOffset:{value:e.offset},uEdgeOffset:{value:e.edgeOffset},uTextureDensity:{value:e.uTextureDensity},uGrassSeed:{value:e.grassSeed},uStoneThreshold:{value:e.stoneThreshold},uFogDistance:{value:e.fogDistance},uSunIntensity:{value:t.sun.intensity},uSunColor:{value:new(void 0)(t.sun.color)},uSunPosition:{value:s.clone()},uAmbientLightIntensity:{value:t.ambientLight.intensity},uAmbientLightColor:{value:new(void 0)(t.ambientLight.color)},uRaymarchingSteps:{value:t.sun.raymarchingSteps},uGrass1Texture:{value:new y().load(le)},uGrass1TextureNormal:{value:new y().load(he)},uGrass1TextureRoughness:{value:new y().load(ce)},uGrass3Texture:{value:new y().load(pe)},uGrass3TextureNormal:{value:new y().load(de)},uGrass3TextureRoughness:{value:new y().load(ge)},uGrass4Texture:{value:new y().load(fe)},uGrass4TextureNormal:{value:new y().load(me)},uGrass4TextureRoughness:{value:new y().load(ve)},uGrass5Texture:{value:new y().load(ye)},uGrass5TextureNormal:{value:new y().load(xe)},uGrass5TextureRoughness:{value:new y().load(be)},uStoneTexture:{value:new y().load(Se)},uStoneTextureNormal:{value:new y().load(Te)},uStoneTextureRoughness:{value:new y().load(De)}},defines:{WIDTH:(e.xLength*e.polyCount).toFixed(1),HEIGHT:(e.zLength*e.polyCount).toFixed(1),BOUNDSX:e.xLength.toFixed(1),BOUNDSY:e.zLength.toFixed(1),DEFAULT_SEED:e.terrainSeed.toFixed(6),SHOW_NORMAL_MAP:e.normalMap,PI:Math.PI.toFixed(6)},fragmentShader:U+ue,vertexShader:U+ae});console.log("Terrain super"),super(n,o),console.log("Terrain cache"),this.p_terrainSeed=e.terrainSeed,this.p_xLength=e.xLength,this.p_zLength=e.zLength,this.p_polyCount=e.polyCount,this.p_generations=e.generations,this.p_amplitudeDecayRate=e.amplitudeDecayRate,this.p_roughness=e.roughness,this.p_scale=e.scale,this.p_hillDensity=e.hillDensity,this.p_offset=e.offset,this.p_edgeOffset=e.edgeOffset,this.p_uTextureDensity=e.uTextureDensity,this.p_grassSeed=e.grassSeed,this.p_stoneThreshold=e.stoneThreshold,this.p_fogDistance=e.fogDistance,this.p_normalMap=e.normalMap,this.p_sunIntensity=t.sun.intensity,this.p_sunColor=t.sun.color,this.p_sunPosition=s.clone(),this.p_ambientIntensity=t.ambientLight.intensity,this.p_ambientColor=t.ambientLight.color,this.p_raymarchingSteps=t.sun.raymarchingSteps}updateParameters(e,s,t){(this.p_xLength!==e.xLength||this.p_zLength!==e.zLength||this.p_polyCount!==e.polyCount)&&(this.geometry.dispose(),this.geometry=new V(e.xLength,e.zLength,e.xLength*e.polyCount,e.zLength*e.polyCount),this.p_xLength=e.xLength,this.p_zLength=e.zLength,this.p_polyCount=e.polyCount,this.material.uniforms.resolution.value=new B(e.xLength,e.zLength)),this.p_terrainSeed!==e.terrainSeed&&(this.material.defines.DEFAULT_SEED=e.terrainSeed.toFixed(6),this.material.needsUpdate=!0,this.p_terrainSeed=e.terrainSeed),this.p_generations!==e.generations&&(this.material.uniforms.uGenerations.value=e.generations,this.p_generations=e.generations),this.p_amplitudeDecayRate!==e.amplitudeDecayRate&&(this.material.uniforms.uDecayRate.value=e.amplitudeDecayRate,this.p_amplitudeDecayRate=e.amplitudeDecayRate),this.p_roughness!==e.roughness&&(this.material.uniforms.uRoughness.value=e.roughness,this.p_roughness=e.roughness),this.p_scale!==e.scale&&(this.material.uniforms.uInitialAmplitude.value=e.scale,this.p_scale=e.scale),this.p_hillDensity!==e.hillDensity&&(this.material.uniforms.uInitialFrequency.value=e.hillDensity,this.p_hillDensity=e.hillDensity),this.p_offset!==e.offset&&(this.material.uniforms.uOffset.value=e.offset,this.p_offset=e.offset),this.p_edgeOffset!==e.edgeOffset&&(this.material.uniforms.uEdgeOffset.value=e.edgeOffset,this.p_edgeOffset=e.edgeOffset),this.p_uTextureDensity!==e.uTextureDensity&&(this.material.uniforms.uTextureDensity.value=e.uTextureDensity,this.p_uTextureDensity=e.uTextureDensity),this.p_grassSeed!==e.grassSeed&&(this.material.uniforms.uGrassSeed.value=e.grassSeed,this.p_grassSeed=e.grassSeed),this.p_stoneThreshold!==e.stoneThreshold&&(this.material.uniforms.uStoneThreshold.value=e.stoneThreshold,this.p_stoneThreshold=e.stoneThreshold),this.p_fogDistance!==e.fogDistance&&(this.material.uniforms.uFogDistance.value=e.fogDistance,this.p_fogDistance=e.fogDistance),this.p_normalMap!==e.normalMap&&(this.material.defines.SHOW_NORMAL_MAP=e.normalMap,this.material.needsUpdate=!0,this.p_normalMap=e.normalMap),this.p_sunIntensity!==t.sun.intensity&&(this.material.uniforms.uSunIntensity.value=t.sun.intensity,this.p_sunIntensity=t.sun.intensity),this.p_sunColor!==t.sun.color&&(this.material.uniforms.uSunColor.value=new(void 0)(t.sun.color),this.p_sunColor=t.sun.color),(this.p_sunPosition.x!==s.x||this.p_sunPosition.y!==s.y||this.p_sunPosition.z!==s.z)&&(console.log("updating sun position",s.clone()),this.material.uniforms.uSunPosition.value=s.clone(),this.p_sunPosition=s.clone()),this.p_ambientIntensity!==t.ambientLight.intensity&&(this.material.uniforms.uAmbientLightIntensity.value=t.ambientLight.intensity,this.p_ambientIntensity=t.ambientLight.intensity),this.p_ambientColor!==t.ambientLight.color&&(this.material.uniforms.uAmbientLightColor.value=new(void 0)(t.ambientLight.color),this.p_ambientColor=t.ambientLight.color),this.p_raymarchingSteps!==t.sun.raymarchingSteps&&(this.material.uniforms.uRaymarchingSteps.value=t.sun.raymarchingSteps,this.p_raymarchingSteps=t.sun.raymarchingSteps)}}const Re="/assets/Daylight Box_Back-Cor3iuoR.bmp",Le="/assets/Daylight Box_Front-C1tHXyIl.bmp",Me="/assets/Daylight Box_Top-ydDPCfsJ.bmp",Ge="/assets/Daylight Box_Bottom-DrTbYH_U.bmp",ke="/assets/Daylight Box_Left-DbP7YnH7.bmp",Ae="/assets/Daylight Box_Right-DF1WYL1g.bmp",{BoxGeometry:ze,MeshBasicMaterial:Ie,TextureLoader:Ne,BackSide:Fe,Mesh:Oe}=T;class He extends Oe{constructor(){const e=Ue(),s=new ze(2e3,2e3,2e3);super(s,e)}}const Ue=()=>[ke,Ae,Me,Ge,Re,Le].map(e=>{const s=new Ne().load(e);return new Ie({map:s,side:Fe})}),{AmbientLight:Ve,DirectionalLight:Be,Group:Ee,Vector3:We}=T;class qe extends Ee{get sunPosition(){return this.sun.position}constructor({ambientLight:e,sun:s}){super(),this.ambientLight=new Ve(e.color,e.intensity),this.add(this.ambientLight),this.sun=new Be(s.color,s.intensity);const t=this.calculateSunPosition(s.cardinalAngle,s.heightAngle);this.sun.position.set(t.x,t.y,t.z),this.add(this.sun),this.ambientLightColor=e.color,this.ambientLightIntensity=e.intensity,this.sunColor=s.color,this.sunIntensity=s.intensity,this.sunCardinalAngle=s.cardinalAngle,this.sunHeightAngle=s.heightAngle}updateParameters(e){if(this.ambientLightColor!==e.ambientLight.color&&(this.ambientLight.color.set(e.ambientLight.color),this.ambientLightColor=e.ambientLight.color),this.ambientLightIntensity!==e.ambientLight.intensity&&(this.ambientLight.intensity=e.ambientLight.intensity,this.ambientLightIntensity=e.ambientLight.intensity),this.sunColor!==e.sun.color&&(this.sun.color.set(e.sun.color),this.sunColor=e.sun.color),this.sunIntensity!==e.sun.intensity&&(this.sun.intensity=e.sun.intensity,this.sunIntensity=e.sun.intensity),this.sunCardinalAngle!==e.sun.cardinalAngle||this.sunHeightAngle!==e.sun.heightAngle){const s=this.calculateSunPosition(e.sun.cardinalAngle,e.sun.heightAngle);this.sun.position.set(s.x,s.y,s.z),this.sunCardinalAngle=e.sun.cardinalAngle,this.sunHeightAngle=e.sun.heightAngle}}calculateSunPosition(e,s){const t=e*Math.PI/180,n=(90-s)*Math.PI/180,o=500,a=o*Math.sin(n)*Math.cos(t),i=o*Math.cos(n),l=o*Math.sin(n)*Math.sin(t);return new We(a,i,l)}}(async()=>{console.log("App initialization...");const r=X();console.log("UI initialization...");const s=J({},(h,m,p)=>{p!=null&&p.requiresReset&&r.reset(),(p==null?void 0:p.name)==="First Person View"&&!m.coaster.fpv&&r.resetCameraToDefault(),h.wireframe!==void 0&&(c.material.wireframe=h.wireframe)});console.log("Initial coaster track setup...");const t=ee();t.arcLengthDivisions=1e3;let n=0;const o=t.getLength(),a=new ie(t,s.coaster);console.log("Lighting setup...");const i=new qe(s.lighting),l=i.sunPosition;console.log("Terrain setup...");const c=new we(s.landscape,l,s.lighting);console.log("Starting app..."),await r.start(async({scene:h})=>{s.coaster.enabled&&(console.log("Coaster cart setup..."),te(t),h.add(a)),console.log("Skybox setup...");const m=new He;h.add(m),console.log("Adding lighting..."),h.add(i),console.log("Rotating terrain to face up..."),c.lookAt(0,1,0),h.add(c)}),r.update(({clock:h,camera:m,orbit:p,delta:f})=>{if(s.paused){h.running&&h.stop();return}else h.running||h.start();if(a.update(),i.updateParameters(s.lighting),c.updateParameters(s.landscape,i.sunPosition,s.lighting),s.coaster.fpv){n=se(t,s.coaster,f);let d=t.getPoint(n/o);m.position.set(d.x,d.y+5,d.z);let g=t.getTangent(n/o);g.add(m.position),p.target.set(g.x,g.y-.5,g.z)}})})().then();
