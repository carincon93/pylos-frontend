import { useContextData } from '@/app/context/AppContext'
import { Button } from '@/components/ui/button'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import useCronometro from '@/hooks/useCronometro'
import { useGameStore } from '@/lib/store'
import React, { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Ipad = ({ handleSubmit }) => {
    const selectedAnforaForm = useGameStore((state) => state.selectedAnforaForm)

    const activeForm = useGameStore((state) => state.activeForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    const readings = useGameStore((state) => state.readings)
    const { profileUserData } = useContextData()

    const [answers, setAnswers] = useState([])
    const [object, setObject] = useState('')
    const [errorMessage, setShowErrorMessage] = useState(false)
    const readingSelected = selectedAnforaForm && readings ? readings[selectedAnforaForm - 1] : []

    const contentRef = useRef(null)
    const [startY, setStartY] = useState(0)
    const [translateY, setTranslateY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [showReading, setShowReading] = useState(false)
    const [showObjectRepairMessage, setShowObjectRepairMessage] = useState(false)
    const { tiempoEnMinutos, cronometro } = useCronometro(showReading)
    const { playSound } = useAudioPlayer()

    console.log(profileUserData)

    useEffect(() => {
        if (activeForm) {
            setTranslateY(0)
        }
    }, [activeForm])

    const handleTouchStart = (e) => {
        const touch = e.touches[0]
        setStartY(touch.clientY)
    }

    const handleTouchMove = (e) => {
        const touch = e.touches[0]
        const deltaY = touch.clientY - startY
        setTranslateY((prev) => prev + deltaY)
        setStartY(touch.clientY)
    }

    const handleDragStart = (e) => {
        setIsDragging(true)
        setStartY(e.clientY)
    }

    const handleDragEnd = (e) => {
        setIsDragging(false)
        setStartY(e.clientY)
    }

    const handleDrag = (e) => {
        if (!isDragging) return

        const deltaY = e.clientY - startY

        setTranslateY((prev) => {
            const newTranslateY = prev + deltaY
            if (newTranslateY > 0) {
                setTimeout(() => {
                    setTranslateY(0)
                }, 400)
            }
            return newTranslateY
        })

        setStartY(e.clientY)
    }

    const handleSelectAnswer = (readingId, questionId, optionId, isCorrectAnswer, object) => {
        setObject(object)
        setAnswers((prev) => {
            const existingAnswer = prev.find((answer) => answer.questionId === questionId)

            if (existingAnswer) {
                // Si ya existe una respuesta para esta pregunta, actualiza la opción seleccionada
                return prev.map((answer) => (answer.questionId === questionId ? { ...answer, readingId: readingId, optionsSelected: optionId, correctAnswer: isCorrectAnswer } : answer))
            } else {
                // Si no existe, agrega una nueva entrada
                return [...prev, { readingId: readingId, questionId: questionId, optionsSelected: optionId, correctAnswer: isCorrectAnswer }]
            }
        })
    }

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        })
    }

    const checkAnswers = (tiempoRespuesta) => {
        if (answers.filter((answer) => answer.readingId == selectedAnforaForm).every((item) => item.correctAnswer == true)) {
            handleSubmit(object, tiempoRespuesta)
            playSound('phoneHidden')
            setShowReading(false)
            setShowObjectRepairMessage(true)
            triggerConfetti() // Dispara el confeti

            setTimeout(() => {
                setShowObjectRepairMessage(false)
            }, 6000)

            return
        } else {
            setShowErrorMessage(true)
            playSound('phoneShowed')

            setTimeout(() => {
                setShowErrorMessage(false)
            }, 2000)
        }
    }

    const ITEMS = ['motor', 'navegacion', 'panel', 'reactor', 'bidon']

    return (
        <>
            <section className={`ipad select-none ${activeForm ? 'visible' : 'invisible'}`}>
                <figure className="ipad-case"></figure>
                <figure className="ipad-hand">
                    <div className="finger-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 145.59 209.44">
                            <g>
                                <g>
                                    <path
                                        d="M125.63,15.02C73.55-25.48,21.96,25.42,2.67,55.93c3.62,56.3,17.36,165.6,43.35,152.42C78.51,191.87,190.73,65.64,125.63,15.02Z"
                                        style={{ fill: '#f2f3f5', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M144.06,56.93c-5.11,14.3-18.12,25.48-33.02,28.38-6.45,1.26-13.78.81-18.44-1.35l15.68,10.08c1.14.73,2.32,1.52,2.95,2.71.87,1.66.45,3.69-.18,5.46-5.73,16.28-24.47,23.32-41.09,27.98,8.28,1.68,18.02,4.62,20.41,12.72,1.81,6.11-1.54,12.47-5.01,17.82-9.28,14.34-20.29,28.56-32.7,40.29,5.08,2.19,20.93-14.13,31.99-26.31,3.78-4.17,10.03-8.46,14.34-14,6.78-8.71,10.12-15.74,17.25-26.42,7.87-11.77,11.66-18.39,18.39-33.06s11.77-26.6,9.43-44.3Z"
                                        style={{ fill: '#bec1af', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M.37,65.86c12.8-13.96,26.73-26.88,41.61-38.6,7.16-5.63,14.78-11.11,23.61-13.34,15.37-3.88,31.24,2.65,45.74,9.03,8.84,3.9,18.1,8.12,23.8,15.92,6.08,8.34,7.01,19.41,5.9,29.68-1.11,10.26-4.49,19.94-5.28,30.23"
                                        style={{ fill: 'none', stroke: '#000', strokeMiterlimit: 10 }}
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="finger-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 129.64 437.54">
                            <g>
                                <g>
                                    <g>
                                        <path
                                            d="M99.24,114.2c-19.85,9.04-62.06,15.75-72.12-29.78-8.23-37.26,10.46-59.63,26.47-69.79V1.72c20.95-3.53,64.84-.26,72.78,41.02,7.94,41.29-14.78,64.84-27.13,71.46Z"
                                            style={{ fill: '#f3f3f5', strokeWidth: 0 }}
                                        />
                                        <path
                                            d="M99.24,114.2c-19.85,9.04-62.06,15.75-72.12-29.78-8.23-37.26,10.46-59.63,26.47-69.79V1.72c20.95-3.53,64.84-.26,72.78,41.02,7.94,41.29-14.78,64.84-27.13,71.46Z"
                                            style={{ fill: 'rgba(243, 243, 245, .5)', strokeWidth: 0 }}
                                        />
                                        <path
                                            d="M12,240.77c-19.59-60.34,19.19-83.37,41.02-87.34,24.68-5.86,58.62,4.63,70.8,44.33,12.17,39.7.37,65.62-17.64,76.19-24.04,14.12-74.6,27.16-94.18-33.19Z"
                                            style={{ fill: '#f3f3f5', strokeWidth: 0 }}
                                        />
                                        <path
                                            d="M12,240.77c-19.59-60.34,19.19-83.37,41.02-87.34,24.68-5.86,58.62,4.63,70.8,44.33,12.17,39.7.37,65.62-17.64,76.19-24.04,14.12-74.6,27.16-94.18-33.19Z"
                                            style={{ fill: 'rgba(243, 243, 245, .5)', strokeWidth: 0 }}
                                        />
                                        <path
                                            d="M.1,386.15c-2.12-49.76,29.55-65.73,45.66-67.49,22.94-2.65,68.68,4.1,68.15,52.27-.53,48.17-24.48,63.74-36.39,65.51-24.92,3.97-75.3-.53-77.42-50.29Z"
                                            style={{ fill: '#f3f3f5', strokeWidth: 0 }}
                                        />
                                        <path
                                            d="M.1,386.15c-2.12-49.76,29.55-65.73,45.66-67.49,22.94-2.65,68.68,4.1,68.15,52.27-.53,48.17-24.48,63.74-36.39,65.51-24.92,3.97-75.3-.53-77.42-50.29Z"
                                            style={{ fill: 'rgba(243, 243, 245, .5)', strokeWidth: 0 }}
                                        />
                                    </g>
                                    <path
                                        d="M52.13,1.01s-.02-.1-.03-.15c20.69-.49,41.67-2.26,59.5,14.58,4.01,3.79,7.38,7.88,9.85,12.81,12.19,24.34,8.47,56.78-9.41,77.3-2.65,3.05-5.95,6-10.14,5.79,8.64-8.94,27.57-80.13-9.32-89.25-1.58-.39-13.31-2.58-24.11-4.62-8.34-1.57-14.7-8.14-16.34-16.46Z"
                                        style={{ fill: '#c96240', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M102.48,276.15c10.5-4.02,12.96-17.56,13.29-28.8.46-15.73-.18-31.84-5.76-46.56-7.06-18.64-22.04-34.08-35.97-48.33,19.3,1.14,38.49,16.41,45.74,33.49,12.2,28.77,11.22,40.85,6.97,60.17-2.75,12.5-7.63,25.7-24.26,30.04Z"
                                        style={{ fill: '#c16345', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M78.96,436.16c14.02-17.85,20.59-11.96,25.65-43.28,10.11-62.62-10.93-45.34-15.84-68.57,6.93,8.78,10.64,4.06,19.33,15.92,2.87,3.92,11.18,26.12,6.18,49.81-7.09,33.58-22.21,43.35-35.32,46.11Z"
                                        style={{ fill: '#c16345', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M58.04,14.99c-7.48,8.1-27.86,34.17-12.37,63.64l-9.4-7.46s-2.85,28.26,21.08,48.11c0,0-36.61-6.38-31.85-60.05,0,0,1.17-35.25,31.54-45.76.92-.32,1.67.8,1.01,1.52Z"
                                        style={{ fill: '#bec1af', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M26.58,165.8s-22.68,70.32,25.52,118.45c0,0-23.85,2.87-45.46-51.42-10.65-45.48,19.94-67.03,19.94-67.03Z"
                                        style={{ fill: '#bec1af', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M30.2,323.62s-42.44,49.83-12.22,100.6c0,0-18.2-9.09-17.99-40.5s7.45-50.28,30.2-60.1Z"
                                        style={{ fill: '#bec1af', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M52.1.87s24.71-3.32,38.23,3.03l2.85,6.33-28.93-5.1c-.07-.01-.14-.03-.21-.06l.48-1.87-12.41-2.34Z"
                                        style={{ fill: '#1b1c1c', strokeWidth: 0 }}
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="thumb-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 222.25 313.29"
                            className={`transition-transform delay-150 ${isDragging ? 'rotate-3' : 'rotate-0'}`}>
                            <defs>
                                <linearGradient
                                    id="linear-gradient"
                                    x1="644.18"
                                    y1="-173"
                                    x2="661.93"
                                    y2="-203.01"
                                    gradientTransform="translate(-1549.93 415.54) rotate(-3.8) scale(2.47 1.06)"
                                    gradientUnits="userSpaceOnUse">
                                    <stop
                                        offset="0"
                                        stopColor="#dd9c66"
                                    />
                                    <stop
                                        offset=".37"
                                        stopColor="#d68959"
                                    />
                                    <stop
                                        offset="1"
                                        stopColor="#c96240"
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="linear-gradient-2"
                                    x1="629.37"
                                    y1="-149.05"
                                    x2="646.89"
                                    y2="-149.05"
                                    gradientTransform="translate(-912.24 419.19) rotate(-3.8) scale(1.47 1.28)"
                                    gradientUnits="userSpaceOnUse">
                                    <stop
                                        offset="0"
                                        stopColor="#dd9c66"
                                    />
                                    <stop
                                        offset=".35"
                                        stopColor="#d58657"
                                    />
                                    <stop
                                        offset="1"
                                        stopColor="#c96240"
                                    />
                                </linearGradient>
                            </defs>
                            <g>
                                <g>
                                    <path
                                        d="M15.15,168.14c3.68-23.61,23.34-90.31,23.34-90.31C76.68,36.68,116.44-27.96,171.48,16c49.49,39.52,29.29,96.04,0,136.98h0c-12.46,17.42-19.72,27.57-41.92,47.91-22.21,20.34-108.72,46.69-114.41-32.74Z"
                                        style={{ fill: '#f5f5f5', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M137,.48c17.39,5.44,21.39,24.44,19.39,40.44-4,30-19,55-35,82-10,17-27,25-40,40-15,16-3,38-.42,56.77"
                                        style={{ fill: 'none', stroke: '#000', strokeMiterlimit: 10 }}
                                    />
                                    <path
                                        d="M50.37,89.02s8.47.48,8.5,15.66c.03,15.18-6.97,57.61-6.97,57.61,0,0,15.48,24.91-13.03,26.7-28.51,1.79-37.36,6.29-37.36,6.29l15.72-70.69-2.54-4.84-2.59-3.15,21.96-23.06,3.78-3.88v-3.23s12.52,2.58,12.52,2.58Z"
                                        style={{ fill: '#d36138', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M49.37,133.49s3.15-36.55-10.13-39.35c-2.57-.54-27.43,18.38-27.43,18.38l24.21-21.93,2.61-3.57s23.17-1.62,19.72,10.27c-4.44,15.33-8.99,36.2-8.99,36.2Z"
                                        style={{ fill: 'url(#linear-gradient)', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M49.49,127.34s2.94,35.22-4.92,42.27c-2.94,2.64-44.41-3.25-43.73-10.24.32-3.29,16.39-34.77,16.39-34.77l-5.08-7.08s34.48,4.89,37.34,9.82Z"
                                        style={{ fill: '#241f20', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M0,158.55s8.05,11.03,24.94,13.39c5.41.76-8.42,6.31-24.92-3.37l-.02-10.02Z"
                                        style={{ fill: 'url(#linear-gradient-2)', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M180.94,142.51s.9-1.31,2.24-3.52c2.71-4.75,5.22-9.62,7.46-14.58,3.44-8.33,5.82-17.93,2.95-25.05,0,0,2.67,8.82-4.87,13.63-7.14,4.56-13.5,4.51-21.82,6.29-8.32,1.78-37.33,7.78-36.2,25.64.81,12.72,3.36,35.56,6.68,52.82,16.31-15.71,23.23-25.37,34.09-40.55h0c3.33-4.67,6.55-9.53,9.55-14.54-.03-.05-.06-.1-.1-.15Z"
                                        style={{ fill: '#1b1c1c', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M121.3,3.27s.97-10.21,4.75,8.46-52.22,54.67-52.22,54.67l-27.97,3.25S86.35,10.31,121.3,3.27Z"
                                        style={{ fill: '#302c2d', strokeWidth: 0 }}
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="thumb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 352.58 514.14"
                            className={`transition-transform delay-150 ${isDragging ? 'rotate-1' : 'rotate-0'}`}>
                            <defs>
                                <linearGradient
                                    id="linear-gradient"
                                    x1="615.94"
                                    y1="-27.29"
                                    x2="642.44"
                                    y2="-21.99"
                                    gradientTransform="translate(-754.16 599.06) rotate(-15.59) scale(1.35 1.7)"
                                    gradientUnits="userSpaceOnUse">
                                    <stop
                                        offset="0"
                                        stopColor="#d18a5e"
                                    />
                                    <stop
                                        offset="1"
                                        stopColor="#c16345"
                                    />
                                </linearGradient>
                            </defs>
                            <g>
                                <g>
                                    <path
                                        d="M268.21,513.57c-179.71,11.66-234.69-157.7-249.88-268.66,0,0-2.32-46.61-5.03-80.38,0-143.39,175.35-11.53,173.82-7.9l8.58,39.35c100.04,100.94,254.61,305.77,72.52,317.59Z"
                                        style={{ fill: '#f4f4f5', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M.02,277.71s38.05-8.43,57.54,12.95c0,0,27.65,51.83,19.69,87.47-7.15,32-36.23,4.1-39.68,9.4-3.45,5.29-25.04-66.19-25.04-66.19L.02,277.71Z"
                                        style={{ fill: '#c96240', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M35.31,297.35s8.12,20.24,14.48,42.46c6.36,22.22,12.48,57.32-17.61,37.5-6.56-4.32-24.65-48.46-32.14-97.54-1.22-7.97,26.1-2.43,35.27,17.58Z"
                                        style={{ fill: '#302c2d', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M62.29,386.22s3.43-31.28-19.81-94.34c-2.48-6.73-4.95-9.95-26.46-18.59-6.89-2.77,9.08,6.02,20.86,28.11,3.18,5.97,22.68,50.9,13.07,85.34-2.04,7.31,12.34-.52,12.34-.52Z"
                                        style={{ fill: 'url(#linear-gradient)', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M191.75,99.36s2.67,8.82-4.87,13.63c-7.14,4.56-13.5,4.51-21.82,6.29-8.32,1.78-37.33,7.78-36.2,25.64,1.14,17.86,5.71,55.7,11.01,69.97,5.29,14.26,6.28,41.7,30,37.88,42.53-6.86,50.01-29.13,50.01-29.13,0,0-21.86-51.93-40.78-81.14,0,0,18.94-27.52,12.65-43.14Z"
                                        style={{ fill: '#1b1c1c', strokeWidth: 0 }}
                                    />
                                    <path
                                        d="M135.16.46c10.82,4.29,16.67,12.56,18.61,21.46,1.94,8.9.36,18.48-1.43,27.96-5.1,27.06-19.65,45.36-31.27,72.5-1.9,4.43-17.15,17.89-20.86,22.02-6.43,7.17-19.29,12.3-23.25,19.94-10.17,19.65-2.07,32.67.85,46.54,3.4,16.16,5.21,28.37,5.41,45.33.19,16.96,4.01,34.36,20.21,45.1,15.35,10.18,43.11,15.05,67.13,8.48,29.43-8.05,42.18-15.48,49.38-36.26"
                                        style={{ fill: 'none', stroke: '#000', strokeMiterlimit: 10 }}
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div
                        className="wrist"
                        style={{ transform: 'rotate(25deg)' }}></div>
                </figure>

                <div className="screen bg-secondary shadow-inner shadow-sky-300 overflow-y-auto">
                    <div className="px-8 py-2 text-xs flex items-center justify-between z-10 relative bg-[#38bdf8]/30 backdrop-blur">
                        <span>04:12</span>
                        <span className="flex items-center  space-x-3">
                            <svg
                                fill="currentColor"
                                strokeWidth="0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="size-4 mx-2">
                                <path
                                    fill="currentColor"
                                    d="m17.618 5.968 1.453-1.453 1.414 1.414-1.453 1.453A9 9 0 1 1 12 4c2.125 0 4.078.736 5.618 1.968ZM12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM11 8h2v6h-2V8ZM8 1h8v2H8V1Z"></path>
                            </svg>
                            {tiempoEnMinutos}
                        </span>
                        <span className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5 mr-2">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                                />
                            </svg>
                            98%
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="ml-1 size-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
                                />
                            </svg>
                        </span>
                    </div>
                    <div
                        className={`p-6 bg-pylos-700 text-white rounded-2xl mx-8 shadow-inner shadow-white transition-transform ${
                            !showReading ? 'translate-y-20' : 'show-reading -translate-y-[300px]'
                        }`}>
                        <div className="flex items-center">
                            <Avatar className="size-10">
                                <AvatarImage src={`${process.env.NEXT_PUBLIC_NESTJS_ASSETS}/${profileUserData?.mascotaId == 'e9a9c98c-d83b-4280-966f-af62dfdebafb' ? 'gato.webp' : 'perro.webp'}`} />
                                <AvatarFallback>MASCOTA</AvatarFallback>
                            </Avatar>
                            <span className="capitalize font-medium text-2xl ml-4">¡Hola {profileUserData?.nombre}!</span>
                        </div>

                        <p className="text-sm mt-2 text-gray-200 leading-5">
                            ¡Genial 😊! Encontraste{' '}
                            {selectedAnforaForm && (
                                <img
                                    src={`/anfora/${ITEMS[selectedAnforaForm - 1]}.png`}
                                    className="w-6 inline-block mb-1"
                                />
                            )}{' '}
                            que hace parte de Nebulón. Lastimosamente está dañada 😒. Para poder repararla debes leer atentamente la siguiente lectura y responder correctamente las{' '}
                            {readingSelected?.questions?.length} preguntas. ¡Tu puedes!.
                        </p>
                    </div>

                    <div
                        className={`p-6 bg-gray-200 rounded-2xl text-black mx-8 shadow-inner shadow-white transition-transform ${
                            !showReading ? 'translate-y-32' : 'show-reading -translate-y-[360px]'
                        }`}
                        onClick={() => {
                            setShowReading(true), playSound('phoneShowed')
                        }}>
                        <small>¡Tienes 1 nueva notificación!</small>
                        <p className="text-sm leading-5 mt-2">
                            Recibiste una nueva lectura. <strong>Abrir</strong>
                        </p>
                    </div>

                    <div
                        className={`fixed size-10 inset-0 mx-auto text-center top-12 rounded-full bg-pylos-900 text-white shadow z-10 p-2`}
                        onClick={() => {
                            setActiveForm(false), setShowReading(false), playSound('phoneHidden')
                        }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </div>

                    <div
                        className={`ipad-content transition-transform transform ${showReading ? 'translate-x-[0px]' : 'translate-x-[500px]'} `}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDrag}
                        onMouseUp={handleDragEnd}
                        ref={contentRef}>
                        <div style={{ transform: `translateY(${translateY - 150}px)` }}>
                            <div className="px-10">
                                <h1 className="text-center mb-6 font-semibold text-lg">{readingSelected.title}</h1>
                                <p className="leading-5">{readingSelected.text}</p>
                                <p className="text-sm text-right mt-4 text-white/70">{readingSelected.author}</p>
                            </div>

                            <div className="p-8">
                                {readingSelected?.questions?.map((question, i) => (
                                    <div
                                        key={i}
                                        className="my-20">
                                        <p className="mb-6 font-semibold text-center">{question.text}</p>
                                        <div className="w-full">
                                            {question.answers.map((answer) => (
                                                <button
                                                    key={answer.id}
                                                    onClick={() => {
                                                        handleSelectAnswer(readingSelected.id, question.id, answer.id, answer.esOpcionCorrecta, readingSelected.object)
                                                    }}
                                                    className={`btn b-1 ${
                                                        answers.find((item) => item.questionId == question.id)?.optionsSelected == answer.id ? 'bg-pylos-900 !text-white' : 'bg-purple-100'
                                                    }  leading-4 text-xs block !w-full my-4`}>
                                                    {answer.text}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        checkAnswers(cronometro)
                                    }}>
                                    Enviar respuestas
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`absolute w-80 h-10 mx-auto text-center text-sm top-14 left-0 right-0 rounded-full bg-white text-black shadow-inner shadow-gray-200 z-10 p-2 transform transition-transform ${
                            translateY == 0 && showReading ? 'translate-y-10' : '-translate-y-80'
                        }`}>
                        Desliza hacia abajo con el clic del mouse
                    </div>

                    <div
                        className={`absolute w-72 h-10 mx-auto text-center bottom-[10px] left-0 right-0 rounded-full bg-red-200 text-red-500 shadow-inner shadow-red-400 text-sm z-10 p-2 transition-transform ${
                            errorMessage ? '' : 'translate-y-60'
                        }`}>
                        Tienes respuestas erróneas
                    </div>
                </div>
            </section>

            {showObjectRepairMessage && (
                <div className="fixed top-32 mb-0 left-0 right-0 z-20 m-auto bg-white/20 backdrop-blur-md p-2 text-white text-3xl font-edu text-center">
                    <span className="block text-pylos-400 font-medium text-[80px] my-4">¡Excelente!</span> Reparaste la siguiente parte de la nave <span className="font-edu">Nebulón</span>:
                    <img
                        src={`${'/anfora/' + object + '.png'}`}
                        className="mx-auto mt-4 w-16"
                        alt=""
                    />
                </div>
            )}
        </>
    )
}

export default Ipad
