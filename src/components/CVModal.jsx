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

/* =========================================================
   CV MODAL
   ========================================================= */

const CV_PATH = "/images/Md-Arafat-Hossen-Rabby-CV.pdf";
const CV_FILENAME = "Md-Arafat-Hossen-Rabby-CV.pdf";

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

    /* ---------- DOWNLOAD HANDLER ----------
       Fetches the PDF as a Blob, then triggers a download
       with the exact filename we want. This bypasses the
       browser's inline-PDF-viewer interception that ignores
       the `download` attribute on PDF links. */
    const handleDownload = async () => {
        try {
            const response = await fetch(CV_PATH);

            if (!response.ok) {
                throw new Error(`Failed to fetch CV (${response.status})`);
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = CV_FILENAME;

            document.body.appendChild(link);
            link.click();
            link.remove();

            /* Free the Blob URL after the download starts */
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } catch (err) {
            console.error("CV download failed:", err);

            /* Fallback: open in a new tab so the user can save manually */
            window.open(CV_PATH, "_blank", "noopener,noreferrer");
        }
    };

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
                <span className="cv-modal-swirl" aria-hidden="true" />

                <button
                    type="button"
                    className="cv-modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <CloseIcon />
                </button>

                <div className="cv-modal-head">
                    <div className="cv-modal-head-left">
                        <span className="cv-modal-dot" />
                        <span>ARAFAT KHAN · CV</span>
                    </div>

                    {/* 🔧 Download is now a BUTTON, not an anchor.
                        It triggers a JS handler that fetches the PDF
                        as a Blob and saves it with the exact filename. */}
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="cv-modal-download"
                        aria-label={`Download ${CV_FILENAME}`}
                    >
                        <span className="cv-modal-download-ring" aria-hidden="true" />
                        <span className="cv-modal-download-inner">
                            <DownloadIcon />
                            <span>Download</span>
                        </span>
                    </button>
                </div>

                <div className="cv-modal-viewer">
                    <iframe
                        src={`${CV_PATH}#toolbar=0&navpanes=0`}
                        title="Arafat Khan CV"
                    />
                </div>
            </div>
        </div>
    );
};

export default CVModal;
