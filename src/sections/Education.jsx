import { educationItems } from "../constants/index.js";

const Education = () => {
  return (
    <section id="education" className="education-section">
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

      <div className="education-layout">
        {/* ---------- HEADING ---------- */}
        <div className="education-head">
          <div className="education-kicker">
            <span className="education-kicker-line" />
            <span>EDUCATION</span>
          </div>

          <h2 className="education-heading">
            Academic
            <span className="education-heading-accent"> background </span>&
            foundation.
          </h2>
        </div>

        {/* ---------- LIST ---------- */}
        <div className="education-list">
          {educationItems.map((item, index) => (
            <article key={item.institution} className="edu-card">
              {/* Left — logo bay */}
              <div className="edu-logo-bay">
                <div className="edu-logo-frame">
                  <img src={item.logo} alt={`${item.institution} logo`} />
                </div>
              </div>

              {/* Right — information */}
              <div className="edu-body">
                <div className="edu-index">
                  <span className="edu-dot" />
                  <span>// {String(index + 1).padStart(2, "0")}</span>
                </div>

                <h3 className="edu-institution">{item.institution}</h3>

                <div className="edu-meta">
                  <span className="edu-location">{item.location}</span>
                  <span className="edu-sep">·</span>
                  <span className="edu-year">{item.year}</span>
                </div>

                <div className="edu-degree">{item.degree}</div>
              </div>

              {/* Decorative spider-x notch on the far right */}
              <div className="edu-notch" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
