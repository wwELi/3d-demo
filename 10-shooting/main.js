const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera   = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
const scene    = new THREE.Scene();
const aix      = new THREE.AxesHelper(10);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0);
const pos = new THREE.Vector3();
const pWidth = 5;

const light    = new THREE.DirectionalLight(0xffffff);
const lH = new THREE.DirectionalLightHelper(light, 10, 0xff0000);
const amnit    = new THREE.AmbientLight(0x333333);
light.position.set(10, 10, 10);
light.castShadow = true;

const panelMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(pWidth, pWidth),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
const panelMeshL = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 2),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
panelMeshL.translateOnAxis(new THREE.Vector3(0, 1, -5), 5);
panelMesh.rotateX(-Math.PI / 2);
panelMesh.receiveShadow = true;

camera.position.set(0, 8, 8);
camera.lookAt(scene.position);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);

scene.add(light);
scene.add(amnit);
scene.add(aix);
scene.add(lH);
scene.add(panelMesh);
scene.add(panelMeshL);

window.addEventListener('click', function() {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    pos.copy(raycaster.ray.direction);
    pos.add(raycaster.ray.origin);

    const ball = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 100, 100),
        new THREE.MeshLambertMaterial({ color: 0xffff00 })
    )

    ball.castShadow = true;
    ball.name = 'ball';

    ball.position.copy(pos);
    pos.copy( raycaster.ray.direction );
    
    scene.add(ball);
})

function render() {
    scene.children.forEach(child => {
        if (child.name !== 'ball') {
            return;
        }

        if (!child.out && child.position.y <= 0.2) {

            if (Math.abs(child.position.x) > (pWidth / 2) || Math.abs(child.position.z) > (pWidth / 2)) {
                console.log('out');
                child.out = true;
                
            } else {

                pos.divide(new THREE.Vector3(1, -1, 1));
                pos.add(new THREE.Vector3(0, 0.01, 0));
                child.translateOnAxis(pos, 0.3);
                
                return;
            }
        }

        if (child.position.x < -20) {
            child.geometry.dispose();
            scene.remove(child);
            return;
        }
        pos.add(new THREE.Vector3(0, -0.002, 0));
        child.translateOnAxis(pos, 0.3);
    })


    renderer.render(scene, camera);
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

animate();
