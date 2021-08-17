
class Player {

    _header = null;
    _body = null;
    _player = null;
    _render = null;

    isJumping = false;

    constructor(_render) {
        this._render = render;
        this._player = new THREE.Group();

        this._header = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 50, 100, 100),
            new THREE.MeshLambertMaterial({ color: 0x444444 })
        )
        this._header.castShadow = true;
        
        this._body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 1, 1.5, 200, 200),
            new THREE.MeshLambertMaterial({ color: 0x444444 })
        )
        this._body.castShadow = true;

        this._header.translateY(1.2);

        this._player.add(this._header, this._body);

        this.player.translateY(1.5);
        this.initEvent();
    }

    get player() {
        return this._player;
    }

    initEvent() {
        let isPresss = false;
        let startTime = null;

        window.addEventListener('mousedown', () => {
            isPresss = true;
            startTime = Date.now();
            this.press();
        });

        window.addEventListener('mouseup', () => {
            if (!isPresss) {
                return;
            }
            isPresss = false;
            const castTime = Date.now() - startTime;
            this.jump(castTime);
        });
    }

    press() {
        this.player.scale.y = 0.8;
        render();
    }

    jump(time) {

        if (this.isJumping) {
            return;
        }

        this.player.scale.y = 1;
        this.isJumping = true;
        
        let id = null;
        let i = 0;

        const distance = time / 1000;
        const oldYDistance = this.player.position.y;
        
        const  run = () => {

            const y = Math.sin((2 * Math.PI / distance) * Math.abs(i)) * 0.6;

            this.player.translateZ(i);
            this.player.translateY(y);

            this._render();
            id = requestAnimationFrame(run);

            i = i + -0.01;
            if (this.player.position.y < oldYDistance || Math.abs(i) > distance) {
                const dy = oldYDistance - this.player.position.y;
                this.player.translateY(dy);
                this._render();
                
                setTimeout(() => {
                    scene.translateZ(10);
                    render();
                    
                    this.isJumping = false;
                }, 500)
                cancelAnimationFrame(id);
            }
        }

        run();
        
    }

    animate() {
        const keyFrame = new THREE.KeyframeTrack('.position[z]', [0, 1], [this.player.position.z, 0]);
        const clip = new THREE.AnimationClip('player', 20, [keyFrame]);
        const mixer = new THREE.AnimationMixer(this.player);
        const action = mixer.clipAction(clip);
        let id = null;

        const run = () => {
            mixer.update(clock.getDelta());
            this._render();

            id = requestAnimationFrame(run);
            if (this.player.position.z === 0) {
                cancelAnimationFrame(id);
            }
        }
        
        action.timeScale = 2;
        action.play();
        run();

    }
}


const player  = new Player(render);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera   = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
const scene    = new THREE.Scene();
const aix      = new THREE.AxesHelper(10);
const clock    = new THREE.Clock();
const light    = new THREE.PointLight(0xffffff);
const amnit    = new THREE.AmbientLight(0x000000);
light.position.set(40, 40, 20);
light.castShadow= true;

const panelMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 180),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);

const p1 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2),
    new THREE.MeshLambertMaterial({ color: 0xffff00 })
);

const p2 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2),
    new THREE.MeshLambertMaterial({ color: 0xffff00 })
);

const p3 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2),
    new THREE.MeshLambertMaterial({ color: 0xffff00 })
);

const panelGroup = new THREE.Group();
panelGroup.add(p1, p2, p3, panelMesh);

p1.rotateX(-Math.PI / 2);
p2.rotateX(-Math.PI / 2);
p3.rotateX(-Math.PI / 2);
p2.position.z = -8;
p3.position.z = -20;

panelMesh.rotateX(-Math.PI / 2);
panelMesh.receiveShadow = true;

camera.position.set(20, 20, 20);
camera.lookAt(scene.position);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);

scene.add(player.player);
// scene.add(aix);
scene.add(panelGroup);
scene.add(amnit);
scene.add(light);

function render() {
    renderer.render(scene, camera);
}

render();


