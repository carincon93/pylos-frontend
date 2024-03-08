'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './styles.css'
import { Logo } from '../components/Logo'

interface Game {
    speed: number
    planetRadius: number
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
        space.moveStars()

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
        mesh: THREE.Mesh

        constructor() {
            const geom = new THREE.CylinderGeometry(600, 100, 1000, 100, 10)
            geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2))

            const mat = new THREE.MeshPhongMaterial({
                color: 0x68c3c0,
                transparent: true,
                opacity: 0.6,
                shading: THREE.FlatShading,
            })

            this.mesh = new THREE.Mesh(geom, mat)
            this.mesh.receiveShadow = true
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

    function createPlanet() {
        planet = new Planet()
        planet.mesh.position.y = -game.planetRadius
        scene.add(planet.mesh)
    }

    function createSpace() {
        space = new Space()
        space.mesh.position.y = -game.planetRadius
        scene.add(space.mesh)
    }

    useEffect(() => {
        if (containerRef.current) {
            resetGame()

            createScene()
            createLights()
            createSpace()
            createPlanet()
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
