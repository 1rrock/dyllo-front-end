interface SectionTitleProps {
    title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
    return (
        <div className="text-2xl font-bold text-gray-400 uppercase tracking-wide">
            {title}
        </div>
    );
}

