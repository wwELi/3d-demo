
let renderer, scene, camera;

const width = 500 || window.innerWidth;
const height = 500 || window.innerHeight;

function init() {

    scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(50, 50, 50);
    const texture = new THREE.TextureLoader().load('./ozAXOWSYji_small.jpeg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    const light = new THREE.PointLight(0Xff0000);
    light.position.set(0, 0, 0);
    const ambi = new THREE.AmbientLight(0X444444);
    
    scene.add(light);
    scene.add(ambi);
    scene.add(mesh);

    camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
    camera.position.set(100, 100, 100);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0Xb9d3ff, 1);


    console.log(renderer);

    
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}

init();