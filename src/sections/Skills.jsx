import { skillGroups } from "../constants/index.js";

const SkillBubble = ({ skill, index }) => (
    <div
        className={`skill-bubble skill-${skill.level}`}
        style={{ "--float-delay": `${(index % 6) * 0.4}s` }}
        tabIndex={0}
        aria-label={`${skill.name}, ${skill.percent} percent, ${skill.level}`}
    >
        {/* Idle state — iridescent bubble with the logo */}
        <div className="skill-bubble-core">
            {/* Iridescent film layer */}
            <span className="skill-bubble-film" aria-hidden="true" />
            {/* Specular highlight top-left */}
            <span className="skill-bubble-highlight" aria-hidden="true" />
            {/* Rim light bottom-right */}
            <span className="skill-bubble-rim" aria-hidden="true" />
            {/* Logo (real colors preserved) */}
            <img src={skill.icon} alt="" />
            {/* Pop particles (visible only on hover) */}
            <span className="skill-bubble-particles" aria-hidden="true" />
        </div>

        {/* Reveal state — cracks open on hover */}
        <div className="skill-bubble-reveal">
            <div className="skill-percent">
                {skill.percent}
                <span>%</span>
            </div>
            <div className="skill-level">
                {skill.level === "intermediate" ? "Intermediate" : "Beginner"}
            </div>
            <div className="skill-bar">
                <div
                    className="skill-bar-fill"
                    style={{ "--pct": `${skill.percent}%` }}
                />
            </div>
            <div className="skill-name">{skill.name}</div>
        </div>
    </div>
);

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <div className="skills-layout">

                <div className="skills-head">
                    <div className="skills-kicker">
                        <span className="skills-kicker-line" />
                        <span>SKILLS</span>
                    </div>

                    <h2 className="skills-heading">
                        Tools I
                        <span className="skills-heading-accent">
                            {" "}build with.
                        </span>
                    </h2>

                    <p className="skills-subtext">
                        Hover any bubble to pop it open.
                    </p>
                </div>

                <div className="skills-groups">
                    {skillGroups.map((group) => (
                        <div key={group.category} className="skill-group">
                            <div className="skill-group-head">
                                <span className="skill-group-dot" />
                                <span>{group.category}</span>
                                <span className="skill-group-count">
                                    {group.skills.length}
                                </span>
                            </div>

                            <div className="skill-bubbles">
                                {group.skills.map((skill, i) => (
                                    <SkillBubble
                                        key={skill.name}
                                        skill={skill}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;