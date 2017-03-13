import Three from 'three';

console.log('hi');

// window.onload = function(){

//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // camera
//     var camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 1, 1000);
//     camera.position.y = -250;
//     camera.position.z = 400;
//     camera.rotation.x = 45 * (Math.PI / 180);

//     // scene
//     var scene = new THREE.Scene();
//     scene.add(camera); //ADDED

//     var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
//         map:THREE.ImageUtils.loadTexture('img/front.jpg')
//     });
//     img.map.needsUpdate = true; //ADDED

//     // plane
//     var plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200),img);
//     plane.overdraw = true;
//     scene.add(plane);

//      // add subtle ambient lighting
//     var ambientLight = new THREE.AmbientLight(0x555555);
//     scene.add(ambientLight);

//     // add directional light source
//     var directionalLight = new THREE.DirectionalLight(0xffffff);
//     directionalLight.position.set(1, 1, 1).normalize();
//     scene.add(directionalLight);

//     // create wrapper object that contains three.js objects
//     var three = {
//         renderer: renderer,
//         camera: camera,
//         scene: scene,
//         plane: plane
//     };
//     renderer.render(scene,camera);
// };
