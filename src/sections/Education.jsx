import { educationItems } from "../constants/index.js";

const Education = () => {
    return (
        <section id="education" className="education-section">
            <div className="education-layout">

                {/* ---------- HEADING ---------- */}
                <div className="education-head">
                    <div className="education-kicker">
                        <span className="education-kicker-line" />
                        <span>EDUCATION</span>
                    </div>

                    <h2 className="education-heading">
                        Academic
                        <span className="education-heading-accent">
                            {" "}background{" "}
                        </span>
                        & foundation.
                    </h2>
                </div>

                {/* ---------- LIST ---------- */}
                <div className="education-list">
                    {educationItems.map((item, index) => (
                        <article key={item.institution} className="edu-card">

                            {/* Left — logo bay */}
                            <div className="edu-logo-bay">
                                <div className="edu-logo-frame">
                                    <img
                                        src={item.logo}
                                        alt={`${item.institution} logo`}
                                    />
                                </div>
                            </div>

                            {/* Right — information */}
                            <div className="edu-body">
                                <div className="edu-index">
                                    <span className="edu-dot" />
                                    <span>
                                        // {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <h3 className="edu-institution">
                                    {item.institution}
                                </h3>

                                <div className="edu-meta">
                                    <span className="edu-location">
                                        {item.location}
                                    </span>
                                    <span className="edu-sep">·</span>
                                    <span className="edu-year">
                                        {item.year}
                                    </span>
                                </div>

                                <div className="edu-degree">
                                    {item.degree}
                                </div>
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