import { useEffect } from "react";

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
);

const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const CVModal = ({ onClose }) => {
    /* Lock body scroll */
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    /* Close on Escape */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div
            className="cv-modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Arafat Khan CV"
        >
            <div
                className="cv-modal"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Galaxy swirl behind the modal */}
                <span className="cv-modal-swirl" aria-hidden="true" />

                {/* Close */}
                <button
                    type="button"
                    className="cv-modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <CloseIcon />
                </button>

                {/* Header strip */}
                <div className="cv-modal-head">
                    <div className="cv-modal-head-left">
                        <span className="cv-modal-dot" />
                        <span>ARAFAT KHAN · CV</span>
                    </div>

                    <a
                        href="/arafat-cv.pdf"
                        download="Arafat-Khan-CV.pdf"
                        className="cv-modal-download"
                    >
                        <span className="cv-modal-download-ring" aria-hidden="true" />
                        <span className="cv-modal-download-inner">
                            <DownloadIcon />
                            <span>Download</span>
                        </span>
                    </a>
                </div>

                {/* PDF viewer */}
                <div className="cv-modal-viewer">
                    <iframe
                        src="images/Arafat-CV.pdf#toolbar=0&navpanes=0"
                        title="Arafat Khan CV"
                    />
                </div>
            </div>
        </div>
    );
};

export default CVModal;