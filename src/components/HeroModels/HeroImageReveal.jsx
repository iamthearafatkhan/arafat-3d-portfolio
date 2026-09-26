import { useEffect, useRef, useState } from "react";

const HeroImageReveal = () => {
    const containerRef = useRef(null);

    const [mouse, setMouse] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    /* Lagged cursor for the galaxy / rim layers */
    const lagRef = useRef({ x: 50, y: 50 });
    const [lagged, setLagged] = useState({ x: 50, y: 50 });

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMouse({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
        });
    };

    useEffect(() => {
        let raf;
        const tick = () => {
            lagRef.current.x += (mouse.x - lagRef.current.x) * 0.14;
            lagRef.current.y += (mouse.y - lagRef.current.y) * 0.14;
            setLagged({ x: lagRef.current.x, y: lagRef.current.y });
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [mouse]);

    const cssVars = {
        "--mouse-x": `${mouse.x}%`,
        "--mouse-y": `${mouse.y}%`,
        "--lag-x": `${lagged.x}%`,
        "--lag-y": `${lagged.y}%`,
    };

    return (
        <div
            ref={containerRef}
            className="hero-image-reveal"
            style={cssVars}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* BASE IMAGE */}
            <img
                src="/images/my-image.png"
                alt="Arafat Khan"
                className="hero-human-image"
            />

            {/* MASKED REVEAL WRAPPER */}
            <div
                className={`hero-reveal-mask ${isHovering ? "is-visible" : ""}`}
            >
                {/* ROBOT IMAGE */}
                <img
                    src="/images/robo-image.png"
                    alt=""
                    className="hero-robo-image"
                />

                {/* GALAXY SWIRL */}
                <div className="hero-galaxy-layer" aria-hidden="true" />

                {/* STARFIELD */}
                <div className="hero-galaxy-stars" aria-hidden="true" />

                {/* SHIMMER SWEEP */}
                <div className="hero-shimmer-layer" aria-hidden="true" />

                {/* INNER RIM GLOW */}
                <div className="hero-reveal-rim" aria-hidden="true" />
            </div>

            {/* CURSOR RING */}
            <div
                className={`hero-reveal-ring ${isHovering ? "is-visible" : ""}`}
                style={{ left: `${mouse.x}%`, top: `${mouse.y}%` }}
            />

            {/* HUD */}
            <div className="hero-image-hud">
                <span>IDENTITY</span>
                <span>AI-01</span>
            </div>
        </div>
    );
};

export default HeroImageReveal;