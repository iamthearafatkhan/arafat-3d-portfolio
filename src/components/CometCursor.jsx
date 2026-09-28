import { useEffect, useRef } from "react";

/* =========================================================
   COMET CURSOR
   ---------------------------------------------------------
   A canvas-based comet that follows the mouse.
   · Chain of segments → each chases the previous → organic curve
   · Layered strokes → outer blue halo, mid cyan, bright core
   · Head → soft radial gradient + hot white nucleus
   · Disabled on touch devices and reduced-motion preference
   ========================================================= */

const CometCursor = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -200, y: -200 });
    const frameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        /* ---------- Disable on touch / reduced motion ---------- */
        const isTouch = window.matchMedia("(hover: none)").matches;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (isTouch || reduceMotion) return;

        const ctx = canvas.getContext("2d");

        /* ---------- Sizing (HiDPI) ---------- */
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        /* ---------- Chain segments ---------- */
        const NUM_SEGMENTS = 24;
        const LERP = 0.34; // higher = tighter tail

        const segments = Array.from({ length: NUM_SEGMENTS }, () => ({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        }));

        /* ---------- Mouse tracking ---------- */
        const handleMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        const handleLeave = () => {
            mouseRef.current.x = -200;
            mouseRef.current.y = -200;
        };
        window.addEventListener("mousemove", handleMove, { passive: true });
        window.addEventListener("mouseleave", handleLeave);

        /* ---------- Hide the OS cursor globally ---------- */
        document.documentElement.classList.add("comet-cursor-active");

        /* ---------- Draw loop ---------- */
        const draw = () => {
            frameRef.current = requestAnimationFrame(draw);

            const { x: mx, y: my } = mouseRef.current;

            /* Nothing to draw if the mouse is off-screen */
            if (mx < 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            /* Head is always locked to the mouse */
            segments[0].x = mx;
            segments[0].y = my;

            /* Each following segment lags toward the one ahead */
            for (let i = 1; i < NUM_SEGMENTS; i++) {
                segments[i].x += (segments[i - 1].x - segments[i].x) * LERP;
                segments[i].y += (segments[i - 1].y - segments[i].y) * LERP;
            }

            /* ---------- Tail (drawn from tip → head) ---------- */
            for (let i = NUM_SEGMENTS - 1; i > 0; i--) {
                const t = 1 - i / NUM_SEGMENTS; // 0 at tip → 1 at head
                const p0 = segments[i];
                const p1 = segments[i - 1];

                const width = 0.8 + t * 7;   // thicker near head
                const alpha = t * t;         // quadratic falloff

                /* Outer blue halo */
                ctx.beginPath();
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.strokeStyle = `rgba(70, 170, 255, ${alpha * 0.35})`;
                ctx.lineWidth = width * 3.2;
                ctx.lineCap = "round";
                ctx.stroke();

                /* Mid cyan glow */
                ctx.beginPath();
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.strokeStyle = `rgba(140, 215, 255, ${alpha * 0.65})`;
                ctx.lineWidth = width * 1.5;
                ctx.stroke();

                /* Bright inner core */
                ctx.beginPath();
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.strokeStyle = `rgba(235, 248, 255, ${alpha * 0.95})`;
                ctx.lineWidth = width * 0.55;
                ctx.stroke();
            }

            /* ---------- Head: soft coma halo ---------- */
            const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 42);
            halo.addColorStop(0.0, "rgba(200, 235, 255, 0.85)");
            halo.addColorStop(0.25, "rgba(110, 190, 255, 0.55)");
            halo.addColorStop(0.6, "rgba(60, 140, 255, 0.18)");
            halo.addColorStop(1.0, "rgba(60, 140, 255, 0)");

            ctx.beginPath();
            ctx.fillStyle = halo;
            ctx.arc(mx, my, 42, 0, Math.PI * 2);
            ctx.fill();

            /* ---------- Head: bright nucleus ---------- */
            const nucleus = ctx.createRadialGradient(mx, my, 0, mx, my, 8);
            nucleus.addColorStop(0.0, "rgba(255, 255, 255, 1)");
            nucleus.addColorStop(0.4, "rgba(230, 245, 255, 0.95)");
            nucleus.addColorStop(0.75, "rgba(180, 220, 255, 0.5)");
            nucleus.addColorStop(1.0, "rgba(180, 220, 255, 0)");

            ctx.beginPath();
            ctx.fillStyle = nucleus;
            ctx.arc(mx, my, 8, 0, Math.PI * 2);
            ctx.fill();
        };

        draw();

        /* ---------- Cleanup ---------- */
        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseleave", handleLeave);
            document.documentElement.classList.remove("comet-cursor-active");
        };
    }, []);

    return (
        <>
            <style>{`
                /* Hide the OS cursor everywhere while the comet is active */
                html.comet-cursor-active,
                html.comet-cursor-active body,
                html.comet-cursor-active * {
                    cursor: none !important;
                }

                /* On touch devices, restore the normal cursor */
                @media (hover: none) {
                    html.comet-cursor-active,
                    html.comet-cursor-active body,
                    html.comet-cursor-active * {
                        cursor: auto !important;
                    }
                }
            `}</style>

            <canvas
                ref={canvasRef}
                className="
                    fixed inset-0
                    w-screen h-screen
                    pointer-events-none
                    z-[2147483647]
                    mix-blend-screen
                "
                aria-hidden="true"
            />
        </>
    );
};

export default CometCursor;