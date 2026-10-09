import { useEffect, useState } from "react";
import { navLinks } from "../constants/index.js";

/* =========================================================
   ICONS
   ========================================================= */

const MenuIcon = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <line x1="3" y1="6"  x2="21" y2="6"  />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

/* =========================================================
   NAVBAR
   ========================================================= */

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    /* ---------- Scroll state ---------- */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ---------- Lock body scroll when menu is open ---------- */
    useEffect(() => {
        if (menuOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = prev; };
        }
    }, [menuOpen]);

    /* ---------- Close on Escape ---------- */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    /* ---------- Close drawer whenever viewport grows past lg ---------- */
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setMenuOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <>
            {/* =========================================================
                SCOPED STYLES — drawer, glass, animations
                ========================================================= */}
            <style>{`
                /* ---------- Hamburger button (mobile only) ---------- */
                .nav-mobile-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    width: 44px;
                    height: 44px;

                    border-radius: 12px;
                    border: 1px solid rgba(255, 120, 60, 0.4);
                    background:
                        linear-gradient(135deg, rgba(40, 5, 5, 0.85) 0%, rgba(12, 2, 2, 0.95) 100%);

                    color: #ff8c42;
                    cursor: pointer;

                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);

                    box-shadow:
                        inset 0 0 14px rgba(255, 60, 20, 0.12),
                        0 0 16px rgba(255, 60, 20, 0.15);

                    transition: all 0.3s ease;
                }

                .nav-mobile-toggle:hover {
                    border-color: rgba(255, 140, 80, 0.95);
                    color: #ffffff;
                    box-shadow:
                        inset 0 0 20px rgba(255, 80, 32, 0.25),
                        0 0 24px rgba(255, 80, 32, 0.5);
                }

                .nav-mobile-toggle:active {
                    transform: scale(0.96);
                }

                /* Hide hamburger on desktop */
                @media (min-width: 1024px) {
                    .nav-mobile-toggle { display: none; }
                }

                /* ---------- Backdrop ---------- */
                .nav-drawer-backdrop {
                    position: fixed;
                    inset: 0;
                    z-index: 9998;

                    background: rgba(2, 0, 0, 0.7);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);

                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.35s ease;
                }

                .nav-drawer-backdrop.is-open {
                    opacity: 1;
                    pointer-events: auto;
                }

                /* ---------- Drawer ---------- */
                .nav-drawer {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;

                    width: min(88vw, 380px);
                    z-index: 9999;

                    display: flex;
                    flex-direction: column;

                    padding: 24px 22px 32px;

                    /* Beetroot glass */
                    background:
                        radial-gradient(circle at 80% 20%, rgba(255, 60, 20, 0.15) 0%, transparent 45%),
                        radial-gradient(circle at 20% 80%, rgba(180, 80, 255, 0.12) 0%, transparent 45%),
                        linear-gradient(135deg, rgba(28, 4, 4, 0.96) 0%, rgba(8, 1, 1, 0.98) 100%);

                    border-left: 1px solid rgba(255, 60, 20, 0.35);

                    box-shadow:
                        inset 1px 0 40px rgba(255, 60, 20, 0.08),
                        -30px 0 80px rgba(0, 0, 0, 0.75),
                        -8px 0 40px rgba(255, 40, 10, 0.15);

                    transform: translateX(100%);
                    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);

                    overflow-y: auto;
                    scrollbar-width: none;
                }

                .nav-drawer::-webkit-scrollbar { display: none; }

                .nav-drawer.is-open {
                    transform: translateX(0);
                }

                /* ---------- Drawer head ---------- */
                .nav-drawer-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    padding-bottom: 20px;
                    margin-bottom: 22px;

                    border-bottom: 1px solid rgba(255, 60, 20, 0.2);
                }

                .nav-drawer-title {
                    font-family: "Orbitron", sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.24em;
                    text-transform: uppercase;

                    color: rgba(255, 220, 200, 0.55);

                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .nav-drawer-title::before {
                    content: "";
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #ff4b1f;
                    box-shadow:
                        0 0 10px rgba(255, 75, 31, 0.9),
                        0 0 20px rgba(255, 75, 31, 0.5);
                    animation: dotPulse 1.8s ease-in-out infinite;
                }

                .nav-drawer-close {
                    width: 38px;
                    height: 38px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;
                    border: 1px solid rgba(255, 200, 180, 0.25);
                    background: rgba(0, 0, 0, 0.55);
                    color: rgba(255, 235, 225, 0.9);

                    cursor: pointer;
                    backdrop-filter: blur(8px);
                    transition: all 0.25s ease;
                }

                .nav-drawer-close:hover {
                    background: rgba(255, 60, 20, 0.3);
                    border-color: rgba(255, 120, 60, 0.8);
                    color: #ffffff;
                    transform: rotate(90deg);
                }

                /* ---------- Links ---------- */
                .nav-drawer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .nav-drawer-link {
                    position: relative;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;

                    padding: 14px 16px;

                    text-decoration: none;
                    color: rgba(255, 255, 255, 0.82);

                    font-family: "Orbitron", sans-serif;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;

                    border-radius: 12px;
                    border: 1px solid rgba(255, 60, 20, 0.12);
                    background: rgba(20, 4, 4, 0.35);

                    transition: all 0.3s ease;
                }

                .nav-drawer-link:hover,
                .nav-drawer-link:focus-visible {
                    color: #ffffff;
                    border-color: rgba(255, 90, 40, 0.65);
                    background:
                        linear-gradient(135deg, rgba(60, 10, 5, 0.85) 0%, rgba(20, 4, 4, 0.9) 100%);
                    transform: translateX(-4px);
                    outline: none;

                    box-shadow:
                        inset 0 0 24px rgba(255, 60, 20, 0.14),
                        0 0 24px rgba(255, 60, 20, 0.15);
                }

                .nav-drawer-link .link-index {
                    font-family: "Orbitron", sans-serif;
                    font-size: 9px;
                    letter-spacing: 0.18em;
                    color: rgba(255, 140, 66, 0.55);
                    min-width: 26px;
                }

                .nav-drawer-link .link-label {
                    flex: 1;
                }

                .nav-drawer-link .link-arrow {
                    opacity: 0.4;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }

                .nav-drawer-link:hover .link-arrow {
                    opacity: 1;
                    transform: translateX(3px);
                    color: #ff8c42;
                }

                /* ---------- Drawer footer ---------- */
                .nav-drawer-foot {
                    margin-top: auto;
                    padding-top: 24px;

                    display: flex;
                    flex-direction: column;
                    gap: 12px;

                    border-top: 1px solid rgba(255, 60, 20, 0.15);
                }

                .nav-drawer-foot-label {
                    font-family: "Orbitron", sans-serif;
                    font-size: 9px;
                    letter-spacing: 0.24em;
                    text-transform: uppercase;
                    color: rgba(255, 220, 200, 0.42);
                }

                .nav-drawer-cta {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;

                    padding: 14px 20px;
                    border-radius: 12px;

                    font-family: "Orbitron", sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    text-decoration: none;
                    color: #ffffff;

                    background:
                        linear-gradient(135deg, rgba(255, 80, 32, 0.9) 0%, rgba(180, 20, 10, 0.95) 100%);

                    border: 1px solid rgba(255, 140, 80, 0.6);

                    box-shadow:
                        inset 0 0 24px rgba(255, 200, 180, 0.15),
                        0 6px 24px rgba(255, 40, 10, 0.35);

                    transition: all 0.3s ease;
                }

                .nav-drawer-cta:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        inset 0 0 32px rgba(255, 200, 180, 0.25),
                        0 10px 32px rgba(255, 40, 10, 0.55);
                }

                /* ---------- Desktop uses the original inline nav ---------- */
                @media (min-width: 1024px) {
                    .nav-drawer,
                    .nav-drawer-backdrop {
                        display: none;
                    }
                }
            `}</style>

            <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
                <div className="inner max-w-7xl">

                    {/* ---------- LOGO ---------- */}
                    <a className="logo" href="#hero">
                        <img src="/images/logo.ico" alt="Logo" />
                        <span className="logo-divider" />
                        <span className="logo-text">ARAFAT</span>
                    </a>

                    {/* ---------- DESKTOP NAV ---------- */}
                    <nav className="desktop">
                        <ul>
                            {navLinks.map(({ link, name }) => (
                                <li key={name}>
                                    <a href={link}>
                                        <span>{name}</span>
                                        <span className="underline" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* ---------- CONTACT BUTTON ---------- */}
                    <a href="#contact" className="contact-btn">
                        <div className="inner">
                            <span>Contact Me</span>
                        </div>
                    </a>

                    {/* ---------- MOBILE HAMBURGER ---------- */}
                    <button
                        type="button"
                        className="nav-mobile-toggle"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                    >
                        <MenuIcon />
                    </button>
                </div>
            </header>

            {/* =========================================================
                MOBILE DRAWER
                ========================================================= */}

            {/* Backdrop */}
            <div
                className={`nav-drawer-backdrop ${menuOpen ? "is-open" : ""}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside
                className={`nav-drawer ${menuOpen ? "is-open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                aria-hidden={!menuOpen}
            >
                {/* Head */}
                <div className="nav-drawer-head">
                    <div className="nav-drawer-title">
                        NAVIGATE
                    </div>

                    <button
                        type="button"
                        className="nav-drawer-close"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Links */}
                <ul className="nav-drawer-links">
                    {navLinks.map(({ link, name }, i) => (
                        <li key={name}>
                            <a
                                href={link}
                                className="nav-drawer-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                <span className="link-index">
                                    // {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="link-label">{name}</span>
                                <span className="link-arrow">
                                    <ArrowIcon />
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Footer CTA */}
                <div className="nav-drawer-foot">
                    <div className="nav-drawer-foot-label">
                        // Get in touch
                    </div>

                    <a
                        href="#contact"
                        className="nav-drawer-cta"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact Me
                    </a>
                </div>
            </aside>
        </>
    );
};

export default NavBar;
