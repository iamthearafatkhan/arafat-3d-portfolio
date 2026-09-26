import { useEffect, useRef } from "react";
import * as THREE from "three";

/* =========================================================
   ACCRETION DISK SHADER  (RED / BEETROOT PALETTE)
   ========================================================= */
const AccretionDiskShader = {
    vertexShader: /* glsl */ `
    varying vec3 vPos;
    void main() {
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform float uZoom;
    varying vec3 vPos;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    void main() {
      float r = length(vPos.xy);
      float angle = atan(vPos.y, vPos.x);

      float innerR = 1.8;
      float outerR = 9.0;
      float t = clamp((r - innerR) / (outerR - innerR), 0.0, 1.0);

      float orbitalSpeed = 2.6 / pow(r, 1.4) + 0.5;
      float spin = angle + uTime * orbitalSpeed;

      float s1 = sin(spin * 2.0 - r * 1.2) * 0.5 + 0.5;
      float s2 = sin(spin * 3.0 - r * 2.2 + 1.7) * 0.5 + 0.5;
      float spiral = pow(s1, 2.0) * 0.6 + pow(s2, 2.0) * 0.4;

      float turb = noise(vec2(spin * 2.5, r * 1.5 - uTime * 0.6));
      turb += 0.5 * noise(vec2(spin * 5.0 + uTime * 0.8, r * 3.0));
      turb = turb * 0.5 + 0.5;

      float doppler = 0.55 + 0.55 * sin(angle - 1.5708);
      doppler = max(doppler, 0.15);

      float density = spiral * 0.55 + turb * 0.45;
      density *= doppler;
      density *= 0.7 + 0.6 * (1.0 - t);

      float edge = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.7, 1.0, t));

      vec3 coreColor   = vec3(1.00, 0.97, 0.90);
      vec3 hotOrange   = vec3(1.00, 0.36, 0.06);
      vec3 deepRed     = vec3(0.78, 0.05, 0.03);
      vec3 beetroot    = vec3(0.16, 0.004, 0.015);

      vec3 color = mix(coreColor, hotOrange, smoothstep(0.0, 0.12, t));
      color = mix(color, deepRed,  smoothstep(0.12, 0.50, t));
      color = mix(color, beetroot, smoothstep(0.50, 1.00, t));

      float innerBoost = 1.0 + (1.0 - smoothstep(0.0, 0.25, t)) * 1.6;
      color *= innerBoost;
      color *= (0.75 + doppler * 0.95);
      color *= (1.0 + uZoom * 0.9);

      float alpha = clamp(density * edge, 0.0, 1.0);

      gl_FragColor = vec4(color, alpha);
    }
  `,
};

/* =========================================================
   PHOTON RING  (WHITE-HOT → RED GLOW)
   ========================================================= */
const PhotonRingShader = {
    vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform float uZoom;
    varying vec3 vNormal;
    varying vec3 vWorldPos;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPos);
      float rim = 1.0 - abs(dot(vNormal, viewDir));
      float glow = pow(rim, 4.0);

      float pulse = 0.85 + 0.15 * sin(uTime * 1.5);

      vec3 whiteHot = vec3(1.00, 0.97, 0.90);
      vec3 redGlow  = vec3(1.00, 0.14, 0.05);

      vec3 color = mix(whiteHot, redGlow, glow * 0.7);

      float intensity = glow * pulse * (1.0 + uZoom * 1.3);

      gl_FragColor = vec4(color * 3.0 * pulse, intensity * 0.92);
    }
  `,
};

/* =========================================================
   STARFIELD
   ========================================================= */
const StarfieldShader = {
    vertexShader: /* glsl */ `
    attribute float aSize;
    attribute float aPhase;
    varying float vPhase;
    uniform float uTime;
    uniform float uZoom;

    void main() {
      vPhase = aPhase;

      vec3 pos = position;
      pos.xy *= 1.0 + uZoom * 1.4;
      pos.z  += uZoom * 25.0;

      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = aSize * (180.0 / -mv.z) * (1.0 + uZoom * 2.5);
      gl_Position = projectionMatrix * mv;
    }
  `,
    fragmentShader: /* glsl */ `
    varying float vPhase;
    uniform float uTime;
    void main() {
      vec2 c = gl_PointCoord - vec2(0.5);
      float d = length(c);
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.0, d);
      float twinkle = 0.7 + 0.3 * sin(uTime * 2.0 + vPhase * 6.2831);
      gl_FragColor = vec4(vec3(1.0, 0.96, 0.92) * twinkle, a * 0.85);
    }
  `,
};

/* =========================================================
   TIMING CONSTANTS
   ========================================================= */
const IDLE_DURATION = 700;   // ms before zoom starts
const ZOOM_DURATION = 900;   // ms of suck-in
const REVEAL_AT     = 0.88;  // zoom progress when split begins
const REVEAL_CSS_MS = 1000;  // must match CSS clip-path transition duration

/* =========================================================
   COMPONENT
   ========================================================= */
const BlackHoleLoader = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const loaderRef = useRef(null);

    const stateRef = useRef({
        zoomStarted: false,
        zoomStartTime: 0,
        revealed: false,
    });

    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const loaderEl = loaderRef.current;
        if (!canvas || !loaderEl) return;

        /* ---------- RENDERER ---------- */
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        /* ---------- SCENE + CAMERA ---------- */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.set(0, 1.6, 13);
        camera.lookAt(0, 0, 0);

        /* ---------- STARFIELD ---------- */
        const STAR_COUNT = 2500;
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(STAR_COUNT * 3);
        const starSize = new Float32Array(STAR_COUNT);
        const starPhase = new Float32Array(STAR_COUNT);

        for (let i = 0; i < STAR_COUNT; i++) {
            const r = 60 + Math.random() * 120;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            starPos[i * 3 + 2] = r * Math.cos(phi);
            starSize[i]  = 0.4 + Math.random() * 1.6;
            starPhase[i] = Math.random();
        }

        starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
        starGeo.setAttribute("aSize", new THREE.BufferAttribute(starSize, 1));
        starGeo.setAttribute("aPhase", new THREE.BufferAttribute(starPhase, 1));

        const starMat = new THREE.ShaderMaterial({
            vertexShader: StarfieldShader.vertexShader,
            fragmentShader: StarfieldShader.fragmentShader,
            uniforms: { uTime: { value: 0 }, uZoom: { value: 0 } },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const starField = new THREE.Points(starGeo, starMat);
        scene.add(starField);

        /* ---------- EVENT HORIZON ---------- */
        const horizonGeo = new THREE.SphereGeometry(1.2, 64, 64);
        const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const horizon = new THREE.Mesh(horizonGeo, horizonMat);
        scene.add(horizon);

        /* ---------- PHOTON RING ---------- */
        const ringGeo = new THREE.SphereGeometry(1.35, 64, 64);
        const ringMat = new THREE.ShaderMaterial({
            vertexShader: PhotonRingShader.vertexShader,
            fragmentShader: PhotonRingShader.fragmentShader,
            uniforms: { uTime: { value: 0 }, uZoom: { value: 0 } },
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            depthWrite: false,
        });
        const photonRing = new THREE.Mesh(ringGeo, ringMat);
        scene.add(photonRing);

        /* ---------- ACCRETION DISK ---------- */
        const diskGeo = new THREE.RingGeometry(1.8, 9.0, 256, 64);
        const diskMat = new THREE.ShaderMaterial({
            vertexShader: AccretionDiskShader.vertexShader,
            fragmentShader: AccretionDiskShader.fragmentShader,
            uniforms: { uTime: { value: 0 }, uZoom: { value: 0 } },
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const disk = new THREE.Mesh(diskGeo, diskMat);
        disk.rotation.x = -Math.PI / 2 + 0.28;
        scene.add(disk);

        /* Lensed far-side arc */
        const lensedMat = new THREE.ShaderMaterial({
            vertexShader: AccretionDiskShader.vertexShader,
            fragmentShader: AccretionDiskShader.fragmentShader,
            uniforms: { uTime: { value: 0 }, uZoom: { value: 0 } },
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const lensedDisk = new THREE.Mesh(diskGeo, lensedMat);
        lensedDisk.rotation.x = -Math.PI / 2 + 1.25;
        lensedDisk.scale.setScalar(0.75);
        scene.add(lensedDisk);

        /* ---------- MOUSE PARALLAX ---------- */
        const mouse = { tx: 0, ty: 0, x: 0, y: 0 };
        const onMouseMove = (e) => {
            mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", onMouseMove);

        /* ---------- RESIZE ---------- */
        const onResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        /* ---------- CLOCK + TIMING ---------- */
        const clock = new THREE.Clock();

        const zoomTimer = setTimeout(() => {
            stateRef.current.zoomStarted = true;
            stateRef.current.zoomStartTime = clock.getElapsedTime();
        }, IDLE_DURATION);

        const completeTimer = setTimeout(() => {
            onCompleteRef.current?.();
        }, IDLE_DURATION + ZOOM_DURATION + REVEAL_CSS_MS + 200);

        /* ---------- SKIP HANDLER ---------- */
        const skip = () => {
            if (stateRef.current.revealed) return;
            if (!stateRef.current.zoomStarted) {
                // skip idle — jump straight into the zoom
                stateRef.current.zoomStarted = true;
                stateRef.current.zoomStartTime = clock.getElapsedTime();
            } else {
                // already zooming — jump to end of zoom
                stateRef.current.zoomStartTime =
                    clock.getElapsedTime() - (ZOOM_DURATION / 1000);
            }
        };
        window.addEventListener("click", skip);
        window.addEventListener("touchstart", skip, { passive: true });
        window.addEventListener("keydown", skip);

        /* ---------- ANIMATION ---------- */
        let frameId;

        const animate = () => {
            frameId = requestAnimationFrame(animate);

            const t = clock.getElapsedTime();
            const s = stateRef.current;

            starMat.uniforms.uTime.value = t;
            diskMat.uniforms.uTime.value = t;
            lensedMat.uniforms.uTime.value = t;
            ringMat.uniforms.uTime.value = t;

            if (!s.zoomStarted) {
                /* ---------- IDLE ---------- */
                mouse.x += (mouse.tx - mouse.x) * 0.04;
                mouse.y += (mouse.ty - mouse.y) * 0.04;

                camera.position.x = Math.sin(t * 0.25) * 0.5 + mouse.x * 0.8;
                camera.position.y = 1.6 + Math.cos(t * 0.2) * 0.25 + mouse.y * 0.5;
                camera.position.z = 13;
                camera.lookAt(0, 0, 0);

                disk.rotation.z = t * 0.05;
                lensedDisk.rotation.z = -t * 0.05;
                starField.rotation.y = t * 0.01;
            } else {
                /* ---------- ZOOM (SNAPPY) ---------- */
                const zp = Math.min(
                    (t - s.zoomStartTime) / (ZOOM_DURATION / 1000),
                    1
                );

                /* Ease-in-out cubic — strong pull at the start, smooth landing */
                const eased =
                    zp < 0.5
                        ? 4 * zp * zp * zp
                        : 1 - Math.pow(-2 * zp + 2, 3) / 2;

                /* Camera snaps to center + goes ALL THE WAY in */
                camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.15);
                camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.15);
                camera.position.z = THREE.MathUtils.lerp(13, 0, eased);

                camera.lookAt(0, 0, 0);

                /* Spin-up disk */
                disk.rotation.z += 0.03 + eased * 0.9;
                lensedDisk.rotation.z -= 0.03 + eased * 0.9;

                /* Scale up so horizon fills the frame near the end */
                const sc = 1 + eased * 1.6;
                disk.scale.setScalar(sc);
                lensedDisk.scale.setScalar(0.75 * sc);
                photonRing.scale.setScalar(1 + eased * 1.2);

                starMat.uniforms.uZoom.value   = eased;
                diskMat.uniforms.uZoom.value   = eased;
                lensedMat.uniforms.uZoom.value = eased;
                ringMat.uniforms.uZoom.value   = eased;

                /* Trigger split reveal */
                if (zp >= REVEAL_AT && !s.revealed) {
                    s.revealed = true;
                    loaderEl.classList.add("blackhole-loader-reveal");
                }
            }

            renderer.render(scene, camera);
        };

        animate();

        /* ---------- CLEANUP ---------- */
        return () => {
            clearTimeout(zoomTimer);
            clearTimeout(completeTimer);
            cancelAnimationFrame(frameId);

            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("click", skip);
            window.removeEventListener("touchstart", skip);
            window.removeEventListener("keydown", skip);

            starGeo.dispose();
            starMat.dispose();
            horizonGeo.dispose();
            horizonMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
            diskGeo.dispose();
            diskMat.dispose();
            lensedMat.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={loaderRef}
            className="blackhole-loader fixed inset-0 w-screen h-screen z-[99999] overflow-hidden"
        >
            <canvas
                ref={canvasRef}
                className="blackhole-canvas absolute inset-0 w-full h-full block"
            />
            <div className="blackhole-split-glow" aria-hidden="true" />
        </div>
    );
};

export default BlackHoleLoader;