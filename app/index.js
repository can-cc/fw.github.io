import * as THREE from 'three';

window.onload = function(){

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // camera
  var camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.y = -150;
  camera.position.z = 500;
  camera.rotation.x = 10 * (Math.PI / 180);

  // scene
  var scene = new THREE.Scene();
  scene.add(camera); //ADDED


  var geometry = new THREE.PlaneGeometry(446, 600);
  new THREE.TextureLoader().load('assets/image/dash.jpg', function(texture) {
    texture.width = 446;
    texture.height = 600;
    var material = new THREE.MeshBasicMaterial({map: texture});
    var plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
    renderer.render(scene, camera);
  });





  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  // add directional light source
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  renderer.render(scene, camera);
};
