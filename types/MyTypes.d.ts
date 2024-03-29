export interface OpcionPruebaDiagnostica {
    id: string
    opcion: string
    preguntaPruebaDiagnosticaId: string
    esOpcionCorrecta: boolean
}

interface PreguntaPruebaDiagnostica {
    id: string
    pregunta: string
    esPreguntaCerrada: boolean
}

interface PreguntaSeguridad {
    id: string
    pregunta: string
}

interface RespuestaPruebaDiagnostica {
    id: string
    respuesta: string
    usuarioId: string
    opcionPruebaDiagnosticaId: string
}

interface Usuario {
    id: string
    nombre: string
    edad: number
    grado: string
    colegio: string
    preguntaSeguridadId: string
    respuestaSeguridad: string
}

interface Login {
    nombre: string
    respuestaSeguridad: string
}
