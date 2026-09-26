import { navLinks } from "../constants/index.js";
import { useEffect, useState } from "react";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
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

            </div>
        </header>
    );
};

export default NavBar;