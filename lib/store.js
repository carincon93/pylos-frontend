import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const gameStates = {
    MENU: 'MENU',
    GAME: 'GAME',
    GAME_OVER: 'GAME_OVER',
}

export const playAudio = (path, callback) => {
    const audio = new Audio(`/sounds/${path}.mp3`)
    if (callback) {
        audio.addEventListener('ended', callback)
    }
    audio.play()
}

export const useGameStore = create(
    subscribeWithSelector((set, get) => ({
        level: null,
        currentStage: 0,
        mode: 'startGame',
        gameState: gameStates.MENU,
        wrongAnswers: 0,
        startGame: ({ mode }) => {
            set({
                level,
                currentStage: 0,
                gameState: gameStates.GAME,
                mode,
                wrongAnswers: 0,
            })
        },
        nextStage: () => {
            set((state) => {
                if (state.currentStage + 1 === state.level.length) {
                    return {
                        currentStage: 0,
                        level: null,
                        gameState: gameStates.GAME_OVER,
                    }
                }
                const currentStage = state.currentStage + 1

                return { currentStage }
            })
        },
        goToMenu: () => {
            set({
                gameState: gameStates.MENU,
            })
        },

        // CHARACTER CONTROLLER
        characterState: 'Idle',
        setCharacterState: (characterState) =>
            set({
                characterState,
            }),
    })),
)
