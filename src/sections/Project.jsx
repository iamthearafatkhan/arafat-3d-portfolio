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

const CopyIcon = () => (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

/* =========================================================
   DEMO CREDENTIAL
   ========================================================= */

const DemoCredential = ({ label, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {}
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
   MODAL SECTION
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
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, []);

    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!project) return null;

    return (
        <div className="project-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="project-modal-close" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>

                <div className="project-modal-image">
                    <img src={project.image} alt={project.title} />
                    {project.year && <span className="project-modal-year">{project.year}</span>}
                </div>

                <div className="project-modal-body">
                    {project.tags?.length > 0 && (
                        <div className="project-modal-tags">
                            {project.tags.map((tag) => (
                                <span key={tag} className="project-modal-tag">{tag}</span>
                            ))}
                        </div>
                    )}

                    {project.tools?.length > 0 && (
                        <div className="project-modal-tools">
                            <div className="project-modal-tools-label">Built with</div>
                            <div className="project-modal-tools-list">
                                {project.tools.map((tool) => (
                                    <span key={tool.name} className="project-modal-tool" title={tool.name}>
                                        <span className="project-modal-tool-icon"><img src={tool.icon} alt="" /></span>
                                        <span className="project-modal-tool-name">{tool.name}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <h2 className="project-modal-title">{project.title}</h2>

                    {(project.longDescription || project.shortDescription) && (
                        <p className="project-modal-description">
                            {project.longDescription || project.shortDescription}
                        </p>
                    )}

                    {project.problem && (
                        <ModalSection label="The Problem" tone="problem">{project.problem}</ModalSection>
                    )}

                    {project.solution && (
                        <ModalSection label="The Solution" tone="solution">{project.solution}</ModalSection>
                    )}

                    {project.expected && (
                        <ModalSection label="Expected Impact" tone="expected">{project.expected}</ModalSection>
                    )}

                    {project.demo && (
                        <div className="project-modal-demo">
                            <div className="project-modal-demo-head">
                                <span className="project-modal-demo-dot" />
                                <span>{project.demo.notice || "Live demo credentials"}</span>
                            </div>

                            <div className="project-modal-demo-accounts">
                                {project.demo.accounts.map((acc) => (
                                    <div key={acc.role} className="project-modal-demo-account">
                                        <div className="demo-role">{acc.role}</div>
                                        <DemoCredential label="Email" value={acc.email} />
                                        <DemoCredential label="Password" value={acc.password} />
                                        {acc.capabilities && (
                                            <div className="demo-cap">{acc.capabilities}</div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {project.demo.tip && (
                                <div className="project-modal-demo-tip">ⓘ {project.demo.tip}</div>
                            )}
                        </div>
                    )}

                    <div className="project-modal-actions">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-modal-btn project-modal-btn-primary">
                                <GithubIcon /><span>View Repository</span>
                            </a>
                        )}
                        {project.website && (
                            <a href={project.website} target="_blank" rel="noopener noreferrer" className="project-modal-btn">
                                <ExternalIcon /><span>Open Live Site</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* =========================================================
   PROJECT CARD
   ========================================================= */

const ProjectCard = ({ project, index, onOpen, isDragging }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (isDragging) return;
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        el.style.setProperty("--tilt-x", `${(y - 0.5) * -8}deg`);
        el.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
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
            className="project-card-3d carousel-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
                if (!isDragging) onOpen(project);
            }}
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
                    <img src={project.image} alt={project.title} draggable="false" />
                    {project.year && <span className="project-year">{project.year}</span>}
                    <span className="project-card-glare" aria-hidden="true" />
                </div>

                <div className="project-body">
                    <div className="project-index">
                        <span className="project-dot" />
                        <span>// {String(index + 1).padStart(2, "0")}</span>
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
                                    <span key={tool.name} className="project-tool" title={tool.name}>
                                        <span className="project-tool-icon"><img src={tool.icon} alt="" /></span>
                                    </span>
                                ))}
                                {project.tools.length > 5 && (
                                    <span className="project-tool project-tool-more">+{project.tools.length - 5}</span>
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
   CAROUSEL
   ========================================================= */

const ProjectCarousel = ({ onOpenProject }) => {
    const trackRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragState = useRef({ startX: 0, scrollStart: 0, moved: false });

    /* ---------- Scroll to a specific card ---------- */
    const scrollToIndex = useCallback((i) => {
        const track = trackRef.current;
        if (!track) return;
        const cards = track.querySelectorAll(".carousel-card");
        const card = cards[i];
        if (!card) return;

        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const target = track.scrollLeft + (cardRect.left - trackRect.left) -
            (trackRect.width / 2 - cardRect.width / 2);

        track.scrollTo({ left: target, behavior: "smooth" });
    }, []);

    const goPrev = useCallback(() => {
        const next = Math.max(0, activeIndex - 1);
        setActiveIndex(next);
        scrollToIndex(next);
    }, [activeIndex, scrollToIndex]);

    const goNext = useCallback(() => {
        const next = Math.min(projects.length - 1, activeIndex + 1);
        setActiveIndex(next);
        scrollToIndex(next);
    }, [activeIndex, scrollToIndex]);

    /* ---------- Track active card via scroll position ---------- */
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const onScroll = () => {
            const cards = track.querySelectorAll(".carousel-card");
            const center = track.scrollLeft + track.clientWidth / 2;

            let closest = 0;
            let closestDist = Infinity;

            cards.forEach((card, i) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const dist = Math.abs(cardCenter - center);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = i;
                }
            });

            setActiveIndex(closest);
        };

        track.addEventListener("scroll", onScroll, { passive: true });
        return () => track.removeEventListener("scroll", onScroll);
    }, []);

    /* ---------- Drag to scroll ---------- */
    const onMouseDown = (e) => {
        const track = trackRef.current;
        if (!track) return;
        dragState.current = {
            startX: e.pageX,
            scrollStart: track.scrollLeft,
            moved: false,
        };
        setIsDragging(false); /* becomes true only after 4px move */
    };

    const onMouseMove = (e) => {
        const track = trackRef.current;
        if (!track || e.buttons !== 1) return;
        const dx = e.pageX - dragState.current.startX;
        if (Math.abs(dx) > 4 && !dragState.current.moved) {
            dragState.current.moved = true;
            setIsDragging(true);
        }
        if (dragState.current.moved) {
            track.scrollLeft = dragState.current.scrollStart - dx;
        }
    };

    const onMouseUp = () => {
        setIsDragging(false);
        /* reset moved state on next tick so click handler sees it */
        setTimeout(() => { dragState.current.moved = false; }, 0);
    };

    /* ---------- Vertical wheel → horizontal scroll ---------- */
    const onWheel = (e) => {
        const track = trackRef.current;
        if (!track) return;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            track.scrollLeft += e.deltaY;
        }
    };

    return (
        <div className="carousel-wrapper">
            {/* Left arrow */}
            <button
                type="button"
                className="carousel-arrow carousel-arrow-prev"
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Previous project"
            >
                ‹
            </button>

            {/* Track */}
            <div
                ref={trackRef}
                className={`carousel-track ${isDragging ? "is-dragging" : ""}`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onWheel={onWheel}
            >
                {/* Left spacer so first card can center */}
                <div className="carousel-spacer" aria-hidden="true" />

                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={index}
                        onOpen={onOpenProject}
                        isDragging={isDragging}
                    />
                ))}

                {/* Coming-soon card as the last item */}
                <article className="carousel-card carousel-card--coming">
                    <div className="project-coming-inner">
                        <div className="project-coming-dot" />
                        <div className="project-coming-label">
                            // {String(projects.length + 1).padStart(2, "0")}
                        </div>
                        <h3 className="project-coming-title">More coming soon</h3>
                        <p className="project-coming-text">
                            Currently experimenting with multimodal models
                            and retrieval-augmented generation.
                        </p>
                    </div>
                </article>

                {/* Right spacer */}
                <div className="carousel-spacer" aria-hidden="true" />
            </div>

            {/* Right arrow */}
            <button
                type="button"
                className="carousel-arrow carousel-arrow-next"
                onClick={goNext}
                disabled={activeIndex === projects.length - 1}
                aria-label="Next project"
            >
                ›
            </button>

            {/* Progress dots */}
            <div className="carousel-dots">
                {projects.map((p, i) => (
                    <button
                        key={p.title}
                        type="button"
                        className={`carousel-dot ${i === activeIndex ? "is-active" : ""}`}
                        onClick={() => {
                            setActiveIndex(i);
                            scrollToIndex(i);
                        }}
                        aria-label={`Go to project ${i + 1}`}
                    />
                ))}
            </div>

            {/* Hint */}
            <p className="carousel-hint">
                Drag · Scroll · Use arrow keys
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
            gsap.from(".carousel-wrapper", {
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
                   PROJECT CAROUSEL — horizontal snap scroll
                   ========================================================= */

                .carousel-wrapper {
                    position: relative;
                    width: 100%;
                }

                /* ---------- Track ---------- */
                .carousel-track {
                    display: flex;
                    align-items: center;
                    gap: 28px;

                    overflow-x: auto;
                    overflow-y: hidden;

                    scroll-snap-type: x mandatory;
                    scroll-behavior: smooth;

                    padding: 60px 0 40px;

                    /* Fixed height — never grows with project count */
                    height: 620px;

                    cursor: grab;

                    /* Hide scrollbar */
                    scrollbar-width: none;
                    -ms-overflow-style: none;

                    /* Perspective for the tilt effect */
                    perspective: 1600px;
                    perspective-origin: 50% 50%;
                }

                .carousel-track::-webkit-scrollbar { display: none; }

                .carousel-track.is-dragging {
                    cursor: grabbing;
                    scroll-behavior: auto;
                    scroll-snap-type: none;
                }

                /* Spacers let the first/last card center */
                .carousel-spacer {
                    flex: 0 0 calc(50% - 190px);
                    height: 1px;
                }

                /* ---------- Cards ---------- */
                .carousel-card {
                    flex: 0 0 380px;
                    height: 500px;
                    scroll-snap-align: center;
                    scroll-snap-stop: always;
                    position: relative;
                    cursor: pointer;
                    user-select: none;
                    -webkit-user-drag: none;
                }

                .carousel-card--coming {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: default;

                    background: linear-gradient(135deg, rgba(30, 4, 4, 0.7) 0%, rgba(8, 1, 1, 0.8) 100%);
                    border: 1px dashed rgba(255, 60, 20, 0.35);
                    border-radius: 18px;
                }

                .carousel-card--coming .project-coming-inner {
                    padding: 30px;
                    text-align: center;
                }

                .carousel-card--coming .project-coming-dot {
                    width: 10px; height: 10px;
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    background: #ff4b1f;
                    box-shadow: 0 0 20px rgba(255, 75, 31, 0.9);
                    animation: dotPulse 1.6s ease-in-out infinite;
                }

                .carousel-card--coming .project-coming-label {
                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.35);
                    margin-bottom: 16px;
                }

                .carousel-card--coming .project-coming-title {
                    margin: 0 0 12px;
                    font-family: "Orbitron", sans-serif;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #ffffff;
                    text-shadow: 0 0 20px rgba(255, 60, 20, 0.3);
                }

                .carousel-card--coming .project-coming-text {
                    margin: 0;
                    font-family: "Rajdhani", sans-serif;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.5);
                }

                /* ---------- 3D tilt inner ---------- */
                .project-card-3d .project-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 18px;
                    overflow: hidden;

                    display: flex;
                    flex-direction: column;

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
                        rotateY(var(--tilt-y, 0deg));

                    transform-style: preserve-3d;

                    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                                border-color 0.35s ease,
                                box-shadow 0.35s ease;
                }

                .carousel-card:hover .project-card-inner {
                    border-color: rgba(255, 90, 40, 0.75);
                    box-shadow:
                        inset 0 0 60px rgba(255, 60, 20, 0.16),
                        0 24px 60px rgba(255, 40, 10, 0.25),
                        0 0 100px rgba(255, 40, 10, 0.15);
                }

                /* Image area */
                .carousel-card .project-image {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 10;
                    overflow: hidden;
                    background: #0a0202;
                    border-bottom: 1px solid rgba(255, 60, 20, 0.18);
                    flex-shrink: 0;
                }

                .carousel-card .project-image img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    object-position: center top;
                    display: block;
                    pointer-events: none;
                    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .carousel-card:hover .project-image img { transform: scale(1.05); }

                .carousel-card .project-image::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 0.35) 0%,
                        transparent 25%,
                        transparent 75%,
                        rgba(10, 2, 2, 0.6) 100%
                    );
                }

                .carousel-card .project-year {
                    position: absolute;
                    top: 12px; right: 12px;
                    z-index: 2;
                    padding: 4px 10px;
                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    color: #ffb89c;
                    background: rgba(10, 2, 2, 0.85);
                    border: 1px solid rgba(255, 90, 40, 0.45);
                    border-radius: 6px;
                    backdrop-filter: blur(8px);
                }

                /* Glare */
                .carousel-card .project-card-glare {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 4;
                    background: radial-gradient(
                        circle 260px at var(--glow-x, 50%) var(--glow-y, 50%),
                        rgba(255, 200, 180, 0.16) 0%,
                        transparent 60%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    mix-blend-mode: screen;
                }

                .carousel-card:hover .project-card-glare { opacity: 1; }

                /* Body */
                .carousel-card .project-body {
                    padding: 22px 24px 24px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    min-height: 0;
                }

                .carousel-card .project-index {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 12px;
                    font-family: "Orbitron", sans-serif;
                    font-size: 9px;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.42);
                }

                .carousel-card .project-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #ff4b1f;
                    box-shadow: 0 0 12px rgba(255, 75, 31, 0.9);
                    animation: dotPulse 2s ease-in-out infinite;
                }

                .carousel-card .project-title {
                    margin: 0;
                    font-family: "Orbitron", sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    line-height: 1.35;
                    color: #ffffff;
                    text-shadow: 0 0 20px rgba(255, 60, 20, 0.20);

                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .carousel-card .project-description {
                    margin: 10px 0 0;
                    font-family: "Rajdhani", sans-serif;
                    font-size: 0.92rem;
                    line-height: 1.55;
                    color: rgba(255, 255, 255, 0.58);

                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;

                    flex: 1;
                    min-height: 0;
                }

                .carousel-card .project-tools {
                    margin-top: 14px;
                    padding-top: 14px;
                    border-top: 1px solid rgba(255, 60, 20, 0.12);
                }

                .carousel-card .project-tools-label {
                    font-family: "Orbitron", sans-serif;
                    font-size: 9px;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.38);
                    margin-bottom: 8px;
                }

                .carousel-card .project-tools-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }

                .carousel-card .project-tool {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    padding: 0;
                    border-radius: 8px;
                    background: rgba(30, 4, 4, 0.6);
                    border: 1px solid rgba(255, 60, 20, 0.22);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                }

                .carousel-card .project-tool:hover {
                    border-color: rgba(255, 90, 40, 0.7);
                    transform: translateY(-1px);
                }

                .carousel-card .project-tool-icon {
                    width: 16px; height: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .carousel-card .project-tool-icon img {
                    width: 100%; height: 100%;
                    object-fit: contain;
                    filter: brightness(0) invert(1);
                }

                .project-tool-more {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px; height: 30px;
                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    font-weight: 700;
                    color: #ffb89c;
                    background: rgba(255, 60, 20, 0.15);
                    border: 1px solid rgba(255, 90, 40, 0.4);
                    border-radius: 8px;
                }

                .carousel-card .project-see-more {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 12px;
                    padding: 0;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #ff8c42;
                    transition: color 0.3s ease, gap 0.3s ease;
                }

                .carousel-card .project-see-more:hover {
                    color: #ffffff;
                    gap: 12px;
                }

                .carousel-card .project-see-more svg {
                    transition: transform 0.3s ease;
                }

                .carousel-card .project-see-more:hover svg {
                    transform: translateX(3px);
                }

                /* =========================================================
                   CAROUSEL CONTROLS — arrows, dots, hint
                   ========================================================= */

                .carousel-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 20;

                    width: 54px;
                    height: 54px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;
                    border: 1px solid rgba(255, 120, 60, 0.5);
                    background: linear-gradient(135deg, rgba(40, 5, 5, 0.9) 0%, rgba(12, 2, 2, 0.95) 100%);

                    color: #ff8c42;
                    font-family: "Orbitron", sans-serif;
                    font-size: 26px;
                    line-height: 1;

                    cursor: pointer;
                    backdrop-filter: blur(10px);

                    box-shadow:
                        inset 0 0 20px rgba(255, 60, 20, 0.12),
                        0 0 20px rgba(255, 60, 20, 0.15);

                    transition: all 0.3s ease;
                }

                .carousel-arrow:hover:not(:disabled) {
                    border-color: rgba(255, 140, 80, 0.95);
                    box-shadow:
                        inset 0 0 30px rgba(255, 80, 32, 0.25),
                        0 0 30px rgba(255, 80, 32, 0.55);
                    transform: translateY(-50%) scale(1.08);
                }

                .carousel-arrow:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .carousel-arrow-prev { left: -10px; }
                .carousel-arrow-next { right: -10px; }

                @media (max-width: 1280px) {
                    .carousel-arrow-prev { left: 0; }
                    .carousel-arrow-next { right: 0; }
                }

                /* ---------- Dots ---------- */
                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-top: 8px;
                }

                .carousel-dot {
                    width: 8px;
                    height: 8px;
                    padding: 0;
                    border-radius: 999px;
                    border: 1px solid rgba(255, 120, 60, 0.4);
                    background: rgba(255, 120, 60, 0.22);
                    cursor: pointer;
                    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .carousel-dot:hover {
                    background: rgba(255, 140, 80, 0.55);
                    transform: scale(1.2);
                }

                .carousel-dot.is-active {
                    width: 32px;
                    background: linear-gradient(90deg, #ff5020, #ffb89c);
                    border-color: rgba(255, 140, 80, 0.95);
                    box-shadow: 0 0 16px rgba(255, 80, 32, 0.7);
                }

                .carousel-hint {
                    margin-top: 20px;
                    text-align: center;
                    font-family: "Orbitron", sans-serif;
                    font-size: 9px;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    color: rgba(255, 220, 200, 0.35);
                }

                /* =========================================================
                   MODAL SECTIONS (unchanged)
                   ========================================================= */

                .modal-section { margin-top: 26px; }

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

                .modal-section-dot { width: 6px; height: 6px; border-radius: 50%; }

                .modal-section--problem .modal-section-label { color: #ff8c42; }
                .modal-section--problem .modal-section-dot {
                    background: #ff8c42;
                    box-shadow: 0 0 10px rgba(255, 140, 66, 0.9);
                }

                .modal-section--solution .modal-section-label { color: #4ade80; }
                .modal-section--solution .modal-section-dot {
                    background: #4ade80;
                    box-shadow: 0 0 10px rgba(74, 222, 128, 0.9);
                }

                .modal-section--expected .modal-section-label { color: #c084fc; }
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

                .modal-section--problem .modal-section-body { border-left: 3px solid rgba(255, 140, 66, 0.55); }
                .modal-section--solution .modal-section-body { border-left: 3px solid rgba(74, 222, 128, 0.55); }
                .modal-section--expected .modal-section-body { border-left: 3px solid rgba(192, 132, 252, 0.55); }

                /* ---------- Demo credentials ---------- */
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
                    width: 7px; height: 7px;
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

                .demo-cred-row.is-copied .demo-cred-copy { color: #4ade80; }

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

                /* =========================================================
                   RESPONSIVE
                   ========================================================= */

                @media (max-width: 1024px) {
                    .carousel-card { flex: 0 0 340px; height: 480px; }
                    .carousel-track { height: 600px; }
                    .carousel-spacer { flex: 0 0 calc(50% - 170px); }
                }

                @media (max-width: 768px) {
                    .carousel-track {
                        gap: 18px;
                        padding: 40px 0 30px;
                        height: 540px;
                        cursor: default;
                    }

                    .carousel-card { flex: 0 0 300px; height: 440px; }
                    .carousel-spacer { flex: 0 0 calc(50% - 150px); }

                    .carousel-arrow {
                        width: 42px; height: 42px;
                        font-size: 20px;
                    }
                    .carousel-arrow-prev { left: 4px; }
                    .carousel-arrow-next { right: 4px; }

                    .carousel-card .project-title { font-size: 0.92rem; }
                    .carousel-card .project-description { font-size: 0.88rem; }
                }

                @media (max-width: 640px) {
                    .carousel-track { height: 520px; }
                    .carousel-card { flex: 0 0 280px; height: 420px; }

                    .carousel-arrow { display: none; } /* swipe is natural on mobile */

                    .carousel-dots { margin-top: 4px; }
                }

                /* =========================================================
                   REDUCED MOTION
                   ========================================================= */

                @media (prefers-reduced-motion: reduce) {
                    .carousel-track {
                        scroll-behavior: auto;
                    }
                    .project-card-3d .project-card-inner,
                    .carousel-card .project-image img,
                    .carousel-card .project-card-glare,
                    .carousel-arrow,
                    .carousel-dot {
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

                    <ProjectCarousel onOpenProject={setActiveProject} />

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
