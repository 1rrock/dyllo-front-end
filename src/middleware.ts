import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('auth_token')?.value;
    const { pathname } = request.nextUrl;

    // // 로그인 페이지 접근 시
    // if (pathname === '/login') {
    //     // 이미 인증된 경우 메인으로 리다이렉트
    //     if (authToken) {
    //         return NextResponse.redirect(new URL('/', request.url));
    //     }
    //     return NextResponse.next();
    // }
    //
    // // 보호된 페이지 접근 시 (/ 등)
    // if (!authToken) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
    //
    // return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - assets (public assets like images, icons, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
};
