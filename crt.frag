precision highp float;

// Modified to work on my system and optimized from https://www.shadertoy.com/view/Ms23DR

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform vec2 canvasSize;


/* === Settings === */
#define VIGNETTE
// Higher is thicker vignette, default: 0.3
#define VIGNETTE_INTENSITY 0.3

#define SCREEN_CURVE
// Higher is more curved, 0.0 is none, default: 1.5
#define SCREEN_CURVATURE 1.5

#define CHROMATIC_ABERRATION
// Higher is more separated, default: 0.5
#define CHROMATIC_ABERRATION_INTENSITY 0.5

#define WOBBLE
// Higher is more intense wobbling, default: 0.0005
#define WOBBLE_STRENGTH 0.0005

// #define FLICKER
// Higher is more intense, default: 0.01
#define FLICKER_STRENGTH 0.015

#define SCAN_LINES
// Scan lines scroll upwards
#define SCAN_MOVE

// Comment out to disable all movement
// #define ANIMATIONS


#ifdef ANIMATIONS
    uniform float time;
#else
    float time = 0.0;
    #undef SCAN_MOVE
    #undef FLICKER
#endif

void main( ) {
    // Texture coordinate
    vec2 uv = vTexCoord;
    // Final output color (no alpha)
    vec3 col;

#ifdef SCREEN_CURVE
    /* === Deform Uv to Have Curved Screen === */
    // Remap coordinates to be from roughly -1 to 1
    uv = 2.2*uv - 1.1;
    // Bend bottom horizontally
    uv.x *= 0.46 + 0.46*pow((abs(uv.y) * SCREEN_CURVATURE / 7.5), 2.0);
    // Bend bottom vertically
    uv.y *= 0.46 + 0.46*pow((abs(uv.x) * SCREEN_CURVATURE / 6.0), 2.0);
    // Move back to center of screen
    uv += 0.5;
#endif

    // Horizontal wobble
#ifdef WOBBLE
  #ifdef ANIMATIONS
    float x = sin(0.3*time+21.0*uv.y) * sin(0.7*time+29.0*uv.y) * sin(0.3+0.33*time+31.0*uv.y) * WOBBLE_STRENGTH;
  #else
    float x = sin(21.0*uv.y) * sin(29.0*uv.y) * sin(0.3+31.0*uv.y) * WOBBLE_STRENGTH;
  #endif
#else
    float x = 0.0;
#endif

    // Add chromatic aberration
#ifdef CHROMATIC_ABERRATION
    // Offset red color by (0.001, 0.001)
    col.r = texture2D(tex0,uv+vec2(x+0.001*CHROMATIC_ABERRATION_INTENSITY, 0.001*CHROMATIC_ABERRATION_INTENSITY)).r+0.05;
    // Offset green color by (0.000, -0.002)
    col.g = texture2D(tex0,uv+vec2(x, -0.002*CHROMATIC_ABERRATION_INTENSITY)).g+0.05;
    // Offset blue color by (-0.002, 0.000)
    col.b = texture2D(tex0,uv+vec2(x-0.002*CHROMATIC_ABERRATION_INTENSITY, 0.)).b+0.05;
    // col.r += 0.08*texture2D(tex0,0.75*vec2(x+0.025, -0.027)+vec2(uv.x+0.001,uv.y+0.001)).x;
    // col.g += 0.05*texture2D(tex0,0.75*vec2(x+-0.022, -0.02)+vec2(uv.x+0.000,uv.y-0.002)).y;
    // col.b += 0.08*texture2D(tex0,0.75*vec2(x+-0.02, -0.018)+vec2(uv.x-0.002,uv.y+0.000)).z;
#else
    col = texture(tex0,uv+vec2(x, 0.)).rgb+0.05;
#endif
    col = clamp(0.4*col*col+0.6*col,0.0,1.0);

    // Vignette
#ifdef VIGNETTE
    col *= pow((16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y)), VIGNETTE_INTENSITY);
#endif

    // Brighten and green shift image
    col *= vec3(2.66,2.94,2.66);

    // Add scan lines
#ifdef SCAN_LINES
  #ifdef SCAN_MOVE
    float scans = clamp(0.35+0.35*sin(3.5*time+1.5*uv.y*canvasSize.y), 0.0, 1.0);
  #else
    float scans = clamp(0.35+0.35*sin(1.5*uv.y*canvasSize.y), 0.0, 1.0);
  #endif

    col *= 0.4 + 0.7*pow(scans, 1.7);
#else
    col *= 0.5538;
#endif

#ifdef FLICKER
    col *= 1.0+FLICKER_STRENGTH*sin(110.0*time);
#endif

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        col *= 0.0;
    }

    // I have no idea what this line actually does
    // col*=1.0-vec3(0.65*clamp(2.0*(mod(v_texcoord.x, 2.0)-1.0),0.0,1.0));

    gl_FragColor = vec4(col,1.0);
}