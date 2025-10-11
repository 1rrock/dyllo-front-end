"use client";

interface MobileMenuButtonProps {
    onClick: () => void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
    return (
        <button
            onClick={onClick}
            className="md:hidden w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center hover:bg-indigo-200 transition-all"
            aria-label="메뉴 열기"
        >
            <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
        </button>
    );
}

