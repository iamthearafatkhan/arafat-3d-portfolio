import { useState, useEffect } from "react";

import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Project from "./sections/Project.jsx";
import AnimatedCounter from "./components/AnimatedCounter.jsx";
import BlackHoleLoader from "./components/BlackHoleLoader.jsx";
import NavBar from "./components/NavBar.jsx";
import Education from "./sections/Education.jsx";
import Skills from "./sections/Skills.jsx";
import Certificates from "./sections/Certificates.jsx";
import Footer from "./sections/Footer.jsx";


const App = () => {
    const [loading, setLoading] = useState(true);

    // Lock scroll + prevent interaction with the page while the loader is up
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [loading]);

    return (
        <>
            {loading && (
                <BlackHoleLoader
                    onComplete={() => setLoading(false)}
                />
            )}

            {/*
              `main` is always mounted so the split reveal exposes
              the real page from both sides.

              `aria-hidden` keeps screen readers on the loader until
              the intro finishes.
            */}
            <main aria-hidden={loading}>
                <NavBar />
                <Hero />
                <AnimatedCounter />
                <About />
                <Project />
                <Education/>
                <Skills/>
                <Certificates />
                <Footer />
            </main>
        </>
    );
};

export default App;