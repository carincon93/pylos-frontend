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
    opcionPruebaDiagnostica: OpcionPruebaDiagnostica[]
}

interface Mascota {
    id: string
    mascota: string
    foto: string
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
    nombreUsuario: string
    edad: number
    grado: string
    colegio: string
    mascotaId: string
    mascotaNombre: string
}

interface Login {
    nombreUsuario: string
    mascotaNombre: string
}
