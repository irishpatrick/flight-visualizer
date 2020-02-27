import { Model } from "./Model";
import { CSV } from "./CSV";

const { fs } = require("fs");
const { dialog } = require("electron").remote;

const THREE = require("three")

let renderer: any;
let scene: any;
let camera: any;

let cube: any;
let light: any;

let test: Model;
let data: CSV;

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
    var geo = new THREE.BoxGeometry(1, 1, 1);
    var mat = new THREE.MeshLambertMaterial({color: 0xff00ff});
    cube = new THREE.Mesh(geo, mat);
    scene.add(cube);

    light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.x = 1;
    light.position.z = 1;
    light.position.y = 1;
    scene.add(light);

    var amb = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(amb);

    camera.position.z = 4;
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
        let pt: any = Math.floor(clk / 10);

        cube.rotation.x = dtr(rx[pt]);
        cube.rotation.y = dtr(ry[pt]);
        cube.rotation.z = dtr(rz[pt]);

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
