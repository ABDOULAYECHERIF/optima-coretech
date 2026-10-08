/*
 * Cursor Ring Field (Originkit) — vanilla WebGL port for the static site.
 * Usage: RingField.mount(element, { colors: [...], background, density, ... })
 * Pauses when off-screen or the tab is hidden; renders a still frame for reduced motion.
 */
(function () {
  "use strict";

  var FIELD = 500;
  var HALF = FIELD / 2;
  var WORLD = 5;
  var CURSOR_REACH = 0.175;
  var CURSOR_LERP = 0.12;
  var WANDER_LERP = 0.01;
  var HANDOVER_LERP = 0.08;
  var CURSOR_JITTER = 0.01;
  var FOV = 40;
  var DPR_CAP = 2;
  var MAX_POINTS = 65536;
  var TAU = Math.PI * 2;
  var MAX_COLORS = 5;
  var DEFAULT_COLORS = ["#7189ff", "#3074f9", "#0b0b18"];
  var RING_EDGE = 4;

  var NOISE = [
    "vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}",
    "vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}",
    "vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}",
    "vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}",
    "float snoise(vec3 v){",
    "  const vec2 C=vec2(1.0/6.0,1.0/3.0);",
    "  const vec4 D=vec4(0.0,0.5,1.0,2.0);",
    "  vec3 i=floor(v+dot(v,C.yyy));",
    "  vec3 x0=v-i+dot(i,C.xxx);",
    "  vec3 g=step(x0.yzx,x0.xyz);",
    "  vec3 l=1.0-g;",
    "  vec3 i1=min(g.xyz,l.zxy);",
    "  vec3 i2=max(g.xyz,l.zxy);",
    "  vec3 x1=x0-i1+C.xxx;",
    "  vec3 x2=x0-i2+C.yyy;",
    "  vec3 x3=x0-D.yyy;",
    "  i=mod289(i);",
    "  vec4 p=permute(permute(permute(",
    "      i.z+vec4(0.0,i1.z,i2.z,1.0))",
    "    + i.y+vec4(0.0,i1.y,i2.y,1.0))",
    "    + i.x+vec4(0.0,i1.x,i2.x,1.0));",
    "  float n_=0.142857142857;",
    "  vec3 ns=n_*D.wyz-D.xzx;",
    "  vec4 j=p-49.0*floor(p*ns.z*ns.z);",
    "  vec4 x_=floor(j*ns.z);",
    "  vec4 y_=floor(j-7.0*x_);",
    "  vec4 x=x_*ns.x+ns.yyyy;",
    "  vec4 y=y_*ns.x+ns.yyyy;",
    "  vec4 h=1.0-abs(x)-abs(y);",
    "  vec4 b0=vec4(x.xy,y.xy);",
    "  vec4 b1=vec4(x.zw,y.zw);",
    "  vec4 s0=floor(b0)*2.0+1.0;",
    "  vec4 s1=floor(b1)*2.0+1.0;",
    "  vec4 sh=-step(h,vec4(0.0));",
    "  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;",
    "  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;",
    "  vec3 p0=vec3(a0.xy,h.x);",
    "  vec3 p1=vec3(a0.zw,h.y);",
    "  vec3 p2=vec3(a1.xy,h.z);",
    "  vec3 p3=vec3(a1.zw,h.w);",
    "  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));",
    "  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;",
    "  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);",
    "  m=m*m;",
    "  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));",
    "}"
  ].join("\n");

  var FIELD_TERMS = [
    "void fieldTerms(",
    "    vec2 ref, vec2 ringPos, float time,",
    "    float ringRadius, float w1, float w2, float turb,",
    "    out vec2 disp, out float bandT, out float bandHot",
    "){",
    "    float dist = distance(ref, ringPos);",
    "    float n0 = snoise(vec3(ref * 0.2 + vec2(18.4924, 72.9744), time * 0.5));",
    "    float dist1 = distance(ref + (n0 * 0.005), ringPos);",
    "    float t  = smoothstep(ringRadius - (w1 * 2.0), ringRadius, dist)",
    "             - smoothstep(ringRadius, ringRadius + w1, dist1);",
    "    float t2 = smoothstep(ringRadius - (w2 * 2.0), ringRadius, dist)",
    "             - smoothstep(ringRadius, ringRadius + w2, dist1);",
    "    float t3 = smoothstep(ringRadius + w2, ringRadius, dist);",
    "    t  = pow(max(t, 0.0), 2.0);",
    "    t2 = pow(max(t2, 0.0), 3.0);",
    "    t += t2 * 3.0;",
    "    t += t3 * 0.4;",
    "    t += snoise(vec3(ref * 30.0 + vec2(11.4924, 12.9744), time * 0.5)) * t3 * 0.5;",
    "    float nS = snoise(vec3(ref * 2.0 + vec2(18.4924, 72.9744), time * 0.5));",
    "    t += pow((nS + 1.5) * 0.5, 2.0) * 0.6;",
    "    float n1 = snoise(vec3(ref * 4.0 + vec2(88.494, 32.4397), time * 0.35));",
    "    float n2 = snoise(vec3(ref * 4.0 + vec2(50.904, 120.947), time * 0.35));",
    "    float n3 = snoise(vec3(ref * 20.0 + vec2(18.4924, 72.9744), time * 0.5));",
    "    float n4 = snoise(vec3(ref * 20.0 + vec2(50.904, 120.947), time * 0.5));",
    "    vec2 d = vec2(n1, n2) * 0.03 + vec2(n3, n4) * 0.005;",
    "    d.x += sin((ref.x * 20.0) + (time * 4.0)) * 0.02 * clamp(dist, 0.0, 1.0);",
    "    d.y += cos((ref.y * 20.0) + (time * 3.0)) * 0.02 * clamp(dist, 0.0, 1.0);",
    "    disp = d * turb;",
    "    bandT = t;",
    "    bandHot = t2;",
    "}"
  ].join("\n");

  var SIM_VERT = [
    "precision highp float;",
    "attribute vec2 aPos;",
    "varying vec2 vUV;",
    "void main(){",
    "    vUV = aPos * 0.5 + 0.5;",
    "    gl_Position = vec4(aPos, 0.0, 1.0);",
    "}"
  ].join("\n");

  var SIM_FRAG = [
    "precision highp float;",
    "uniform sampler2D uState;",
    "uniform sampler2D uRefs;",
    "uniform vec2  uRingPos;",
    "uniform float uRingRadius;",
    "uniform float uRingWidth;",
    "uniform float uRingWidth2;",
    "uniform float uPush;",
    "uniform float uTurb;",
    "uniform float uTime;",
    "varying vec2 vUV;",
    NOISE,
    FIELD_TERMS,
    "void main(){",
    "    vec4 frame = texture2D(uState, vUV);",
    "    vec2 ref   = texture2D(uRefs, vUV).xy;",
    "    float scale  = frame.z;",
    "    float energy = frame.w;",
    "    float time   = uTime * 0.5;",
    "    vec2 disp; float t; float t2;",
    "    fieldTerms(ref, uRingPos, time, uRingRadius, uRingWidth, uRingWidth2, uTurb, disp, t, t2);",
    "    vec2 mem = frame.xy * 0.8;",
    "    mem -= (uRingPos - (ref + disp)) * pow(max(t2, 0.0), 0.75) * uPush;",
    "    scale += (t - scale) * 0.2;",
    "    vec2 finalPos = ref + disp + (mem * 0.25);",
    "    energy = energy * 0.5 + scale * 0.25;",
    "    gl_FragColor = vec4(finalPos, scale, energy);",
    "}"
  ].join("\n");

  function RENDER_VERT(isStatic) {
    return [
      "precision highp float;",
      "attribute vec2 aUV;",
      "attribute vec2 aRef;",
      "uniform sampler2D uState;",
      "uniform float uProjF;",
      "uniform float uAspect;",
      "uniform float uCamDist;",
      "uniform float uPointScale;",
      isStatic ? "uniform vec2 uRingPos;\nuniform float uRingRadius;\nuniform float uRingWidth;\nuniform float uRingWidth2;\nuniform float uTurb;\nuniform float uTime;" : "",
      "varying vec2  vLocalPos;",
      "varying float vScale;",
      "varying float vEnergy;",
      isStatic ? NOISE : "",
      isStatic ? FIELD_TERMS : "",
      "void main(){",
      isStatic
        ? "    vec2 disp; float t; float t2;\n    fieldTerms(aRef, uRingPos, uTime * 0.5, uRingRadius, uRingWidth, uRingWidth2, uTurb, disp, t, t2);\n    vec4 state = vec4(aRef + disp, t, t * 0.5);"
        : "    vec4 state = texture2D(uState, aUV);",
      "    vLocalPos = state.xy;",
      "    vScale    = state.z;",
      "    vEnergy   = state.w;",
      "    vec2 world = state.xy * " + WORLD.toFixed(1) + ";",
      "    gl_Position = vec4(world.x * uProjF / uAspect, world.y * uProjF, 0.0, uCamDist);",
      "    gl_PointSize = max(vScale, 0.0) * 7.0 * uPointScale;",
      "}"
    ].join("\n");
  }

  var RENDER_FRAG = [
    "precision highp float;",
    "varying vec2  vLocalPos;",
    "varying float vScale;",
    "varying float vEnergy;",
    "uniform vec3  uColors[" + MAX_COLORS + "];",
    "uniform int   uColorCount;",
    "uniform vec2  uRingPos;",
    "uniform float uTime;",
    NOISE,
    "float sdRoundBox(in vec2 p, in vec2 b, in float r){",
    "    vec2 q = abs(p) - b + r;",
    "    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;",
    "}",
    "vec2 rotate(vec2 v, float a){",
    "    float s = sin(a);",
    "    float c = cos(a);",
    "    return mat2(c, s, -s, c) * v;",
    "}",
    "void main(){",
    "    float noiseAngle = snoise(vec3(vLocalPos * 10.0 + vec2(18.4924, 72.9744), uTime * 0.85));",
    "    float noiseColor = snoise(vec3(vLocalPos * 2.0  + vec2(74.664,  91.556),  uTime * 0.5));",
    "    noiseColor = (noiseColor + 1.0) * 0.5;",
    "    float angle = atan(vLocalPos.y - uRingPos.y, vLocalPos.x - uRingPos.x);",
    "    vec2 uv = gl_PointCoord.xy - vec2(0.5);",
    "    uv.y *= -1.0;",
    "    uv = rotate(uv, -angle + (noiseAngle * 0.5));",
    "    float p = smoothstep(0.0, 0.75, pow(noiseColor, 2.0));",
    "    vec3 color = uColors[0];",
    "    for (int i = 0; i < " + (MAX_COLORS - 1) + "; i++) {",
    "        if (i < uColorCount - 1) {",
    "            float span = 1.0 / float(uColorCount - 1);",
    "            float t = clamp((p - float(i) * span) / span, 0.0, 1.0);",
    "            color = mix(color, uColors[i + 1], t);",
    "        }",
    "    }",
    "    float d = sdRoundBox(uv, vec2(0.5, 0.2), 0.25);",
    "    float mask = smoothstep(0.1, 0.0, d);",
    "    float a = mask * smoothstep(0.1, 0.2, vScale);",
    "    if (a < 0.01) discard;",
    "    color = clamp(color, 0.0, 1.0);",
    "    color *= clamp(vEnergy, 0.0, 1.0);",
    "    gl_FragColor = vec4(color, clamp(a, 0.0, 1.0));",
    "}"
  ].join("\n");

  function compile(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      var log = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error(log || "shader compile failed");
    }
    return sh;
  }

  function program(gl, vs, fs, names) {
    var prog = gl.createProgram();
    var v = compile(gl, gl.VERTEX_SHADER, vs);
    var f = compile(gl, gl.FRAGMENT_SHADER, fs);
    gl.attachShader(prog, v);
    gl.attachShader(prog, f);
    gl.linkProgram(prog);
    gl.deleteShader(v);
    gl.deleteShader(f);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      var log = gl.getProgramInfoLog(prog);
      gl.deleteProgram(prog);
      throw new Error(log || "program link failed");
    }
    var u = {};
    names.forEach(function (n) { u[n] = gl.getUniformLocation(prog, n); });
    return { prog: prog, u: u };
  }

  function makeContext(canvas) {
    var opts = { alpha: true, antialias: false, premultipliedAlpha: false, depth: false, stencil: false, powerPreference: "high-performance", preserveDrawingBuffer: false };
    var gl = canvas.getContext("webgl2", opts);
    var fmt = null;
    if (gl) {
      fmt = gl.getExtension("EXT_color_buffer_float")
        ? { internal: gl.RGBA32F, format: gl.RGBA, type: gl.FLOAT }
        : { internal: gl.RGBA16F, format: gl.RGBA, type: gl.HALF_FLOAT };
    } else {
      gl = canvas.getContext("webgl", opts) || canvas.getContext("experimental-webgl", opts);
      if (!gl) return null;
      var ok = gl.getExtension("OES_texture_float") && gl.getExtension("WEBGL_color_buffer_float");
      fmt = ok ? { internal: gl.RGBA, format: gl.RGBA, type: gl.FLOAT } : null;
    }
    if (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) < 2) fmt = null;
    return { gl: gl, fmt: fmt };
  }

  function stateTexture(gl, fmt, size, pixels) {
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, fmt.internal, size, size, 0, fmt.format, fmt.type, pixels || null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return tex;
  }

  function renderTarget(gl, fmt, size) {
    var tex = stateTexture(gl, fmt, size, null);
    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    var ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { tex: tex, fbo: fbo, ok: ok };
  }

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function linMap(x, a, b, c, d) { return ((x - a) * (d - c)) / (b - a) + c; }

  function poissonDisk(size, minD, maxD, tries, rand) {
    var cell = minD / Math.SQRT2;
    var gw = Math.ceil(size / cell);
    var gh = Math.ceil(size / cell);
    var grid = new Int32Array(gw * gh).fill(-1);
    var px = [], py = [], active = [];
    var minD2 = minD * minD;
    function add(x, y) {
      var i = px.length;
      px.push(x); py.push(y);
      grid[((y / cell) | 0) * gw + ((x / cell) | 0)] = i;
      active.push(i);
    }
    add(rand() * size, rand() * size);
    while (active.length > 0 && px.length < MAX_POINTS) {
      var ai = (rand() * active.length) | 0;
      var idx = active[ai];
      var placed = false;
      for (var t = 0; t < tries; t++) {
        var ang = rand() * TAU;
        var r = minD + (maxD - minD) * rand();
        var nx = px[idx] + Math.cos(ang) * r;
        var ny = py[idx] + Math.sin(ang) * r;
        if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
        var cx = (nx / cell) | 0;
        var cy = (ny / cell) | 0;
        var ok = true;
        for (var j = Math.max(0, cy - 2); j <= Math.min(gh - 1, cy + 2) && ok; j++) {
          for (var i = Math.max(0, cx - 2); i <= Math.min(gw - 1, cx + 2); i++) {
            var q = grid[j * gw + i];
            if (q < 0) continue;
            var dx = px[q] - nx, dy = py[q] - ny;
            if (dx * dx + dy * dy < minD2) { ok = false; break; }
          }
        }
        if (ok) { add(nx, ny); placed = true; break; }
      }
      if (!placed) { active[ai] = active[active.length - 1]; active.pop(); }
    }
    return { px: px, py: py, count: px.length };
  }

  function buildField(density) {
    var rand = mulberry32(0x9e3779b9);
    var minD = linMap(density, 0, 300, 10, 2);
    var maxD = linMap(density, 0, 300, 11, 3);
    var pd = poissonDisk(FIELD, minD, maxD, 20, rand);
    var count = pd.count;
    var texSize = 8;
    while (texSize * texSize < count) texSize *= 2;
    var refs = new Float32Array(texSize * texSize * 4);
    var aUV = new Float32Array(count * 2);
    var aRef = new Float32Array(count * 2);
    for (var i = 0; i < count; i++) {
      var x = (pd.px[i] - HALF) / HALF;
      var y = (pd.py[i] - HALF) / HALF;
      refs[i * 4] = x; refs[i * 4 + 1] = y;
      aRef[i * 2] = x; aRef[i * 2 + 1] = y;
      aUV[i * 2] = ((i % texSize) + 0.5) / texSize;
      aUV[i * 2 + 1] = (Math.floor(i / texSize) + 0.5) / texSize;
    }
    return { count: count, texSize: texSize, refs: refs, aUV: aUV, aRef: aRef };
  }

  function valueNoise1(x, seed) {
    var i = Math.floor(x), f = x - i;
    function h(n) { var s = Math.sin((n + seed) * 127.1) * 43758.5453; return s - Math.floor(s); }
    var u = f * f * (3 - 2 * f);
    return h(i) * (1 - u) + h(i + 1) * u;
  }

  function hexToRgb(hex) {
    var s = String(hex || "").trim().replace("#", "");
    if (s.length === 3) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
    if (s.length === 8) s = s.slice(0, 6);
    if (s.length !== 6) return [1, 1, 1];
    var n = parseInt(s, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  function mount(host, options) {
    options = options || {};
    var density = options.density != null ? options.density : 300;
    var dotSize = options.dotSize != null ? options.dotSize : 120;
    var speed = options.speed != null ? options.speed : 6;
    var cameraDistance = options.cameraDistance != null ? options.cameraDistance : 160;
    var ring = options.ring || { push: 50, width: 9, radius: 12, turbulence: 100 };
    var colors = (options.colors && options.colors.length ? options.colors : DEFAULT_COLORS).slice(0, MAX_COLORS);
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var swatches = colors.map(hexToRgb);
    var flatColors = new Float32Array(MAX_COLORS * 3);
    for (var ci = 0; ci < MAX_COLORS; ci++) {
      var c = swatches[Math.min(ci, swatches.length - 1)];
      flatColors[ci * 3] = c[0]; flatColors[ci * 3 + 1] = c[1]; flatColors[ci * 3 + 2] = c[2];
    }
    var L = {
      colors: flatColors,
      colorCount: swatches.length,
      dotSize: dotSize / 100,
      speed: speed / 50,
      camDist: cameraDistance / 100,
      ringRadius: (ring.radius != null ? ring.radius : 12) / 100,
      ringWidth: Math.max(ring.width != null ? ring.width : 9, 1) / 100,
      ringEdge: RING_EDGE / 100,
      push: (ring.push || 0) / 100,
      turb: (ring.turbulence || 0) / 100
    };

    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;";
    host.appendChild(canvas);

    var ctx = makeContext(canvas);
    if (!ctx) { canvas.remove(); return null; }
    var gl = ctx.gl, fmt = ctx.fmt, useSim = !!fmt;

    var simProg = null, renderProg = null;
    try {
      if (useSim) simProg = program(gl, SIM_VERT, SIM_FRAG, ["uState", "uRefs", "uRingPos", "uRingRadius", "uRingWidth", "uRingWidth2", "uPush", "uTurb", "uTime"]);
      var renderNames = ["uProjF", "uAspect", "uCamDist", "uPointScale", "uColors[0]", "uColorCount", "uRingPos", "uTime"];
      if (useSim) renderNames.push("uState"); else renderNames.push("uRingRadius", "uRingWidth", "uRingWidth2", "uTurb");
      renderProg = program(gl, RENDER_VERT(!useSim), RENDER_FRAG, renderNames);
    } catch (e) {
      if (window.console) console.warn("RingField:", e.message);
      canvas.remove();
      return null;
    }

    var quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    var uvBuf = gl.createBuffer(), refBuf = gl.createBuffer();
    var refsTex = null, rt1 = null, rt2 = null, count = 0, texSize = 8;

    (function rebuildField(d) {
      var f = buildField(d);
      count = f.count; texSize = f.texSize;
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
      gl.bufferData(gl.ARRAY_BUFFER, f.aUV, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, refBuf);
      gl.bufferData(gl.ARRAY_BUFFER, f.aRef, gl.STATIC_DRAW);
      if (!useSim) return;
      var src = { internal: fmt.internal, format: gl.RGBA, type: gl.FLOAT };
      refsTex = stateTexture(gl, src, texSize, f.refs);
      rt1 = renderTarget(gl, fmt, texSize);
      rt2 = renderTarget(gl, fmt, texSize);
      gl.bindTexture(gl.TEXTURE_2D, rt1.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, fmt.internal, texSize, texSize, 0, gl.RGBA, gl.FLOAT, f.refs);
      gl.bindTexture(gl.TEXTURE_2D, rt2.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, fmt.internal, texSize, texSize, 0, gl.RGBA, gl.FLOAT, f.refs);
      gl.bindTexture(gl.TEXTURE_2D, null);
    })(density);

    var dpr = 1, cssW = 1, cssH = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      cssW = Math.max(canvas.clientWidth || host.clientWidth || 1, 1);
      cssH = Math.max(canvas.clientHeight || host.clientHeight || 1, 1);
      var w = Math.max(1, Math.round(cssW * dpr)), h = Math.max(1, Math.round(cssH * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    }
    resize();
    var ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // the canvas ignores pointer events (so the hero stays clickable): track the cursor on the window
    var pointer = { x: 0, y: 0, over: false };
    var ringPos = { x: 0, y: 0 };
    var follow = 0;
    function onMove(e) {
      var r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / Math.max(r.width, 1)) * 2 - 1;
      pointer.y = -(((e.clientY - r.top) / Math.max(r.height, 1)) * 2 - 1);
      pointer.over = pointer.x >= -1 && pointer.x <= 1 && pointer.y >= -1 && pointer.y <= 1;
    }
    function onLeave() { pointer.over = false; }
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    var raf = 0, last = 0, simTime = 0, wander = 0, ping = true, visible = true;
    var posLocSim = simProg ? gl.getAttribLocation(simProg.prog, "aPos") : -1;
    var uvLoc = gl.getAttribLocation(renderProg.prog, "aUV");
    var refLoc = gl.getAttribLocation(renderProg.prog, "aRef");

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    function frame(now) {
      raf = 0;
      if (!count) return;
      var dtRaw = last ? (now - last) / 1000 : 1 / 60;
      last = now;
      var dt = Math.min(dtRaw, 1 / 20);
      simTime = (simTime + dt * L.speed) % 3600;
      wander += dt * L.speed;

      var aspect = Math.max(cssW / Math.max(cssH, 1), 0.0001);
      var projF = 1 / Math.tan(((FOV * Math.PI) / 180) / 2);
      var wx = (valueNoise1(wander * 0.66, 94.234) - 0.5) * 2;
      var wy = (valueNoise1(wander * 0.75, 21.028) - 0.5) * 2;

      follow += ((pointer.over ? 1 : 0) - follow) * (1 - Math.pow(1 - HANDOVER_LERP, dt * 60));
      var wanderX = wx * 0.2, wanderY = wy * 0.1;
      var tx = wanderX, ty = wanderY;
      if (follow > 0.0001) {
        var worldX = (pointer.x * aspect * L.camDist) / projF;
        var worldY = (pointer.y * L.camDist) / projF;
        var cx = worldX * CURSOR_REACH + wx * CURSOR_JITTER;
        var cy = worldY * CURSOR_REACH + wy * CURSOR_JITTER;
        tx = wanderX + (cx - wanderX) * follow;
        ty = wanderY + (cy - wanderY) * follow;
      }
      var lerp = WANDER_LERP + (CURSOR_LERP - WANDER_LERP) * follow;
      var rk = 1 - Math.pow(1 - lerp, dt * 60);
      ringPos.x += (tx - ringPos.x) * rk;
      ringPos.y += (ty - ringPos.y) * rk;
      var radius = L.ringRadius + Math.sin(simTime) * 0.03 + Math.cos(simTime * 3) * 0.02;

      if (useSim) {
        var src = ping ? rt1 : rt2, dst = ping ? rt2 : rt1;
        gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
        gl.viewport(0, 0, texSize, texSize);
        gl.disable(gl.BLEND);
        gl.useProgram(simProg.prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, quad);
        gl.enableVertexAttribArray(posLocSim);
        gl.vertexAttribPointer(posLocSim, 2, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, src.tex);
        gl.uniform1i(simProg.u.uState, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, refsTex);
        gl.uniform1i(simProg.u.uRefs, 1);
        gl.uniform2f(simProg.u.uRingPos, ringPos.x, ringPos.y);
        gl.uniform1f(simProg.u.uRingRadius, radius);
        gl.uniform1f(simProg.u.uRingWidth, L.ringWidth);
        gl.uniform1f(simProg.u.uRingWidth2, L.ringEdge);
        gl.uniform1f(simProg.u.uPush, L.push);
        gl.uniform1f(simProg.u.uTurb, L.turb);
        gl.uniform1f(simProg.u.uTime, simTime);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.enable(gl.BLEND);
        ping = !ping;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(renderProg.prog);
      if (uvLoc >= 0) { gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf); gl.enableVertexAttribArray(uvLoc); gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0); }
      if (refLoc >= 0) { gl.bindBuffer(gl.ARRAY_BUFFER, refBuf); gl.enableVertexAttribArray(refLoc); gl.vertexAttribPointer(refLoc, 2, gl.FLOAT, false, 0, 0); }
      if (useSim) {
        var shown = ping ? rt1 : rt2;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, shown.tex);
        gl.uniform1i(renderProg.u.uState, 0);
      } else {
        gl.uniform1f(renderProg.u.uRingRadius, radius);
        gl.uniform1f(renderProg.u.uRingWidth, L.ringWidth);
        gl.uniform1f(renderProg.u.uRingWidth2, L.ringEdge);
        gl.uniform1f(renderProg.u.uTurb, L.turb);
      }
      gl.uniform1f(renderProg.u.uProjF, projF);
      gl.uniform1f(renderProg.u.uAspect, aspect);
      gl.uniform1f(renderProg.u.uCamDist, L.camDist);
      // keep the dashes readable on narrow (mobile) screens
      gl.uniform1f(renderProg.u.uPointScale, (Math.max(cssW, 1100) / 2000) * L.dotSize * dpr * 0.5);
      gl.uniform3fv(renderProg.u["uColors[0]"], L.colors);
      gl.uniform1i(renderProg.u.uColorCount, L.colorCount);
      gl.uniform2f(renderProg.u.uRingPos, ringPos.x, ringPos.y);
      gl.uniform1f(renderProg.u.uTime, simTime);
      gl.drawArrays(gl.POINTS, 0, count);

      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf && !reduced && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

    // reduced motion: let the field settle for a few steps, then hold a still frame
    if (reduced) { for (var s = 0; s < 40; s++) frame(s * 16.7); }
    else raf = requestAnimationFrame(frame);

    var io = new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; if (visible) start(); else stop(); });
    io.observe(host);
    function onVis() { if (document.hidden) stop(); else start(); }
    document.addEventListener("visibilitychange", onVis);

    return {
      destroy: function () {
        stop(); io.disconnect(); ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVis);
        canvas.remove();
      }
    };
  }

  window.RingField = { mount: mount };
})();
