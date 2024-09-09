import { CalificacionPylos, ChatEmojis, FeedbackRespuesta, ObjetoNaveReparado, RespuestaPruebaDiagnostica, Usuario } from '@/types/MyTypes'
import { fetcher, getUserDataFromToken } from '@/utils/fetcher'

export async function getProfile(): Promise<Usuario> {
    const userData = await getUserDataFromToken()

    const user = await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${userData?.id}`, 'GET')
    return user
}

export async function updateUsuario(data: Partial<Usuario>): Promise<Response> {
    try {
        const userData = await getUserDataFromToken()

        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${data.id ?? userData?.id}`, 'PATCH', data)
    } catch (error: any) {
        throw new Error('Error al actualizar el usuario: ' + error.message)
    }
}

export async function deleteUsuario(id: string | undefined): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${id}`, 'DELETE')
    } catch (error: any) {
        throw new Error('Error al eliminar el usuario: ' + error.message)
    }
}

export async function saveRespuestaPruebaDiagnostica(data: Partial<RespuestaPruebaDiagnostica>): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar la respuesta: ' + error.message)
    }
}

export async function updateRespuestaPruebaDiagnostica(data: Partial<RespuestaPruebaDiagnostica>): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica/${data.id}`, 'PATCH', data)
    } catch (error: any) {
        throw new Error('Error al actualizar la respuesta: ' + error.message)
    }
}

export async function saveObjetoNaveReparado(data: Partial<ObjetoNaveReparado>): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/objeto-nave-reparado`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el objeto: ' + error.message)
    }
}

export async function saveFeedbackRespuesta(data: Partial<FeedbackRespuesta>): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/feedback-respuesta`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el feedback: ' + error.message)
    }
}

export async function saveCalificacionPylos(data: Partial<CalificacionPylos>): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/calificacion-pylos`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar la calificación: ' + error.message)
    }
}

export async function saveChatEmoji(data: Partial<ChatEmojis>): Promise<ChatEmojis> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/chat-emojis`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el emoji: ' + error.message)
    }
}

export async function updateChatEmoji(data: Partial<ChatEmojis>): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/chat-emojis/${data.id}`, 'PATCH', data)
    } catch (error: any) {
        throw new Error('Error al actualizar el emoji: ' + error.message)
    }
}

export async function restartRespuestaPruebaDiagnostica(data: Partial<Usuario>): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica/${data.id}/restablecer-prueba`, 'DELETE')
    } catch (error: any) {
        throw new Error('Error al restablecer la prueba: ' + error.message)
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

    return await response
}

export const getErrorMessage = (fieldName: string, errors: any[]) => {
    try {
        const error = errors.find((error) => error.property === fieldName)
        return error ? error.errors.map((err: any) => Object.values(err)[0])[0] : null
    } catch (error) {
        console.error('Error parsing JSON:', error)
        return null
    }
}

export const transformErrors = (errors: any[]) => {
    return errors.map((error) => {
        const property = error.property
        const constraints = error.constraints
        const formattedErrors = Object.entries(constraints).map(([key, value]) => ({ [key]: value }))
        return { property, errors: formattedErrors }
    })
}

export const getErrorsForFields = (fields: string[], errors: any[]) => {
    const fieldErrors: { [key: string]: string[] } = {}

    fields.forEach((field) => {
        const fieldError = getErrorMessage(field, errors)
        if (fieldError) {
            fieldErrors[field] = fieldError
        }
    })

    return fieldErrors
}
