interface DateDividerProps {
    date: string;
}

export function DateDivider({ date }: DateDividerProps) {
    return (
        <div className="text-center my-8">
            <span className="inline-block py-1.5 px-4 bg-white rounded-[20px] text-xs text-gray-400 font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                {date}
            </span>
        </div>
    );
}

