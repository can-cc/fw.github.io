import * as THREE from 'three';
import {Play} from './play';

import './style/index.scss';

window.onload = function() {
  const windowWidth = window.innerWidth, windowHeight = window.innerHeight;
  const centerPoint = [windowWidth / 2, windowHeight / 2];

  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // camera
  var camera = new THREE.PerspectiveCamera(95, windowWidth / windowHeight, 1, 1000);
  camera.position.y = 0;
  camera.position.x = 0;
  camera.position.z = 400;

  // scene
  var scene = new THREE.Scene();
  scene.add(camera);


  var geometry = new THREE.PlaneGeometry(446, 600);

  new THREE.TextureLoader().load('assets/image/dash.png', function(texture) {
    var material = new THREE.MeshBasicMaterial({map: texture});
    var plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
    // renderer.render(scene, camera);
    window.addEventListener('mousemove', (event) => {
      const {offsetX, offsetY} = event;

      const offsetXPercentrage = (offsetX - centerPoint[0]) / windowWidth;
      const offsetYPercentrage = (offsetY - centerPoint[1]) / windowHeight;

      plane.rotation.x = offsetXPercentrage * 10 * (Math.PI / 180);
      plane.rotation.y = offsetYPercentrage * 10 * (Math.PI / 180);

      // renderer.render(scene, camera);
    });
  });

  var geom = new THREE.PlaneBufferGeometry(500, 500, 1, 1);
  var playmesh  = new Play();
  playmesh.position.z = 0;
  playmesh.position.x = 0;
  playmesh.position.y = 0;
  console.log(playmesh);
  scene.add(playmesh);
  playmesh.show();

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);


  // add directional light source
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  renderer.render(scene, camera);
};
