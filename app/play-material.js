import * as THREE from 'three';

export default class PlayMaterial extends THREE.RawShaderMaterial {
  constructor(options) {
    super();
    this.uniforms = {
      color: {
        type: "c,",
        value: new THREE.Color(options.color)
      },
      diff: {
        type: "f",
        value: 0
      }
    };
    this.side = options.side;
    this.wireframe = options.wireframe;
    this.transparent = options.transparent;
    this.vertexShader = "\nprecision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\nuniform mat4 modelViewMatrix; // optional\nuniform mat4 projectionMatrix; // optional\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\n\nvoid main() {\n\n\tvUv = uv;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * \tvec4( position, 1.0 );\n\n}\n\n// ,", this.fragmentShader = "\nprecision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nuniform float diff;\nuniform vec3 color;\nfloat when_flt(float x, float y) {\n  return max(sign(y - x), 0.0);\n}\n\n\nvoid main() {\n\n\tvec4 diffuse = vec4(color, 1.0);\n\n\tgl_FragColor = mix(vec4(0.0), diffuse, when_flt(vUv.x, diff));\n\n}"
  }
}
