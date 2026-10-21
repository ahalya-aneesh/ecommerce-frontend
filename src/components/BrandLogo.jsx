import { Link } from "react-router-dom";

function BrandLogo({ className = "", showTagline = true }) {
    return (
        <Link to="/" className={`brand-logo ${className}`} aria-label="Kairo home">
            <svg
                className="brand-mark"
                viewBox="0 0 40 40"
                role="img"
                aria-label="Kairo geometric K"
            >
                <rect width="40" height="40" rx="10" fill="#0f172a" />
                <path
                    d="M10 8h6v24h-6zM19 20 30 8h7L25 20l12 12h-7z"
                    fill="#cbd5e1"
                />
            </svg>
            <span className="brand-copy">
                <span className="brand-name">Kairo</span>
                {showTagline && (
                    <span className="brand-tagline">Everything you need, in one place.</span>
                )}
            </span>
        </Link>
    );
}

export default BrandLogo;
