import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

import Particles from "./Particles";
import HeroImageReveal from "./HeroImageReveal";

const HeroExperience = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const particleCount = isMobile ? 90 : isTablet ? 140 : 200;

    return (
        <div className="hero-experience">

            {/* Particle layer */}
            <div className="hero-particle-layer">
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 45 }}
                    dpr={[1, 2]}
                >
                    <ambientLight intensity={0.4} />

                    {/*
                      🔧 `key` forces React to fully unmount and remount
                      the Particles component when particleCount changes.
                      Without it, Three.js tries to resize an existing
                      GPU buffer and throws:
                      "Resizing buffer attributes is not supported."
                    */}
                    <Particles
                        key={particleCount}
                        count={particleCount}
                    />
                </Canvas>
            </div>

            {/* Image layer */}
            <div className="hero-image-layer">
                <HeroImageReveal />
            </div>

        </div>
    );
};

export default HeroExperience;