import { cn } from "@/shared/lib/utils";

interface AvatarProps {
    size?: "sm" | "md" | "lg";
    name: string;
    emoji?: string;
    className?: string;
}

const sizeClasses = {
    sm: "w-9 h-9 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-14 h-14 text-2xl",
};

export function Avatar({ size = "md", name, emoji, className }: AvatarProps) {
    const displayText = emoji || name?.charAt(0);

    return (
        <div
            className={cn(
                "rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold shrink-0",
                sizeClasses[size],
                size === "lg" && "bg-white text-[#764ba2] shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
                className
            )}
        >
            {displayText}
        </div>
    );
}

