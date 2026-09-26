import { useEffect, useState } from "react";
import { certificates } from "../constants/index.js";

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
);

const CertModal = ({ cert, onClose }) => {
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

    if (!cert) return null;

    return (
        <div
            className="cert-modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${cert.title} certificate`}
        >
            <div
                className="cert-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="cert-modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <CloseIcon />
                </button>

                <div className="cert-modal-image">
                    <img src={cert.image} alt={cert.title} />
                </div>

                <div className="cert-modal-body">
                    <div className="cert-modal-tags">
                        <span className="cert-modal-tag">{cert.issuer}</span>
                        <span className="cert-modal-tag">{cert.year}</span>
                    </div>

                    <h2 className="cert-modal-title">{cert.title}</h2>

                    {cert.link && (
                        <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cert-modal-btn"
                        >
                            View on {cert.issuer}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const Certificates = () => {
    const [activeCert, setActiveCert] = useState(null);

    return (
        <>
            <section id="certificates" className="certs-section">
                <div className="certs-layout">

                    {/* ---------- HEADING ---------- */}
                    <div className="certs-head">
                        <div className="certs-kicker">
                            <span className="certs-kicker-line" />
                            <span>CERTIFICATES</span>
                        </div>

                        <h2 className="certs-heading">
                            Verified
                            <span className="certs-heading-accent">
                                {" "}learning.
                            </span>
                        </h2>
                    </div>

                    {/* ---------- GRID ---------- */}
                    <div className="certs-grid">
                        {certificates.map((cert, index) => (
                            <button
                                key={cert.title}
                                type="button"
                                className="cert-card"
                                onClick={() => setActiveCert(cert)}
                            >
                                {/* Galaxy swirl accent */}
                                <div className="cert-card-swirl" aria-hidden="true" />

                                <div className="cert-card-image">
                                    <img src={cert.image} alt={cert.title} />
                                    <span className="cert-card-year">
                                        {cert.year}
                                    </span>
                                </div>

                                <div className="cert-card-body">
                                    <div className="cert-card-index">
                                        <span className="cert-card-dot" />
                                        <span>
                                            // {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <div className="cert-card-issuer">
                                        {cert.issuer}
                                    </div>
                                    <h3 className="cert-card-title">
                                        {cert.title}
                                    </h3>
                                    <div className="cert-card-cta">
                                        View Certificate →
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                </div>
            </section>

            {activeCert && (
                <CertModal
                    cert={activeCert}
                    onClose={() => setActiveCert(null)}
                />
            )}
        </>
    );
};

export default Certificates;