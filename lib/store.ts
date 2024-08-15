import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface GameState {
    activeForm: boolean
    setActiveForm: (bool: boolean) => void
    selectedAnforaForm: string | null
    setSelectedAnforaForm: (id: string | null) => void
    selectedFormOption: boolean
    setSelectedFormOption: (bool: boolean) => void
    qtyCorrectOptions: number
    setQtyCorrectOptions: (qty: number) => void
    inGame: boolean
    setInGame: (bool: boolean) => void
    showMap: boolean
    setShowMap: (bool: boolean) => void
    showMenu: boolean
    setShowMenu: (bool: boolean) => void
    clickDisabled: boolean
    setClickDisabled: (bool: boolean) => void
    isPageVisible: boolean
    setPageVisibility: (bool: boolean) => void
    resetCharacterPosition: boolean
    setResetCharacterPosition: (bool: boolean) => void
    readings: any[]
    setReadings: (readings: any[]) => void
}

export const useGameStore = create<GameState>(
    subscribeWithSelector((set, get) => ({
        activeForm: false,
        setActiveForm: (bool: boolean) => set({ activeForm: bool }),
        selectedAnforaForm: null,
        setSelectedAnforaForm: (id: string | null) => set({ selectedAnforaForm: id }),
        selectedFormOption: false,
        setSelectedFormOption: (bool: boolean) => set({ selectedFormOption: bool }),
        qtyCorrectOptions: 0,
        setQtyCorrectOptions: (qty: number) => set({ qtyCorrectOptions: qty }),
        inGame: false,
        setInGame: (bool: boolean) => set({ inGame: bool }),
        showMap: false,
        setShowMap: (bool: boolean) => set({ showMap: bool }),
        showMenu: true,
        setShowMenu: (bool: boolean) => set({ showMenu: bool }),
        clickDisabled: false,
        setClickDisabled: (bool: boolean) => set({ clickDisabled: bool }),
        isPageVisible: true,
        setPageVisibility: (bool: boolean) => set({ isPageVisible: bool }),
        resetCharacterPosition: false,
        setResetCharacterPosition: (bool: boolean) => set({ resetCharacterPosition: bool }),
        readings: [],
        setReadings: (readings: any[]) => set({ readings }),
    })),
)
