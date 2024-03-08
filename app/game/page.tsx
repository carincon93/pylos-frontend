'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import './styles.css'
// import { Logo } from '../components/Logo'

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
                shading: THREE.FlatShading,
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
        mesh: THREE.Object3D

        constructor() {
            this.mesh = new THREE.Object3D()
            this.mesh.name = 'star'

            const geom = new THREE.BoxGeometry(2, 1.5, 0)
            const mat = new THREE.MeshPhongMaterial({
                color: Colors.white,
            })

            const nBlocs = 40 + Math.floor(Math.random() * 20)
            for (let i = 0; i < nBlocs; i++) {
                const m = new THREE.Mesh(geom.clone(), mat)
                m.position.x = i * 15
                m.position.y = Math.random() * 10
                m.position.z = Math.random() * 10
                m.rotation.z = Math.random() * Math.PI * 2
                m.rotation.y = Math.random() * Math.PI * 2
                const s = 0.1 + Math.random() * 0.9
                m.scale.set(s, s, s)
                this.mesh.add(m)
                m.castShadow = true
                m.receiveShadow = true
            }
        }

        rotate() {
            const l = this.mesh.children.length
            for (let i = 0; i < l; i++) {
                const m = this.mesh.children[i] as THREE.Mesh
                m.rotation.z += Math.random() * 0.005 * (i + 1)
                m.rotation.y += Math.random() * 0.002 * (i + 1)
            }
        }
    }

    class Space {
        mesh: THREE.Object3D
        nStars: number
        stars: Star[]

        constructor() {
            this.mesh = new THREE.Object3D()
            this.nStars = 100
            this.stars = []
            const stepAngle = (Math.PI * 2) / this.nStars

            for (let i = 0; i < this.nStars; i++) {
                const star = new Star()
                this.stars.push(star)
                const a = stepAngle * i
                const h = game.planetRadius + 20 + Math.random() * 200
                star.mesh.position.y = Math.sin(a) * h
                star.mesh.position.x = Math.cos(a) * h
                star.mesh.position.z = -300 - Math.random() * 500
                star.mesh.rotation.z = a + Math.PI / 2
                const s = 1 + Math.random() * 2
                star.mesh.scale.set(s, s, s)
                this.mesh.add(star.mesh)
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
        mesh: THREE.Group
        material: THREE.MeshStandardMaterial

        constructor() {
            this.material = new THREE.MeshStandardMaterial({ color: 0xcccccc })

            this.mesh = new THREE.Group()

            this.createRocket()
        }

        private createRocket() {
            const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 6)
            const body = new THREE.Mesh(bodyGeometry, this.material)
            this.mesh.add(body)

            const coneGeometry = new THREE.CylinderGeometry(0.2, 0, 0.5, 6)
            const cone = new THREE.Mesh(coneGeometry, this.material)
            cone.position.y = 1.5
            this.mesh.add(cone)

            const wingGeometry = new THREE.BoxGeometry(1, 0.1, 0.1)
            const wing1 = new THREE.Mesh(wingGeometry, this.material)
            wing1.position.set(0.5, 0.8, 0)
            this.mesh.add(wing1)

            const wing2 = new THREE.Mesh(wingGeometry, this.material)
            wing2.position.set(-0.5, 0.8, 0)
            this.mesh.add(wing2)

            this.mesh.scale.set(4, 4, 4)
        }
    }

    function createPlanet() {
        planet = new Planet()
        planet.mesh.position.y = 20
        scene.add(planet.mesh)
    }

    function createSpace() {
        space = new Space()
        space.mesh.position.y = -game.planetRadius
        scene.add(space.mesh)
    }

    function createAsteroid() {
        asteroid = new Asteroid()
        asteroid.mesh.position.y = 130
        asteroid.mesh.scale.set(4, 4, 4)
        scene.add(asteroid.mesh)
    }

    function createRocket() {
        rocket = new Rocket()
        rocket.mesh.position.y = 100
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
