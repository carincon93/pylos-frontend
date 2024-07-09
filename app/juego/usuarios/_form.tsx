'use client'

import { useForm } from '@/hooks/useForm'
import { getErrorsForFields, transformErrors, updateUsuario } from '@/lib/actions'
import { Usuario } from '@/types/MyTypes'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { mutate } from 'swr'

interface UsuarioFormProps {
    usuario: Partial<Usuario> | undefined
    setDialogStatus: (status: boolean) => void
    className?: string
}

export default function UsuarioForm({ usuario, setDialogStatus, className }: UsuarioFormProps) {
    const { formData, handleChange } = useForm<Partial<Usuario>>({})
    const [errors, setErrors] = useState<any[]>([])
    const fields = ['nombre', 'nombreUsuario', 'edad', 'grado', 'mascotaId', 'mascotaNombre']
    const fieldErrors = getErrorsForFields(fields, errors)

    useEffect(() => {
        handleChange('id', usuario?.usuarioId)
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await updateUsuario(formData)
        } catch (error) {
            console.error('Error al actualizar el usuario:', error)
        } finally {
            mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/respuesta-prueba-diagnostica/obtener/tabla-de-posiciones`)
        }

        setDialogStatus(false)
    }

    return (
        <form
            className={`${className ? className : ''} flex flex-col gap-y-6`}
            onSubmit={handleSubmit}
            id="editar-usuario">
            <div>
                <Input
                    type="text"
                    placeholder="Actualizar nombre del alumno"
                    className="py-4 px-8 text-center"
                    onChange={(event) => handleChange('nombre', event.target.value)}
                />
                {fieldErrors['nombre'] && <small className="text-red-500">{fieldErrors['nombre']}</small>}
            </div>
            <div>
                <Input
                    type="text"
                    placeholder="Actualizar nombre del personaje"
                    className="py-4 px-8 text-center"
                    onChange={(event) => handleChange('nombreUsuario', event.target.value)}
                />
                {fieldErrors['nombreUsuario'] && <small className="text-red-500">{fieldErrors['nombreUsuario']}</small>}
            </div>

            <div>
                <Input
                    type="text"
                    placeholder="Actualizar nombre del acompañante"
                    className="py-4 px-8 text-center"
                    onChange={(event) => handleChange('mascotaNombre', event.target.value)}
                />
                {fieldErrors['mascotaNombre'] && <small className="text-red-500">{fieldErrors['mascotaNombre']}</small>}
            </div>

            {/* <Button disabled={loading}>Guardar</Button> */}
        </form>
    )
}
