import * as THREE from '/libs/three.module.js';
import { OrbitControls } from '/libs/OrbitControls.js';

let renderer, scene, camera, controls;

/**
 * Function to initialize THREE.js
 * @returns {void} Void.
 */
 const setupTHREE = () => {
    // Create THREE.js renderer object.
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.getElementById(`three-canvas`)
    });
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create the Scene.
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Create the Camera.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Create controls.
    controls = new OrbitControls(camera, renderer.domElement);
    controls.zoomSpeed = 2;

    // Bind window resize to update viewport.
    $(window).on(`resize`, () => updateViewport());
};

/**
 * Updates the camera and renderer based on the vieweport.
 * @returns {void} Void.
 */
const updateViewport = () => {
    if (renderer) renderer.setSize(window.innerWidth, window.innerHeight);
    if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
};

/**
 * Generate a random block array.
 * @param {number} totalBlocks The number of blocks to generate.
 * @param {number} maxX The maximum X coordinate for blocks to be set to.
 * @param {number} maxY The maximum Y coordinate for blocks to be set to.
 * @param {number} maxZ The maximum Z coordinate for blocks to be set to.
 * @returns {object[]} Blocks array.
 */
const createBlockArray = (totalBlocks, maxX, maxY, maxZ) => {
    const blocks = [];
    for (let i = 0; i < totalBlocks; i++) blocks.push({
        position: {
            x: Math.floor(Math.random() * (maxX)),
            y: Math.floor(Math.random() * (maxY)),
            z: Math.floor(Math.random() * (maxZ)),
        },
        geometry: null
    });
    return blocks;
};

/**
 * Adds blocks from a provided blocks array to the scene.
 * @param {object[]} blocks Blocks array to be added.
 * @returns {void} Void.
 */
 const addBlocksToScene = (blocks) => {
    // Create initial bounds.
    const bounds = {
        largest: {
            x: 0,
            y: 0,
            z: 0
        },
        smallest: {
            x: 0,
            y: 0,
            z: 0
        }
    };

    // Create geometries array.
    const geometries = [];

    // Iterate through all blocks.
    for (const block of blocks) {
        // Create block geometry.
        block.geometry = new THREE.BoxGeometry();

        // Create a matrix to set the geometry position.
        const matrix = new THREE.Matrix4();
        matrix.makeTranslation(block.position.x, block.position.y, block.position.z);
        block.geometry.applyMatrix4(matrix);

        // Push the geometry to the geometries array.
        geometries.push(block.geometry);

        // Calculate bounds.
        if (bounds.largest.x < block.position.x) bounds.largest.x = block.position.x;
        if (bounds.largest.y < block.position.y) bounds.largest.y = block.position.y;
        if (bounds.largest.z < block.position.z) bounds.largest.z = block.position.z;
        if (bounds.smallest.x > block.position.x) bounds.smallest.x = block.position.x;
        if (bounds.smallest.y > block.position.y) bounds.smallest.y = block.position.y;
        if (bounds.smallest.z > block.position.z) bounds.smallest.z = block.position.z;
    };

    // Generate merged geometry and add to scene.
    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    const mesh = new THREE.Mesh(mergedGeometry, material);
    scene.add(mesh);

    // Set controls and camera values
    controls.target = new THREE.Vector3(
        (bounds.largest.x + bounds.smallest.x) / 2,
        (bounds.largest.y + bounds.smallest.y) / 2,
        (bounds.largest.z + bounds.smallest.z) / 2
    );
    camera.position.set(bounds.largest.x * 1.5, bounds.largest.y * 1.5, bounds.largest.z * 1.5);
    camera.far = ((bounds.largest.x - bounds.smallest.x) + (bounds.largest.y - bounds.smallest.y) + (bounds.largest.z - bounds.smallest.z)) * 20;
};

/**
 * Function to render the scene.
 * @returns {void} Void.
 */
const animate = () => {
    requestAnimationFrame(animate);

    camera.updateProjectionMatrix();
    controls.update();
    renderer.clear();
    renderer.render(scene, camera);
};

/* Call methods */
setupTHREE();
addBlocksToScene(createBlockArray(1e4, 1e3, 1e3, 1e3));
updateViewport();
animate();
