import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokenData } from './utils/getTokenData'
import { verifyAuth } from './utils/isTokenExpired'
import { EMPEZAR_AVENTURA_ROUTE, REGISTER_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SUBFOLDER_ROUTE, INTRODUCCION_ROUTE, PRUEBA_DIAGNOSTICA_ROUTE } from '@/utils/routes'

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value

    const verifiedToken =
        accessToken &&
        (await verifyAuth(accessToken).catch((err) => {
            console.log(err)
        }))

    if (!verifiedToken) {
        request.cookies.delete('accessToken')
    }

    // Check if the path starts with /juego
    const isJuegoPath = request.nextUrl.pathname.startsWith(SUBFOLDER_ROUTE)

    if (!verifiedToken && isJuegoPath) {
        // Redirect to login page if no access token exists for paths under /juego
        return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
    }

    if (!verifiedToken) {
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

    // Redirect to PRUEBA_DIAGNOSTICA_ROUTE if access token exists and user is not already on PRUEBA_DIAGNOSTICA_ROUTE page
    if (!request.nextUrl.pathname.startsWith(SUBFOLDER_ROUTE)) {
        return NextResponse.redirect(new URL(PRUEBA_DIAGNOSTICA_ROUTE, request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.bin$|.*\\.gltf$|.*\\.glb$|.*\\.webp$|.*\\.mp3|.*\\.mp4|.*\\.ttf|.*\\.json|.*\\.(?:png|ico|jpg|jpeg|gif|svg)$).*)'],
}
