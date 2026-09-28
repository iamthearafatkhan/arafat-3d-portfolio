import { useState, useEffect } from "react";

import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Project from "./sections/Project.jsx";
import Education from "./sections/Education.jsx";
import Skills from "./sections/Skills.jsx";
import Certificates from "./sections/Certificates.jsx";
import Footer from "./sections/Footer.jsx";
import AnimatedCounter from "./components/AnimatedCounter.jsx";
import BlackHoleLoader from "./components/BlackHoleLoader.jsx";
import NavBar from "./components/NavBar.jsx";
import CometCursor from "./components/CometCursor.jsx";

const App = () => {
    /* Always show the intro on every page load */
    const [loading, setLoading] = useState(true);

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

    const handleComplete = () => {
        setLoading(false);
    };

    return (
        <>
            <CometCursor />

            {loading && <BlackHoleLoader onComplete={handleComplete} />}

            <main aria-hidden={loading}>
                <NavBar />
                <Hero />
                <AnimatedCounter />
                <About />
                <Project />
                <Education />
                <Skills />
                <Certificates />
                <Footer />
            </main>
        </>
    );
};

export default App;
