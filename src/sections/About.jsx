const aboutInfo = [
  {
    label: "Location",
    value: "Chittagong, BD",
    sublabel: "GMT +6 · Remote-friendly",
  },
  {
    label: "Focus",
    value: "AI / ML",
    sublabel: "Deep Learning · Vision · NLP",
  },
  {
    label: "Currently",
    value: "Open to Work",
    sublabel: "Entry-level · Research",
    accent: true,
  },
  {
    label: "Education",
    value: "CS Undergrad",
    sublabel: "Machine Learning track",
  },
];

const interests = [
  "Neural Networks",
  "Computer Vision",
  "Generative AI",
  "Data Science",
  "Research",
  "Automation",
];

/* Nebula colors — one per card, cycles if more cards are added */
const NEBULA_COLORS = [
  "rgba(255, 255, 255, 0.10)", // pure white
  "rgba(255, 255, 255, 0.08)", // pure white
  "rgba(255, 255, 255, 0.12)", // pure white
  "rgba(255, 255, 255, 0.06)", // pure white
];

/* Stagger offsets so no two cards float in sync */
const FLOAT_DELAYS = ["-0.2s", "-1.5s", "-0.9s", "-2.2s"];

const About = () => {
  return (
    <section id="about" className="about-section">
      {/* Space Background */}
      <div className="galaxy-bg" aria-hidden="true">
        <div className="starfield-layer starfield-back" />
        <div className="starfield-layer starfield-front" />
        <span className="galaxy-band" />
        <span className="galaxy-orb orb-1" />
        <span className="galaxy-orb orb-2" />
        <span className="galaxy-orb orb-3" />
      </div>

      {/* Inline keyframes — no CSS file touched */}
      <style>{`
                @keyframes aboutCardFloat {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-18px); }
                }

                @keyframes aboutTagFloat {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-12px); }
                }

                @keyframes aboutNebulaPulse {
                    0%, 100% { opacity: 0.55; transform: scale(1);    }
                    50%      { opacity: 0.95; transform: scale(1.18); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .about-card-float,
                    .about-card-nebula,
                    .about-tag-float {
                        animation: none !important;
                    }
                }

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

      <div className="about-layout">
        {/* ===================================
                    LEFT — narrative + floating interest tags
                =================================== */}
        <div className="about-content">
          <div className="about-kicker">
            <span className="about-kicker-line" />
            <span>ABOUT ME</span>
          </div>

          <div className="about-name">Md Arafat Hossen Rabby</div>

          <h2 className="about-heading">
            Building intelligent
            <span className="about-heading-accent"> systems </span>
            that solve real problems.
          </h2>

          <p className="about-text">
            I'm Arafat — an AI/ML engineer focused on turning raw data and
            research papers into working systems. My work sits at the
            intersection of deep learning, computer vision, and applied machine
            learning.
          </p>

          <p className="about-text">
            I care about the full loop: understanding the problem, choosing the
            right model, shipping it cleanly, and making it fast enough to
            actually use. Currently looking for a team where I can grow and
            contribute.
          </p>

          {/* ===================================
                        INTERESTS — floating tags
                    =================================== */}
          <div className="about-interests">
            <div className="about-interests-label">Interests</div>

            <div className="about-interests-list">
              {interests.map((item, i) => (
                <span
                  key={item}
                  className="about-tag about-tag-float"
                  style={{
                    animation: "aboutTagFloat 4s ease-in-out infinite",
                    animationDelay: `${-(i * 0.35)}s`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================
                    RIGHT — floating info cards with nebula glow
                =================================== */}
        <div className="about-info">
          {aboutInfo.map((item, i) => (
            <div
              key={item.label}
              className="about-card-float relative"
              style={{
                animation: "aboutCardFloat 5s ease-in-out infinite",
                animationDelay: FLOAT_DELAYS[i % FLOAT_DELAYS.length],
              }}
            >
              {/* Nebula glow behind the card */}
              <span
                className="about-card-nebula pointer-events-none absolute -inset-8 rounded-[32px] blur-2xl"
                style={{
                  background: `radial-gradient(circle, ${
                    NEBULA_COLORS[i % NEBULA_COLORS.length]
                  } 0%, transparent 68%)`,
                  animation: "aboutNebulaPulse 6s ease-in-out infinite",
                  animationDelay: FLOAT_DELAYS[i % FLOAT_DELAYS.length],
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              {/* The card itself */}
              <div
                className={`about-card relative z-10 ${
                  item.accent ? "about-card-accent" : ""
                }`}
              >
                <div className="about-card-head">
                  <span className="about-card-dot" />
                  <span>// {String(i + 1).padStart(2, "0")}</span>
                </div>

                <div className="about-card-label">{item.label}</div>

                <div className="about-card-value">{item.value}</div>

                <div className="about-card-sublabel">{item.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
