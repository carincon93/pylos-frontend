import { Metadata } from 'next'
import LoginForm from './_form'

export const metadata: Metadata = {
    title: 'Iniciar sesión',
}

export default function LoginPage() {
    return (
        <>
            <div className="lg:max-w-5xl w-full mx-auto text-left lg:mt-0 grow flex flex-col items-center justify-center gap-y-10 relative">
                <h1 className="text-6xl text-center font-medium font-edu">Ingresar</h1>
                <LoginForm />
            </div>
        </>
    )
}
