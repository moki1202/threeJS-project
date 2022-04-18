import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, raycaster;

const mouse = new THREE.Vector2();

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
  camera.position.z = 3;

  scene = new THREE.Scene();
	
	raycaster = new THREE.Raycaster();

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { vertexColors: true } );

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
	
	var controls = new OrbitControls( camera, renderer.domElement );
	

  document.addEventListener('click', onClick, false);

  //

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}


function onClick(event) {

  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	
	raycaster.setFromCamera( mouse, camera );

	const intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 ) {
	
		const intersection = intersects[0];

		const faceIndex = intersection.faceIndex;
		const object = intersection.object;
		
		object.geometry.faces[ faceIndex ].color.set( "blue" );
		object.geometry.colorsNeedUpdate = true;

	}

}

function animate() {
  requestAnimationFrame(animate);
  
  renderer.render(scene, camera);

}