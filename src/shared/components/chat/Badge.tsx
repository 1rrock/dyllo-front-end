interface BadgeProps {
    count: number;
    className?: string;
}

export function Badge({ count, className }: BadgeProps) {
    if (count === 0) return null;

    return (
        <div className={`w-6 h-6 bg-[#764ba2] text-white rounded-full flex items-center justify-center text-[11px] font-bold ${className || ""}`}>
            {count > 99 ? "99+" : count}
        </div>
    );
}

