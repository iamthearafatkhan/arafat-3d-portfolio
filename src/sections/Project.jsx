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

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

/* =========================================================
   MODAL
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

    /* Keyboard arrows */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [goNext, goPrev]);

    /* Compute shortest-path offset with wraparound */
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

                {/* ==============================
                    ORBITAL RINGS (SVG, behind cards)
                    ============================== */}
                <svg
                    className="orbital-ring"
                    viewBox="0 0 1200 420"
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

                    {/* Outer dashed ellipse */}
                    <ellipse
                        cx="600"
                        cy="210"
                        rx="560"
                        ry="150"
                        fill="none"
                        stroke="url(#orbitGrad)"
                        strokeWidth="1.2"
                        strokeDasharray="3 10"
                        className="orbital-ring-line"
                    />

                    {/* Inner solid ellipse */}
                    <ellipse
                        cx="600"
                        cy="210"
                        rx="430"
                        ry="110"
                        fill="none"
                        stroke="url(#orbitGrad2)"
                        strokeWidth="0.8"
                        opacity="0.55"
                        className="orbital-ring-line"
                    />
                </svg>

                {/* Prev arrow */}
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

                        return (
                            <div
                                key={project.title}
                                className={`project-orbital-slot ${slotClass}`}
                                onClick={() => {
                                    if (offset !== 0) setActiveIndex(index);
                                }}
                                aria-hidden={offset !== 0}
                            >
                                <article className="project-card">

                                    <div className="project-image">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                        />
                                        {project.year && (
                                            <span className="project-year">
                                                {project.year}
                                            </span>
                                        )}
                                    </div>

                                    <div className="project-body">
                                        <div className="project-index">
                                            <span className="project-dot" />
                                            <span>
                                                // {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <h3 className="project-title">
                                            {project.title}
                                        </h3>

                                        <p className="project-description">
                                            {project.shortDescription || project.description}
                                        </p>

                                        {project.tools?.length > 0 && (
                                            <div className="project-tools">
                                                <div className="project-tools-label">
                                                    Tools
                                                </div>
                                                <div className="project-tools-list">
                                                    {project.tools.map((tool) => (
                                                        <span
                                                            key={tool.name}
                                                            className="project-tool"
                                                            title={tool.name}
                                                        >
                                                            <span className="project-tool-icon">
                                                                <img src={tool.icon} alt="" />
                                                            </span>
                                                            <span className="project-tool-name">
                                                                {tool.name}
                                                            </span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            className="project-see-more"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onOpenProject(project);
                                            }}
                                        >
                                            <span>See More</span>
                                            <ArrowIcon />
                                        </button>

                                        <div className="project-links">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                    aria-label={`GitHub repository for ${project.title}`}
                                                >
                                                    <GithubIcon />
                                                    <span>GitHub</span>
                                                </a>
                                            )}

                                            {project.website && (
                                                <a
                                                    href={project.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                    aria-label={`Live site for ${project.title}`}
                                                >
                                                    <ExternalIcon />
                                                    <span>Live</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>

                {/* Next arrow */}
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
            {/* =========================================================
                ORBITAL CAROUSEL STYLES
                Everything lives here — index.css untouched.
                ========================================================= */}
            <style>{`
                /* ---------- Stage ---------- */
                .project-orbital {
                    position: relative;
                    width: 100%;
                }

                .project-orbital-stage {
                    position: relative;
                    width: 100%;
                    height: clamp(380px, 50vh, 460px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 1600px;
                    perspective-origin: 50% 50%;
                    overflow: visible;
                }

                .project-orbital-track {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                }

                /* ---------- Orbital Rings ---------- */
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
                    width: min(280px, 76vw);
                    transform-origin: center center;
                    will-change: transform, opacity;
                    backface-visibility: hidden;
                    transition:
                        transform 0.95s cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 0.6s ease;
                }

                /* Center — full size, sharp, interactive */
                .project-orbital-slot.slot-center {
                    transform: translate(-50%, -50%) translateX(0) scale(1) rotateY(0deg);
                    z-index: 10;
                    opacity: 1;
                }

                /* Left — half size, tilted, faded. NO blur. */
                .project-orbital-slot.slot-left {
                    transform: translate(-50%, -50%) translateX(-108%) scale(0.5) rotateY(14deg);
                    z-index: 8;
                    opacity: 0.5;
                    cursor: pointer;
                }

                /* Right — mirrored */
                .project-orbital-slot.slot-right {
                    transform: translate(-50%, -50%) translateX(108%) scale(0.5) rotateY(-14deg);
                    z-index: 8;
                    opacity: 0.5;
                    cursor: pointer;
                }

                /* Off-screen — waiting behind */
                .project-orbital-slot.slot-hidden {
                    transform: translate(-50%, -50%) scale(0.2) rotateY(0deg);
                    z-index: 1;
                    opacity: 0;
                    pointer-events: none;
                }

                /* Disable inner card interactions on side slots */
                .project-orbital-slot.slot-left .project-card,
                .project-orbital-slot.slot-right .project-card {
                    pointer-events: none;
                }

                /* ---------- Nav arrows ---------- */
                .orbital-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 20;

                    width: 48px;
                    height: 48px;

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
                    font-size: 24px;
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
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                    }
                    .orbital-nav-prev { left: 4px; }
                    .orbital-nav-next { right: 4px; }

                    .project-orbital-slot.slot-left {
                        transform: translate(-50%, -50%) translateX(-92%) scale(0.45) rotateY(16deg);
                        opacity: 0.35;
                    }
                    .project-orbital-slot.slot-right {
                        transform: translate(-50%, -50%) translateX(92%) scale(0.45) rotateY(-16deg);
                        opacity: 0.35;
                    }
                }

                /* ---------- Dots ---------- */
                .orbital-dots {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-top: 30px;
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
                    margin-top: 22px;
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
                    .orbital-ring-line {
                        transition: none;
                        animation: none;
                    }
                }
            `}</style>

            <section id="work" ref={sectionRef} className="projects-section">
                <div className="projects-layout">

                    {/* ---------- HEADING ---------- */}
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

                    {/* ---------- ORBITAL ---------- */}
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
