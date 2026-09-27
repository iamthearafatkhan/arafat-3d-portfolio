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
    "rgba(255, 80, 32, 0.55)",   // red-orange
    "rgba(255, 140, 66, 0.5)",   // amber
    "rgba(180, 80, 255, 0.45)",  // violet
    "rgba(255, 60, 20, 0.5)",    // deep red
];

/* Stagger offsets so no two cards float in sync */
const FLOAT_DELAYS = ["-0.2s", "-1.5s", "-0.9s", "-2.2s"];

const About = () => {
    return (
        <section id="about" className="about-section">

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

                    <div className="about-name">
                        Md Arafat Hossen Rabby
                    </div>

                    <h2 className="about-heading">
                        Building intelligent
                        <span className="about-heading-accent">
                            {" "}systems{" "}
                        </span>
                        that solve real problems.
                    </h2>

                    <p className="about-text">
                        I'm Arafat — an AI/ML engineer focused on turning
                        raw data and research papers into working systems.
                        My work sits at the intersection of deep learning,
                        computer vision, and applied machine learning.
                    </p>

                    <p className="about-text">
                        I care about the full loop: understanding the problem,
                        choosing the right model, shipping it cleanly, and
                        making it fast enough to actually use. Currently
                        looking for a team where I can grow and contribute.
                    </p>

                    {/* ===================================
                        INTERESTS — floating tags
                    =================================== */}
                    <div className="about-interests">
                        <div className="about-interests-label">
                            Interests
                        </div>

                        <div className="about-interests-list">
                            {interests.map((item, i) => (
                                <span
                                    key={item}
                                    className="about-tag about-tag-float"
                                    style={{
                                        animation:
                                            "aboutTagFloat 4s ease-in-out infinite",
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
                                animation:
                                    "aboutCardFloat 5s ease-in-out infinite",
                                animationDelay:
                                    FLOAT_DELAYS[i % FLOAT_DELAYS.length],
                            }}
                        >
                            {/* Nebula glow behind the card */}
                            <span
                                className="about-card-nebula pointer-events-none absolute -inset-8 rounded-[32px] blur-2xl"
                                style={{
                                    background: `radial-gradient(circle, ${
                                        NEBULA_COLORS[i % NEBULA_COLORS.length]
                                    } 0%, transparent 68%)`,
                                    animation:
                                        "aboutNebulaPulse 6s ease-in-out infinite",
                                    animationDelay:
                                        FLOAT_DELAYS[i % FLOAT_DELAYS.length],
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
                                    <span>
                                        // {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="about-card-label">
                                    {item.label}
                                </div>

                                <div className="about-card-value">
                                    {item.value}
                                </div>

                                <div className="about-card-sublabel">
                                    {item.sublabel}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default About;
