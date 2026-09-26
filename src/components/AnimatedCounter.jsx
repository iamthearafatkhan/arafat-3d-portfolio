import { useState, useEffect, useRef } from "react";
import { counterItems } from "../constants/index.js";

/* =========================================================
   NATIVE COUNT-UP (no external library)
   ========================================================= */
const NativeCountUp = ({ end, duration = 2000, started }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!started) return;

        let startTime = null;
        let frameId;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            setCount(Math.floor(percentage * end));

            if (percentage < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [end, duration, started]);

    return <>{count}</>;
};

/* =========================================================
   ANIMATED COUNTER SECTION
   ========================================================= */
const AnimatedCounter = () => {
    const [started, setStarted] = useState(false);
    const sectionRef = useRef(null);

    /* Count-up begins only when the section scrolls into view */
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            id="counter"
            ref={sectionRef}
            className="counter-section padding-x-lg"
        >
            <div className="counter-grid mx-auto max-w-7xl">
                {counterItems.map((item, index) => (
                    <div
                        key={`${item.label}-${index}`}
                        className="counter-card"
                    >
                        {/* Top row: status dot + index */}
                        <div className="counter-card-head">
                            <span className="counter-dot" />
                            <span>// {String(index + 1).padStart(2, "0")}</span>
                        </div>

                        {/* Big number */}
                        <div className="counter-number">
                            <NativeCountUp
                                end={item.value}
                                started={started}
                            />
                            <span>{item.suffix}</span>
                        </div>

                        {/* Labels */}
                        <div className="counter-label">{item.label}</div>

                        {item.sublabel && (
                            <div className="counter-sublabel">
                                {item.sublabel}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedCounter;