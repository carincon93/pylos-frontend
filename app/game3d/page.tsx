'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import { Logo } from '../components/Logo'
import './styles.css'

interface Game {
    speed: number

    distance: number
    ratioSpeedDistance: number

    planetRadius: number
    planetLength: number

    wavesMinAmp: number
    wavesMaxAmp: number
    wavesMinSpeed: number
    wavesMaxSpeed: number

    status: string
}

const GameScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let renderer: THREE.WebGLRenderer
    let hemisphereLight: THREE.HemisphereLight
    let shadowLight: THREE.DirectionalLight
    let planet: Planet
    let space: Space
    let asteroid: Asteroid
    let rocket: Rocket
    let game: Game
    let deltaTime: number = 0
    let newTime: number = new Date().getTime()
    let oldTime: number = new Date().getTime()
    let fieldDistance: HTMLElement

    const Colors = {
        red: 0xf25346,
        white: 0xd8d0d1,
        brown: 0x59332e,
        brownDark: 0x23190f,
        pink: 0xf5986e,
        yellow: 0xf4ce93,
        blue: 0x68c3c0,
    }

    function resetGame() {
        game = {
            speed: 0,

            distance: 3498,
            ratioSpeedDistance: 50,

            planetRadius: 600,
            planetLength: 800,

            wavesMinAmp: 5,
            wavesMaxAmp: 20,
            wavesMinSpeed: 0.001,
            wavesMaxSpeed: 0.003,

            status: 'playing',
        }
    }

    function createScene() {
        const WIDTH = window.innerWidth
        const HEIGHT = window.innerHeight

        scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

        const aspectRatio = WIDTH / HEIGHT
        const fieldOfView = 50
        const nearPlane = 0.1
        const farPlane = 10000

        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
        camera.position.x = 0
        camera.position.z = 200
        camera.position.y = 100

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(WIDTH, HEIGHT)
        renderer.shadowMap.enabled = true

        containerRef.current?.appendChild(renderer.domElement)
    }

    function loop() {
        newTime = new Date().getTime()
        deltaTime = newTime - oldTime
        oldTime = newTime

        space.moveStars()
        planet.moveWaves()
        asteroid.rotate()
        rocket.animate()

        renderer.render(scene, camera)

        updateDistance()

        requestAnimationFrame(loop)
    }

    function createLights() {
        hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)
        shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
        shadowLight.position.set(150, 350, 350)
        shadowLight.castShadow = true
        shadowLight.shadow.camera.left = -400
        shadowLight.shadow.camera.right = 400
        shadowLight.shadow.camera.top = 400
        shadowLight.shadow.camera.bottom = -400
        shadowLight.shadow.camera.near = 1
        shadowLight.shadow.camera.far = 1000
        shadowLight.shadow.mapSize.width = 2048
        shadowLight.shadow.mapSize.height = 2048

        scene.add(hemisphereLight)
        scene.add(shadowLight)
    }

    class SpaceObject {
        protected mesh: THREE.Mesh

        constructor() {
            this.mesh = new THREE.Mesh()
        }

        protected loadModel(modelPath: string, color?: number): Promise<void> {
            return new Promise<void>((resolve) => {
                const loader = new GLTFLoader()

                loader.load(
                    modelPath,
                    (gltf) => {
                        const root = gltf.scene

                        this.mesh = root.children[0] as THREE.Mesh

                        if (color !== undefined && this.mesh.material instanceof THREE.MeshStandardMaterial) {
                            this.mesh.material.color.set(color)
                        }

                        resolve()
                    },
                    undefined,
                    (error) => {
                        console.error(error)
                        resolve()
                    },
                )
            })
        }

        getMesh(): THREE.Mesh {
            return this.mesh
        }
    }

    class Space {
        mesh: THREE.Object3D
        nStars: number
        stars: Star[]

        constructor() {
            this.mesh = new THREE.Object3D()
            this.nStars = 400
            this.stars = []
            const width = window.innerWidth
            const height = game.planetRadius + Math.random() + 400

            // Loop to create stars
            for (let i = 0; i < this.nStars; i++) {
                const star = new Star()

                // Load star model and set position when loaded
                star.loadModel().then(() => {
                    const x = Math.random() * width - width / 2 // Random x position within viewport width
                    const y = Math.random() * height - height / 2 // Random y position within viewport height
                    const z = -300 - Math.random() * 500 // Random z position

                    const starMesh = star.getMesh() // Access the mesh using getMesh() method

                    if (starMesh) {
                        if (starMesh.material instanceof THREE.MeshStandardMaterial) {
                            starMesh.material.color.set(0xff0000) // Set red color
                        }
                        starMesh.position.set(x, y, z) // Set position
                        const s = 10 + Math.random() * 30 // Random scale between 10 and 40
                        starMesh.scale.set(s, s, s) // Set scale
                        this.mesh.add(starMesh) // Add star mesh to space mesh
                    }
                })

                this.stars.push(star)
            }
        }

        moveStars() {
            for (let i = 0; i < this.nStars; i++) {
                const c = this.stars[i]
                c.rotate()
            }
            this.mesh.rotation.z += game.speed * deltaTime
        }
    }

    class Planet {
        private waves: { y: number; x: number; z: number; ang: number; amp: number; speed: number }[]
        mesh: THREE.Mesh

        constructor() {
            const geom = new THREE.CylinderGeometry(150, 150, 10, 10, 10)
            const mergedGeometry = BufferGeometryUtils.mergeVertices(geom)
            geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2))

            const positionAttribute = mergedGeometry.getAttribute('position')
            const l = positionAttribute.count

            this.waves = []

            for (let i = 0; i < l; i++) {
                const x = positionAttribute.getX(i)
                const y = positionAttribute.getY(i)
                const z = positionAttribute.getZ(i)

                this.waves.push({
                    y: y,
                    x: x,
                    z: z,
                    ang: Math.random() * Math.PI * 2,
                    amp: game.wavesMinAmp + Math.random() * (game.wavesMaxAmp - game.wavesMinAmp),
                    speed: game.wavesMinSpeed + Math.random() * (game.wavesMaxSpeed - game.wavesMinSpeed),
                })
            }

            const material = new THREE.MeshPhongMaterial({
                color: 0xe4505b,
                transparent: true,
                opacity: 0.8,
                flatShading: true,
            })

            this.mesh = new THREE.Mesh(mergedGeometry, material)
            this.mesh.name = 'waves'
            this.mesh.receiveShadow = true
        }

        moveWaves() {
            const positionAttribute = this.mesh.geometry.getAttribute('position')
            const l = positionAttribute.count
            for (let i = 0; i < l; i++) {
                let x = positionAttribute.getX(i)
                let y = positionAttribute.getY(i)
                let z = positionAttribute.getZ(i)

                const vprops = this.waves[i]
                x = vprops.x + Math.cos(vprops.ang) * vprops.amp
                y = vprops.y + Math.sin(vprops.ang) * vprops.amp
                vprops.ang += 0.005

                positionAttribute.setXYZ(i, x, y, z)
            }
            this.mesh.geometry.attributes.position.needsUpdate = true
        }
    }

    class Star extends SpaceObject {
        constructor() {
            super()
        }

        async loadModel(): Promise<void> {
            await super.loadModel('/models/Star.glb', 0xffffff) // Default color is white
        }

        rotate() {
            if (this.mesh) {
                this.mesh.rotation.y += 0.025
                this.mesh.rotation.z += 0.02
            }
        }
    }

    class Asteroid extends SpaceObject {
        constructor() {
            super()
        }

        async loadModel(): Promise<void> {
            await super.loadModel('/models/Asteroid.glb', 0xff0000)
        }

        rotate() {
            if (this.mesh) {
                this.mesh.rotation.y += 0.025
                this.mesh.rotation.z += 0.02
            }
        }
    }

    class Rocket extends SpaceObject {
        amplitude: number
        frequency: number
        time: number
        rotationAngle: number
        rotateClockwise: boolean

        particleUp: boolean // Flag to indicate if particle is moving up or down
        particlePosY: number
        particle2PosY: number
        particle3PosY: number

        constructor() {
            super()

            this.amplitude = 1 // Amplitude of the floating motion
            this.frequency = 0.05 // Frequency of the floating motion
            this.time = 0
            this.rotationAngle = 0
            this.rotateClockwise = true
            this.particleUp = true // Flag to indicate if particle is moving up or down
            this.particlePosY = 0
            this.particle2PosY = 0
            this.particle3PosY = 0
        }

        async loadModel(): Promise<void> {
            await super.loadModel('/models/Rocket.glb')
        }

        animate() {
            // Update rocket's position for floating animation
            const yOffset = Math.sin(this.time) * this.amplitude
            rocket.mesh.position.y = 100 + yOffset

            // Increment time for the floating animation
            this.time += this.frequency

            // Move particle up and down
            const particleSpeed = 0.13 // Adjust the speed as needed
            const particle2Speed = 0.16 // Adjust the speed as needed
            const particle3Speed = 0.26 // Adjust the speed as needed
            if (this.particleUp) {
                // Move particle up
                this.particlePosY = 0
                this.particle2PosY = 0
                this.particle3PosY = 0
                if (this.particlePosY >= 0) {
                    // Reached the upper limit, start moving down
                    this.particleUp = false
                }
            } else {
                // Move particle down
                this.particlePosY -= particleSpeed
                if (this.particlePosY <= -9) {
                    // Reached the lower limit, start moving up
                    this.particleUp = true
                }

                this.particle2PosY -= particle2Speed
                if (this.particle2PosY <= -12) {
                    // Reached the lower limit, start moving up
                    this.particleUp = true
                }

                this.particle3PosY -= particle2Speed
                if (this.particle3PosY <= -12) {
                    // Reached the lower limit, start moving up
                    this.particleUp = true
                }
            }

            // Update the particle's position
            if (rocket.mesh.children.length > 0) {
                rocket.mesh.children[0].position.y = this.particlePosY
                rocket.mesh.children[1].position.y = this.particlePosY
                rocket.mesh.children[13].position.y = this.particlePosY
                rocket.mesh.children[4].position.y = this.particle2PosY
                rocket.mesh.children[3].position.y = this.particle2PosY
                rocket.mesh.children[2].position.y = this.particle3PosY
                rocket.mesh.children[6].position.y = this.particle3PosY
            }
        }
    }

    // class Rocket {
    //     mesh: THREE.Object3D
    //     propeller: THREE.Mesh
    //     // pilot: Pilot

    //     constructor() {
    //         this.mesh = new THREE.Object3D()
    //         this.mesh.name = 'airPlane'

    //         // Cabin
    //         const geomCabin = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1)
    //         const matCabin = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })

    //         // geomCabin.vertices[4].y -= 10
    //         // geomCabin.vertices[4].z += 20
    //         // geomCabin.vertices[5].y -= 10
    //         // geomCabin.vertices[5].z -= 20
    //         // geomCabin.vertices[6].y += 30
    //         // geomCabin.vertices[6].z += 20
    //         // geomCabin.vertices[7].y += 30
    //         // geomCabin.vertices[7].z -= 20

    //         const cabin = new THREE.Mesh(geomCabin, matCabin)
    //         cabin.castShadow = true
    //         cabin.receiveShadow = true
    //         this.mesh.add(cabin)

    //         // Engine
    //         const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1)
    //         const matEngine = new THREE.MeshPhongMaterial({ color: Colors.white, flatShading: true })
    //         const engine = new THREE.Mesh(geomEngine, matEngine)
    //         engine.position.x = 50
    //         engine.castShadow = true
    //         engine.receiveShadow = true
    //         this.mesh.add(engine)

    //         // Tail Plane
    //         const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1)
    //         const matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })
    //         const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane)
    //         tailPlane.position.set(-40, 20, 0)
    //         tailPlane.castShadow = true
    //         tailPlane.receiveShadow = true
    //         this.mesh.add(tailPlane)

    //         // Wings
    //         const geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1)
    //         const matSideWing = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })
    //         const sideWing = new THREE.Mesh(geomSideWing, matSideWing)
    //         sideWing.position.set(0, 15, 0)
    //         sideWing.castShadow = true
    //         sideWing.receiveShadow = true
    //         this.mesh.add(sideWing)

    //         const geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1)
    //         const matWindshield = new THREE.MeshPhongMaterial({ color: Colors.white, transparent: true, opacity: 0.3, flatShading: true })
    //         const windshield = new THREE.Mesh(geomWindshield, matWindshield)
    //         windshield.position.set(5, 27, 0)
    //         windshield.castShadow = true
    //         windshield.receiveShadow = true
    //         this.mesh.add(windshield)

    //         const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
    //         // geomPropeller.vertices[4].y -= 5
    //         // geomPropeller.vertices[4].z += 5
    //         // geomPropeller.vertices[5].y -= 5
    //         // geomPropeller.vertices[5].z -= 5
    //         // geomPropeller.vertices[6].y += 5
    //         // geomPropeller.vertices[6].z += 5
    //         // geomPropeller.vertices[7].y += 5
    //         // geomPropeller.vertices[7].z -= 5

    //         const matPropeller = new THREE.MeshPhongMaterial({ color: Colors.brown, flatShading: true })
    //         this.propeller = new THREE.Mesh(geomPropeller, matPropeller)
    //         this.propeller.castShadow = true
    //         this.propeller.receiveShadow = true

    //         const geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1)
    //         const matBlade = new THREE.MeshPhongMaterial({ color: Colors.brownDark, flatShading: true })
    //         const blade1 = new THREE.Mesh(geomBlade, matBlade)
    //         blade1.position.set(8, 0, 0)
    //         blade1.castShadow = true
    //         blade1.receiveShadow = true
    //         const blade2 = blade1.clone()
    //         blade2.rotation.x = Math.PI / 2
    //         blade2.castShadow = true
    //         blade2.receiveShadow = true
    //         this.propeller.add(blade1)
    //         this.propeller.add(blade2)
    //         this.propeller.position.set(60, 0, 0)
    //         this.mesh.add(this.propeller)

    //         const wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1)
    //         const wheelProtecMat = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })
    //         const wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat)
    //         wheelProtecR.position.set(25, -20, 25)
    //         this.mesh.add(wheelProtecR)

    //         const wheelTireGeom = new THREE.BoxGeometry(24, 24, 4)
    //         const wheelTireMat = new THREE.MeshPhongMaterial({ color: Colors.brownDark, flatShading: true })
    //         const wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat)
    //         wheelTireR.position.set(25, -28, 25)

    //         const wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6)
    //         const wheelAxisMat = new THREE.MeshPhongMaterial({ color: Colors.brown, flatShading: true })
    //         const wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat)
    //         wheelTireR.add(wheelAxis)
    //         this.mesh.add(wheelTireR)

    //         const wheelProtecL = wheelProtecR.clone()
    //         wheelProtecL.position.z = -wheelProtecR.position.z
    //         this.mesh.add(wheelProtecL)

    //         const wheelTireL = wheelTireR.clone()
    //         wheelTireL.position.z = -wheelTireR.position.z
    //         this.mesh.add(wheelTireL)

    //         const wheelTireB = wheelTireR.clone()
    //         wheelTireB.scale.set(0.5, 0.5, 0.5)
    //         wheelTireB.position.set(-35, -5, 0)
    //         this.mesh.add(wheelTireB)

    //         const suspensionGeom = new THREE.BoxGeometry(4, 20, 4)
    //         suspensionGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 10, 0))
    //         const suspensionMat = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })
    //         const suspension = new THREE.Mesh(suspensionGeom, suspensionMat)
    //         suspension.position.set(-35, -5, 0)
    //         suspension.rotation.z = -0.3
    //         this.mesh.add(suspension)

    //         // this.pilot = new Pilot()
    //         // this.pilot.mesh.position.set(-10, 27, 0)
    //         // this.mesh.add(this.pilot.mesh)

    //         this.mesh.castShadow = true
    //         this.mesh.receiveShadow = true
    //     }
    // }

    function createSpace() {
        space = new Space()
        space.mesh.position.y = 0
        scene.add(space.mesh)
    }

    function createPlanet() {
        planet = new Planet()
        planet.mesh.position.y = 20
        scene.add(planet.mesh)
    }

    function createAsteroid() {
        asteroid = new Asteroid()

        asteroid.loadModel().then(() => {
            const asteroidMesh = asteroid.getMesh() // Access the mesh using getMesh() method

            asteroidMesh.position.y = 120
            asteroidMesh.position.x = 35
            asteroidMesh.scale.set(15, 15, 15)
            scene.add(asteroidMesh)
        })
    }

    function createRocket() {
        const colors = [0xff0000, 0x00ff00, 0x0000ff]

        rocket = new Rocket()

        rocket.loadModel().then(() => {
            const rocketMesh = rocket.getMesh()
            rocketMesh.position.y = 130
            rocketMesh.position.x = -55
            rocketMesh.scale.set(2.2, 2.2, 2.2)
            rocketMesh.rotateZ(-4.8)
            rocketMesh.castShadow = true

            // rocketMesh.children[0].material.color.set(0xffffff)
            // rocketMesh.children[1].material.color.set(0xffffff)
            // rocketMesh.children[2].material.color.set(0xffffff)
            // rocketMesh.children[3].material.color.set(0xffffff)
            // rocketMesh.children[4].material.color.set(0xffffff)
            // rocketMesh.children[5].material.color.set(0x545454) //RocketUp
            // rocketMesh.children[6].material.color.set(0xffffff) // Fire
            // rocketMesh.children[7].material.color.set(0xffffff) // Fire
            // rocketMesh.children[8].material.color.set(0xa78bfa) // Window
            // rocketMesh.children[9].material.color.set(0x7b7b7b) // RocketMiddle
            // rocketMesh.children[10].material.color.set(0xc8c8c8) // CabinDown
            // rocketMesh.children[11].material.color.set(0xc8c8c8) // CabinUp
            // rocketMesh.children[12].material.color.set(0x545454) // RocketDown
            // rocketMesh.children[13].material.color.set(0xffb20c)
            // rocketMesh.children[14].material.color.set(0xffb300) // FireCentral
            // rocketMesh.children[15].material.color.set(0xc8c8c8) // FinsLeft
            // rocketMesh.children[16].material.color.set(0xffb300) // FinsRight
            // rocketMesh.children[17].material.color.set(0xffb300)
            // rocketMesh.children[18].material.color.set(0xc8c8c8) // FinsRight
            // rocketMesh.children[19].material.color.set(0xffb300)
            // rocketMesh.children[20].material.color.set(0xffb300)

            // rocketMesh.children[0].position.x = -0.5
            // Check and set material color for each child mesh
            // rocketMesh.traverse((child: THREE.Object3D) => {
            //     if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            //         // Access and modify the material color based on the index in the colors array
            //         console.log(child)

            //         const index = rocketMesh.children.indexOf(child)
            //         const color = colors[index] || 0x000000
            //         const material = child.material as THREE.MeshStandardMaterial
            //         child.castShadow = true
            //         material.color.set(color)
            //     }
            // })

            scene.add(rocketMesh)
        })
    }

    function updateDistance() {
        fieldDistance = document.getElementById('distValue') as HTMLElement

        game.distance -= 0.015 * deltaTime
        fieldDistance.innerHTML = Math.floor(game.distance).toString()
    }

    useEffect(() => {
        if (containerRef.current) {
            resetGame()
            createScene()
            createLights()
            createSpace()
            createPlanet()
            createAsteroid()
            createRocket()
            loop()
        }
    }, [])

    return (
        <div className="game-holder" id="gameHolder">
            <div className="absolute top-20 left-0 w-full h-[10vh]">
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
                        <span id="distValue" className="text-6xl block -tracking-[8px] text-center w-[155px]">
                            0
                        </span>
                        <small className="bg-violet-400 py-1 px-4 rounded-full self-center mt-2">años luz</small>
                    </div>
                    <div className="px-4">
                        <h1>Escudo</h1>
                        <svg className="text-white/30 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                            <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="world" ref={containerRef}></div>
        </div>
    )
}

export default GameScene
