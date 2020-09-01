const THREE = require('three');
const CANNON = require('cannon');

document.addEventListener('DOMContentLoaded', () => {

    main();
});

function main() {

    var renderer, camera, light, scene;
    var world;
    var cube, cubeBody;

    function init() {
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const clearColor = 0xE5E5E5;
        renderer.setClearColor(clearColor);
        document.body.appendChild(renderer.domElement);

        const fov = 75;
        const near = 0.1;
        const far = 50;
        let aspect = window.innerWidth / window.innerHeight;

        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        scene = new THREE.Scene();

        const lightColor = 0xFFFFFF;
        const intensity = 1;
        light = new THREE.DirectionalLight(lightColor, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    function addObjects() {

        world = new CANNON.World();
        world.broadphase = new CANNON.NaiveBroadphase();
        world.gravity.set(0, 0, -9.81);

        var cubeShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        var cubeMaterial = new CANNON.Material();
        cubeBody = new CANNON.Body({
            mass: 5,
            postition: new CANNON.Vec3(0, 0, 10),
            shape: cubeShape,
            material: cubeMaterial
        });
        world.addBody(cubeBody);

        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshPhongMaterial( { color: 0x00fff0 } );
        cube = new THREE.Mesh( geometry, material );
    
        scene.add(cube);

        var socket = io();
    }

    function animate() {
        requestAnimationFrame(animate);
        
        cube.position.copy(cubeBody.position);

        world.step(1/60);

        renderer.render(scene, camera);
    }
 
    init();
    addObjects();
    animate();
}

