interface SectionTitleProps {
    title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
    return (
        <div className="text-2xl font-bold text-gray-400 uppercase tracking-wide mb-3 pl-2">
            {title}
        </div>
    );
}

