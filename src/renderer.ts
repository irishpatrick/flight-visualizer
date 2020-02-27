declare global
{
    interface Window { THREE: any; }
}

import { Model } from "./Model";
import { CSV } from "./CSV";

const { fs } = require("fs");
const { dialog } = require("electron").remote;

var THREE = require("three");
window.THREE = THREE;
require("three/examples/js/loaders/GLTFLoader");

let renderer: any;
let scene: any;
let camera: any;

let cube: any;
let light: any;

let test: Model;
let data: CSV;

let vehicle: any;

let playing: boolean = false;
let ms: any = [];
let rx: any = [];
let ry: any = [];
let rz: any = [];
let clk: number = 0;

window.addEventListener("resize", () =>
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

function dtr(d: number)
{
    return d * (Math.PI / 180.0);
}

function init()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    data = new CSV();
    dialog.showOpenDialog({properties: ["openFile"]}).then((val) =>
    {
        data.open(val.filePaths[0]);
    });
}

function setup()
{
    vehicle = undefined;
    let loader = new THREE.GLTFLoader();
    loader.load("./assets/vehicle.glb", (gltf: any) =>
    {
        vehicle = gltf.scene;
        scene.add(gltf.scene);
    });

    light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.x = 1;
    light.position.z = 1;
    light.position.y = 1;
    scene.add(light);

    var amb = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(amb);

    camera.position.z = 8;
    //camera.position.y = 4;
}

function update()
{

    if (!playing)
    {
        if (data.isReady())
        {
            ms = data.getCol(0);
            rx = data.getCol(1);
            ry = data.getCol(2);
            rz = data.getCol(3);
            playing = true;
        }
    }
    else
    {
        if (vehicle == undefined)
        {
            return;
        }

        let pt: any = Math.floor(clk / 10);

        vehicle.rotation.x = dtr(rx[pt]);
        vehicle.rotation.y = dtr(ry[pt]);
        vehicle.rotation.z = dtr(rz[pt]);

        clk++;
    }
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
