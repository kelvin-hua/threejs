import './style.css';
import * as THREE from 'three';

// This is the container
const scene = new THREE.Scene();

// Mesh = combo of geometry and material
const cubeShape = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x1fc46a });
const cubeMesh = new THREE.Mesh(cubeShape, cubeMaterial);

scene.add(cubeMesh);

// Camera setup - Perspective (if far = small)
/* Params for Perspective:
- fov in degrees (vertical)
- aspect ratio (width/height)
*/
const sizes = {
    width: 800, 
    height: 600,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
