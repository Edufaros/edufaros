"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./magic-book.module.css";

/* CONFIG: tweak these values to tune the book without changing its logic. */
const C = {
  pages: 16,
  W: 2.2,
  H: 3.0,
  segs: 28,
  speed: 0.45,       // Lower = slower page turns.
  phase: 0.42,       // Delay between pages; higher = wider wave.
  gap: 0.006,
  baseY: 0.13,
  cover: 0x7a0f2b,
  starCount: 260,
  glitterCount: 900,
};

type LayerOptions = {
  rise: number;
  w: number;
  wob: number;
  h: number;
  tw: number;
  size: number;
};

type ParticleLayer = {
  n: number;
  o: LayerOptions;
  pos: Float32Array;
  size: Float32Array;
  alpha: Float32Array;
  life: Float32Array;
  seed: Float32Array;
  rx: Float32Array;
  rz: Float32Array;
  geo: THREE.BufferGeometry;
  mat: THREE.ShaderMaterial;
  pts: THREE.Points;
};

export default function MagicBook() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageElement: HTMLDivElement = stage;

    let disposed = false;
    let isOnScreen = false;
    let documentVisible = document.visibilityState === "visible";
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0);
    stageElement.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    const look = new THREE.Vector3(0, 1.1, 0);
    let baseZ = 8;

    /* Lights: warm book glow and a clean white key light. */
    scene.add(new THREE.HemisphereLight(0xffe9d0, 0x401020, 0.9));
    const warm = new THREE.PointLight(0xfff0d0, 45, 14, 2);
    warm.position.set(0, 2.2, 0.8);
    scene.add(warm);
    const key = new THREE.DirectionalLight(0xffffff, 0.8);
    key.position.set(2, 5, 4);
    scene.add(key);

    /* Canvas textures: cream page detail and the warm radial glow. */
    function paperTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 700;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not create the book paper texture.");

      const gradient = context.createLinearGradient(0, 0, 512, 0);
      gradient.addColorStop(0, "#cdbf98");
      gradient.addColorStop(0.18, "#efe4c3");
      gradient.addColorStop(1, "#f8f0da");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 700);

      context.fillStyle = "rgba(60,45,25,.28)";
      for (let y = 80; y < 620; y += 26) {
        context.fillRect(70, y, 300 + Math.random() * 100, 5);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      return texture;
    }

    function glowTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 256;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not create the book glow texture.");

      const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, "rgba(255,248,225,1)");
      gradient.addColorStop(0.3, "rgba(255,235,200,.55)");
      gradient.addColorStop(1, "rgba(255,220,180,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 256);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    /* Book group: burgundy covers and spine remain stationary. */
    const book = new THREE.Group();
    scene.add(book);

    const coverMat = new THREE.MeshStandardMaterial({
      color: C.cover,
      roughness: 0.55,
      metalness: 0.1,
    });
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0xe9ddb8,
      roughness: 0.9,
      emissive: 0x2a2010,
    });
    const coverWidth = C.W + 0.14;
    const coverHeight = C.H + 0.14;

    for (const side of [-1, 1]) {
      const cover = new THREE.Mesh(
        new THREE.BoxGeometry(coverWidth, 0.14, coverHeight),
        coverMat
      );
      cover.position.set(side * (coverWidth / 2 - 0.05), -0.07, 0);
      book.add(cover);

      const block = new THREE.Mesh(
        new THREE.BoxGeometry(C.W - 0.06, 0.12, C.H - 0.06),
        blockMat
      );
      block.position.set(side * (C.W / 2), 0.06, 0);
      book.add(block);
    }

    const spine = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.16, coverHeight),
      coverMat
    );
    spine.position.set(0, -0.07, 0);
    book.add(spine);

    /* Flipping pages: bendPage and its segmented geometry are retained. */
    const paper = new THREE.MeshStandardMaterial({
      map: paperTexture(),
      side: THREE.DoubleSide,
      roughness: 0.85,
      emissive: 0x3a2e18,
      emissiveIntensity: 0.55,
    });
    const N = C.segs + 1;
    const pages: THREE.Mesh[] = [];

    for (let k = 0; k < C.pages; k += 1) {
      const geometry = new THREE.BufferGeometry();
      const uv = new Float32Array(N * 4);
      const indices: number[] = [];

      for (let i = 0; i < N; i += 1) {
        const u = i / C.segs;
        uv.set([u, 0, u, 1], i * 4);
      }
      for (let i = 0; i < C.segs; i += 1) {
        const a = i * 2;
        indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(N * 6), 3)
      );
      geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
      geometry.setIndex(indices);

      const page = new THREE.Mesh(geometry, paper);
      page.frustumCulled = false;
      book.add(page);
      pages.push(page);
    }

    /* ph controls each sheet's wave position: right → left → right. */
    function bendPage(mesh: THREE.Mesh, k: number, ph: number) {
      const p = 0.5 + 0.5 * Math.sin(ph);
      const a0 = 0.32 + p * (Math.PI - 0.64);
      const bend = (p * 2 - 1) * 0.4 - 0.85 * Math.cos(ph);
      const position = mesh.geometry.getAttribute("position") as THREE.BufferAttribute;
      const ds = C.W / C.segs;
      let x = 0;
      let y = C.baseY + (k * (1 - p) + (C.pages - 1 - k) * p) * C.gap;

      for (let i = 0; i <= C.segs; i += 1) {
        if (i > 0) {
          const angle = a0 + bend * ((i - 0.5) / C.segs);
          x += Math.cos(angle) * ds;
          y += Math.sin(angle) * ds;
        }
        position.setXYZ(2 * i, x, y, -C.H / 2);
        position.setXYZ(2 * i + 1, x, y, C.H / 2);
      }

      position.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    }

    /* Warm glow sprite behind the book; canvas alpha stays transparent. */
    const glowMap = glowTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowMap,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      toneMapped: false,
    });
    const glow = new THREE.Sprite(glowMaterial);
    glow.scale.set(9, 6.5, 1);
    glow.position.set(0, 1.1, -0.8);
    scene.add(glow);

    /* Shader layers: four-point stars and fine glitter dust. */
    const vertexShader = [
      "attribute float aSize; attribute float aAlpha; varying float vA; uniform float uPx;",
      "void main(){ vA=aAlpha; vec4 mv=modelViewMatrix*vec4(position,1.);",
      "gl_PointSize=aSize*uPx*320./-mv.z; gl_Position=projectionMatrix*mv; }",
    ].join("\n");

    const starFragmentShader = [
      "varying float vA;",
      "void main(){ vec2 p=gl_PointCoord-.5; float d=length(p);",
      "float h=exp(-abs(p.y)*38.)*(1.-smoothstep(0.,.5,abs(p.x)));",
      "float v=exp(-abs(p.x)*38.)*(1.-smoothstep(0.,.5,abs(p.y)));",
      "float a=clamp(h+v+exp(-d*14.),0.,1.)*vA;",
      "gl_FragColor=vec4(vec3(1.,.93,.78)*a,a); }",
    ].join("\n");

    const dotFragmentShader = [
      "varying float vA;",
      "void main(){ float d=length(gl_PointCoord-.5);",
      "float a=exp(-d*d*60.)*vA;",
      "gl_FragColor=vec4(vec3(1.,.92,.75)*a,a); }",
    ].join("\n");

    function makeLayer(
      n: number,
      fragmentShader: string,
      options: LayerOptions
    ): ParticleLayer {
      const layer = {
        n,
        o: options,
        pos: new Float32Array(n * 3),
        size: new Float32Array(n),
        alpha: new Float32Array(n),
        life: new Float32Array(n),
        seed: new Float32Array(n),
        rx: new Float32Array(n),
        rz: new Float32Array(n),
        geo: new THREE.BufferGeometry(),
        mat: new THREE.ShaderMaterial(),
        pts: new THREE.Points(),
      } satisfies ParticleLayer;

      for (let i = 0; i < n; i += 1) {
        layer.life[i] = Math.random();
        layer.seed[i] = Math.random() * 6.283;
        layer.rx[i] = Math.random() * 2 - 1;
        layer.rz[i] = Math.random() * 2 - 1;
      }

      layer.geo.setAttribute("position", new THREE.BufferAttribute(layer.pos, 3));
      layer.geo.setAttribute("aSize", new THREE.BufferAttribute(layer.size, 1));
      layer.geo.setAttribute("aAlpha", new THREE.BufferAttribute(layer.alpha, 1));
      layer.mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uPx: { value: renderer.getPixelRatio() } },
        vertexShader,
        fragmentShader,
      });
      layer.pts = new THREE.Points(layer.geo, layer.mat);
      layer.pts.frustumCulled = false;
      scene.add(layer.pts);
      return layer;
    }

    function updateLayer(layer: ParticleLayer, dt: number, time: number) {
      const options = layer.o;
      for (let i = 0; i < layer.n; i += 1) {
        const seed = layer.seed[i];
        layer.life[i] += dt * options.rise * (0.6 + (seed % 1) * 0.8);
        if (layer.life[i] > 1) layer.life[i] -= 1;

        const life = layer.life[i];
        const spread = options.w * (0.35 + life * 1.1);
        layer.pos[i * 3] =
          layer.rx[i] * C.W * 0.9 * (1 - life * 0.45) +
          Math.sin(life * options.wob + seed) * spread * 0.4;
        layer.pos[i * 3 + 1] = 0.5 + life * options.h;
        layer.pos[i * 3 + 2] =
          layer.rz[i] * C.H * 0.4 + Math.cos(life * 5 + seed) * spread * 0.3;
        layer.alpha[i] =
          Math.pow(Math.sin(life * Math.PI), 0.8) *
          (0.55 + 0.45 * Math.sin(time * options.tw + seed * 5));
        layer.size[i] = options.size * (0.5 + (seed % 1)) * (1 - life * 0.35);
      }

      layer.geo.attributes.position.needsUpdate = true;
      layer.geo.attributes.aSize.needsUpdate = true;
      layer.geo.attributes.aAlpha.needsUpdate = true;
    }

    const layers: ParticleLayer[] = [
      makeLayer(C.starCount, starFragmentShader, {
        rise: 0.09, w: 1.6, wob: 7, h: 5.2, tw: 6, size: 0.2,
      }),
      makeLayer(C.glitterCount, dotFragmentShader, {
        rise: 0.07, w: 2.2, wob: 4, h: 4.2, tw: 11, size: 0.05,
      }),
    ];

    /* Resize, camera pullback, and pointer parallax. */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    function resize() {
      if (disposed) return;
      const width = Math.max(1, stageElement.clientWidth);
      const height = Math.max(1, stageElement.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      baseZ = 8 * Math.max(1, 1.5 / camera.aspect);
      camera.updateProjectionMatrix();
      for (const layer of layers) {
        layer.mat.uniforms.uPx.value = renderer.getPixelRatio();
      }
    }

    function onPointerMove(event: PointerEvent) {
      pointer.tx = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    const clock = new THREE.Clock();
    let time = 0;

    function animate() {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      time += dt * (reduceMotion ? 0.15 : 1);

      for (let k = 0; k < C.pages; k += 1) {
        bendPage(pages[k], k, time * C.speed * 2 - k * C.phase);
      }
      layers.forEach((layer) => updateLayer(layer, dt * (reduceMotion ? 0.2 : 1), time));

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      camera.position.set(pointer.x * 0.9, 3.6 + pointer.y * -0.4, baseZ);
      camera.lookAt(look);
      book.position.y = Math.sin(time * 0.9) * 0.04;
      book.rotation.y = Math.sin(time * 0.25) * 0.1;

      glow.material.opacity = 0.85 + 0.15 * Math.sin(time * 1.6);
      warm.intensity = 45 + 8 * Math.sin(time * 1.6);
      renderer.render(scene, camera);
    }

    /* Pause the GPU loop off-screen or while the tab is hidden. */
    function syncAnimationLoop() {
      if (disposed) return;
      if (isOnScreen && documentVisible) renderer.setAnimationLoop(animate);
      else renderer.setAnimationLoop(null);
    }

    function onMotionPreferenceChange(event: MediaQueryListEvent) {
      reduceMotion = event.matches;
    }

    function onVisibilityChange() {
      documentVisible = document.visibilityState === "visible";
      syncAnimationLoop();
    }

    resize();
    camera.position.set(0, 3.6, baseZ);
    camera.lookAt(look);
    renderer.render(scene, camera);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stageElement);

    const intersectionObserver = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          isOnScreen = entries.some((entry) => entry.isIntersecting);
          syncAnimationLoop();
        }, { threshold: 0.01, rootMargin: "40px" })
      : null;

    if (intersectionObserver) intersectionObserver.observe(stageElement);
    else isOnScreen = true;

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", onMotionPreferenceChange);
    syncAnimationLoop();

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      intersectionObserver?.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", onMotionPreferenceChange);

      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();

      scene.traverse((object) => {
        const drawable = object as THREE.Object3D & {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };
        if (drawable.geometry) geometries.add(drawable.geometry);
        if (!drawable.material) return;

        const objectMaterials = Array.isArray(drawable.material)
          ? drawable.material
          : [drawable.material];

        for (const material of objectMaterials) {
          materials.add(material);
          for (const value of Object.values(material)) {
            if (value instanceof THREE.Texture) textures.add(value);
          }
          const uniforms = (material as THREE.ShaderMaterial).uniforms;
          if (uniforms) {
            for (const uniform of Object.values(uniforms)) {
              const value = (uniform as THREE.IUniform).value;
              if (value instanceof THREE.Texture) textures.add(value);
            }
          }
        }
      });

      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === stageElement) stageElement.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={stageRef} className={styles.stage} aria-hidden="true" />;
}
