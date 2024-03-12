'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// import { Logo } from '../components/Logo'
import './styles.css'

interface Game {
    speed: number

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

        renderer.render(scene, camera)

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

            const mat = new THREE.MeshPhongMaterial({
                color: 0xe4505b,
                transparent: true,
                opacity: 0.8,
                flatShading: true,
            })

            this.mesh = new THREE.Mesh(mergedGeometry, mat)
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

    class Star {
        mesh: THREE.Mesh | null

        constructor() {
            this.mesh = new THREE.Mesh()
        }

        loadModel() {
            return new Promise<void>((resolve) => {
                const loader = new GLTFLoader()

                loader.load(
                    '/models/Star.glb',
                    (gltf) => {
                        const root = gltf.scene

                        this.mesh = root.children[0] as THREE.Mesh // Set mesh after loading

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

        rotate() {
            if (this.mesh) {
                this.mesh.rotation.y += Math.random() * 0.025
                this.mesh.rotation.z += Math.random() * 0.02
            }
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

                    if (star.mesh) {
                        if (star.mesh.material instanceof THREE.MeshStandardMaterial) {
                            star.mesh.material.color.set(0xff0000) // Set red color
                        }
                        star.mesh.position.set(x, y, z) // Set position
                        const s = 10 + Math.random() * 30 // Random scale between 10 and 40
                        star.mesh.scale.set(s, s, s) // Set scale
                        this.mesh.add(star.mesh) // Add star mesh to space mesh
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

    class Asteroid {
        mesh: THREE.Group
        material: THREE.MeshStandardMaterial

        constructor() {
            this.material = new THREE.MeshStandardMaterial({ color: 0xcccccc })

            this.mesh = new THREE.Group()
            this.createAsteroid()
            // this.addLights()

            // this.animate()
        }

        private createAsteroid() {
            const numFragments = 6

            for (let i = 0; i < numFragments; i++) {
                const fragment = this.createFragment()
                fragment.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3)
                fragment.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)

                this.mesh.add(fragment)
            }
        }

        private createFragment(): THREE.Mesh {
            const geometry = new THREE.BoxGeometry(0.5 + Math.random(), 0.5 + Math.random(), 0.5 + Math.random())
            const fragment = new THREE.Mesh(geometry, this.material)
            return fragment
        }

        animate() {
            this.mesh.rotation.x += 0.01
            this.mesh.rotation.y += 0.01
        }
    }

    class Rocket {
        mesh: THREE.Object3D
        propeller: THREE.Mesh
        // pilot: Pilot

        constructor() {
            this.mesh = new THREE.Object3D()
            this.mesh.name = 'airPlane'

            // Cabin
            const geomCabin = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1)
            const matCabin = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })

            // geomCabin.vertices[4].y -= 10
            // geomCabin.vertices[4].z += 20
            // geomCabin.vertices[5].y -= 10
            // geomCabin.vertices[5].z -= 20
            // geomCabin.vertices[6].y += 30
            // geomCabin.vertices[6].z += 20
            // geomCabin.vertices[7].y += 30
            // geomCabin.vertices[7].z -= 20

            const cabin = new THREE.Mesh(geomCabin, matCabin)
            cabin.castShadow = true
            cabin.receiveShadow = true
            this.mesh.add(cabin)

            // Engine
            const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1)
            const matEngine = new THREE.MeshPhongMaterial({ color: Colors.white, flatShading: true })
            const engine = new THREE.Mesh(geomEngine, matEngine)
            engine.position.x = 50
            engine.castShadow = true
            engine.receiveShadow = true
            this.mesh.add(engine)

            // Tail Plane
            const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1)
            const matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })
            const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane)
            tailPlane.position.set(-40, 20, 0)
            tailPlane.castShadow = true
            tailPlane.receiveShadow = true
            this.mesh.add(tailPlane)

            // Wings
            const geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1)
            const matSideWing = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })
            const sideWing = new THREE.Mesh(geomSideWing, matSideWing)
            sideWing.position.set(0, 15, 0)
            sideWing.castShadow = true
            sideWing.receiveShadow = true
            this.mesh.add(sideWing)

            const geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1)
            const matWindshield = new THREE.MeshPhongMaterial({ color: Colors.white, transparent: true, opacity: 0.3, flatShading: true })
            const windshield = new THREE.Mesh(geomWindshield, matWindshield)
            windshield.position.set(5, 27, 0)
            windshield.castShadow = true
            windshield.receiveShadow = true
            this.mesh.add(windshield)

            const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
            // geomPropeller.vertices[4].y -= 5
            // geomPropeller.vertices[4].z += 5
            // geomPropeller.vertices[5].y -= 5
            // geomPropeller.vertices[5].z -= 5
            // geomPropeller.vertices[6].y += 5
            // geomPropeller.vertices[6].z += 5
            // geomPropeller.vertices[7].y += 5
            // geomPropeller.vertices[7].z -= 5

            const matPropeller = new THREE.MeshPhongMaterial({ color: Colors.brown, flatShading: true })
            this.propeller = new THREE.Mesh(geomPropeller, matPropeller)
            this.propeller.castShadow = true
            this.propeller.receiveShadow = true

            const geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1)
            const matBlade = new THREE.MeshPhongMaterial({ color: Colors.brownDark, flatShading: true })
            const blade1 = new THREE.Mesh(geomBlade, matBlade)
            blade1.position.set(8, 0, 0)
            blade1.castShadow = true
            blade1.receiveShadow = true
            const blade2 = blade1.clone()
            blade2.rotation.x = Math.PI / 2
            blade2.castShadow = true
            blade2.receiveShadow = true
            this.propeller.add(blade1)
            this.propeller.add(blade2)
            this.propeller.position.set(60, 0, 0)
            this.mesh.add(this.propeller)

            const wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1)
            const wheelProtecMat = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })
            const wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat)
            wheelProtecR.position.set(25, -20, 25)
            this.mesh.add(wheelProtecR)

            const wheelTireGeom = new THREE.BoxGeometry(24, 24, 4)
            const wheelTireMat = new THREE.MeshPhongMaterial({ color: Colors.brownDark, flatShading: true })
            const wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat)
            wheelTireR.position.set(25, -28, 25)

            const wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6)
            const wheelAxisMat = new THREE.MeshPhongMaterial({ color: Colors.brown, flatShading: true })
            const wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat)
            wheelTireR.add(wheelAxis)
            this.mesh.add(wheelTireR)

            const wheelProtecL = wheelProtecR.clone()
            wheelProtecL.position.z = -wheelProtecR.position.z
            this.mesh.add(wheelProtecL)

            const wheelTireL = wheelTireR.clone()
            wheelTireL.position.z = -wheelTireR.position.z
            this.mesh.add(wheelTireL)

            const wheelTireB = wheelTireR.clone()
            wheelTireB.scale.set(0.5, 0.5, 0.5)
            wheelTireB.position.set(-35, -5, 0)
            this.mesh.add(wheelTireB)

            const suspensionGeom = new THREE.BoxGeometry(4, 20, 4)
            suspensionGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 10, 0))
            const suspensionMat = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: true })
            const suspension = new THREE.Mesh(suspensionGeom, suspensionMat)
            suspension.position.set(-35, -5, 0)
            suspension.rotation.z = -0.3
            this.mesh.add(suspension)

            // this.pilot = new Pilot()
            // this.pilot.mesh.position.set(-10, 27, 0)
            // this.mesh.add(this.pilot.mesh)

            this.mesh.castShadow = true
            this.mesh.receiveShadow = true
        }
    }

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
        asteroid.mesh.position.y = 130
        asteroid.mesh.scale.set(4, 4, 4)
        scene.add(asteroid.mesh)
    }

    function createRocket() {
        rocket = new Rocket()
        rocket.mesh.scale.set(0.25, 0.25, 0.25)
        rocket.mesh.position.y = 120
        rocket.mesh.position.x = -30
        scene.add(rocket.mesh)
    }

    useEffect(() => {
        if (containerRef.current) {
            resetGame()

            createScene()
            createLights()
            createSpace()
            createPlanet()
            createAsteroid()
            // createRocket()
            loop()
        }
    }, [])

    return (
        <div className="game-holder" id="gameHolder">
            <div>{/* <Logo className="text-white w-40 h-auto" /> */}</div>
            <div className="world" ref={containerRef}></div>
        </div>
    )
}

export default GameScene
