"use client";

import { useState } from "react";
import { IconButton } from "@/shared/components/chat/IconButton";

interface ChatInputProps {
    onSend: (message: string) => void;
    onAttach?: () => void;
    onEmoji?: () => void;
    placeholder?: string;
}

export function ChatInput({
    onSend,
    onAttach,
    onEmoji,
    placeholder = "메시지를 입력하세요...",
}: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="py-3 md:py-5 px-4 md:px-7 bg-white border-t-2 border-[#f0edf7]">
            <div className="flex gap-2 md:gap-3 items-center bg-[#faf9fc] border-2 border-indigo-200 rounded-3xl py-2 px-3 pl-3 md:pl-5 transition-all focus-within:border-[#667eea] focus-within:shadow-[0_4px_16px_rgba(102,126,234,0.2)]">
                <IconButton
                    icon="➕"
                    variant="transparent"
                    onClick={onAttach}
                    className="hidden sm:flex"
                />
                <IconButton icon="😊" variant="transparent" onClick={onEmoji} />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border-0 bg-transparent text-[15px] outline-none text-gray-800 placeholder:text-gray-300"
                    placeholder={placeholder}
                />
                <button
                    onClick={handleSend}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] border-0 text-white text-lg cursor-pointer flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(102,126,234,0.3)] hover:scale-110 hover:rotate-[15deg] hover:shadow-[0_6px_20px_rgba(102,126,234,0.4)]"
                >
                    ➤
                </button>
            </div>
        </div>
    );
}
