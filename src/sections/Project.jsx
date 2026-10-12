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

                            {project.demo.accounts && project.demo.accounts.length > 0 && (
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
                            )}

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

const ProjectCard = ({ project, index, onOpen, isDragging, dragStateRef }) => {
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

    const handleClick = () => {
        if (dragStateRef.current.moved) return;
        onOpen(project);
    };

    return (
        <article
            ref={cardRef}
            className="project-card-3d carousel-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
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
   CAROUSEL
   ========================================================= */

const ProjectCarousel = ({ onOpenProject }) => {
    const trackRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const dragState = useRef({
        startX: 0,
        scrollStart: 0,
        moved: false,
        pointerId: null,
    });

    const scrollToIndex = useCallback((i) => {
        const track = trackRef.current;
        if (!track) return;

        const cards = track.querySelectorAll(".carousel-card");
        const card = cards[i];
        if (!card) return;

        const paddingLeft = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const target = track.scrollLeft + (cardRect.left - trackRect.left) - paddingLeft;

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

    /* Track active card via scroll position */
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const cards = track.querySelectorAll(".carousel-card");
                const paddingLeft = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
                const anchor = track.scrollLeft + paddingLeft;

                let closest = 0;
                let closestDist = Infinity;

                cards.forEach((card, i) => {
                    const dist = Math.abs(card.offsetLeft - anchor);
                    if (dist < closestDist) {
                        closestDist = dist;
                        closest = i;
                    }
                });

                setActiveIndex(closest);
            });
        };

        track.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            track.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    /* Pointer-based drag — mouse + touch */
    const onPointerDown = (e) => {
        const track = trackRef.current;
        if (!track) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;

        dragState.current = {
            startX: e.clientX,
            scrollStart: track.scrollLeft,
            moved: false,
            pointerId: e.pointerId,
        };
        setIsDragging(false);
    };

    const onPointerMove = (e) => {
        const track = trackRef.current;
        if (!track) return;
        if (dragState.current.pointerId !== e.pointerId) return;

        const dx = e.clientX - dragState.current.startX;

        if (Math.abs(dx) > 8 && !dragState.current.moved) {
            dragState.current.moved = true;
            setIsDragging(true);
        }

        if (dragState.current.moved) {
            track.scrollLeft = dragState.current.scrollStart - dx;
        }
    };

    const onPointerUp = (e) => {
        if (dragState.current.pointerId !== e.pointerId) return;
        dragState.current.pointerId = null;
        setIsDragging(false);

        setTimeout(() => {
            dragState.current.moved = false;
        }, 0);
    };

    /* ✅ CORRECTED WHEEL HANDLER
       - Horizontal trackpad swipe (deltaX > deltaY) → carousel scroll
       - Shift + wheel → carousel scroll
       - Plain vertical wheel → let page scroll normally (no preventDefault) */
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleWheel = (e) => {
            const isHorizontalSwipe = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            const isShiftWheel = e.shiftKey;

            if (isHorizontalSwipe || isShiftWheel) {
                e.preventDefault();
                const amount = isShiftWheel ? e.deltaY : e.deltaX;
                track.scrollLeft += amount;
            }
            /* Otherwise → vertical scroll passes through to the page */
        };

        track.addEventListener("wheel", handleWheel, { passive: false });
        return () => track.removeEventListener("wheel", handleWheel);
    }, []);

    return (
        <div className="carousel-wrapper">
            <button
                type="button"
                className="carousel-arrow carousel-arrow-prev"
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Previous project"
            >
                ‹
            </button>

            <div
                ref={trackRef}
                className={`carousel-track ${isDragging ? "is-dragging" : ""}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerLeave={onPointerUp}
            >
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={index}
                        onOpen={onOpenProject}
                        isDragging={isDragging}
                        dragStateRef={dragState}
                    />
                ))}

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
            </div>

            <button
                type="button"
                className="carousel-arrow carousel-arrow-next"
                onClick={goNext}
                disabled={activeIndex === projects.length - 1}
                aria-label="Next project"
            >
                ›
            </button>

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
                   PROJECT SECTION — modern galaxy backdrop
                   ========================================================= */

                .projects-section {
                    position: relative;
                    width: 100%;
                    padding: 120px 0 60px;
                    overflow: hidden;
                    background:
                        radial-gradient(ellipse at 20% 0%, rgba(80, 40, 180, 0.22) 0%, transparent 55%),
                        radial-gradient(ellipse at 80% 100%, rgba(220, 40, 100, 0.18) 0%, transparent 55%),
                        radial-gradient(ellipse at 50% 50%, rgba(30, 40, 120, 0.20) 0%, transparent 70%),
                        linear-gradient(180deg, #05010d 0%, #020005 100%);
                }

                /* ---------- Galaxy background layers ---------- */
                .galaxy-bg {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                    overflow: hidden;
                }

                /* Twinkling star field */
                .galaxy-bg::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background-image:
                        radial-gradient(1px 1px at 6% 14%, #fff, transparent 60%),
                        radial-gradient(1.4px 1.4px at 18% 38%, rgba(200, 220, 255, 0.9), transparent 60%),
                        radial-gradient(1px 1px at 32% 8%, #fff, transparent 60%),
                        radial-gradient(1.6px 1.6px at 44% 62%, rgba(255, 220, 240, 0.85), transparent 60%),
                        radial-gradient(1px 1px at 58% 24%, #fff, transparent 60%),
                        radial-gradient(1.4px 1.4px at 72% 78%, rgba(200, 220, 255, 0.85), transparent 60%),
                        radial-gradient(1px 1px at 82% 44%, #fff, transparent 60%),
                        radial-gradient(1.6px 1.6px at 90% 12%, rgba(255, 220, 240, 0.9), transparent 60%),
                        radial-gradient(1px 1px at 12% 88%, #fff, transparent 60%),
                        radial-gradient(1px 1px at 26% 56%, rgba(200, 220, 255, 0.7), transparent 60%),
                        radial-gradient(1.4px 1.4px at 50% 90%, #fff, transparent 60%),
                        radial-gradient(1px 1px at 66% 52%, rgba(255, 220, 240, 0.75), transparent 60%),
                        radial-gradient(1.6px 1.6px at 78% 8%, #fff, transparent 60%),
                        radial-gradient(1px 1px at 96% 70%, #fff, transparent 60%);
                    opacity: 0.75;
                    animation: galaxyTwinkle 6s ease-in-out infinite alternate;
                }

                @keyframes galaxyTwinkle {
                    0%   { opacity: 0.55; }
                    100% { opacity: 0.95; }
                }

                /* Colourful nebula clouds */
                .galaxy-bg::after {
                    content: "";
                    position: absolute;
                    inset: -20%;
                    background:
                        radial-gradient(circle at 18% 22%, rgba(140, 60, 255, 0.32) 0%, transparent 40%),
                        radial-gradient(circle at 82% 30%, rgba(60, 140, 255, 0.28) 0%, transparent 40%),
                        radial-gradient(circle at 25% 78%, rgba(255, 60, 140, 0.22) 0%, transparent 45%),
                        radial-gradient(circle at 75% 85%, rgba(180, 40, 220, 0.24) 0%, transparent 45%),
                        radial-gradient(circle at 50% 50%, rgba(80, 40, 200, 0.15) 0%, transparent 60%);
                    filter: blur(60px);
                    animation: nebulaDrift 30s ease-in-out infinite alternate;
                }

                @keyframes nebulaDrift {
                    0%   { transform: translate(0, 0) scale(1); }
                    50%  { transform: translate(-3%, -2%) scale(1.04); }
                    100% { transform: translate(2%, 3%) scale(1.02); }
                }

                /* Faint galaxy band across the section */
                .galaxy-band {
                    position: absolute;
                    top: 40%;
                    left: -20%;
                    width: 140%;
                    height: 60%;
                    pointer-events: none;

                    background:
                        radial-gradient(
                            ellipse at center,
                            rgba(200, 160, 255, 0.12) 0%,
                            rgba(140, 80, 220, 0.06) 30%,
                            transparent 65%
                        );

                    filter: blur(50px);
                    transform: rotate(-12deg);
                    animation: bandPulse 12s ease-in-out infinite alternate;
                }

                @keyframes bandPulse {
                    0%   { opacity: 0.7; }
                    100% { opacity: 1;   }
                }

                /* Slow drifting orbs for depth */
                .galaxy-orb {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(40px);
                    mix-blend-mode: screen;
                }

                .orb-1 {
                    width: 400px; height: 400px;
                    top: -80px; left: -100px;
                    background: radial-gradient(circle, rgba(140, 80, 255, 0.5) 0%, transparent 65%);
                    animation: orbFloat 26s ease-in-out infinite alternate;
                }

                .orb-2 {
                    width: 500px; height: 500px;
                    bottom: -150px; right: -120px;
                    background: radial-gradient(circle, rgba(255, 60, 140, 0.35) 0%, transparent 65%);
                    animation: orbFloat 32s ease-in-out infinite alternate-reverse;
                }

                .orb-3 {
                    width: 320px; height: 320px;
                    top: 40%; right: 30%;
                    background: radial-gradient(circle, rgba(60, 140, 255, 0.35) 0%, transparent 65%);
                    animation: orbFloat 38s ease-in-out infinite alternate;
                }

                @keyframes orbFloat {
                    0%   { transform: translate(0, 0); }
                    100% { transform: translate(30px, -40px); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .galaxy-bg::before,
                    .galaxy-bg::after,
                    .galaxy-band,
                    .galaxy-orb {
                        animation: none;
                    }
                }

                @media (max-width: 768px) {
                    .orb-1, .orb-2 { opacity: 0.5; }
                    .orb-3 { display: none; }
                }

                /* =========================================================
                   CAROUSEL
                   ========================================================= */

                .carousel-wrapper {
                    position: relative;
                    width: 100%;
                    z-index: 1;
                }

                .carousel-track {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 24px;

                    overflow-x: auto;
                    overflow-y: hidden;

                    scroll-snap-type: x proximity;
                    scroll-behavior: smooth;
                    overscroll-behavior-x: contain;

                    scroll-padding-left: max(24px, 4vw);
                    scroll-padding-right: max(24px, 4vw);

                    padding: 60px 0 40px;
                    height: 640px;

                    cursor: grab;
                    scrollbar-width: none;
                    -ms-overflow-style: none;

                    perspective: 1600px;
                    perspective-origin: 50% 50%;

                    user-select: none;
                    -webkit-user-select: none;

                    touch-action: pan-x;
                }

                .carousel-track::-webkit-scrollbar { display: none; }

                .carousel-track.is-dragging {
                    cursor: grabbing;
                    scroll-behavior: auto;
                    scroll-snap-type: none;
                }

                .carousel-card {
                    flex: 0 0 400px;
                    height: 520px;
                    scroll-snap-align: start;
                    scroll-snap-stop: normal;
                    position: relative;
                    cursor: pointer;
                    user-select: none;
                    -webkit-user-drag: none;
                }

                .project-card-3d .project-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;

                    display: flex;
                    flex-direction: column;
                    overflow: hidden;

                    clip-path: polygon(
                        0 0,
                        calc(100% - 26px) 0,
                        100% 26px,
                        100% 100%,
                        26px 100%,
                        0 calc(100% - 26px)
                    );

                    background:
                        linear-gradient(135deg, rgba(15, 5, 30, 0.9) 0%, rgba(8, 2, 20, 0.95) 100%);

                    border: 1px solid rgba(140, 170, 255, 0.3);

                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);

                    box-shadow:
                        inset 0 0 40px rgba(100, 130, 255, 0.08),
                        0 8px 30px rgba(0, 0, 0, 0.6),
                        0 0 60px rgba(100, 130, 255, 0.1);

                    transform:
                        rotateX(var(--tilt-x, 0deg))
                        rotateY(var(--tilt-y, 0deg));

                    transform-style: preserve-3d;

                    transition:
                        transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                        border-color 0.35s ease,
                        box-shadow 0.35s ease;
                }

                .carousel-card:hover .project-card-inner {
                    border-color: rgba(160, 190, 255, 0.9);
                    box-shadow:
                        inset 0 0 60px rgba(100, 140, 255, 0.22),
                        0 24px 60px rgba(60, 80, 200, 0.4),
                        0 0 120px rgba(140, 100, 255, 0.3);
                }

                .carousel-card .project-card-inner::before {
                    content: "";
                    position: absolute;
                    top: 0; right: 0;
                    width: 60px; height: 60px;
                    background: linear-gradient(
                        225deg,
                        rgba(180, 140, 255, 0.7) 0%,
                        rgba(180, 140, 255, 0.0) 55%
                    );
                    clip-path: polygon(0 0, 100% 0, 100% 100%);
                    pointer-events: none;
                    z-index: 3;
                }

                .carousel-card .project-card-inner::after {
                    content: "";
                    position: absolute;
                    left: 22px; right: 22px; bottom: 0;
                    height: 2px;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        #8ec5ff 50%,
                        transparent 100%
                    );
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 3;
                }

                .carousel-card:hover .project-card-inner::after { opacity: 1; }

                .carousel-card .project-image {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 11;
                    overflow: hidden;
                    background: #050202;
                    border-bottom: 1px solid rgba(140, 170, 255, 0.2);
                    flex-shrink: 0;
                }

                .carousel-card .project-image img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    object-position: center center;
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
                        rgba(0, 0, 0, 0.3) 0%,
                        transparent 30%,
                        transparent 70%,
                        rgba(8, 2, 20, 0.8) 100%
                    );
                }

                .carousel-card .project-year {
                    position: absolute;
                    top: 14px; right: 14px;
                    z-index: 2;
                    padding: 5px 12px;
                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    color: #c9b6ff;
                    background: rgba(8, 4, 25, 0.85);
                    border: 1px solid rgba(160, 140, 255, 0.5);
                    border-radius: 6px;
                    backdrop-filter: blur(8px);
                    box-shadow: 0 0 12px rgba(140, 100, 255, 0.4);
                }

                .carousel-card .project-card-glare {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 4;
                    background: radial-gradient(
                        circle 260px at var(--glow-x, 50%) var(--glow-y, 50%),
                        rgba(180, 200, 255, 0.2) 0%,
                        transparent 60%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    mix-blend-mode: screen;
                }

                .carousel-card:hover .project-card-glare { opacity: 1; }

                .carousel-card .project-body {
                    padding: 24px 26px 26px;
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
                    color: rgba(180, 200, 255, 0.6);
                }

                .carousel-card .project-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #8ec5ff;
                    box-shadow: 0 0 12px rgba(140, 200, 255, 0.95);
                    animation: dotPulse 2s ease-in-out infinite;
                }

                .carousel-card .project-title {
                    margin: 0;
                    font-family: "Orbitron", sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    line-height: 1.35;
                    color: #ffffff;
                    text-shadow: 0 0 20px rgba(140, 180, 255, 0.3);
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
                    color: rgba(220, 230, 255, 0.65);
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
                    border-top: 1px solid rgba(140, 170, 255, 0.18);
                }

                .carousel-card .project-tools-label {
                    font-family: "Orbitron", sans-serif;
                    font-size: 9px;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: rgba(180, 200, 255, 0.55);
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
                    background: rgba(15, 15, 40, 0.7);
                    border: 1px solid rgba(140, 170, 255, 0.3);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                }

                .carousel-card .project-tool:hover {
                    border-color: rgba(160, 200, 255, 0.9);
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
                    filter: brightness(0) invert(1) drop-shadow(0 0 4px rgba(140, 200, 255, 0.5));
                }

                .project-tool-more {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px; height: 30px;
                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    font-weight: 700;
                    color: #c9b6ff;
                    background: rgba(100, 140, 255, 0.18);
                    border: 1px solid rgba(140, 170, 255, 0.45);
                    border-radius: 8px;
                }

                .carousel-card .project-see-more {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 14px;
                    padding: 0;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #8ec5ff;
                    transition: color 0.3s ease, gap 0.3s ease;
                }

                .carousel-card .project-see-more:hover { color: #ffffff; gap: 12px; }

                .carousel-card .project-see-more svg { transition: transform 0.3s ease; }
                .carousel-card .project-see-more:hover svg { transform: translateX(3px); }

                /* ---------- Coming soon card ---------- */
                .carousel-card--coming {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: default;
                    background: linear-gradient(135deg, rgba(15, 10, 35, 0.8) 0%, rgba(6, 4, 15, 0.85) 100%);
                    border: 1px dashed rgba(140, 170, 255, 0.4);
                    clip-path: polygon(
                        0 0,
                        calc(100% - 26px) 0,
                        100% 26px,
                        100% 100%,
                        26px 100%,
                        0 calc(100% - 26px)
                    );
                }

                .carousel-card--coming .project-coming-inner { padding: 30px; text-align: center; }

                .carousel-card--coming .project-coming-dot {
                    width: 10px; height: 10px;
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    background: #8ec5ff;
                    box-shadow: 0 0 20px rgba(140, 200, 255, 0.95);
                    animation: dotPulse 1.6s ease-in-out infinite;
                }

                .carousel-card--coming .project-coming-label {
                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(180, 200, 255, 0.5);
                    margin-bottom: 16px;
                }

                .carousel-card--coming .project-coming-title {
                    margin: 0 0 12px;
                    font-family: "Orbitron", sans-serif;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #ffffff;
                    text-shadow: 0 0 20px rgba(140, 180, 255, 0.4);
                }

                .carousel-card--coming .project-coming-text {
                    margin: 0;
                    font-family: "Rajdhani", sans-serif;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    color: rgba(220, 230, 255, 0.6);
                }

                /* ---------- Controls ---------- */
                .carousel-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 20;
                    width: 54px; height: 54px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    border: 1px solid rgba(140, 170, 255, 0.55);
                    background: linear-gradient(135deg, rgba(15, 15, 40, 0.9) 0%, rgba(6, 6, 20, 0.95) 100%);
                    color: #8ec5ff;
                    font-family: "Orbitron", sans-serif;
                    font-size: 26px;
                    line-height: 1;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    box-shadow:
                        inset 0 0 20px rgba(100, 140, 255, 0.18),
                        0 0 20px rgba(100, 140, 255, 0.25);
                    transition: all 0.3s ease;
                }

                .carousel-arrow:hover:not(:disabled) {
                    border-color: rgba(160, 200, 255, 0.95);
                    box-shadow:
                        inset 0 0 30px rgba(100, 140, 255, 0.35),
                        0 0 40px rgba(140, 180, 255, 0.65);
                    transform: translateY(-50%) scale(1.08);
                }

                .carousel-arrow:disabled { opacity: 0.25; cursor: not-allowed; }
                .carousel-arrow-prev { left: -10px; }
                .carousel-arrow-next { right: -10px; }

                @media (max-width: 1280px) {
                    .carousel-arrow-prev { left: 0; }
                    .carousel-arrow-next { right: 0; }
                }

                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-top: 8px;
                }

                .carousel-dot {
                    width: 8px; height: 8px;
                    padding: 0;
                    border-radius: 999px;
                    border: 1px solid rgba(140, 170, 255, 0.5);
                    background: rgba(100, 140, 255, 0.25);
                    cursor: pointer;
                    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .carousel-dot:hover {
                    background: rgba(140, 200, 255, 0.65);
                    transform: scale(1.2);
                }

                .carousel-dot.is-active {
                    width: 32px;
                    background: linear-gradient(90deg, #8ec5ff, #c9b6ff);
                    border-color: rgba(160, 200, 255, 0.95);
                    box-shadow: 0 0 20px rgba(140, 180, 255, 0.9);
                }

                .carousel-hint {
                    margin-top: 20px;
                    text-align: center;
                    font-family: "Orbitron", sans-serif;
                    font-size: 9px;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    color: rgba(180, 200, 255, 0.45);
                }

                /* =========================================================
                   MODAL IMAGE — full natural size
                   ========================================================= */

                .project-modal-image {
                    position: relative;
                    width: 100%;
                    aspect-ratio: auto !important;
                    max-height: 55vh !important;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    background: #050202;
                    border-bottom: 1px solid rgba(255, 60, 20, 0.25);
                    overflow: hidden;
                }

                .project-modal-image img {
                    width: auto !important;
                    height: auto !important;
                    max-width: 100% !important;
                    max-height: 55vh !important;
                    object-fit: contain !important;
                    object-position: center center !important;
                    display: block !important;
                }

                /* =========================================================
                   MODAL SECTIONS
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
                    .carousel-card { flex: 0 0 360px; height: 500px; }
                    .carousel-track { height: 620px; }
                }

                @media (max-width: 768px) {
                    .carousel-track {
                        gap: 18px;
                        padding: 40px 0 30px;
                        height: 560px;
                        cursor: default;
                    }
                    .carousel-card { flex: 0 0 320px; height: 460px; }
                    .carousel-arrow { width: 42px; height: 42px; font-size: 20px; }
                    .carousel-arrow-prev { left: 4px; }
                    .carousel-arrow-next { right: 4px; }
                    .carousel-card .project-title { font-size: 0.92rem; }
                    .carousel-card .project-description { font-size: 0.88rem; }
                }

                @media (max-width: 640px) {
                    .carousel-track { height: 540px; }
                    .carousel-card { flex: 0 0 300px; height: 440px; }
                    .carousel-arrow { display: none; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .carousel-track { scroll-behavior: auto; }
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

                {/* ---------- Modern galaxy background ---------- */}
                <div className="galaxy-bg" aria-hidden="true">
                    <span className="galaxy-band" />
                    <span className="galaxy-orb orb-1" />
                    <span className="galaxy-orb orb-2" />
                    <span className="galaxy-orb orb-3" />
                </div>

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
