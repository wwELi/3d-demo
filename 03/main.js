// import x from '../three.js-master/examples/jsm/controls/OrbitControls';

const width = 1000;
const height = 800;

function init() {

    const scene = new THREE.Scene();

    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -5;
    plane.receiveShadow = true;

    scene.add(plane);

    const geometry = new THREE.BoxGeometry(5, 5, 5, 100, 100, 100);
    // const geometry = new THREE.SphereGeometry(5, 50, 50);
    const texture = new THREE.TextureLoader().load('./am.jpg');
    const material = new THREE.MeshLambertMaterial({
        // color: 0x0000ff,
        map: texture
    });

    // geometry.c

    // geometry.scale(0.6, 0.6, -0.6)

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0)
    mesh.castShadow = true;

    const light = new THREE.SpotLight(0xffffff, 1);
    light.castShadow = true;

    light.position.set(0, 0, 400);
    const ambi = new THREE.AmbientLight(0x777777);

    const axes = new THREE.AxisHelper(100);

    const sphereGeometry = new THREE.SphereGeometry(5, 40, 40);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0Xffffff,
        // transparent: true,
        opacity: 0.8,
        // wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // 设置位置
    // sphere.position.set(10, 10, 10);
    sphereGeometry.translate(0, 10, 10)

    const sphereGeometry2 = new THREE.SphereGeometry(5, 40, 40);
    const sphereMaterial2 = new THREE.PointsMaterial({
        color: 0X0000ff,
        // transparent: true,
        size: 200
        // wireframe: true
    });
    const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    // 设置位置
    // sphere.position.set(10, 10, 10);
    sphereGeometry2.translate(-10, -10, 0)

    const sphereGeometry3 = new THREE.SphereGeometry(5, 40, 40);
    const sphereMaterial3 = new THREE.LineDashedMaterial({
        color: 0X00ff00,
    });
    const sphere3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
    // 设置位置
    // sphere.position.set(10, 10, 10);
    sphereGeometry3.translate(10, -10, 0)


    const pointGeometry = new THREE.BoxGeometry(5, 5, 5);
    const pointMaterial = new THREE.PointsMaterial({ color: 0Xff0000 });
    const point = new THREE.Points(pointGeometry, pointMaterial)

    pointGeometry.rotateX(45)

    // scene.add(point);
    // scene.add(sphere);
    // scene.add(sphere2);
    // scene.add(sphere3);
    scene.add(axes);
    scene.add(light);
    scene.add(ambi);
    scene.add(mesh);

    scene.rotateX(-45)


    const camera = new THREE.PerspectiveCamera(100, width / height, 1.1, 1000);

    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);
    // camera.position.set(0, 0, 0.1);
    camera.position.z = 20;
    // camera.position.x = 20;
    camera.lookAt(scene.position)

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0Xb9d3ff, 1);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // const controls = new THREE.OrbitControls()


    function animate() {
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.01;
        mesh.rotation.z += 0.01;

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }

    setTimeout(() => {

            const controls = new THREE.OrbitControls(camera, renderer.domElement);
    }, 1000);


    animate();
}

// function init2() {

//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(0, 0, 10);
//     camera.lookAt(scene.position);
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor('#000');
//     document.body.appendChild(renderer.domElement);

//     //立方体 
//     var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), new THREE.MeshBasicMaterial({
//         color: 'green'
//     }));
//     scene.add(cube);

//     //坐标轴辅助
//     var axes = new THREE.AxisHelper(10);
//     scene.add(axes);

//     //动画
//     function updata() {
//         cube.rotation.y += 0.01;
//         axes.rotation.y += 0.01;
//         renderer.render(scene, camera);
//         requestAnimationFrame(updata);
//     }

//     updata();
// }


init();