import { useContextData } from '@/app/context/AppContext'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useGameStore } from '@/lib/store'
import React from 'react'

const Form = ({ handleSubmit }) => {
    const selectedAnforaForm = useGameStore((state) => state.selectedAnforaForm)
    const setActiveForm = useGameStore((state) => state.setActiveForm)
    const readings = useGameStore((state) => state.readings)
    const selectedFormOption = useGameStore((state) => state.selectedFormOption)
    const { profileUserData } = useContextData()

    const readingSelected = selectedAnforaForm ? readings[selectedAnforaForm - 1] : []

    return (
        <div className="bg-gray-800 rounded-xl text-white shadow-inner border-[22px] my-2 fixed inset-0 m-auto w-[50vw] z-[1000] flex flex-col justify-between">
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
        </div>
    )
}

export default Form
