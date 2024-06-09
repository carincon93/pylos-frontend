'use client'

import './index.css'
import { Button } from '@/components/ui/button'
// import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { updateUsuario } from '@/lib/actions'
import { MUNDOS_ROUTE } from '@/utils/routes'
import { Usuario } from '@/types/MyTypes'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { useContextData } from '@/app/context/AppContext'
import React, { useEffect, useRef, useState } from 'react'

export default function HistoriaEpica() {
    // const { playAudio, isPlaying } = useAudioPlayer()

    const [activePhoto, setActivePhoto] = useState<number>(0)
    // const [showOverlay, setShowOverlay] = useState(true)
    const [hoverClass, setHoverClass] = useState<string>('lg:peer-hover/previous:card--to-left lg:peer-hover/next:card--to-right')
    const [videoStatus, setVideoStatus] = useState(false)

    const router = useRouter()
    const { profileUserData } = useContextData()

    useEffect(() => {
        if (profileUserData && profileUserData.introduccionCompleta) {
            router.push(MUNDOS_ROUTE)
        }
    }, [profileUserData])

    const photosData = [
        { id: 'first', title: 'First Photo', img: '/_e351e41b-efe7-4e59-8ce8-91fbbbd0db45.jpeg', date: '4 de abril de 2250' },
        { id: 'second', title: 'Second Photo', img: '/_08026eb5-f13f-44f9-8a54-96e796383a0e.jpeg', date: '4 de abril de 2250' },
        { id: 'third', title: 'Third Photo', img: '/_56f5d894-b46b-4294-81d6-17e64e549f11.jpeg', date: '4 de abril de 2250' },
        { id: 'fourth', title: 'Fourth Photo', img: '/_2cb2a853-5270-4b83-a92d-9c804ad40b48.jpeg', date: '4 de abril de 2250' },
        { id: 'fifth', title: 'Fifth Photo', img: '/_7ff3ae87-8440-4e2e-9599-8262eb0edf5b.jpeg', date: '4 de abril de 2250' },
        { id: 'sixth', title: 'Sixth Photo', img: '/_eb17826d-286f-4c61-9250-a88dcdea07a8.jpeg', date: '4 de abril de 2250' },
    ]

    // const audioBienvenida = '/bienvenida.mp3'

    const nextPhoto = () => {
        handleHoverChange('')
        setActivePhoto((prev) => (prev + 1) % photosData.length)
        handleChangePhoto((activePhoto + 1) % photosData.length)
    }

    // const previousPhoto = () => {
    //     handleHoverChange('')
    //     setActivePhoto((prev) => (prev - 1 + photosData.length) % photosData.length)
    //     handleChangePhoto((activePhoto - 1 + photosData.length) % photosData.length)
    // }

    const videoSegments = [
        [0, 19.6],
        [20, 33],
        [33.5, 49],
        [49, 66],
        [66.5, 82],
        [82.5, 96],
    ]

    const handleChangePhoto = (index: number) => {
        const [startTime, endTime] = videoSegments[index]
        playSegment(startTime, endTime)
    }

    useEffect(() => {
        handleChangePhoto(activePhoto)
    }, [activePhoto])

    const videoRef = useRef<HTMLVideoElement>(null)

    const playSegment = (startTime: number, endTime: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = startTime
            videoRef.current.play()
            setVideoStatus(false)

            const interval = setInterval(() => {
                if (videoRef.current) {
                    if (videoRef.current.currentTime >= endTime) {
                        videoRef.current.pause()
                        setVideoStatus(true)
                        clearInterval(interval)
                    }
                }
            }, 100)

            return () => clearInterval(interval)
        }
    }

    useEffect(() => {
        const handlePause = () => {
            setVideoStatus(true)
        }

        const videoElement = videoRef.current
        if (videoElement) {
            videoElement.addEventListener('pause', handlePause)
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('pause', handlePause)
            }
        }
    }, [])

    const handleHoverChange = (newClass: string) => {
        setHoverClass(newClass)
        setTimeout(() => {
            setHoverClass('lg:peer-hover/previous:card--to-left lg:peer-hover/next:card--to-right')
        }, 15000)
    }

    const handleButton = async () => {
        const data: Partial<Usuario> = { introduccionCompleta: true }
        try {
            await updateUsuario(data)
        } catch (error) {
            console.error('Error al guardar la información:', error)
        } finally {
            router.push(MUNDOS_ROUTE)
        }
    }

    return (
        <>
            <div className="grid">
                <div className="lg:grid lg:grid-cols-2 place-items-center flex items-center justify-center h-screen overflow-hidden bg-[url('/fondo-introduccion.jpg')] bg-cover bg-center [perspective:500px]">
                    <div className="relative bottom-[45vh] right-[6rem] lg:bottom-0 lg:right-0 lg:flex lg:h-full lg:w-full md:items-center md:pb-0 lg:mr-[22rem]"></div>
                    <div className="peer/next blob-right group relative bottom-[45vh] -right-[6rem] lg:bottom-0 lg:right-0 lg:flex lg:h-full lg:w-full md:items-center md:pb-0 lg:ml-[22rem]">
                        {activePhoto !== 5 ? (
                            <ActionButton
                                direction="right"
                                text="Siguiente foto"
                                onClick={nextPhoto}
                                // disabled={isPlaying}
                            />
                        ) : (
                            <Button
                                onClick={handleButton}
                                className="button-underline relative flex w-full items-center justify-center font-bold transition-[transform,color] bg-transparent hover:bg-transparent duration-500 focus-visible:text-white group-hover:text-white lg:text-2xl xl:text-4xl">
                                Continuar
                            </Button>
                        )}
                    </div>
                    <Photo
                        activeVideoSegment={videoSegments[activePhoto]}
                        img={photosData[activePhoto].img}
                        date={photosData[activePhoto].date}
                        className={twMerge('z-10', hoverClass)}
                        title={photosData[activePhoto].title}
                        videoRef={videoRef}
                        videoStatus={videoStatus}
                        setVideoStatus={setVideoStatus}
                    />
                </div>
            </div>
        </>
    )
}

const Photo = ({
    activeVideoSegment,
    className,
    title,
    date,
    img,
    zIndex,
    videoRef,
    videoStatus,
    setVideoStatus,
}: {
    activeVideoSegment?: number[]
    className?: string
    title?: string
    date: string
    img: string
    zIndex?: number
    videoRef: React.RefObject<HTMLVideoElement>
    videoStatus: boolean
    setVideoStatus: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const [, endTime] = activeVideoSegment || [0, 0]

    useEffect(() => {
        const videoElement = videoRef.current

        const updateCurrentTime = () => {
            if (videoElement) {
                setCurrentTime(videoElement.currentTime)
            }
        }

        const setVideoDuration = () => {
            if (videoElement) {
                setDuration(videoElement.duration)
            }
        }

        if (videoElement) {
            videoElement.addEventListener('timeupdate', updateCurrentTime)
            videoElement.addEventListener('loadedmetadata', setVideoDuration)
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('timeupdate', updateCurrentTime)
                videoElement.removeEventListener('loadedmetadata', setVideoDuration)
            }
        }
    }, [videoRef])

    const handlePlay = () => {
        if (videoRef.current) {
            setVideoStatus(false)
            videoRef.current.play()
        }
    }

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause()
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <div
            style={{ zIndex: zIndex }}
            className={twMerge(
                'top-40 md:top-36 lg:top-20 xl:top-10 absolute grid aspect-[3/4] w-[75vw] sm:w-[60vw] md:w-[45vw] lg:w-[45vw] xl:w-[35vw] 2xl:w-[25vw] transition-transform duration-1000 [transform-style:preserve-3d]',
                className,
            )}>
            <div className="rounded-3xl bg-gray-300 [grid-area:1/1] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:translateZ(-5px)] md:-mb-[5px] md:-mt-[5px] md:[transform:translateZ(-10px)]" />
            <div className="absolute flex h-full w-full flex-col items-start rounded-3xl bg-white p-8 shadow-2xl [grid-area:1/1]">
                <p className="mb-2 rounded-full bg-blue-400 px-5 py-1 text-xs text-white md:text-sm">{date}</p>
                <picture>
                    <img
                        src={img}
                        alt=""
                        className="rounded-md"
                    />
                </picture>
                <div className="overflow-hidden">
                    <video
                        ref={videoRef}
                        preload="auto">
                        <source
                            src="/grabacion.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div>
                        {currentTime < endTime && videoStatus && (
                            <button
                                onClick={handlePlay}
                                className="absolute left-[40%] top-[40%] hover:opacity-65">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                                    />
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={handlePause}
                            className="custom-play-pause">
                            Pause
                        </button>
                        {/* <div className="custom-timer">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="rounded-3xl bg-white [grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)]" />
        </div>
    )
}

const ActionButton = ({ onClick, direction, text, disabled }: { onClick?: () => void; direction: 'left' | 'right'; text: string; disabled?: boolean }) => (
    <button
        disabled={disabled ? true : undefined}
        onClick={onClick}
        className={twMerge(
            'relative flex w-full items-center justify-center font-bold text-white transition-[transform,color] duration-500 focus-visible:text-white group-hover:text-white lg:text-2xl xl:text-4xl',
            direction === 'right' && 'focus-visible:translate-x-8 lg:group-hover:translate-x-8',
            direction === 'left' && 'focus-visible:-translate-x-8 lg:group-hover:-translate-x-8',
            disabled ? 'opacity-20' : 'opacity-100',
        )}>
        <span className={twMerge('button-underline relative block', direction === 'right' && '[--from:-30px] [--to:0px]', direction === 'left' && '[--from:0] [--to:-30px]')}>{text}</span>
    </button>
)
