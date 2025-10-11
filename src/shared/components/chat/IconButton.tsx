import { cn } from "@/shared/lib/utils";

interface IconButtonProps {
    icon: string;
    onClick?: () => void;
    variant?: "default" | "transparent";
    className?: string;
}

export function IconButton({
    icon,
    onClick,
    variant = "default",
    className,
}: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-10 h-10 rounded-full border-0 cursor-pointer flex items-center justify-center text-lg transition-all",
                variant === "default"
                    ? "bg-purple-50 hover:bg-indigo-200 hover:scale-110"
                    : "w-9 h-9 bg-transparent hover:bg-indigo-200",
                className
            )}
        >
            {icon}
        </button>
    );
}

