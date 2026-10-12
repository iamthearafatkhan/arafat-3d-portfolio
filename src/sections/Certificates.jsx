import { useEffect, useState } from "react";
import { certificates } from "../constants/index.js";

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
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
      <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
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
        {/* Space Background */}
        <div className="galaxy-bg" aria-hidden="true">
          <div className="starfield-layer starfield-back" />
          <div className="starfield-layer starfield-front" />
          <span className="galaxy-band" />
          <span className="galaxy-orb orb-1" />
          <span className="galaxy-orb orb-2" />
          <span className="galaxy-orb orb-3" />
        </div>

        {/* Inline keyframes for the background */}
        <style>{`
                    /* =========================================================
                       GALAXY BACKGROUND CSS (Shared across sections)
                       ========================================================= */
                    .galaxy-bg {
                        position: absolute;
                        inset: 0;
                        pointer-events: none;
                        z-index: 0;
                        overflow: hidden;
                    }
                    .starfield-layer {
                        position: absolute;
                        inset: 0;
                        background-image:
                            radial-gradient(3px 3px at 10% 10%, #ffffff, rgba(255,255,255,0) 60%),
                            radial-gradient(4px 4px at 30% 40%, #ffffff, rgba(255,255,255,0) 60%),
                            radial-gradient(3px 3px at 60% 20%, #ffffff, rgba(255,255,255,0) 60%),
                            radial-gradient(5px 5px at 80% 70%, #ffffff, rgba(255,255,255,0) 60%),
                            radial-gradient(3px 3px at 15% 80%, #ffffff, rgba(255,255,255,0) 60%),
                            radial-gradient(4px 4px at 45% 90%, #ffffff, rgba(255,255,255,0) 60%),
                            radial-gradient(3px 3px at 75% 30%, #ffffff, rgba(255,255,255,0) 60%),
                            radial-gradient(5px 5px at 95% 50%, #ffffff, rgba(255,255,255,0) 60%),
                            radial-gradient(3px 3px at 5% 55%, #ffffff, rgba(255,255,255,0) 60%),
                            radial-gradient(4px 4px at 50% 5%, #ffffff, rgba(255,255,255,0) 60%);
                        background-size: 500px 500px;
                        opacity: 1;
                        will-change: background-position;
                        filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.9));
                    }
                    .starfield-back { animation: starfieldMove 60s linear infinite; }
                    .starfield-front {
                        background-size: 350px 350px;
                        opacity: 0.9;
                        animation: starfieldMoveReverse 30s linear infinite;
                        background-image:
                            radial-gradient(4px 4px at 20% 20%, #fff, transparent 60%),
                            radial-gradient(6px 6px at 50% 50%, #fff, transparent 60%),
                            radial-gradient(4px 4px at 80% 80%, #fff, transparent 60%),
                            radial-gradient(5px 5px at 10% 90%, #fff, transparent 60%),
                            radial-gradient(5px 5px at 90% 10%, #fff, transparent 60%);
                        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1));
                    }
                    @keyframes starfieldMove { 0% { background-position: 0 0; } 100% { background-position: -500px 500px; } }
                    @keyframes starfieldMoveReverse { 0% { background-position: 0 0; } 100% { background-position: 350px -350px; } }
                    .galaxy-bg::after {
                        content: ""; position: absolute; inset: -20%;
                        background:
                            radial-gradient(circle at 18% 22%, rgba(255, 255, 255, 0.10) 0%, transparent 40%),
                            radial-gradient(circle at 82% 30%, rgba(255, 255, 255, 0.06) 0%, transparent 40%),
                            radial-gradient(circle at 25% 78%, rgba(255, 255, 255, 0.08) 0%, transparent 45%),
                            radial-gradient(circle at 75% 85%, rgba(255, 255, 255, 0.06) 0%, transparent 45%),
                            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 0%, transparent 60%);
                        filter: blur(60px);
                        animation: nebulaDrift 30s ease-in-out infinite alternate;
                    }
                    @keyframes nebulaDrift { 0% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-3%, -2%) scale(1.04); } 100% { transform: translate(2%, 3%) scale(1.02); } }
                    .galaxy-band {
                        position: absolute; top: 40%; left: -20%; width: 140%; height: 60%; pointer-events: none;
                        background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 65%);
                        filter: blur(50px); transform: rotate(-12deg);
                        animation: bandPulse 12s ease-in-out infinite alternate;
                    }
                    @keyframes bandPulse { 0% { opacity: 0.7; } 100% { opacity: 1; } }
                    .galaxy-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(40px); mix-blend-mode: screen; }
                    .orb-1 { width: 400px; height: 400px; top: -80px; left: -100px; background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 65%); animation: orbFloat 26s ease-in-out infinite alternate; }
                    .orb-2 { width: 500px; height: 500px; bottom: -150px; right: -120px; background: radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, transparent 65%); animation: orbFloat 32s ease-in-out infinite alternate-reverse; }
                    .orb-3 { width: 320px; height: 320px; top: 40%; right: 30%; background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 65%); animation: orbFloat 38s ease-in-out infinite alternate; }
                    @keyframes orbFloat { 0% { transform: translate(0, 0); } 100% { transform: translate(30px, -40px); } }
                    @media (prefers-reduced-motion: reduce) {
                        .starfield-layer, .galaxy-bg::after, .galaxy-band, .galaxy-orb { animation: none; }
                    }
                    @media (max-width: 768px) {
                        .orb-1, .orb-2 { opacity: 0.5; }
                        .orb-3 { display: none; }
                    }
                `}</style>

        <div className="certs-layout">
          {/* ---------- HEADING ---------- */}
          <div className="certs-head">
            <div className="certs-kicker">
              <span className="certs-kicker-line" />
              <span>CERTIFICATES</span>
            </div>

            <h2 className="certs-heading">
              Verified
              <span className="certs-heading-accent"> learning.</span>
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
                  <span className="cert-card-year">{cert.year}</span>
                </div>

                <div className="cert-card-body">
                  <div className="cert-card-index">
                    <span className="cert-card-dot" />
                    <span>// {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="cert-card-issuer">{cert.issuer}</div>
                  <h3 className="cert-card-title">{cert.title}</h3>
                  <div className="cert-card-cta">View Certificate →</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeCert && (
        <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </>
  );
};

export default Certificates;
