const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera   = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
const scene    = new THREE.Scene();
const aix      = new THREE.AxesHelper(10);
const loader   = new THREE.TextureLoader();
const clock    = new THREE.Clock();
const wallTexture = new THREE.TextureLoader().load('../three.js-master/examples/textures/brick_diffuse.jpg');
const foolrTexture = new THREE.TextureLoader().load('../three.js-master/examples/textures/hardwood2_diffuse.jpg');

const panelWidth = 10;

const box      = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 100, 100, 100),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
)
const panelMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(panelWidth, panelWidth),
    new THREE.MeshPhongMaterial({ map: foolrTexture })
)
const walla = new THREE.Mesh(
    new THREE.PlaneGeometry(panelWidth, panelWidth / 2),
    new THREE.MeshPhongMaterial({ map: wallTexture })
)
walla.translateZ(- panelWidth / 2);
walla.translateY(panelWidth / 4);
walla.receiveShadow = true;

const wallb = new THREE.Mesh(
    new THREE.PlaneGeometry(panelWidth, panelWidth / 2),
    new THREE.MeshPhongMaterial({ map: wallTexture })
)
wallb.translateX(-panelWidth / 2);
wallb.rotateY(Math.PI / 2)
wallb.translateY(panelWidth / 4);
wallb.receiveShadow = true;

box.name = 'BOX';
box.translateY(2);
box.castShadow = true;
panelMesh.receiveShadow = true;
panelMesh.rotateX(- Math.PI / 2);

const wallGroup = new THREE.Group();
wallGroup.add(walla);
wallGroup.add(wallb);

const light    = new THREE.PointLight(0xffffff);
const amnit    = new THREE.AmbientLight(0x444444);
light.position.set(0, 0, 0);
light.castShadow= true;

camera.position.set(10, 10, 10);
camera.lookAt(scene.position);

scene.add(amnit);
scene.add(light);
scene.add(box);
scene.add(panelMesh);
scene.add(wallGroup);
scene.add(aix);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);


const colorKeyFrame  = new THREE.KeyframeTrack('BOX.material.color', [5, 10], [1, 1, 0, 1, 2, 10])
const keyFrame       = new THREE.KeyframeTrack('BOX.position', [0, 10, 20], [0, 2, 0, 4, 4, 4, 0, 2, 0]);
const scaleFrame     = new THREE.KeyframeTrack('.scale', [0, 10], [1, 1, 1, 1.5, 1.5, 1.5]);
const clip           = new THREE.AnimationClip('box', 20, [keyFrame, scaleFrame]);

const  mixer         = new THREE.AnimationMixer(box);
const action         = mixer.clipAction(clip);
// 动画播放速度
action.timeScale = 1.5;

let id = 0;

set.addEventListener('click', function() {
    console.log(lx.value, ly.value, lz.value);
    camera.lookAt(new THREE.Vector3(lx.value || 0, ly.value || 0, lz.value || 0));
})

play.addEventListener('click', function() {
    action.play();
    action.paused = false;
})
pause.addEventListener('click', function() {
    action.paused = true;
})

let prevMouseEvt = null;
let isActivedMouse = false;
window.addEventListener('mousedown', () => {
    isActivedMouse = true;
});

window.addEventListener('mouseup', () => {
    isActivedMouse = false;
    prevMouseEvt = null;
});

window.addEventListener('mousemove', (evt) => {
    if (!isActivedMouse) {
        return;
    }
    if (prevMouseEvt) {
        const movedx = evt.x - prevMouseEvt.x;
        const movedy = evt.y - prevMouseEvt.y;
        box.rotateY(movedx / 100)
        box.rotateX(movedy / 100)
    }

    prevMouseEvt = evt;
});

function render() {
    renderer.render(scene, camera);
}

function updateLight() {
    Math.sin(clock.getElapsedTime()) * 10
    light.position.set(Math.sin(clock.getElapsedTime() * .5) * 15, 10, Math.cos(clock.getElapsedTime() * .5) * 15);
}

function animate() {
    mixer.update(clock.getDelta());
    updateLight();
    render();
    id = requestAnimationFrame(animate);
}

animate();
