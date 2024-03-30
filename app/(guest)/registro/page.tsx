'use client'

import { useForm } from '@/hooks/useForm'
import { toAuth } from '@/lib/actions'
import { PreguntaSeguridad, Usuario } from '@/types/MyTypes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { INTRODUCCION_ROUTE } from '@/utils/routes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegistroPage() {
    const { formData, handleChange } = useForm<Partial<Usuario>>({})
    const { data: preguntasSeguridad } = useSWR<PreguntaSeguridad[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/pregunta-seguridad`, fetcher)

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() // Evita que el formulario se envíe automáticamente

        try {
            const data = await toAuth(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/register`, formData)
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

                router.push(INTRODUCCION_ROUTE)
            } else {
                throw new Error('No se recibió un token en la respuesta')
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            // Manejar errores si es necesario
        }
    }

    return (
        <>
            <div className="lg:max-w-5xl w-full mx-auto text-left mt-20 lg:mt-0 grow flex flex-col items-center justify-center gap-y-10 relative mb-20">
                <form
                    className="flex flex-col gap-y-6 w-5/12"
                    onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Nombre"
                        className="py-4 px-8 text-center"
                        onChange={(event) => handleChange('nombre', event.target.value)}
                        required
                    />
                    <Input
                        type="number"
                        placeholder="Edad"
                        className="py-4 px-8 text-center"
                        min="1"
                        onChange={(event) => handleChange('edad', event.target.value)}
                        required
                    />

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

                    <Input
                        type="text"
                        placeholder="Colegio"
                        className="py-4 px-8 text-center"
                        onChange={(event) => handleChange('colegio', event.target.value)}
                        required
                    />

                    <Select
                        name="preguntaSeguridadId"
                        onValueChange={(value) => handleChange('preguntaSeguridadId', value)}
                        required>
                        <SelectTrigger className="uppercase">
                            <SelectValue placeholder="Pregunta de seguridad" />
                        </SelectTrigger>
                        <SelectContent className="uppercase">
                            {preguntasSeguridad?.map((preguntaSeguridad: PreguntaSeguridad, index: number) => (
                                <SelectItem
                                    key={preguntaSeguridad.id}
                                    value={preguntaSeguridad.id}>
                                    {preguntaSeguridad.pregunta}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        type="text"
                        placeholder="Respuesta"
                        className="py-4 px-8 text-center"
                        onChange={(event) => handleChange('respuestaSeguridad', event.target.value)}
                        required
                    />

                    <Button>Registrarse</Button>
                </form>
            </div>

            <div>
                <Image
                    src="/anfora.webp"
                    alt="Planeta Ánfora"
                    width={240}
                    height={40}
                    className="object-contain absolute md:bottom-40 md:left-[20%] 2xl:bottom-40 2xl:left-[30%] -z-[1]"
                />
                <Image
                    src="/planeta2.webp"
                    alt=""
                    width={240}
                    height={40}
                    className="object-contain absolute md:top-16 md:right-[25%] 2xl:top-32 2xl:right-[38%] -z-[1]"
                />
                <Image
                    src="/planeta3.webp"
                    alt=""
                    width={240}
                    height={40}
                    className="object-contain absolute md:bottom-60 md:right-[18%] 2xl:bottom-60 2xl:right-[30%] -z-[1]"
                />
                <Image
                    src="/planeta4.webp"
                    alt=""
                    width={240}
                    height={40}
                    className="object-contain absolute md:bottom-10 md:left-[41%] 2xl:bottom-10 2xl:left-[45%] -z-[1]"
                />
                <Image
                    src="/planeta5.webp"
                    alt=""
                    width={240}
                    height={40}
                    className="object-contain absolute md:top-12 md:left-[22%] 2xl:top-40 2xl:left-[30%] -z-[1]"
                />
            </div>
        </>
    )
}
