
const width = 1200;
const height = 800;

const planeMeshPZ = -4;
const ballRadius = 0.4;

const textureLoader = new THREE.TextureLoader();
const clock = new THREE.Clock();

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
// const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);

const ball = new THREE.SphereGeometry(ballRadius, 150, 150);
const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
const ballMesh = new THREE.Mesh(ball, ballMaterial);
ballMesh.castShadow = true;
// ballMesh.position.z = 1;
ballMesh.geometry.translate(0, 0, 4);

const plane = new THREE.PlaneGeometry(8, 8, 10, 8);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x888888, map: textureLoader
    .load('../three.js-master/examples/textures/floors/FloorsCheckerboard_S_Diffuse.jpg',() => draw()) });
const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.position.set(0, 0, planeMeshPZ);
planeMesh.receiveShadow = true;


const light = new THREE.DirectionalLight(0Xffffff, 0.7);
light.position.set(-5, 6, 9);
light.castShadow = true;
const ambi = new THREE.AmbientLight(0Xcccccc);

const axes = new THREE.AxesHelper(40);

scene.add(axes);
scene.add(light);
scene.add(ambi);
scene.add(planeMesh);
scene.add(ballMesh);

camera.position.set(0, -14, 2);
camera.lookAt(new THREE.Vector3(0, 0, 0));


renderer.shadowMapEnabled = true;
renderer.setSize(width, height);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

document.getElementById('begin').addEventListener('click', function() {
    down();
});
document.getElementById('cancel').addEventListener('click', function() {
    cancelAnimationFrame(id);
});

window.addEventListener('keydown', function(evt) {
    console.log(evt.keyCode);

    switch (evt.keyCode) {
        case 37:
            ballMesh.geometry.translate(-0.2, 0, 0);
            draw();
            break;
        case 39:
            ballMesh.geometry.translate(0.2, 0, 0);
            draw();
            break;
        case 38:
            ballMesh.geometry.translate(0, .2, 0);
            draw();
            break;
        case 40:
            ballMesh.geometry.translate(0, -.2, 0);
            draw();
            break;
    
        default:
            break;
    }

})

function draw() {
    renderer.render(scene, camera);
}

let v = 0.2;
let h = 4;
let id = null;

console.log(ballMesh);
ballMesh.geometry.translate(0, 0, -2);
draw();
console.log(ballMesh);

function down() {
    console.log(clock.getElapsedTime());
    v += 0.001
    id = requestAnimationFrame(() => {
        ballMesh.geometry.computeBoundingSphere();
        if (ballMesh.geometry.boundingSphere.center.z <= (planeMeshPZ + ballRadius + 0.05)) {
            cancelAnimationFrame(id);
            return;
        }
        ballMesh.geometry.translate(0, 0, -v);
        draw();
        down();
    });
}

draw();

