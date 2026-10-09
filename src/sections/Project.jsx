import { useEffect, useRef, useState } from "react";
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

const CopyIcon = () => (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

/* =========================================================
   DEMO ACCOUNT — copy-to-clipboard credential row
   ========================================================= */

const DemoCredential = ({ label, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            /* clipboard blocked */
        }
    };

    return (
        <button
            type="button"
            className={`demo-cred-row ${copied ? "is-copied" : ""}`}
            onClick={handleCopy}
            aria-label={`Copy ${label}: ${value}`}
        >
            <span className="demo-cred-label">{label}</span>
            <code className="demo-cred-value">{value}</code>
            <span className="demo-cred-copy">
                {copied ? "✓" : <CopyIcon />}
            </span>
        </button>
    );
};

/* =========================================================
   MODAL SECTION — reusable label + body block
   ========================================================= */

const ModalSection = ({ label, children, tone = "default" }) => (
    <div className={`modal-section modal-section--${tone}`}>
        <div className="modal-section-label">
            <span className="modal-section-dot" />
            <span>{label}</span>
        </div>
        <div className="modal-section-body">{children}</div>
    </div>
);

/* =========================================================
   MODAL
   ========================================================= */

const ProjectModal = ({ project, onClose }) => {
    /* Lock scroll while open */
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    /* Close on Escape */
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

                {/* Hero image */}
                <div className="project-modal-image">
                    <img src={project.image} alt={project.title} />
                    {project.year && (
                        <span className="project-modal-year">
                            {project.year}
                        </span>
                    )}
                </div>

                {/* Body */}
                <div className="project-modal-body">

                    {/* Tags */}
                    {project.tags?.length > 0 && (
                        <div className="project-modal-tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="project-modal-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Tools */}
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

                    <h2 className="project-modal-title">{project.title}</h2>

                    {/* Overview */}
                    {(project.longDescription || project.shortDescription) && (
                        <p className="project-modal-description">
                            {project.longDescription || project.shortDescription}
                        </p>
                    )}

                    {/* ---------- PROBLEM ---------- */}
                    {project.problem && (
                        <ModalSection label="The Problem" tone="problem">
                            {project.problem}
                        </ModalSection>
                    )}

                    {/* ---------- SOLUTION ---------- */}
                    {project.solution && (
                        <ModalSection label="The Solution" tone="solution">
                            {project.solution}
                        </ModalSection>
                    )}

                    {/* ---------- EXPECTED ---------- */}
                    {project.expected && (
                        <ModalSection label="Expected Impact" tone="expected">
                            {project.expected}
                        </ModalSection>
                    )}

                    {/* ---------- LIVE DEMO CREDENTIALS ---------- */}
                    {project.demo && (
                        <div className="project-modal-demo">
                            <div className="project-modal-demo-head">
                                <span className="project-modal-demo-dot" />
                                <span>
                                    {project.demo.notice || "Live demo credentials"}
                                </span>
                            </div>

                            <div className="project-modal-demo-accounts">
                                {project.demo.accounts.map((acc) => (
                                    <div
                                        key={acc.role}
                                        className="project-modal-demo-account"
                                    >
                                        <div className="demo-role">
                                            {acc.role}
                                        </div>

                                        <DemoCredential
                                            label="Email"
                                            value={acc.email}
                                        />
                                        <DemoCredential
                                            label="Password"
                                            value={acc.password}
                                        />

                                        {acc.capabilities && (
                                            <div className="demo-cap">
                                                {acc.capabilities}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {project.demo.tip && (
                                <div className="project-modal-demo-tip">
                                    ⓘ {project.demo.tip}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Actions */}
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
   PROJECT CARD — 3D tilt on mouse move
   ========================================================= */

const ProjectCard = ({ project, index, onOpen }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        /* -1..1 range */
        const rx = (y - 0.5) * -12;   // rotateX
        const ry = (x - 0.5) * 14;    // rotateY

        el.style.setProperty("--tilt-x", `${rx}deg`);
        el.style.setProperty("--tilt-y", `${ry}deg`);
        el.style.setProperty("--glow-x", `${x * 100}%`);
        el.style.setProperty("--glow-y", `${y * 100}%`);
    };

    const handleMouseLeave = () => {
        const el = cardRef.current;
        if (!el) return;
        el.style.setProperty("--tilt-x", "0deg");
        el.style.setProperty("--tilt-y", "0deg");
    };

    return (
        <article
            ref={cardRef}
            className="project-card project-card-3d"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(project);
                }
            }}
        >
            <div className="project-card-inner">
                <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    {project.year && (
                        <span className="project-year">{project.year}</span>
                    )}
                    <span className="project-card-glare" aria-hidden="true" />
                </div>

                <div className="project-body">
                    <div className="project-index">
                        <span className="project-dot" />
                        <span>
                            // {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>

                    <h3 className="project-title">{project.title}</h3>

                    <p className="project-description">
                        {project.shortDescription || project.description}
                    </p>

                    {project.tools?.length > 0 && (
                        <div className="project-tools">
                            <div className="project-tools-label">Tools</div>
                            <div className="project-tools-list">
                                {project.tools.slice(0, 5).map((tool) => (
                                    <span
                                        key={tool.name}
                                        className="project-tool"
                                        title={tool.name}
                                    >
                                        <span className="project-tool-icon">
                                            <img src={tool.icon} alt="" />
                                        </span>
                                    </span>
                                ))}
                                {project.tools.length > 5 && (
                                    <span className="project-tool project-tool-more">
                                        +{project.tools.length - 5}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        className="project-see-more"
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpen(project);
                        }}
                    >
                        <span>See More</span>
                        <ArrowIcon />
                    </button>
                </div>
            </div>
        </article>
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
            gsap.from(".project-card", {
                y: 60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
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
                STYLES — 3D card + modal sections
                Everything scoped to this component. Move to index.css
                if you prefer.
                ========================================================= */}
            <style>{`
                /* ---------- 3D CARD ---------- */
                .projects-grid {
                    perspective: 1400px;
                    perspective-origin: 50% 40%;
                }

                .project-card-3d {
                    animation: none; /* disable old float */
                    transform-style: preserve-3d;
                    cursor: pointer;
                }

                .project-card-3d .project-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 18px;
                    overflow: hidden;

                    background: linear-gradient(135deg, rgba(40, 5, 5, 0.88) 0%, rgba(12, 2, 2, 0.94) 100%);
                    border: 1px solid rgba(255, 60, 20, 0.28);

                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);

                    box-shadow:
                        inset 0 0 40px rgba(255, 60, 20, 0.06),
                        0 8px 30px rgba(0, 0, 0, 0.55),
                        0 0 60px rgba(255, 40, 10, 0.05);

                    transform:
                        rotateX(var(--tilt-x, 0deg))
                        rotateY(var(--tilt-y, 0deg))
                        translateZ(0);

                    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                                border-color 0.35s ease,
                                box-shadow 0.35s ease;
                }

                .project-card-3d:hover .project-card-inner {
                    border-color: rgba(255, 90, 40, 0.75);
                    box-shadow:
                        inset 0 0 60px rgba(255, 60, 20, 0.16),
                        0 24px 60px rgba(255, 40, 10, 0.25),
                        0 0 100px rgba(255, 40, 10, 0.15);
                }

                /* Glare that follows the cursor */
                .project-card-glare {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 4;

                    background: radial-gradient(
                        circle 240px at var(--glow-x, 50%) var(--glow-y, 50%),
                        rgba(255, 200, 180, 0.14) 0%,
                        transparent 60%
                    );

                    opacity: 0;
                    transition: opacity 0.3s ease;
                    mix-blend-mode: screen;
                }

                .project-card-3d:hover .project-card-glare {
                    opacity: 1;
                }

                .project-card-3d .project-image {
                    border-radius: 0;
                }

                .project-card-3d .project-tool-icon {
                    width: 26px;
                    height: 26px;
                }

                .project-tool-more {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px 10px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #ffb89c;
                    background: rgba(255, 60, 20, 0.15);
                    border: 1px solid rgba(255, 90, 40, 0.4);
                    border-radius: 8px;
                }

                /* ---------- MODAL SECTIONS ---------- */
                .modal-section {
                    margin-top: 26px;
                }

                .modal-section-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 12px;

                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                }

                .modal-section-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .modal-section--problem .modal-section-label {
                    color: #ff8c42;
                }
                .modal-section--problem .modal-section-dot {
                    background: #ff8c42;
                    box-shadow: 0 0 10px rgba(255, 140, 66, 0.9);
                }

                .modal-section--solution .modal-section-label {
                    color: #4ade80;
                }
                .modal-section--solution .modal-section-dot {
                    background: #4ade80;
                    box-shadow: 0 0 10px rgba(74, 222, 128, 0.9);
                }

                .modal-section--expected .modal-section-label {
                    color: #c084fc;
                }
                .modal-section--expected .modal-section-dot {
                    background: #c084fc;
                    box-shadow: 0 0 10px rgba(192, 132, 252, 0.9);
                }

                .modal-section-body {
                    font-family: "Rajdhani", sans-serif;
                    font-size: 1.02rem;
                    line-height: 1.75;
                    color: rgba(255, 255, 255, 0.72);

                    padding: 16px 18px;
                    border-radius: 12px;

                    background: rgba(30, 4, 4, 0.4);
                    border: 1px solid rgba(255, 60, 20, 0.15);
                }

                .modal-section--problem .modal-section-body {
                    border-left: 3px solid rgba(255, 140, 66, 0.55);
                }

                .modal-section--solution .modal-section-body {
                    border-left: 3px solid rgba(74, 222, 128, 0.55);
                }

                .modal-section--expected .modal-section-body {
                    border-left: 3px solid rgba(192, 132, 252, 0.55);
                }

                /* ---------- DEMO CREDENTIALS ---------- */
                .project-modal-demo {
                    margin-top: 26px;
                    padding: 18px;
                    border-radius: 14px;

                    background: rgba(20, 4, 4, 0.55);
                    border: 1px solid rgba(255, 90, 40, 0.35);

                    box-shadow:
                        inset 0 0 30px rgba(255, 60, 20, 0.06),
                        0 4px 20px rgba(0, 0, 0, 0.3);
                }

                .project-modal-demo-head {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;

                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255, 220, 200, 0.85);
                }

                .project-modal-demo-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #4ade80;
                    box-shadow:
                        0 0 10px rgba(74, 222, 128, 0.9),
                        0 0 20px rgba(74, 222, 128, 0.5);
                    animation: dotPulse 1.6s ease-in-out infinite;
                }

                .project-modal-demo-accounts {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 12px;
                }

                .project-modal-demo-account {
                    padding: 14px;
                    border-radius: 10px;

                    background: linear-gradient(135deg, rgba(40, 5, 5, 0.85) 0%, rgba(12, 2, 2, 0.92) 100%);
                    border: 1px solid rgba(255, 60, 20, 0.28);

                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .demo-role {
                    font-family: "Orbitron", sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #ff8c42;
                    margin-bottom: 4px;
                }

                .demo-cred-row {
                    appearance: none;
                    -webkit-appearance: none;
                    cursor: pointer;

                    display: flex;
                    align-items: center;
                    gap: 8px;

                    padding: 6px 8px;
                    border-radius: 6px;

                    background: rgba(10, 2, 2, 0.6);
                    border: 1px solid rgba(255, 60, 20, 0.2);

                    font-family: "Rajdhani", sans-serif;
                    color: inherit;
                    text-align: left;

                    transition: border-color 0.25s ease, background 0.25s ease;
                }

                .demo-cred-row:hover {
                    border-color: rgba(255, 140, 80, 0.65);
                    background: rgba(30, 4, 4, 0.75);
                }

                .demo-cred-row.is-copied {
                    border-color: rgba(74, 222, 128, 0.7);
                    background: rgba(6, 40, 15, 0.7);
                }

                .demo-cred-label {
                    font-size: 0.78rem;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: rgba(255, 220, 200, 0.5);
                    flex-shrink: 0;
                    width: 62px;
                }

                .demo-cred-value {
                    flex: 1;
                    font-family: "Rajdhani", monospace;
                    font-size: 0.88rem;
                    color: rgba(255, 255, 255, 0.92);
                    word-break: break-all;
                }

                .demo-cred-copy {
                    color: rgba(255, 140, 80, 0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: color 0.25s ease;
                }

                .demo-cred-row.is-copied .demo-cred-copy {
                    color: #4ade80;
                }

                .demo-cap {
                    font-family: "Rajdhani", sans-serif;
                    font-size: 0.8rem;
                    line-height: 1.5;
                    color: rgba(255, 255, 255, 0.55);
                    margin-top: 4px;
                }

                .project-modal-demo-tip {
                    margin-top: 14px;
                    padding-top: 12px;
                    border-top: 1px dashed rgba(255, 60, 20, 0.2);

                    font-family: "Rajdhani", sans-serif;
                    font-size: 0.85rem;
                    font-style: italic;
                    color: rgba(255, 220, 200, 0.55);
                }

                @media (max-width: 640px) {
                    .project-modal-demo-accounts {
                        grid-template-columns: 1fr;
                    }
                    .demo-cred-label { width: 54px; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .project-card-3d .project-card-inner,
                    .project-card-glare {
                        transition: none;
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

                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                                onOpen={setActiveProject}
                            />
                        ))}

                        <article className="project-card project-card-coming">
                            <div className="project-coming-inner">
                                <div className="project-coming-dot" />
                                <div className="project-coming-label">
                                    // {String(projects.length + 1).padStart(2, "0")}
                                </div>
                                <h3 className="project-coming-title">
                                    More coming soon
                                </h3>
                                <p className="project-coming-text">
                                    Currently experimenting with multimodal models
                                    and retrieval-augmented generation.
                                </p>
                            </div>
                        </article>
                    </div>

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
