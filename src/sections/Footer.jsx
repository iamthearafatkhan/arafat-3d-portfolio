import { useEffect, useRef, useState } from "react";
import { footerInfo, socials } from "../constants/index.js";

const EmailCTA = () => {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef(null);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(footerInfo.email);
            setCopied(true);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard blocked */
        }
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <button
            type="button"
            className={`footer-email ${copied ? "is-copied" : ""}`}
            onClick={handleCopy}
            aria-label={`Copy email ${footerInfo.email}`}
        >
            <span className="footer-email-text">
                {copied ? "Copied ✓" : footerInfo.email}
            </span>
        </button>
    );
};

const SocialIcon = ({ social, index }) => (
    <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-social"
        style={{ "--i": index }}
        aria-label={social.name}
    >
        <span className="footer-social-ring" aria-hidden="true" />
        <span className="footer-social-ring-2" aria-hidden="true" />
        <span className="footer-social-inner">
            <img src={social.icon} alt="" />
        </span>
        <span className="footer-social-label">{social.name}</span>
    </a>
);

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="footer-section">
            <span className="footer-glow footer-glow-1" aria-hidden="true" />
            <span className="footer-glow footer-glow-2" aria-hidden="true" />

            <div className="footer-layout">

                {/* ---------- STATUS ---------- */}
                <div className="footer-status">
                    <span className="footer-status-dot" />
                    {/* ⬇ Was hardcoded "2026" — now dynamic */}
                    <span>Available for opportunities · {year}</span>
                </div>

                {/* ---------- NAME ---------- */}
                <div className="footer-name-wrap">
                    <div className="footer-name">
                        <span className="footer-name-swirl" aria-hidden="true" />
                        <span className="footer-name-text">
                            {footerInfo.name}{" "}
                            <span className="footer-name-accent">
                                {footerInfo.nameAccent}
                            </span>
                        </span>
                    </div>
                </div>

                {/* ---------- TAGLINE ---------- */}
                <div className="footer-tagline">
                    {footerInfo.tagline.split("·").map((part, i, arr) => (
                        <span key={i}>
                            <span className="footer-tagline-word">
                                {part.trim()}
                            </span>
                            {i < arr.length - 1 && (
                                <span className="footer-tagline-dot">·</span>
                            )}
                        </span>
                    ))}
                </div>

                {/* ---------- EMAIL ---------- */}
                <div className="footer-email-wrap">
                    <span className="footer-email-label">// get in touch</span>
                    <EmailCTA />
                </div>

                {/* ---------- SOCIALS ---------- */}
                <div className="footer-socials">
                    {socials.map((social, i) => (
                        <SocialIcon
                            key={social.name}
                            social={social}
                            index={i}
                        />
                    ))}
                </div>

                {/* ---------- BOTTOM ---------- */}
                <div className="footer-bottom">
                    <span>© {year} Arafat Khan · All rights reserved</span>
                    <span className="footer-bottom-sep">·</span>
                    <span>Built with React, Three.js & GSAP</span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;