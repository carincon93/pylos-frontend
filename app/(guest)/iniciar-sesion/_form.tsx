'use client'

import { useForm } from '@/hooks/useForm'
import { getErrorsForFields, transformErrors } from '@/lib/actions'
import { Login } from '@/types/MyTypes'
import { useRouter } from 'next/navigation'
import { PRUEBA_DIAGNOSTICA_ROUTE } from '@/utils/routes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Loading } from '@/components/ui/loading'

export default function LoginForm() {
    const { formData, handleChange } = useForm<Partial<Login>>({})
    const [errors, setErrors] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const fields = ['nombre', 'nombreUsuario', 'edad', 'grado', 'mascotaId', 'mascotaNombre']
    const fieldErrors = getErrorsForFields(fields, errors)

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errorData = await response.json()

                if (errorData.errors) {
                    setErrors(transformErrors(errorData.errors))
                } else {
                    toast({ title: '❌ Error', description: errorData.message })
                    throw new Error(errorData.message)
                }
                return
            }

            const data = await response.json()
            const token = data.token

            if (token) {
                const cookieOptions = {
                    domain: process.env.NEXT_PUBLIC_DOMAIN,
                    secure: true,
                    httpOnly: true,
                    maxAge: 24 * 60 * 60,
                }

                const cookieString = `accessToken=${token}; domain=${cookieOptions.domain}; maxAge=${cookieOptions.maxAge}; secure;`
                document.cookie = cookieString

                // Redirigir al usuario a la página deseada después del inicio de sesión
                router.push(PRUEBA_DIAGNOSTICA_ROUTE)
            } else {
                throw new Error('No se recibió un token en la respuesta')
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            // Manejar errores si es necesario
        }

        setTimeout(() => {
            setLoading(false)
        }, 3500)
    }

    return (
        <form
            className="flex flex-col gap-y-6 w-9/12 sm:w-5/12"
            onSubmit={handleSubmit}>
            <div>
                <Input
                    type="text"
                    placeholder="Nombre del personaje"
                    className="uppercase py-4 px-8 rounded-full text-center font-semibold text-black"
                    onChange={(event) => handleChange('nombreUsuario', event.target.value)}
                    required
                />
                {fieldErrors['nombreUsuario'] && <small className="text-red-500">{fieldErrors['nombreUsuario']}</small>}
            </div>

            <div>
                <Input
                    type="text"
                    placeholder="Nombre del acompañante"
                    className="uppercase py-4 px-8 rounded-full text-center font-semibold text-black"
                    onChange={(event) => handleChange('mascotaNombre', event.target.value)}
                    required
                />
                {fieldErrors['mascotaNombre'] && <small className="text-red-500">{fieldErrors['mascotaNombre']}</small>}
            </div>

            <Button
                className="uppercase"
                disabled={loading}>
                {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
        </form>
    )
}
