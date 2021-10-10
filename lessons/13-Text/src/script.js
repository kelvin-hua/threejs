import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTexture = textureLoader.load('/textures/matcaps/4.png');

// scene.add(new THREE.AxesHelper(3));

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 2
camera.position.z = 4
scene.add(camera)


const fontLoader = new THREE.FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
            'Hello',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 2,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) / 2, // Makes up for the bevel difference
        //     - (textGeometry.boundingBox.max.y - 0.02) / 2,
        //     - (textGeometry.boundingBox.max.z - 0.03) / 2
        // )
        textGeometry.center();
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
        // textMaterial.wireframe = true;
        const text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);
        camera.lookAt(text.position);

        console.time('donuts');
        const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
        
        for(let i=0; i<100; i++) {
            const donut = new THREE.Mesh(donutGeometry, textMaterial);

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            donut.scale.set(scale, scale, scale);
            scene.add(donut);
        }
        console.timeEnd('donuts');
    }
)



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    camera.position.x = Math.sin(elapsedTime);
    camera.position.y = Math.cos(elapsedTime);

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()