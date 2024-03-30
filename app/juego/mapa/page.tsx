// 'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/app/components/Logo'
import { GAME_3D_ROUTE } from '@/utils/routes'

const Game2d: React.FC = () => {
    return (
        <div className="h-full">
            <div className="absolute top-10 left-0 w-full h-[10vh]">
                <div className="flex flex-col items-center justify-center">
                    <Logo className="text-white w-72 h-auto" />
                </div>

                <div className="flex justify-center mt-4">
                    <div className="px-4">
                        <h1>Nivel</h1>
                        <span className="text-6xl">1</span>
                    </div>
                    <div className="border-l border-r px-4 border-white flex flex-col">
                        <h1 className="text-center">Próximo planeta</h1>
                        <span
                            id="distValue"
                            className="text-6xl block text-center w-[155px]">
                            0
                        </span>
                        <small className="bg-violet-400 py-1 px-4 rounded-full self-center">años luz</small>
                    </div>
                    <div className="px-4">
                        <h1>Escudo</h1>
                        <svg
                            className="text-white/30 mt-1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="currentColor">
                            <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="h-full max-w-[500px] m-auto relative top-72">
                <h1 className="text-white text-6xl text-center font-bold -tracking-[6px]">Planeta Tacto</h1>

                <div className="flex flex-col gap-8 mt-10">
                    <img
                        src="/astronaut.png"
                        className="self-start w-32 relative top-10 lg:-left-20 m-auto lg:m-0"
                    />

                    <button
                        className="bg-red-100 hover:bg-red-300 p-4 rounded-full size-36 m-4 self-start"
                        style={{ boxShadow: '5px 1px #e4505b' }}>
                        <img
                            src="/books.png"
                            alt=""
                            width="100px"
                            className="m-auto"
                        />
                    </button>

                    <button
                        className="bg-red-100 hover:bg-red-300 p-4 rounded-full size-36 m-4 self-center relative -top-[80px]"
                        style={{ boxShadow: '5px 1px #e4505b' }}>
                        <img
                            src="/books.png"
                            alt=""
                            width="100px"
                            className="m-auto"
                        />
                    </button>

                    <img
                        src="/asteroid.png"
                        className="self-start"
                    />

                    <button
                        className="bg-red-100 hover:bg-red-300 p-4 rounded-full size-36 m-4 self-end relative right-10 -top-[195px]"
                        style={{ boxShadow: '5px 1px #e4505b' }}>
                        <svg
                            className="text-red-400 w-20 m-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="currentColor">
                            <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
                        </svg>
                    </button>

                    <button
                        className="bg-red-100 hover:bg-red-300 p-4 rounded-full size-36 m-4 self-center relative -top-[175px]"
                        style={{ boxShadow: '5px 1px #e4505b' }}>
                        <span className="tracking-wider text-red-400 text-2xl">TURBO</span>
                    </button>

                    <button
                        className="bg-red-100 hover:bg-red-300 p-4 rounded-full size-36 m-4 self-start relative -top-[245px]"
                        style={{ boxShadow: '5px 1px #e4505b' }}>
                        <img
                            src="/books.png"
                            alt=""
                            width="100px"
                            className="m-auto"
                        />
                    </button>

                    <Link
                        href={GAME_3D_ROUTE}
                        className="relative -top-[255px] bg-red-500 hover:bg-red-600 flex items-center rounded-full size-36 self-center">
                        <img
                            src="/rocket.png"
                            alt=""
                            width="100px"
                            className="m-auto"
                        />
                        {/* <span className="text-6xl ml-10 -tracking-[3px] mb-2">Despegar</span> */}
                    </Link>
                </div>
                <p></p>
            </div>
        </div>
    )
}

export default Game2d
