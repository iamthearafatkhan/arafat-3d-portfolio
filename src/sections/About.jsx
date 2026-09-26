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

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-layout">

                {/* ===================================
                    LEFT — narrative
                =================================== */}
                <div className="about-content">
                    <div className="about-kicker">
                        <span className="about-kicker-line" />
                        <span>ABOUT ME</span>
                    </div>

                    {/* ---------- FULL LEGAL NAME ---------- */}
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

                    {/* Interest tags */}
                    <div className="about-interests">
                        <div className="about-interests-label">
                            Interests
                        </div>
                        <div className="about-interests-list">
                            {interests.map((item) => (
                                <span key={item} className="about-tag">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ===================================
                    RIGHT — info cards (unchanged)
                =================================== */}
                <div className="about-info">
                    {aboutInfo.map((item, i) => (
                        <div
                            key={item.label}
                            className={`about-card ${
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
                    ))}
                </div>

            </div>
        </section>
    );
};

export default About;
