import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { projects } from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   ICONS
   ========================================================= */

const GithubIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5Z" />
    </svg>
);

const ExternalIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
);

/* =========================================================
   MODAL — unchanged, shows everything
   ========================================================= */

const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!project) return null;

    return (
        <div
            className="project-modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
        >
            <div
                className="project-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="project-modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <CloseIcon />
                </button>

                <div className="project-modal-image">
                    <img src={project.image} alt={project.title} />
                    {project.year && (
                        <span className="project-modal-year">
                            {project.year}
                        </span>
                    )}
                </div>

                <div className="project-modal-body">
                    {project.tags?.length > 0 && (
                        <div className="project-modal-tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="project-modal-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {project.tools?.length > 0 && (
                        <div className="project-modal-tools">
                            <div className="project-modal-tools-label">
                                Built with
                            </div>
                            <div className="project-modal-tools-list">
                                {project.tools.map((tool) => (
                                    <span
                                        key={tool.name}
                                        className="project-modal-tool"
                                        title={tool.name}
                                    >
                                        <span className="project-modal-tool-icon">
                                            <img src={tool.icon} alt="" />
                                        </span>
                                        <span className="project-modal-tool-name">
                                            {tool.name}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <h2 className="project-modal-title">
                        {project.title}
                    </h2>

                    <p className="project-modal-description">
                        {project.longDescription || project.shortDescription}
                    </p>

                    <div className="project-modal-actions">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-modal-btn project-modal-btn-primary"
                            >
                                <GithubIcon />
                                <span>View Repository</span>
                            </a>
                        )}
                        {project.website && (
                            <a
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-modal-btn"
                            >
                                <ExternalIcon />
                                <span>Open Live Site</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* =========================================================
   ORBITAL CAROUSEL
   ========================================================= */

const ProjectOrbital = ({ onOpenProject }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = projects.length;

    const goNext = useCallback(() => {
        setActiveIndex((p) => (p + 1) % total);
    }, [total]);

    const goPrev = useCallback(() => {
        setActiveIndex((p) => (p - 1 + total) % total);
    }, [total]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [goNext, goPrev]);

    const getOffset = (index) => {
        let offset = index - activeIndex;
        const half = Math.floor(total / 2);
        if (offset > half) offset -= total;
        if (offset < -half) offset += total;
        return offset;
    };

    return (
        <div className="project-orbital">
            <div className="project-orbital-stage">

                {/* ---------- ORBITAL RINGS ---------- */}
                <svg
                    className="orbital-ring"
                    viewBox="0 0 1200 360"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%"   stopColor="rgba(255,80,32,0)" />
                            <stop offset="15%"  stopColor="rgba(255,120,60,0.35)" />
                            <stop offset="50%"  stopColor="rgba(255,180,140,0.9)" />
                            <stop offset="85%"  stopColor="rgba(255,120,60,0.35)" />
                            <stop offset="100%" stopColor="rgba(255,80,32,0)" />
                        </linearGradient>
                        <linearGradient id="orbitGrad2" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%"   stopColor="rgba(180,80,255,0)" />
                            <stop offset="50%"  stopColor="rgba(180,80,255,0.5)" />
                            <stop offset="100%" stopColor="rgba(180,80,255,0)" />
                        </linearGradient>
                    </defs>

                    <ellipse
                        cx="600"
                        cy="180"
                        rx="560"
                        ry="120"
                        fill="none"
                        stroke="url(#orbitGrad)"
                        strokeWidth="1.2"
                        strokeDasharray="3 10"
                        className="orbital-ring-line"
                    />

                    <ellipse
                        cx="600"
                        cy="180"
                        rx="420"
                        ry="88"
                        fill="none"
                        stroke="url(#orbitGrad2)"
                        strokeWidth="0.8"
                        opacity="0.55"
                        className="orbital-ring-line"
                    />
                </svg>

                {/* Prev */}
                <button
                    type="button"
                    className="orbital-nav orbital-nav-prev"
                    onClick={goPrev}
                    aria-label="Previous project"
                >
                    ‹
                </button>

                {/* Track */}
                <div className="project-orbital-track">
                    {projects.map((project, index) => {
                        const offset = getOffset(index);

                        let slotClass = "slot-hidden";
                        if (offset === 0) slotClass = "slot-center";
                        else if (offset === -1) slotClass = "slot-left";
                        else if (offset === 1) slotClass = "slot-right";

                        const isCenter = offset === 0;

                        return (
                            <div
                                key={project.title}
                                className={`project-orbital-slot ${slotClass}`}
                                onClick={() => {
                                    if (isCenter) {
                                        /* Center card → open modal with full details */
                                        onOpenProject(project);
                                    } else {
                                        /* Side card → rotate it to center */
                                        setActiveIndex(index);
                                    }
                                }}
                                role={isCenter ? "button" : "presentation"}
                                aria-label={
                                    isCenter
                                        ? `Open ${project.title} details`
                                        : `View ${project.title}`
                                }
                                tabIndex={isCenter ? 0 : -1}
                                onKeyDown={(e) => {
                                    if (isCenter && (e.key === "Enter" || e.key === " ")) {
                                        e.preventDefault();
                                        onOpenProject(project);
                                    }
                                }}
                            >
                                {/* ====================================
                                    PLANET CARD — image + title only
                                    ==================================== */}
                                <article className="planet-card">
                                    {/* Planet glow behind the image */}
                                    <span className="planet-glow" aria-hidden="true" />

                                    {/* Image */}
                                    <div className="planet-image">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                        />
                                        {project.year && (
                                            <span className="planet-year">
                                                {project.year}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="planet-title">
                                        {project.title}
                                    </h3>

                                    {/* Tap hint (only on center) */}
                                    {isCenter && (
                                        <span className="planet-hint">
                                            CLICK FOR DETAILS
                                        </span>
                                    )}
                                </article>
                            </div>
                        );
                    })}
                </div>

                {/* Next */}
                <button
                    type="button"
                    className="orbital-nav orbital-nav-next"
                    onClick={goNext}
                    aria-label="Next project"
                >
                    ›
                </button>
            </div>

            {/* Dots */}
            <div className="orbital-dots">
                {projects.map((p, i) => (
                    <button
                        key={p.title}
                        type="button"
                        className={`orbital-dot ${i === activeIndex ? "is-active" : ""}`}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Go to project ${i + 1}`}
                    />
                ))}
            </div>

            <p className="orbital-note">
                // More projects in progress — currently exploring
                multimodal models & RAG
            </p>
        </div>
    );
};

/* =========================================================
   SECTION
   ========================================================= */

const Project = () => {
    const sectionRef = useRef(null);
    const [activeProject, setActiveProject] = useState(null);

    useGSAP(
        () => {
            gsap.from(".project-orbital-stage", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 78%",
                    once: true,
                    invalidateOnRefresh: true,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <>
            <style>{`
                /* =========================================================
                   ORBITAL CAROUSEL — compact planet cards
                   ========================================================= */

                .project-orbital {
                    position: relative;
                    width: 100%;
                }

                .project-orbital-stage {
                    position: relative;
                    width: 100%;
                    height: clamp(280px, 36vh, 340px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 1400px;
                    perspective-origin: 50% 50%;
                    overflow: visible;
                }

                .project-orbital-track {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                }

                /* ---------- Orbital rings ---------- */
                .orbital-ring {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                    overflow: visible;
                }

                .orbital-ring-line {
                    animation: orbitPulse 6s ease-in-out infinite;
                }

                @keyframes orbitPulse {
                    0%, 100% { opacity: 0.55; }
                    50%      { opacity: 1;    }
                }

                /* ---------- Slots ---------- */
                .project-orbital-slot {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: min(260px, 76vw);
                    transform-origin: center center;
                    will-change: transform, opacity;
                    backface-visibility: hidden;
                    transition:
                        transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 0.55s ease;
                }

                .project-orbital-slot.slot-center {
                    transform: translate(-50%, -50%) translateX(0) scale(1) rotateY(0deg);
                    z-index: 10;
                    opacity: 1;
                    cursor: pointer;
                }

                .project-orbital-slot.slot-left {
                    transform: translate(-50%, -50%) translateX(-112%) scale(0.5) rotateY(16deg);
                    z-index: 8;
                    opacity: 0.5;
                    cursor: pointer;
                }

                .project-orbital-slot.slot-right {
                    transform: translate(-50%, -50%) translateX(112%) scale(0.5) rotateY(-16deg);
                    z-index: 8;
                    opacity: 0.5;
                    cursor: pointer;
                }

                .project-orbital-slot.slot-hidden {
                    transform: translate(-50%, -50%) scale(0.2) rotateY(0deg);
                    z-index: 1;
                    opacity: 0;
                    pointer-events: none;
                }

                /* =========================================================
                   PLANET CARD — image + title only
                   ========================================================= */

                .planet-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;

                    text-align: center;
                    transition: transform 0.4s ease;
                }

                /* ---------- Planet glow behind the image ---------- */
                .planet-glow {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);

                    width: 220px;
                    height: 220px;

                    border-radius: 50%;

                    background: radial-gradient(
                        circle,
                        rgba(255, 120, 60, 0.55) 0%,
                        rgba(255, 60, 20, 0.28) 35%,
                        transparent 70%
                    );

                    filter: blur(22px);
                    pointer-events: none;
                    z-index: 0;

                    animation: planetPulse 5s ease-in-out infinite;
                }

                @keyframes planetPulse {
                    0%, 100% { opacity: 0.55; transform: translateX(-50%) scale(1);    }
                    50%      { opacity: 0.95; transform: translateX(-50%) scale(1.12); }
                }

                /* ---------- Image ---------- */
                .planet-image {
                    position: relative;
                    z-index: 1;

                    width: 100%;
                    aspect-ratio: 16 / 10;

                    overflow: hidden;
                    border-radius: 18px;

                    border: 1px solid rgba(255, 90, 40, 0.45);

                    background: #0a0202;

                    box-shadow:
                        inset 0 0 40px rgba(255, 60, 20, 0.08),
                        0 6px 24px rgba(0, 0, 0, 0.55);

                    transition:
                        border-color 0.4s ease,
                        box-shadow 0.4s ease,
                        transform 0.4s ease;
                }

                .planet-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center top;
                    display: block;

                    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .slot-center .planet-card:hover .planet-image img {
                    transform: scale(1.06);
                }

                .slot-center .planet-card:hover .planet-image {
                    border-color: rgba(255, 140, 80, 0.85);
                    box-shadow:
                        inset 0 0 50px rgba(255, 80, 32, 0.18),
                        0 10px 40px rgba(255, 60, 20, 0.4);
                }

                /* ---------- Year badge ---------- */
                .planet-year {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    z-index: 2;

                    padding: 3px 9px;

                    font-family: "Orbitron", sans-serif;
                    font-size: 9px;
                    font-weight: 600;
                    letter-spacing: 0.14em;
                    color: #ffb89c;

                    background: rgba(10, 2, 2, 0.85);
                    border: 1px solid rgba(255, 90, 40, 0.45);
                    border-radius: 5px;
                    backdrop-filter: blur(8px);
                }

                /* ---------- Title ---------- */
                .planet-title {
                    position: relative;
                    z-index: 1;

                    margin: 0;
                    max-width: 100%;

                    font-family: "Orbitron", sans-serif;
                    font-size: 0.82rem;
                    font-weight: 600;
                    line-height: 1.35;
                    letter-spacing: -0.005em;

                    color: #ffffff;
                    text-shadow: 0 0 18px rgba(255, 80, 32, 0.35);

                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;

                    transition: color 0.3s ease;
                }

                .slot-center .planet-card:hover .planet-title {
                    color: #ffb89c;
                }

                /* ---------- Click hint (center only) ---------- */
                .planet-hint {
                    position: relative;
                    z-index: 1;

                    font-family: "Orbitron", sans-serif;
                    font-size: 8px;
                    letter-spacing: 0.24em;
                    text-transform: uppercase;

                    color: rgba(255, 140, 66, 0.7);

                    opacity: 0;
                    transform: translateY(-4px);
                    transition:
                        opacity 0.3s ease,
                        transform 0.3s ease;
                }

                .slot-center .planet-card:hover .planet-hint {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* ---------- Nav arrows ---------- */
                .orbital-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 20;

                    width: 44px;
                    height: 44px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;
                    border: 1px solid rgba(255, 120, 60, 0.5);

                    background: linear-gradient(
                        135deg,
                        rgba(40, 5, 5, 0.9) 0%,
                        rgba(12, 2, 2, 0.95) 100%
                    );

                    color: #ff8c42;
                    font-family: "Orbitron", sans-serif;
                    font-size: 22px;
                    line-height: 1;

                    cursor: pointer;
                    backdrop-filter: blur(10px);

                    box-shadow:
                        inset 0 0 20px rgba(255, 60, 20, 0.12),
                        0 0 20px rgba(255, 60, 20, 0.15);

                    transition: all 0.3s ease;
                }

                .orbital-nav:hover {
                    border-color: rgba(255, 140, 80, 0.95);
                    box-shadow:
                        inset 0 0 30px rgba(255, 80, 32, 0.25),
                        0 0 30px rgba(255, 80, 32, 0.55);
                    transform: translateY(-50%) scale(1.1);
                }

                .orbital-nav:active {
                    transform: translateY(-50%) scale(0.96);
                }

                .orbital-nav-prev { left: 12px; }
                .orbital-nav-next { right: 12px; }

                @media (min-width: 1280px) {
                    .orbital-nav-prev { left: 32px; }
                    .orbital-nav-next { right: 32px; }
                }

                @media (max-width: 640px) {
                    .orbital-nav {
                        width: 38px;
                        height: 38px;
                        font-size: 18px;
                    }
                    .orbital-nav-prev { left: 4px; }
                    .orbital-nav-next { right: 4px; }

                    .project-orbital-slot.slot-left {
                        transform: translate(-50%, -50%) translateX(-100%) scale(0.45) rotateY(18deg);
                        opacity: 0.35;
                    }
                    .project-orbital-slot.slot-right {
                        transform: translate(-50%, -50%) translateX(100%) scale(0.45) rotateY(-18deg);
                        opacity: 0.35;
                    }

                    .planet-glow {
                        width: 160px;
                        height: 160px;
                    }

                    .planet-title {
                        font-size: 0.72rem;
                    }
                }

                /* ---------- Dots ---------- */
                .orbital-dots {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-top: 26px;
                }

                .orbital-dot {
                    width: 8px;
                    height: 8px;
                    padding: 0;
                    border-radius: 999px;
                    border: 1px solid rgba(255, 120, 60, 0.4);
                    background: rgba(255, 120, 60, 0.22);
                    cursor: pointer;
                    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .orbital-dot:hover {
                    background: rgba(255, 140, 80, 0.55);
                    transform: scale(1.2);
                }

                .orbital-dot.is-active {
                    width: 30px;
                    background: linear-gradient(90deg, #ff5020, #ffb89c);
                    border-color: rgba(255, 140, 80, 0.95);
                    box-shadow: 0 0 16px rgba(255, 80, 32, 0.7);
                }

                /* ---------- Note ---------- */
                .orbital-note {
                    margin-top: 20px;
                    text-align: center;

                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: rgba(255, 220, 200, 0.42);
                }

                /* ---------- Reduced motion ---------- */
                @media (prefers-reduced-motion: reduce) {
                    .project-orbital-slot,
                    .orbital-dot,
                    .orbital-ring-line,
                    .planet-glow {
                        transition: none;
                        animation: none;
                    }
                }
            `}</style>

            <section id="work" ref={sectionRef} className="projects-section">
                <div className="projects-layout">

                    <div className="projects-head">
                        <div className="projects-kicker">
                            <span className="projects-kicker-line" />
                            <span>PROJECTS</span>
                        </div>

                        <h2 className="projects-heading">
                            Selected
                            <span className="projects-heading-accent">
                                {" "}work{" "}
                            </span>
                            & experiments.
                        </h2>
                    </div>

                    <ProjectOrbital
                        onOpenProject={(p) => setActiveProject(p)}
                    />

                </div>
            </section>

            {activeProject && (
                <ProjectModal
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                />
            )}
        </>
    );
};

export default Project;
