import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokenData } from './utils/getTokenData'
import { verifyAuth } from './utils/isTokenExpired'
import {
    EMPEZAR_AVENTURA_ROUTE,
    REGISTER_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    SUBFOLDER_ROUTE,
    INTRODUCCION_ROUTE,
    PRUEBA_DIAGNOSTICA_ROUTE,
    MUNDOS_ROUTE,
    RESULTADOS_ROUTE,
    ANFORA_ROUTE,
} from '@/utils/routes'
import { getProfile } from './lib/actions'

const guestRoutes = [HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, EMPEZAR_AVENTURA_ROUTE]

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

    const path = request.nextUrl.pathname

    // Check if the path starts with /juego
    const isJuegoPath = request.nextUrl.pathname.startsWith(SUBFOLDER_ROUTE)

    if (!verifiedToken && isJuegoPath) {
        // Redirect to login page if no access token exists for paths under /juego
        return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
    }

    if (accessToken) {
        const tokenData = getTokenData(accessToken)

        if (!tokenData) {
            console.error('Token invalid or expired')
            return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
        }

        const profile = await getProfile()

        if (profile) {
            // Verificar prueba diagnóstica
            if (!profile.pruebaDiagnosticaCompleta && path !== PRUEBA_DIAGNOSTICA_ROUTE) {
                return NextResponse.redirect(new URL(PRUEBA_DIAGNOSTICA_ROUTE, request.url))
            }

            // Verificar introducción
            if (!profile.introduccionCompleta && path !== INTRODUCCION_ROUTE && profile.pruebaDiagnosticaCompleta) {
                return NextResponse.redirect(new URL(INTRODUCCION_ROUTE, request.url))
            }

            // Redirigir a ANFORA_ROUTE o MUNDOS_ROUTE si el usuario está autenticado y en una ruta restringida
            if (guestRoutes.some((route) => path.startsWith(route))) {
                if (path !== PRUEBA_DIAGNOSTICA_ROUTE && path !== INTRODUCCION_ROUTE && path !== MUNDOS_ROUTE && path !== ANFORA_ROUTE && path !== RESULTADOS_ROUTE) {
                    return NextResponse.redirect(new URL(PRUEBA_DIAGNOSTICA_ROUTE, request.url))
                }
            }
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.bin$|.*\\.gltf$|.*\\.glb$|.*\\.webp$|.*\\.mp3$|.*\\.mp4$|.*\\.ttf$|.*\\.json|.*\\.(?:png|ico|jpg|jpeg|gif|svg)$).*)'],
}
