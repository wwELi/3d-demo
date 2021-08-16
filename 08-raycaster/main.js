const renderer = new THREE.WebGLRenderer();
const camera   = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
const scene    = new THREE.Scene();
const aix      = new THREE.AxesHelper(40);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0);

const amout = 10;
const radius = 1;

const box      = new THREE.InstancedMesh(
    new THREE.SphereGeometry(radius, 100, 100),
    new THREE.MeshBasicMaterial(),
    Math.pow(amout, 3)
)

// box.position.set(-10, -10, -10)
const matrix4 = new THREE.Matrix4();
const color = new THREE.Color();

let i = 0;

for(let x = 0; x < amout; x++) {
    for(let y = 0; y < amout; y++) {
        for(let z = 0; z < amout; z++) {
            matrix4.setPosition(x * radius * 2, y * radius * 2, z * radius * 2);
            box.setMatrixAt(i, matrix4);
            box.setColorAt(i, color.setHex(Math.random() * 0xffffff));
            i++;
        }
    }
}

camera.position.set(50, 50, 50);
camera.lookAt(scene.position);

scene.add(box);
scene.add(aix);

renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

window.addEventListener('mousedown', onMouseMove)

function onMouseMove( event ) {

	// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
        // 通过摄像机和鼠标位置更新射线
        raycaster.setFromCamera( mouse, camera );

        // 计算物体和射线的焦点
        const intersects = raycaster.intersectObject( box );
        const id = intersects[0].instanceId;
        box.setColorAt(id, color.setHex(0xffffff));
        box.instanceColor.needsUpdate = true;
    
        render();
}

function render() {
    renderer.render(scene, camera);
}

render();
