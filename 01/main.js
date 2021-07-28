console.log(THREE);

function init() {

    // 设置场景
    const scene = new THREE.Scene();

    // 设置灯光
    const light = new THREE.PointLight(0Xffffff);
    light.position.set(400, 0, 200);
    scene.add(light);
    const ambi = new THREE.AmbientLight(0X444444);
    scene.add(ambi);

    // 几何对象
    const geometry = new THREE.BoxGeometry(100, 100, 200);

    // 设置材质
    const material = new THREE.MeshLambertMaterial({
        color: 0X0000ff
    });
    // 设置网格模型
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // 相机
    const camera = new THREE.PerspectiveCamera(20, 500 / 500, 1, 1000);
    camera.position.set(100, 100, 500);
    camera.lookAt(scene.position);


    // 设置render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500)
    renderer.setClearColor(0Xb9d3ff, 1);
    console.log(renderer);
    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);

}


init();