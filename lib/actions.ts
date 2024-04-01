import { RespuestaPruebaDiagnostica } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export async function saveRespuestaPruebaDiagnostica(data: Partial<RespuestaPruebaDiagnostica>): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar la respuesta: ' + error.message)
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

// Función para reproducir una parte específica del audio
export const reproducirParte = (inicio: number, fin: number, audioSource: string) => {
    // Creamos un nuevo elemento de audio con la ruta proporcionada
    const audio = new Audio(audioSource)
    audio.pause()

    // Establecer el tiempo de inicio en segundos
    audio.currentTime = inicio

    // Reproducir el audio
    audio.play()

    // Detener el audio después de la duración especificada
    setTimeout(() => {
        audio.pause()
    }, (fin - inicio) * 1000) // Convertir la duración de la parte a milisegundos
}
