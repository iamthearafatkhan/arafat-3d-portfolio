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
            ".hero-bismillah",
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
                ".hero-verse",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                "-=0.3"
            )
            .fromTo(
                ".hero-description",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                "-=0.35"
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
            {/* Inline keyframe for the floating cyber buttons — no CSS file touched */}
           

            <section id="hero" className="hero-section">

                {/* ---------- GALAXY GLASS BACKGROUND ---------- */}
                <div className="hero-background">
                    <img src="/images/bg.jpg" alt="" className="hero-bg-image" />

                    <div className="hero-stars" aria-hidden="true" />

                    <div className="hero-nebula hero-nebula-1" />
                    <div className="hero-nebula hero-nebula-2" />
                    <div className="hero-nebula hero-nebula-3" />

                    <div className="hero-grid" />

                    <div className="hero-galaxy-swirl" aria-hidden="true" />
                </div>

                <div className="hero-layout">

                    {/* ========================= LEFT ========================= */}
                    <header className="hero-content">

                        {/* ========================================
                            BISMILLAH
                        ======================================== */}
                        <div className="hero-bismillah flex flex-col gap-1.5 mb-7">
                            <div className="flex items-center gap-3">
                                <span className="kicker-line" />
                                <span
                                    className="font-['Amiri',serif] text-[1.15rem] leading-none text-amber-200/95 tracking-wide"
                                    dir="rtl"
                                >
                                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                </span>
                            </div>
                            <span className="pl-[46px] font-['Rajdhani'] text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">
                                In the name of Allah, the Most Gracious, the Most Merciful
                            </span>
                        </div>

                        {/* ========================================
                            NAME
                        ======================================== */}
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
                                                    <img src={word.imgPath} alt={word.text} />
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

                        {/* ========================================
                            QURAN VERSE — Surah Taha 20:114
                        ======================================== */}
                        <div className="hero-verse relative mt-7 mb-7 max-w-[590px] pl-5 border-l-2 border-amber-400/35">
                            <div
                                className="font-['Amiri',serif] text-2xl md:text-[1.7rem] leading-[1.7] text-right text-amber-100/95"
                                dir="rtl"
                            >
                                رَبِّ زِدْنِي عِلْمًا
                            </div>

                            <p className="mt-2.5 font-['Rajdhani'] text-[0.95rem] italic leading-relaxed text-white/60">
                                "My Allah, increase me in knowledge."
                            </p>

                            <div className="mt-1.5 font-['Orbitron'] text-[9px] uppercase tracking-[0.25em] text-amber-400/70">
                                — Surah Taha · 20:114
                            </div>
                        </div>

                        {/* ========================================
                            DESCRIPTION
                        ======================================== */}
                        <p className="hero-description">
                            I turn data, research and intelligent algorithms
                            into practical digital experiences and machine
                            learning systems.
                        </p>

                        {/* ========================================
                            ACTIONS — floating cyber buttons
                        ======================================== */}
                        <div className="hero-actions">
                            <a
                                href="#work"
                                className="cyber-button hero-project-button animate-[cyberFloat_4.5s_ease-in-out_infinite]"
                            >
                                <span className="cyber-button-glow" aria-hidden="true" />
                                <span className="cyber-button-content">
                                    <span className="cyber-button-text">EXPLORE PROJECTS</span>
                                    <span className="cyber-button-arrow">↗</span>
                                </span>
                                <span className="cyber-button-line" aria-hidden="true" />
                            </a>

                            <button
                                type="button"
                                className="cyber-button animate-[cyberFloat_4.5s_ease-in-out_infinite] [animation-delay:-2.25s]"
                                onClick={() => setCvOpen(true)}
                            >
                                <span className="cyber-button-glow" aria-hidden="true" />
                                <span className="cyber-button-content">
                                    <span className="cyber-button-text">VIEW CV</span>
                                    <span className="cyber-button-arrow">↓</span>
                                </span>
                                <span className="cyber-button-line" aria-hidden="true" />
                            </button>
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

            {cvOpen && <CVModal onClose={() => setCvOpen(false)} />}
        </>
    );
};

export default Hero;
