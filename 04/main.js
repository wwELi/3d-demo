
let scene, camera, renderer
const width = window.innerWidth;
const height = window.innerHeight;

function initScene() {
    scene = new THREE.Scene();
    const axes = new THREE.AxisHelper(100);
    const box = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MultiMaterial(genMatterial());

    const mesh = new THREE.Mesh(box, material);
    // mesh.geometry.scale(1, 1, -1);
    box.scale(1, 1, -1);
    scene.position.set(0, 0, 0);
    scene.add(mesh);
    scene.add(axes);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
    camera.position.set(50, 50, 0.01);
    // camera.lookAt(1000, 1600, 1600);
}

function genMatterial() {
    const resource = ['f.jpeg', 'b.png', 'u.jpeg', 'd.jpeg', 'l.jpeg', 'r.jpeg'];

    return resource.map((filename) => {
        const map = new THREE.TextureLoader().load(`./image/${filename}`);
        map.needsUpdate = true;
        return new THREE.MeshBasicMaterial({ map });
    })
} 

function init() {

    initScene();
    initCamera();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
}

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(() => render())
}

init();
render();

setTimeout(() => {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}, 2000);