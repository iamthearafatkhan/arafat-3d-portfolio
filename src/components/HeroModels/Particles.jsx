import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* =========================================================
   GLOW TEXTURE
   ─────────────────────────────────────────────────────────
   A canvas-generated soft radial gradient.
   Without this, particles render as tiny hard squares.
   ========================================================= */

const createGlowTexture = () => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
    );

    gradient.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.2, "rgba(255, 240, 225, 0.9)");
    gradient.addColorStop(0.5, "rgba(255, 170, 130, 0.35)");
    gradient.addColorStop(1.0, "rgba(255, 120, 80, 0.0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
};

/* =========================================================
   PARTICLE COLORS
   ========================================================= */

const PARTICLE_PALETTE = [
    [1.00, 1.00, 1.00],   // pure white
    [1.00, 0.88, 0.78],   // warm white
    [1.00, 0.60, 0.35],   // orange
    [0.85, 0.62, 1.00],   // soft violet
    [1.00, 0.48, 0.38],   // warm red
];

/* =========================================================
   PARTICLES COMPONENT
   ========================================================= */

const Particles = ({ count = 200 }) => {
    const pointsRef = useRef();

    const glowTexture = useMemo(() => createGlowTexture(), []);

    const { positions, colors, particleData } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const data = [];

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 14;
            const y = Math.random() * 16 - 2;
            const z = (Math.random() - 0.5) * 6;

            positions[i * 3]     = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Weighted palette — mostly white/warm, some orange and violet
            const roll = Math.random();
            const ci =
                roll < 0.42 ? 0 :
                    roll < 0.65 ? 1 :
                        roll < 0.80 ? 2 :
                            roll < 0.92 ? 3 : 4;

            const c = PARTICLE_PALETTE[ci];
            colors[i * 3]     = c[0];
            colors[i * 3 + 1] = c[1];
            colors[i * 3 + 2] = c[2];

            data.push({
                speed: 0.4 + Math.random() * 1.2,          // units per second
                driftX: (Math.random() - 0.5) * 0.25,
                driftZ: (Math.random() - 0.5) * 0.15,
            });
        }

        return { positions, colors, particleData: data };
    }, [count]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        // Clamp delta so tab-switching doesn't teleport particles
        const dt = Math.min(delta, 0.05);
        const pos = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const p = particleData[i];
            const i3 = i * 3;

            // Fall downward
            pos[i3 + 1] -= p.speed * dt;

            // Drift sideways for organic motion
            pos[i3]     += p.driftX * dt;
            pos[i3 + 2] += p.driftZ * dt;

            // Wrap vertically
            if (pos[i3 + 1] < -6) {
                pos[i3 + 1] = 14;
                pos[i3]     = (Math.random() - 0.5) * 14;
                pos[i3 + 2] = (Math.random() - 0.5) * 6;
            }

            // Wrap horizontally
            if (pos[i3] > 7.5)   pos[i3] = -7.5;
            if (pos[i3] < -7.5)  pos[i3] =  7.5;

            // Wrap depth
            if (pos[i3 + 2] > 3.5)  pos[i3 + 2] = -3.5;
            if (pos[i3 + 2] < -3.5) pos[i3 + 2] =  3.5;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                map={glowTexture}
                size={0.22}
                sizeAttenuation
                vertexColors
                transparent
                opacity={0.95}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                alphaTest={0.01}
            />
        </points>
    );
};

export default Particles;