#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
uniform float seed;

uniform sampler2D canvas;
varying vec2 vTexCoord;

void main() {  
    vec2 st = vec2(vTexCoord.x, 1.0-vTexCoord.y);
    vec4 texels = texture2D(canvas, st);
    vec4 stC = vec4(texels.r, texels.g, texels.b, texels.a);

    vec4 c = stC * vec4(st.x);

    gl_FragColor = c;
}