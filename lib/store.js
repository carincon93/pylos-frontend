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

        // READINGS
        currentReadingIndex: 0,
        setCurrentReadingIndex: (index) => set({ currentReadingIndex: index }),
        currentQuestionIndex: 0,
        setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
        readingTextVisible: false,
        setReadingTextVisible: (visible) => set({ readingTextVisible: visible }),
        cameraText: false,
        setCameraText: (visible) => set({ cameraText: visible }),
        showFirstStage: true,
        setShowFirstStage: (visible) => set({ showFirstStage: visible }),
        readings: [
            {
                id: '1',
                text: '¡Cuidado, la Luna sueña! No despierten a la Luna, no la despierten que sueña, que hoy celebra su cumpleaños con lunas de otros planetas. Le cantaron las estrellas, han llegado los cometas ¡Si hasta el Sol fue a saludarla, de corbata y con chaqueta! No despierten a la Luna. ¡Silencio cuando ella sueña!, que festeja su cumpleaños con lunas, soles y estrellas',
                author: 'María Luisa Silva. Cuentiversos para reír y jugar Galería Cecilia Palma. Santiago 2008.',
                position: [10, 0.2, 10],
                questions: [
                    {
                        text: '¿De qué se trata el poema?',
                        answers: [
                            { id: 1, text: 'La llegada del Sol.' },
                            { id: 2, text: 'El sueño de la Luna.' },
                            { id: 3, text: 'El paseo de la Luna.' },
                            { id: 4, text: 'La visita de lunas, soles y estrellas.' },
                        ],
                    },
                    {
                        text: 'En el sueño, ¿cómo celebra su cumpleaños la Luna?',
                        answers: [
                            { id: 5, text: 'Acompañada por lunas, estrellas y soles.' },
                            { id: 6, text: 'Vestida con corbata y chaqueta.' },
                            { id: 7, text: 'Despertando a los cometas.' },
                            { id: 8, text: 'Festejando en silencio.' },
                        ],
                    },
                    {
                        text: '¿Cómo crees que se sentía la Luna mientras soñaba?',
                        answers: [
                            { id: 9, text: 'Triste' },
                            { id: 10, text: 'Hambrienta' },
                            { id: 11, text: 'Dormida' },
                            { id: 12, text: 'Feliz' },
                        ],
                    },
                    {
                        text: 'El sol llegando a la fiesta es el personaje principal de este poema',
                        answers: [
                            { id: 13, text: 'Falso' },
                            { id: 14, text: 'Verdadero' },
                        ],
                    },
                ],
            },
            {
                id: '2',
                text: 'Estudiantes colombianos viajaron a la NASA. Seis estudiantes de las escuelas del departamento del Atlántico estarán de visita en el centro espacial Kennedy, invitados por la agencia espacial Nasa, en los Estados Unidos. Los estudiantes fueron seleccionados durante las Olimpiadas Departamentales de Astronomía, quienes mostraron una vocación científica. Es un ejercicio participativo que ha desarrollado la comunidad científica del departamento, dando la oportunidad de que estos niños compartan sus conocimientos en astrofísica y astronomía.',
                author: '',
                position: [-20, 0.2, -20],
                questions: [
                    {
                        text: '¿Qué características tienen los alumnos seleccionados?',
                        answers: [
                            { id: 15, text: 'Cursan clases de cambio climático.' },
                            { id: 16, text: 'Aportan el financiamiento de su viaje.' },
                            { id: 17, text: 'Tienen habilidades científicas.' },
                            { id: 18, text: 'Participan usualmente en campamentos de verano.' },
                        ],
                    },
                    {
                        text: 'Selecciona una palabra que reemplace la palabra desarrollan. "Un programa en el que desarrollan sus habilidades científicas y amplían sus conocimientos."',
                        answers: [
                            { id: 19, text: 'aportan' },
                            { id: 20, text: 'aumentan' },
                            { id: 21, text: 'elegidos' },
                            { id: 22, text: 'caminar' },
                        ],
                    },
                    {
                        text: 'Selecciona una palabra que reemplace la palabra participación. "La Embajada de los Estados Unidos apoyó la participación de jóvenes colombianos."',
                        answers: [
                            { id: 23, text: 'selección' },
                            { id: 24, text: 'asistencia' },
                            { id: 25, text: 'gusto' },
                            { id: 26, text: 'alimentación' },
                        ],
                    },
                    {
                        text: 'El texto leído fue extraído del periódico “el colombiano” que circuló el 28 de agosto de 2014',
                        answers: [
                            { id: 27, text: 'Falso' },
                            { id: 28, text: 'Verdadero' },
                        ],
                    },
                ],
            },
        ],
        handleAnswer: (answer) => {
            console.log(answer)
            // Logic to check answer and decide what to do next
        },

        // CHARACTER CONTROLLER
        characterState: 'Idle',
        characterPosition: [-4, 2, 38], // Inicializar la posición del personaje
        setCharacterPosition: (position) => set({ characterPosition: position }),
        setCharacterState: (characterState) =>
            set({
                characterState,
            }),
    })),
)
