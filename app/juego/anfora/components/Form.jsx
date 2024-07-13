import { useContextData } from '@/app/context/AppContext'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/store'
import React, { useEffect, useRef, useState } from 'react'

const Form = ({ handleSubmit }) => {
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

    const checkAnswers = () => {
        if (answers.filter((answer) => answer.readingId == selectedAnforaForm).every((item) => item.correctAnswer == true)) {
            handleSubmit(object)
            setShowReading(false)

            return
        } else {
            setShowErrorMessage(true)

            setTimeout(() => {
                setShowErrorMessage(false)
            }, 2000)
        }
    }

    const ITEMS = ['motor', 'navegacion', 'panel', 'ala', 'bidon']

    return (
        <section className={`ipad select-none ${activeForm ? 'visible' : 'invisible'}`}>
            <figure className="ipad-case"></figure>
            <figure className="ipad-hand">
                <div className="finger-1">
                    <svg
                        viewBox="0 0 105 154"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M90.3752 11.0542C52.3346 -18.5246 14.6537 18.6497 0.568314 40.9343C3.2131 82.056 13.2487 161.892 32.2328 152.262C55.9628 140.225 137.926 48.0277 90.3752 11.0542Z"
                            fill="currentColor"></path>
                        <path
                            d="M90.3752 11.0542C52.3346 -18.5246 14.6537 18.6497 0.568314 40.9343C3.2131 82.056 13.2487 161.892 32.2328 152.262C55.9628 140.225 137.926 48.0277 90.3752 11.0542Z"
                            fill="url(#paint0)"
                            fillOpacity="0.5"></path>
                        <defs>
                            <radialGradient
                                id="paint0"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(89.5624 55.2622) rotate(136.135) scale(77.9999 69.3894)">
                                <stop stopColor="white"></stop>
                                <stop
                                    offset="1"
                                    stopColor="white"
                                    stopOpacity="0"></stop>
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
                <div className="finger-2">
                    <svg
                        viewBox="0 0 99 331"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M75.8037 86.3728C60.8037 93.2062 28.9039 98.2728 21.3039 63.8728C15.0828 35.7145 29.2085 18.8127 41.3037 11.1382L41.3037 1.37282C57.137 -1.29384 90.3037 1.17282 96.3037 32.3728C102.304 63.5728 85.137 81.3728 75.8037 86.3728Z"
                            fill="currentColor"></path>
                        <path
                            d="M75.8037 86.3728C60.8037 93.2062 28.9039 98.2728 21.3039 63.8728C15.0828 35.7145 29.2085 18.8127 41.3037 11.1382L41.3037 1.37282C57.137 -1.29384 90.3037 1.17282 96.3037 32.3728C102.304 63.5728 85.137 81.3728 75.8037 86.3728Z"
                            fill="url(#paint1)"
                            fillOpacity="0.5"></path>
                        <path
                            d="M9.88311 182.015C-4.9169 136.415 24.3831 119.015 40.8831 116.015C59.5331 111.589 85.1829 119.515 94.3829 149.515C103.583 179.515 94.6643 199.101 81.0531 207.092C62.8865 217.759 24.6831 227.615 9.88311 182.015Z"
                            fill="currentColor"></path>
                        <path
                            d="M9.88311 182.015C-4.9169 136.415 24.3831 119.015 40.8831 116.015C59.5331 111.589 85.1829 119.515 94.3829 149.515C103.583 179.515 94.6643 199.101 81.0531 207.092C62.8865 217.759 24.6831 227.615 9.88311 182.015Z"
                            fill="url(#paint2)"
                            fillOpacity="0.5"></path>
                        <path
                            d="M0.892437 291.872C-0.707564 254.272 23.2258 242.206 35.3924 240.872C52.7257 238.872 87.2922 243.972 86.8922 280.372C86.4922 316.772 68.3922 328.539 59.3922 329.872C40.559 332.872 2.49244 329.472 0.892437 291.872Z"
                            fill="currentColor"></path>
                        <path
                            d="M0.892437 291.872C-0.707564 254.272 23.2258 242.206 35.3924 240.872C52.7257 238.872 87.2922 243.972 86.8922 280.372C86.4922 316.772 68.3922 328.539 59.3922 329.872C40.559 332.872 2.49244 329.472 0.892437 291.872Z"
                            fill="url(#paint3)"
                            fillOpacity="0.5"></path>
                        <defs>
                            <radialGradient
                                id="paint1"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(19.908 131.421) rotate(53.3253) scale(84.8646 55.6717)">
                                <stop stopColor="white"></stop>
                                <stop
                                    offset="1"
                                    stopColor="white"
                                    stopOpacity="0"></stop>
                            </radialGradient>
                            <radialGradient
                                id="paint2"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(19.908 131.421) rotate(53.3253) scale(84.8646 55.6717)">
                                <stop stopColor="white"></stop>
                                <stop
                                    offset="1"
                                    stopColor="white"
                                    stopOpacity="0"></stop>
                            </radialGradient>
                            <radialGradient
                                id="paint3"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(19.908 131.421) rotate(53.3253) scale(84.8646 55.6717)">
                                <stop stopColor="white"></stop>
                                <stop
                                    offset="1"
                                    stopColor="white"
                                    stopOpacity="0"></stop>
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
                <div className="thumb-1">
                    <svg
                        viewBox="0 0 157 187"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.03911 141.687C-3.19407 82.5827 62.0391 -40.813 131.539 14.687C172.852 47.678 155.991 94.8582 131.539 129.029L131.533 129.037C121.133 143.57 115.072 152.04 96.5379 169.018C78 186 5.788 207.992 1.03911 141.687Z"
                            fill="currentColor"></path>
                        <path
                            d="M1.03911 141.687C-3.19407 82.5827 62.0391 -40.813 131.539 14.687C172.852 47.678 155.991 94.8582 131.539 129.029L131.533 129.037C121.133 143.57 115.072 152.04 96.5379 169.018C78 186 5.788 207.992 1.03911 141.687Z"
                            fill="url(#paint4)"
                            fillOpacity="0.5"></path>
                        <defs>
                            <radialGradient
                                id="paint4"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(135.984 54.7832) rotate(136.307) scale(97.0631 89.8813)">
                                <stop stopColor="white"></stop>
                                <stop
                                    offset="1"
                                    stopColor="white"
                                    stopOpacity="0"></stop>
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
                <div className="thumb-2">
                    <svg
                        viewBox="0 0 253 307"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M190.158 306.184C20.658 317.184 0.159973 111.94 0.158203 52.6842C0.155014 -54.0915 133.288 36.3514 130.658 40.0259L136.158 69.6842C210.658 144.851 325.758 297.384 190.158 306.184Z"
                            fill="currentColor"></path>
                    </svg>
                </div>
                <div
                    className="wrist"
                    style={{ transform: 'rotate(25deg)' }}></div>
            </figure>

            <div className="screen bg-secondary shadow-inner shadow-sky-300 overflow-y-auto">
                <div className="px-8 py-2 text-xs flex items-center justify-between z-10 relative bg-[#38bdf8]/30 backdrop-blur">
                    <span>04:12</span>
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
                <div className={`p-6 bg-pylos-700 text-white rounded-2xl mx-8 shadow-inner shadow-white transition-transform ${!showReading ? 'translate-y-20' : '-translate-y-[300px]'}`}>
                    <div className="flex items-center">
                        <span className="bg-[url('/estados.png')] size-10 inline-block bg-no-repeat bg-[-43px_-42px] bg-[length:86px] mr-2"></span>
                        <span className="capitalize font-medium text-2xl">¡Hola {profileUserData?.nombre}!</span>
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
                    className={`p-6 bg-gray-200 rounded-2xl text-black mx-8 shadow-inner shadow-white transition-transform ${!showReading ? 'translate-y-32' : '-translate-y-[330px]'}`}
                    onClick={() => setShowReading(true)}>
                    <small>¡Tienes 1 nueva notificación!</small>
                    <p className="text-sm leading-5 mt-2">Recibiste una nueva lectura. Abrir</p>
                </div>

                <div
                    className={`fixed size-10 inset-0 mx-auto text-center top-10 rounded-full bg-pylos-900 text-white shadow z-10 p-2 ${translateY < 0 ? '' : 'invisible'}`}
                    onClick={() => {
                        setActiveForm(false), setShowReading(false)
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
                                    checkAnswers()
                                }}>
                                Enviar respuestas
                            </Button>
                        </div>
                    </div>
                </div>
                <div
                    className={`absolute w-80 h-10 mx-auto text-center text-sm top-10 left-0 right-0 rounded-full bg-white text-black shadow-inner shadow-gray-200 z-10 p-2 transform transition-transform ${
                        translateY == 0 && showReading ? '' : '-translate-y-80'
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
    )
}

export default Form
