'use client'

import { useForm } from '@/hooks/useForm'
import { getErrorsForFields, toAuth, transformErrors } from '@/lib/actions'
import { Mascota, Usuario } from '@/types/MyTypes'
import { useRouter } from 'next/navigation'
import { PRUEBA_DIAGNOSTICA_ROUTE } from '@/utils/routes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetcher } from '@/utils/fetcher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useSWR from 'swr'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Loading } from '@/components/ui/loading'

export default function RegistroPage() {
    const { data: mascotas } = useSWR<Mascota[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/mascota`, fetcher)
    const { formData, handleChange } = useForm<Partial<Usuario>>({})
    const [errors, setErrors] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const fields = ['nombre', 'nombreUsuario', 'edad', 'grado', 'mascotaId', 'mascotaNombre']
    const fieldErrors = getErrorsForFields(fields, errors)

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() // Evita que el formulario se envíe automáticamente
        setLoading(true)

        try {
            const response = await toAuth(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/register`, formData)

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

                router.push(PRUEBA_DIAGNOSTICA_ROUTE)
            } else {
                throw new Error('No se recibió un token en la respuesta')
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            // Manejar errores si es necesario
        }

        setLoading(false)
    }

    return (
        <>
            <div className="lg:max-w-5xl w-full mx-auto text-left lg:mt-0 grow flex flex-col items-center justify-center gap-y-10 relative">
                <form
                    className="flex flex-col gap-y-6 w-9/12 sm:w-5/12"
                    onSubmit={handleSubmit}>
                    <div>
                        <Input
                            type="text"
                            placeholder="Nombre del alumno"
                            className="py-4 px-8 text-center"
                            onChange={(event) => handleChange('nombre', event.target.value)}
                            required
                        />
                        {fieldErrors['nombre'] && <small className="text-red-500">{fieldErrors['nombre']}</small>}
                    </div>

                    <div>
                        <Input
                            type="text"
                            placeholder="Nombre del personaje"
                            className="py-4 px-8 text-center"
                            onChange={(event) => handleChange('nombreUsuario', event.target.value)}
                            required
                        />
                        {fieldErrors['nombreUsuario'] && <small className="text-red-500">{fieldErrors['nombreUsuario']}</small>}
                    </div>

                    <Input
                        type="number"
                        placeholder="Edad"
                        className="py-4 px-8 text-center"
                        min="1"
                        onChange={(event) => handleChange('edad', event.target.value)}
                        required
                    />
                    {fieldErrors['edad'] && <small className="text-red-500">{fieldErrors['edad']}</small>}

                    <div>
                        <Select
                            name="grado"
                            onValueChange={(value) => handleChange('grado', value)}
                            required>
                            <SelectTrigger className="uppercase">
                                <SelectValue placeholder="Grado" />
                            </SelectTrigger>
                            <SelectContent className="uppercase">
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                        </Select>
                        {fieldErrors['grado'] && <small className="text-red-500">{fieldErrors['grado']}</small>}
                    </div>

                    <div>
                        <Input
                            type="text"
                            placeholder="Colegio"
                            className="py-4 px-8 text-center"
                            onChange={(event) => handleChange('colegio', event.target.value)}
                            required
                        />
                        {fieldErrors['colegio'] && <small className="text-red-500">{fieldErrors['colegio']}</small>}
                    </div>

                    <div>
                        <Label className="my-4 text-center block text-white uppercase">Seleccione un acompañante</Label>
                        <RadioGroup
                            onValueChange={(value) => handleChange('mascotaId', value)}
                            required>
                            <div className="flex items-center justify-center gap-4">
                                {mascotas?.map((mascota: Mascota, index: number) => (
                                    <div
                                        key={mascota.id}
                                        className="flex flex-col-reverse items-center gap-2">
                                        <RadioGroupItem
                                            className="hover:opacity-80"
                                            value={mascota.id}
                                            id={mascota.id}
                                        />
                                        <Label
                                            htmlFor={mascota.id}
                                            className="hover:cursor-pointer hover:opacity-60">
                                            <Avatar className="size-20">
                                                <AvatarImage src={`${process.env.NEXT_PUBLIC_NESTJS_ASSETS}/${mascota.foto}`} />
                                                <AvatarFallback>MASCOTA</AvatarFallback>
                                            </Avatar>
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                        {fieldErrors['mascotaId'] && <small className="text-red-500">{fieldErrors['mascotaId']}</small>}
                    </div>

                    <div>
                        <Input
                            type="text"
                            placeholder="Nombre del acompañante"
                            className="py-4 px-8 text-center"
                            onChange={(event) => handleChange('mascotaNombre', event.target.value)}
                            required
                        />
                        {fieldErrors['mascotaNombre'] && <small className="text-red-500">{fieldErrors['mascotaNombre']}</small>}
                    </div>

                    <Button className="uppercase">
                        {loading && <Loading className="!w-4 mr-2" />}
                        Registrarse
                    </Button>
                </form>
            </div>
        </>
    )
}
