import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const loadingManager = new THREE.LoadingManager();
// Also has onLoad, onProgress, onError
loadingManager.onStart = () => {
    console.log('onStart');
}
const textureLoader = new THREE.TextureLoader(loadingManager);
const checkerTexture = textureLoader.load('/textures/checkerboard-8x8.png');
const minecraftTexture = textureLoader.load('/textures/minecraft.png');
const colorTexture = textureLoader.load('/textures/door/color.jpg');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusonTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// // Splits the wrapping, and repeats the last pixel afterwards
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// // Prevent repeating last pixel, instead repeat the whole wrap
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// // Can also use THREE.MirroredRepeatWrapping
// // Offset:
// colorTexture.offset.x = 0.5;
// // Rotation
// // This will move from bottom left pivot point
// colorTexture.rotation = Math.PI / 4;
// // Change pivot point:
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// Minmapping 
colorTexture.minFilter = THREE.NearestFilter;
checkerTexture.minFilter = THREE.NearestFilter;

// When using minFilter = THREE.NearestFilter, we dont need mipmapping
minecraftTexture.generateMipmaps = false;
minecraftTexture.magFilter = THREE.NearestFilter;



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ map: minecraftTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

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

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()