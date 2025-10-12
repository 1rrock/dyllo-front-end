import localFont from 'next/font/local';
import SsgoiProvider from "@/shared/providers/SsgoiProvider";
import QueryProvider from "@/shared/providers/QueryProvider";
import "./globals.css";

const pretendard = localFont({
    src: '../fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <QueryProvider>
          <SsgoiProvider>{children}</SsgoiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
