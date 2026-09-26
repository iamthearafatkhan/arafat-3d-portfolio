import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { words } from "../constants/index.js";
import Button from "../components/Button.jsx";
import HeroExperience from "../components/HeroModels/HeroExperience.jsx";
import CVModal from "../components/CVModal.jsx";

const Hero = () => {
    const [cvOpen, setCvOpen] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
        });

        tl.fromTo(
            ".hero-kicker",
            { y: 30, opacity: 0, filter: "blur(8px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }
        )
            .fromTo(
                ".hero-name",
                { y: 60, opacity: 0, filter: "blur(12px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
                "-=0.35"
            )
            .fromTo(
                ".hero-title",
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8 },
                "-=0.45"
            )
            .fromTo(
                ".hero-description",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                "-=0.3"
            )
            .fromTo(
                ".hero-actions",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                "-=0.25"
            )
            .fromTo(
                ".hero-visual",
                { x: 80, opacity: 0, scale: 0.92 },
                { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
                "-=1"
            );
    });

    return (
        <>
            <section id="hero" className="hero-section">

                {/* ---------- GALAXY GLASS BACKGROUND ---------- */}
                <div className="hero-background">
                    <img src="/images/bg.png" alt="" className="hero-bg-image" />

                    {/* Star field (CSS-only, no images) */}
                    <div className="hero-stars" aria-hidden="true" />

                    {/* Nebula glows */}
                    <div className="hero-nebula hero-nebula-1" />
                    <div className="hero-nebula hero-nebula-2" />
                    <div className="hero-nebula hero-nebula-3" />

                    {/* Grid overlay */}
                    <div className="hero-grid" />

                    {/* Rotating galaxy swirl behind the whole hero */}
                    <div className="hero-galaxy-swirl" aria-hidden="true" />
                </div>

                <div className="hero-layout">

                    {/* ========================= LEFT ========================= */}
                    <header className="hero-content">
                        <div className="hero-kicker">
                            <span className="kicker-line" />
                            <span>AI / ML ENGINEER · DATA SCIENCE · RESEARCH</span>
                        </div>

                        <div className="hero-text">
                            <div className="hero-name-wrapper">
                                <span className="hero-name-index">I'm</span>
                                <h1 className="hero-name">
                                    ARAFAT
                                    <span>KHAN</span>
                                </h1>
                            </div>

                            <div className="hero-title">
                                <span className="hero-title-muted">Building</span>

                                <span className="hero-word-slider">
                                    <span className="hero-word-wrapper">
                                        {words.map((word, index) => (
                                            <span
                                                key={`${word.text}-${index}`}
                                                className="hero-word"
                                            >
                                                <span className="hero-word-icon">
                                                    <img
                                                        src={word.imgPath}
                                                        alt={word.text}
                                                    />
                                                </span>
                                                <span>{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </div>

                            <div className="hero-title-second">
                                Graduate Engineer
                                <span className="hero-dot">.</span>
                            </div>
                        </div>

                        <p className="hero-description">
                            I turn data, research and intelligent algorithms
                            into practical digital experiences and machine
                            learning systems.
                        </p>

                        <div className="hero-actions">
                            <a href="#work" className="cyber-button hero-project-button">
                                <span className="cyber-button-glow" aria-hidden="true" />
                                <span className="cyber-button-content">
        <span className="cyber-button-text">EXPLORE PROJECTS</span>
        <span className="cyber-button-arrow">↗</span>
    </span>
                                <span className="cyber-button-line" aria-hidden="true" />
                            </a>

                            {/* CV button with galaxy ring */}
                            <button
                                type="button"
                                className="hero-cv-button"
                                onClick={() => setCvOpen(true)}
                            >
                                <span className="hero-cv-ring" aria-hidden="true" />
                                <span className="hero-cv-ring-2" aria-hidden="true" />
                                <span className="hero-cv-inner">
                                    <span className="hero-cv-icon">↓</span>
                                    <span className="hero-cv-text">VIEW CV</span>
                                </span>
                            </button>

                            <a href="#about" className="hero-scroll-link">
                                <span className="scroll-circle">↓</span>
                                <span>SCROLL TO EXPLORE</span>
                            </a>
                        </div>
                    </header>

                    {/* ========================= RIGHT ========================= */}
                    <figure className="hero-visual">
                        <div className="hero-visual-frame">
                            <div className="visual-label visual-label-top">
                                <span className="status-dot" />
                                SYSTEM ONLINE
                            </div>

                            <div className="visual-corner visual-corner-tl" />
                            <div className="visual-corner visual-corner-tr" />
                            <div className="visual-corner visual-corner-bl" />
                            <div className="visual-corner visual-corner-br" />

                            <HeroExperience />
                        </div>
                    </figure>

                </div>
            </section>

            {/* CV Modal */}
            {cvOpen && <CVModal onClose={() => setCvOpen(false)} />}
        </>
    );
};

export default Hero;