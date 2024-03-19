'use client'

import './index.css'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Logo } from '../components/Logo'
import Image from 'next/image'

function App() {
    const [activePhoto, setActivePhoto] = useState<number>(0) // Índice de la foto activa
    const [disabledButton, setDisabledButton] = useState<boolean>(false) // Índice de la foto activa
    const [showOverlay, setShowOverlay] = useState(true)
    const [hoverClass, setHoverClass] = useState<string>('lg:peer-hover/previous:card--to-left lg:peer-hover/next:card--to-right') // Estado para almacenar temporalmente las clases de hover

    const photosData = [
        {
            id: 'first',
            title: 'First Photo',
            img: '/_e351e41b-efe7-4e59-8ce8-91fbbbd0db45.jpeg',
            date: '4 de abril de 2250',
            paragraph:
                'En la actualidad, los viajes espaciales permiten a las personas explorar planetas lejanos.  Imagina a un valiente astronauta al que llamaremos Pylonauta, quien está muy emocionado por descubrir un nuevo mundo llamado Ánfora.  Él parte en su nave espacial, "NEBULÓN", listo para la aventura.',
        },
        {
            id: 'second',
            title: 'Second Photo',
            img: '/_08026eb5-f13f-44f9-8a54-96e796383a0e.jpeg',
            date: '5 de abril de 2250',
            paragraph:
                'El viaje de Pylonauta está lleno de emoción, pero justo cuando se acerca a Ánfora, una tormenta espacial inesperada aparece. La nave es sacudida violentamente y Pylonauta pierde el control.',
        },
        {
            id: 'third',
            title: 'Third Photo',
            img: '/_56f5d894-b46b-4294-81d6-17e64e549f11.jpeg',
            date: '5 de abril de 2250',
            paragraph:
                'Con un estruendo ensordecedor, "NEBULÓN" se estrella contra la superficie del planeta desconocido. Afortunadamente, Pylonauta sale ileso, pero su nave está seriamente dañada y él se encuentra varado en un mundo extraño.',
        },
        {
            id: 'fourth',
            title: 'Fourth Photo',
            img: '/_2cb2a853-5270-4b83-a92d-9c804ad40b48.jpeg',
            date: '5 de abril de 2250',
            paragraph:
                'Decidido a encontrar una solución, Pylonauta comienza a explorar Ánfora y pronto descubre que no está solo. Encuentra unas misteriosas pistas que indican que puede reparar su nave, pero primero debe superar una prueba en el antiguo Templo Alameda del Conocimiento.',
        },
        {
            id: 'fifth',
            title: 'Fifth Photo',
            img: '/_7ff3ae87-8440-4e2e-9599-8262eb0edf5b.jpeg',
            date: '5 de abril de 2250',
            paragraph:
                'Este templo legendario guarda las herramientas necesarias para reparar la nave, pero solo los más valientes y astutos podrán obtenerlas. El Templo Alameda del Conocimiento está lleno de desafíos y enigmas que desafían la mente de Pylonauta.',
        },
        {
            id: 'sixth',
            title: 'Sixth Photo',
            img: '/_eb17826d-286f-4c61-9250-a88dcdea07a8.jpeg',
            date: '5 de abril de 2250',
            paragraph:
                'Sin embargo, con determinación y coraje, él se enfrenta a cada obstáculo con valentía. Está decidido a reparar su nave y regresar a casa, sin importar cuán difíciles sean las pruebas que enfrenta.',
        },
    ]

    // Creamos una constante con la ruta al archivo de audio
    const audioSource = '/historia_epica.mp3'

    // Función para reproducir una parte específica del audio
    function reproducirParte(inicio: number, fin: number) {
        // Creamos un nuevo elemento de audio con la ruta proporcionada
        const audio = new Audio(audioSource)

        // Establecer el tiempo de inicio en segundos
        audio.currentTime = inicio

        // Reproducir el audio
        audio.play()

        // Detener el audio después de la duración especificada
        setTimeout(() => {
            audio.pause()
        }, (fin - inicio) * 1000) // Convertir la duración de la parte a milisegundos
    }

    // Función para avanzar/retroceder la foto
    const nextPhoto = () => {
        handleHoverChange('')
        setDisabledButton(true)
        setActivePhoto((prev) => (prev + 1) % photosData.length)
        console.log(activePhoto)

        if (activePhoto == 0) {
            reproducirParte(21, 36)
        } else if (activePhoto == 1) {
            reproducirParte(35, 51)
        } else if (activePhoto == 2) {
            reproducirParte(51, 67)
        } else if (activePhoto == 3) {
            reproducirParte(67, 82)
        } else if (activePhoto == 4) {
            reproducirParte(82, 99)
        }
    }

    const previousPhoto = () => {
        handleHoverChange('')
        setDisabledButton(true)
        setActivePhoto((prev) => (prev - 1 + photosData.length) % photosData.length)
    }

    // Función para manejar el cambio de clases de hover
    const handleHoverChange = (newClass: string) => {
        setHoverClass(newClass)
        setTimeout(() => {
            setHoverClass('lg:peer-hover/previous:card--to-left lg:peer-hover/next:card--to-right')
            setDisabledButton(false)
        }, 2000) // Duración de la eliminación temporal de las clases de hover
    }

    useEffect(() => {
        // Cuando el componente se monta, ocultar el overlay después de 2 segundos
        const timeout = setTimeout(() => {
            setShowOverlay(false)
        }, 5000)

        // Limpiar el timeout cuando el componente se desmonta para evitar fugas de memoria
        return () => clearTimeout(timeout)
    }, []) // El efecto solo se ejecuta una vez al montar el componente

    return (
        <div className="grid">
            {showOverlay && (
                <div className="overlay flex items-center justify-center">
                    <Image src="/isotipo.webp" alt="Pylos Isotipo" width={80} height={40} priority className="object-contain" />
                    <Logo />
                </div>
            )}

            <div className="lg:grid lg:grid-cols-2 place-items-center flex flex-col items-center justify-center h-screen overflow-hidden bg-blue-500 [grid-area:1/1] [perspective:500px]">
                <div className="peer/previous blob-left group relative bottom-[-16rem] right-[6rem] lg:bottom-0 lg:right-0 lg:flex lg:h-full lg:w-full md:items-center md:pb-0 lg:mr-96">
                    <ActionButton direction="left" text="Foto anterior" onClick={previousPhoto} disabled={disabledButton} />
                </div>
                <div className="peer/next blob-right group relative bottom-[-14.53rem] -right-[6rem] lg:bottom-0 lg:right-0 lg:flex lg:h-full lg:w-full md:items-center md:pb-0 lg:ml-96">
                    <ActionButton direction="right" text="Siguiente foto" onClick={nextPhoto} disabled={disabledButton} />
                </div>

                {/* Renderizamos las fotos */}
                {photosData.map((photo, index) => (
                    <Photo
                        key={index}
                        img={photo.img}
                        date={photo.date}
                        paragraph={photo.paragraph}
                        className={twMerge(
                            '[grid-area:1/1]',
                            activePhoto === index && 'z-10', // La foto activa tiene una elevación z-10 para estar por encima de las demás
                            hoverClass,
                        )}
                        title={photo.title}
                        zIndex={activePhoto === index ? 1 : 0} // Ajustamos el zIndex para controlar la superposición de las fotos
                    />
                ))}
            </div>
        </div>
    )
}

const Photo = ({ className, title, date, img, paragraph, zIndex }: { className?: string; title?: string; date: string; img: string; paragraph: string; zIndex?: number }) => {
    return (
        <div
            style={{ zIndex: zIndex }}
            className={twMerge(
                'pointer-events-none absolute grid aspect-[3/4] w-[65vw] 2xl:w-[22vw] 2xl:h-[90vh] transition-transform duration-1000 [transform-style:preserve-3d] md:w-[30vw]',
                className,
            )}>
            <div className="pointer-events-none rounded-3xl bg-gray-300 [grid-area:1/1] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:translateZ(-5px)] md:-mb-[5px] md:-mt-[5px] md:[transform:translateZ(-10px)]" />
            <div className="pointer-events-none absolute flex h-full w-full flex-col items-start rounded-3xl bg-gray-100 p-8 shadow-2xl [grid-area:1/1]">
                <p className="mb-2 rounded-full bg-blue-400 px-5 py-1 text-xs text-white md:text-sm">{date}</p>

                <picture>
                    <img src={img} alt="" className="rounded-md" />
                </picture>
                {/* {title && <p className="font-medium leading-tight md:text-4xl text-black">{title}</p>} */}

                <p className="text-sm my-6 text-black">{paragraph}</p>
            </div>
            <div className="pointer-events-none rounded-3xl bg-white [grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)]" />
        </div>
    )
}

const ActionButton = ({ onClick, direction, text, disabled }: { onClick?: () => void; direction: 'left' | 'right'; text: string; disabled: boolean }) => (
    <button
        disabled={disabled ? true : undefined}
        onClick={onClick}
        className={twMerge(
            'relative flex w-full items-center justify-center font-bold text-[rgba(0,0,0,.6)] transition-[transform,color] duration-500 focus-visible:text-white group-hover:text-white md:text-4xl',
            direction === 'right' && 'focus-visible:translate-x-36 lg:group-hover:translate-x-36',
            direction === 'left' && 'focus-visible:-translate-x-36 lg:group-hover:-translate-x-36',
        )}>
        <span className={twMerge('button-underline relative block', direction === 'right' && '[--from:-30px] [--to:0px]', direction === 'left' && '[--from:0] [--to:-30px]')}>{text}</span>
    </button>
)

export default App
