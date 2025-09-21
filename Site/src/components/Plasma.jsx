import { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Plasma.css';

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision mediump float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Balanced fragment shader for good performance and visibility
const fragment = `#version 300 es
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0001;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  // Balanced iterations for good performance and visibility (28 iterations)
  for (vec2 r = iResolution.xy, Q; ++i < 28.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y));
    p.z -= 4.;
    S = p;
    d = p.y-T;
    
    // Enhanced distortion for better visibility
    p.x += .5*(1.+p.y)*sin(d + p.x*0.12)*cos(.34*d + p.x*0.06);
    p.y += .2*sin(d*0.6 + p.z*0.08)*cos(.15*d + p.y*0.04);
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+7e-4;
    o = 1.1+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/6e3); // Improved contrast for better visibility
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  // Enhanced color mixing for better visibility
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  intensity = pow(intensity, 0.9); // Light gamma correction for visibility
  
  vec3 customColor = intensity * uCustomColor;
  vec3 originalColor = rgb * vec3(1.3, 0.9, 0.7); // Enhanced original colors
  vec3 finalColor = mix(originalColor, customColor, step(0.5, uUseCustomColor));
  
  // Improved alpha calculation for better visibility
  float alpha = (length(rgb) * 1.2 + intensity * 0.3) * uOpacity;
  alpha = clamp(alpha, 0.0, 1.0);
  
  fragColor = vec4(finalColor, alpha);
}`;

export const Plasma = ({
  color = '#ffffff',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true
}) => {
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);
  const lastFrameTime = useRef(0);

  // Performance optimization: only render when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isVisible) return;

    const useCustomColor = color ? 1.0 : 0.0;
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;

    // Balanced renderer settings for performance and quality
    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false, // Keep disabled for performance
      dpr: Math.min(window.devicePixelRatio || 1, 1.5), // Balanced DPR
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    });
    
    const gl = renderer.gl;
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }
    
    const canvas = gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    containerRef.current.appendChild(canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertex,
      fragment: fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(customColorRgb) },
        uUseCustomColor: { value: useCustomColor },
        uSpeed: { value: speed * 0.4 }, // Slightly increased for better visibility
        uDirection: { value: directionMultiplier },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Optimized mouse move handler
    let mouseTimeout;
    const handleMouseMove = e => {
      if (!mouseInteractive || !containerRef.current) return;
      
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        const rect = containerRef.current.getBoundingClientRect();
        mousePos.current.x = e.clientX - rect.left;
        mousePos.current.y = e.clientY - rect.top;
        const mouseUniform = program.uniforms.uMouse.value;
        mouseUniform[0] = mousePos.current.x;
        mouseUniform[1] = mousePos.current.y;
      }, 25); // Balanced throttling
    };

    if (mouseInteractive && containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const setSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height);
      const res = program.uniforms.iResolution.value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
    };

    const ro = new ResizeObserver(setSize);
    if (containerRef.current) {
      ro.observe(containerRef.current);
      setTimeout(setSize, 100);
    }

    const t0 = performance.now();
    
    // Balanced frame rate for smooth animation and good performance
    const targetFPS = 30; // Increased to 30fps for smoother animation
    const frameInterval = 1000 / targetFPS;

    const loop = t => {
      // Skip frames if system is under load
      if (t - lastFrameTime.current < frameInterval) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      let timeValue = (t - t0) * 0.001;

      if (direction === 'pingpong') {
        const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;
        program.uniforms.uDirection.value = cycle;
      }

      program.uniforms.iTime.value = timeValue;
      renderer.render({ scene: mesh });
      lastFrameTime.current = t;
      
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      clearTimeout(mouseTimeout);
      ro.disconnect();
      if (mouseInteractive && containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      try {
        containerRef.current?.removeChild(canvas);
      } catch {
        console.warn('Canvas already removed from container');
      }
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive, isVisible]);

  return <div ref={containerRef} className="plasma-container" />;
};

export default Plasma;