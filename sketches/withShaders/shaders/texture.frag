#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
uniform float seed;

uniform vec3 color;


void main() {
  vec2 st = gl_FragCoord.xy/resolution.xy;

  vec3 c = vec3(st.y);
  c *= color;

  gl_FragColor = vec4(c, 1.0);
}