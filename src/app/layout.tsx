import SsgoiProvider from "@/shared/providers/SsgoiProvider";
import QueryProvider from "@/shared/providers/QueryProvider";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <body>
        <QueryProvider>
            <SsgoiProvider>{children}</SsgoiProvider>
        </QueryProvider>
        </body>
        </html>
    );
}
