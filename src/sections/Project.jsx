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
                {/* Close button */}
                <button
                    type="button"
                    className="project-modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <CloseIcon />
                </button>

                {/* Image */}
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

                    {/* ---------- TOOLS (MODAL VERSION) ---------- */}
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

                    {/* ---------- GRID ---------- */}
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <article key={project.title} className="project-card">

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

                                    {/* ---------- TOOLS (CARD VERSION) ---------- */}
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

                                    {/* See More */}
                                    <button
                                        type="button"
                                        className="project-see-more"
                                        onClick={() => setActiveProject(project)}
                                    >
                                        <span>See More</span>
                                        <ArrowIcon />
                                    </button>

                                    {/* Links */}
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
                        ))}

                        {/* Coming Soon placeholder — full-width banner below the grid */}
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

            {/* Modal */}
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
