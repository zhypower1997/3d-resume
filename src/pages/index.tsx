import styles from './index.less';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { useEffect } from 'react';
import { useRef } from 'react';

const path = require('../assets/models/plant.obj');

export default function IndexPage() {
  const threeEle = useRef(null);
  const init = () => {
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    camera.position.set(100, 200, 300); //位置

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x88ff54); //背景色
    scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000); //雾化

    const light = new THREE.HemisphereLight(0xffffff, 0x444444); //没有光线，将啥也看不到
    light.position.set(0, 200, 0);
    scene.add(light);

    var MtlLoader = new MTLLoader();
    var ObjLoader = new OBJLoader();

    MtlLoader.load(
      '../assets/models/Plastic_Cup-(Wavefront OBJ).mtl',
      (materials) => {
        materials.preload();
        ObjLoader.setMaterials(materials);
        ObjLoader.load(path.default, function (object) {
          console.log(object);
          object.children[0].scale.set(10, 10, 10);
          scene.add(object);
        });
      },
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    threeEle.current.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 100, 0);
    controls.update();
    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div ref={threeEle}>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
