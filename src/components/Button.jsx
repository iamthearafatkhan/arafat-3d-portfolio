const Button = ({ text, className = "", id }) => {

    const handleClick = (event) => {
        event.preventDefault();

        const target = document.getElementById("counter");

        if (target && id) {

            const offset =
                window.innerHeight * 0.12;

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
            href="#counter"
            id={id}
            onClick={handleClick}
            className={`cyber-button ${className}`}
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