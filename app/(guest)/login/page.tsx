'use client'

import { Button } from '@/app/components/Button'
import { Login } from '@/types/MyTypes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
    const [formData, setFormData] = useState<Partial<Login>>()
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() // Evita que el formulario se envíe automáticamente

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Error al iniciar sesión: ' + response.statusText)
            }

            const data = await response.json()
            const token = data.token // Suponiendo que el token está en la propiedad 'token'

            if (token) {
                const cookieOptions = {
                    domain: process.env.NEXT_PUBLIC_DOMAIN, // Replace with your actual domain
                    secure: true, // Ensure cookie is only sent over HTTPS
                    httpOnly: true, // Cookie cannot be accessed via client-side JavaScript
                    maxAge: 24 * 60 * 60,
                }

                // Construct cookie string
                const cookieString = `accessToken=${token}; domain=${cookieOptions.domain}; maxAge=${cookieOptions.maxAge}; secure;`

                // Set the cookie
                document.cookie = cookieString

                // Redireccionar al panel principal
                router.push('/introduccion')
            } else {
                // Si no se recibió un token en la respuesta, manejar el error
                throw new Error('No se recibió un token en la respuesta')
            }
        } catch (error: any) {
            console.error('Error al iniciar sesión:', error?.message)
            // Manejar errores si es necesario
        }
    }

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <>
            <div className="lg:max-w-5xl w-full mx-auto text-left mt-20 lg:mt-0 grow flex flex-col items-center justify-center gap-y-10 relative mb-20">
                <form className="flex flex-col gap-y-6 w-5/12" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="uppercase py-4 px-8 rounded-full text-center font-semibold text-black"
                        onChange={(event) => handleChange('nombre', event.target.value)}
                        required
                    />
                    <input type="text" placeholder="¿Cuál es tu animal favorito?" className="uppercase py-4 px-8 rounded-full text-center font-semibold text-black" disabled readOnly />
                    <input
                        type="text"
                        placeholder="Respuesta"
                        className="uppercase py-4 px-8 rounded-full text-center font-semibold text-black"
                        onChange={(event) => handleChange('respuestaSeguridad', event.target.value)}
                        required
                    />

                    <Button>Ingresar</Button>
                </form>
            </div>

            <div>
                <Image src="/anfora.webp" alt="Planeta Ánfora" width={240} height={40} className="object-contain absolute md:bottom-40 md:left-[20%] 2xl:bottom-40 2xl:left-[30%] -z-[1]" />
                <Image src="/planeta2.webp" alt="" width={240} height={40} className="object-contain absolute md:top-16 md:right-[25%] 2xl:top-32 2xl:right-[38%] -z-[1]" />
                <Image src="/planeta3.webp" alt="" width={240} height={40} className="object-contain absolute md:bottom-60 md:right-[18%] 2xl:bottom-60 2xl:right-[30%] -z-[1]" />
                <Image src="/planeta4.webp" alt="" width={240} height={40} className="object-contain absolute md:bottom-10 md:left-[41%] 2xl:bottom-10 2xl:left-[45%] -z-[1]" />
                <Image src="/planeta5.webp" alt="" width={240} height={40} className="object-contain absolute md:top-12 md:left-[22%] 2xl:top-40 2xl:left-[30%] -z-[1]" />
            </div>
        </>
    )
}
