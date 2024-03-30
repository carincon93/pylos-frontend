import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokenData } from './utils/getTokenData'
import { isTokenExpired } from './utils/isTokenExpired'
import { EMPEZAR_AVENTURA_ROUTE, REGISTER_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SUBFOLDER_ROUTE } from '@/utils/routes'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value

    const secretKey = process.env.NEXT_PUBLIC_NESTJS_JWT_SECRET || '' // Replace with your actual secret key

    if (accessToken) {
        if (isTokenExpired(accessToken, secretKey)) {
            // Access token has expired, remove the token cookie
            request.cookies.delete('accessToken')
        }
    }

    // Check if the path starts with /juego
    const isJuegoPath = request.nextUrl.pathname.startsWith(SUBFOLDER_ROUTE)

    if (!accessToken && isJuegoPath) {
        // Redirect to login page if no access token exists for paths under /juego
        return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
    }

    if (!accessToken) {
        // Redirect to login page if no access token exists for other paths
        if (
            !request.nextUrl.pathname.startsWith(HOME_ROUTE) &&
            !request.nextUrl.pathname.startsWith(LOGIN_ROUTE) &&
            !request.nextUrl.pathname.startsWith(REGISTER_ROUTE) &&
            !request.nextUrl.pathname.startsWith(EMPEZAR_AVENTURA_ROUTE)
        ) {
            return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
        }
        return
    }

    const tokenData = getTokenData(accessToken)

    if (!tokenData) {
        // Redirect to login page if access token is invalid
        console.error('Token invalid or expired')
        return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.webp$|.*\\.mp3|.*\\.(?:png|jpg|jpeg|gif)$).*)'],
}
