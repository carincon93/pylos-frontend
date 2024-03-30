import { Login } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export async function login(data: Login): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/login`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al iniciar sesión: ' + error.message)
    }
}

export async function toAuth(url: string, body: Record<string, any>): Promise<any> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText)
    }

    return await response.json()
}
