const renderer = new THREE.WebGLRenderer();
const camera   = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
const scene    = new THREE.Scene();
const aix      = new THREE.AxesHelper(10);
const loader   = new THREE.TextureLoader();

const box      = new THREE.Mesh(
    new THREE.SphereGeometry(1, 100, 100),
    new THREE.MeshLambertMaterial({ map: loader.load('../three.js-master/examples/textures/kandao3.jpg') })
)

const light    = new THREE.DirectionalLight(0xffffff);
const amnit    = new THREE.AmbientLight(0x333333);
light.position.set(0, 0, 5);

scene.add(amnit);
scene.add(light);
scene.add(box);
scene.add(aix);

let      deg = 0;
const radius = 6;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


function render() {
    renderer.render(scene, camera);
}

function animate() {
    deg++;
    const angle = Math.PI / 180 * deg;
    camera.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    camera.lookAt(box.position);
    render();

    requestAnimationFrame(animate);
}

animate();
