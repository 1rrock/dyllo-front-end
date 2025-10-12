import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // 로그인 체크: refreshToken 쿠키가 없으면 /login으로 리다이렉트
    const refreshToken = request.cookies.get('refreshToken');
    console.log(refreshToken)
    // if (!refreshToken && pathname !== '/login' && pathname !== '/join') {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
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
