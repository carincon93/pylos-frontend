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
        activeForm: false,
        setActiveForm: (bool) => set({ activeForm: bool }),
        selectedAnforaForm: null,
        setSelectedAnforaForm: (id) => set({ selectedAnforaForm: id }),
        selectedFormOption: false,
        setSelectedFormOption: (bool) => set({ selectedFormOption: bool }),
        qtyCorrectOptions: 0,
        setQtyCorrectOptions: (qty) => set({ qtyCorrectOptions: qty }),
        inGame: false,
        setInGame: (bool) => set({ inGame: bool }),
        // READINGS
        readings: [],
        setReadings: (readings) => set({ readings }),
    })),
)
