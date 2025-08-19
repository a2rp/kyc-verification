
export default function DeleteIcon({ size = 18 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path d="M9 3h6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 6h16" stroke="currentColor" strokeWidth="1.6" />
            <rect
                x="6.5"
                y="6"
                width="11"
                height="14"
                rx="1.6"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path d="M10 10v6M14 10v6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    );
}
