const Button = ({ text, className = "", id, href = "#counter" }) => {

    const handleClick = (event) => {
        event.preventDefault();

        /* 🔧 FIX: was hardcoded to "counter" — now reads from the href */
        const targetId = href.replace("#", "");
        const target = document.getElementById(targetId);

        if (target) {
            const offset = window.innerHeight * 0.12;

            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }
    };

    return (
        <a
            href={href}
            id={id}
            onClick={handleClick}
            className={`cyber-button animate-[cyberFloat_4.5s_ease-in-out_infinite] ${className}`}
        >
            <span className="cyber-button-glow" />

            <span className="cyber-button-content">
                <span className="cyber-button-text">
                    {text}
                </span>

                <span className="cyber-button-arrow">
                    ↗
                </span>
            </span>

            <span className="cyber-button-line" />
        </a>
    );
};

export default Button;
