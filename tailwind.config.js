export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                popIn: {
                    '0%': {
                        transform: 'scale(0.8)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1'
                    }
                }
            },
            animation: {
                popIn: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }
        },
    },
    plugins: [],
};