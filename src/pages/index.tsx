import styles from './index.less';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useEffect } from 'react';
import { useRef } from 'react';

const path = require('../assets/models/my_project.glb');

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

    var ObjLoader = new GLTFLoader();

    ObjLoader.load(
      path.default,
      function (object) {
        console.log(object);
        object.scene.rotation.set(100, 0, 0);
        object.scene.scale.set(50, 50, 50);
        object.scene.position.set(
          object.scene.position.x,
          object.scene.position.y + 150,
          object.scene.position.z + 100,
        );

        scene.add(object.scene);
      },
      (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
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
      <h1 className={styles.title}>起步！</h1>
    </div>
  );
}
