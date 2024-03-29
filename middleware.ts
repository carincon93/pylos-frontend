import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokenData } from './utils/getTokenData'
import { isTokenExpired } from './utils/isTokenExpired'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value

    const secretKey = process.env.NEXT_PUBLIC_NESTJS_JWT_SECRET || '' // Replace with your actual secret key

    if (accessToken) {
        if (isTokenExpired(accessToken, secretKey)) {
            // Access token has expired, remove the token cookie
            request.cookies.delete('accessToken')
        }
    }

    if (!accessToken) {
        // Redirect to login page if no access token exists
        if (!request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/registro') && !request.nextUrl.pathname.startsWith('/empezar-aventura')) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return
    }

    const tokenData = getTokenData(accessToken)

    if (!tokenData) {
        // Redirect to login page if access token is invalid
        console.error('Token invalid or expired')
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Redirect to /introduccion if access token exists and user is not already on /introduccion page
    if (!request.nextUrl.pathname.startsWith('/introduccion')) {
        return NextResponse.redirect(new URL('/introduccion', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.webp$|.*\\.mp3|.*\\.(?:png|jpg|jpeg|gif)$).*)'],
}
