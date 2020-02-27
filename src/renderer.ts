import { Model } from "./Model";
import { CSV } from "./CSV";

const { fs } = require("fs");
const { dialog } = require("electron").remote;

var THREE = require("three")

let renderer: any;
let scene: any;
let camera: any;

let cube: any;

let test: Model;
let data: CSV;

function init()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    data = new CSV();
    dialog.showOpenDialog({properties: ["openFile"]}, (fn: string) => {
        console.log(fn[0]);
        data.open(fn[0]);
    });
}

function setup()
{
    var geo = new THREE.BoxGeometry(1, 1, 1);
    var mat = new THREE.MeshBasicMaterial({color: 0xff00ff});
    cube = new THREE.Mesh(geo, mat);
    scene.add(cube);

    camera.position.z = 4;
    //camera.position.y = 4;
}

function update()
{
    cube.rotation.y += 0.01;
}

function animate()
{
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}

init();
setup();
animate();
