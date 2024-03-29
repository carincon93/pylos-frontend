import { Login } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export async function login(data: Login): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/login`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al iniciar sesión: ' + error.message)
    }
}
