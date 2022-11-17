import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';

function resize(){
    renderer.setPixelRatio(window.devicePixelRatio);
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;

    if(camera.isOrthographicCamera){
        const cameraHeight = 2;

        camera.left = -cameraHeight / 2 * width / height;
        camera.right = cameraHeight / 2 * width / height;
        camera.top = cameraHeight / 2;
        camera.bottom = -cameraHeight / 2;
    }
    camera.updateProjectionMatrix();
}

//SETTING UP THREE.JS SCENE.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 1000 );
// const camera = new THREE.OrthographicCamera();

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize(document.body.clientWidth, document.body.clientHeight);
document.body.appendChild( renderer.domElement );
resize();

camera.position.set(1, 1, 1);
camera.lookAt(new THREE.Vector3);

// ADDING CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

const mouse = new THREE.Vector2(0, 0);

// ADDING STATS BOX
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const gui = new GUI();

const size = 1;
const divisions = 10;
const grid = new THREE.GridHelper(size, divisions);
scene.add(grid);
const axesHelper = new THREE.AxesHelper(1);
scene.add( axesHelper );

window.addEventListener('resize', e => {
    resize();
});

window.addEventListener('mousemove', e => {
    mouse.x = ((e.clientX) / document.body.clientWidth) * 2 - 1;
    mouse.y = - ((e.clientY) / document.body.clientHeight) * 2 + 1;

});

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), [
    new THREE.MeshBasicMaterial({color: 0xff0000}),
    new THREE.MeshBasicMaterial({color: 0x00ff00}),
    new THREE.MeshBasicMaterial({color: 0x0000ff}),
    new THREE.MeshBasicMaterial({color: 0xffff00}),
    new THREE.MeshBasicMaterial({color: 0xff00ff}),
    new THREE.MeshBasicMaterial({color: 0x00ffff}),
]);
scene.add(cube);
cube.position.y = 0.25;

// CREATING ANIMATION LOOP.
function animate() {
    stats.begin();

    requestAnimationFrame( animate );

    // UPDATING CONTROLS.
    controls.update();

    // RENDERING SCENE.
    renderer.render( scene, camera );

    stats.end();
};
animate();