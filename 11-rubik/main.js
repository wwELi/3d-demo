
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera   = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
const scene    = new THREE.Scene();
const aix      = new THREE.AxesHelper(10);
const num = 3;
const width = 1;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);

camera.position.set(10, 10, 10);
camera.lookAt(scene.position);

const rubik = new THREE.Group();

for(let x = 0; x < num; x++) {
    for(let y = 0; y < num; y++) {
        for(let z = 0; z < num; z++) {

            const ms = ['#ff0000', '#ffffff', '#00ff00', '#ff00ff', '#0000ff', '#fff000'].map(color => {
                const canvas = document.createElement('canvas');
                canvas.width = 100;
                canvas.height = 100;
                const context = canvas.getContext('2d');
    
                context.lineWidth = 1;
                context.strokeStyle = '#000';
                context.strokeRect(0, 0, 100, 100);
                context.save();
                context.fillStyle = color;
                context.fillRect(1, 1, 98, 98);
                context.restore();
                return new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas)})
            });

            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(width, width, width),
                ms
            );
            mesh.position.set(getPositionByPoint(x), getPositionByPoint(y), getPositionByPoint(z));
            rubik.add(mesh);
        }
    }
}

console.log(rubik);

scene.add(rubik);
scene.add(aix);

function getPositionByPoint(i) {
    return i * width + width / 2;
}

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

document.getElementById('begin').addEventListener('click', function() {
    rotate('y', 2);
    rotate('y', 2);
    rotate('x', 3);
    rotate('x', 3);
    rotate('x', 1);
    rotate('z', 1);
    rotate('z', 2);
    rotate('z', 3);
});

function rotate(d, n) {
    const p = getPositionByPoint(n - 1);
    const items = rubik.children.filter(mesh => mesh.position[d] === p);
    const group = new THREE.Group();
    group.add(...items);
    group.rotateY(Math.PI / 2);
    scene.add(group);
}

setTimeout(() => {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}, 1000);

render();
