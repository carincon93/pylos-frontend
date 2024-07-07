import { useContextData } from '@/app/context/AppContext'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useGameStore } from '@/lib/store'
import React, { useEffect, useState } from 'react'

const Form = ({ handleSubmit }) => {
    const selectedAnforaForm = useGameStore((state) => state.selectedAnforaForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    const activeForm = useGameStore((state) => state.activeForm)
    const readings = useGameStore((state) => state.readings)
    const selectedFormOption = useGameStore((state) => state.selectedFormOption)
    const { profileUserData } = useContextData()

    const readingSelected = selectedAnforaForm ? readings[selectedAnforaForm - 1] : []

    return (
        <section
            className={`ipad ${activeForm ? 'visible' : 'invisible'}`}
            onClick={() => setActiveForm(false)}>
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

            {/* <div className="screen">
                <div className=" p-2 text-xs flex items-center justify-between">
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
                <div className="p-6 bg-pylos-700 text-white rounded-2xl mx-8">
                    <div className="flex items-center">
                        <span className="bg-[url('/estados.png')] size-10 inline-block bg-no-repeat bg-[-43px_-42px] bg-[length:86px] mr-2"></span>
                        <span className="capitalize">¡Hola {profileUserData?.nombre}!</span>
                    </div>
                    <p className="text-sm mt-2 text-gray-200 ml-12">
                        Para reparar el siguiente elemento de la nave debes leer muy bien la lectura y responder de manera acertada las preguntas correspondientes.
                    </p>
                </div>
                <div>
                    <div className="px-10 h-60 overflow-y-auto">
                        <h1 className="text-center font-[cursive] mb-6 font-semibold text-lg">{readingSelected.title}</h1>
                        <p className="font-[cursive]">{readingSelected.text}</p>
                        <p className="text-sm text-right mt-4 text-gray-400">{readingSelected.author}</p>
                    </div>
                    <Carousel
                        className="p-8"
                        orientation="vertical">
                        <CarouselContent className="h-[240px]">
                            {readingSelected.questions.map((question, i) => (
                                <CarouselItem
                                    key={i}
                                    className="flex flex-col items-center justify-center">
                                    <p className="font-[cursive] mb-6 font-semibold">{question.text}</p>
                                    <div className="flex gap-4">
                                        {question.answers.map((answer) => (
                                            <button
                                                key={answer.id}
                                                onClick={() => handleSubmit(readingSelected.questions.length, answer, readingSelected.object)}
                                                className="btn b-1 bg-purple-100 leading-4 text-xs">
                                                {answer.text}
                                            </button>
                                        ))}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-transparent relative top-4 border-0" />
                        <CarouselNext className={`${selectedFormOption ? 'bg-pylos-600' : 'bg-transparent'} relative -bottom-4 border-0`} />
                    </Carousel>
                </div>
                <div className="p-2">
                    <span
                        className="bg-gray-200 w-40 block rounded-full mx-auto p-1"
                        onClick={() => setActiveForm(false)}></span>
                </div>
            </div> */}
        </section>
    )
}

export default Form
