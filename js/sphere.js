var camera, scene, renderer;
var geometry, material, mesh;
var controls;

init();
animate();

function init() {

    // Init camera and scene
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 2;

    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0x070719 );

    // The main orb geometry
    geometry = new THREE.SphereGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshBasicMaterial();

    mesh = new THREE.Mesh( geometry, material_main );

    mesh.material.color.setHex( 0xffffff );

    scene.add( mesh );


    renderer = new THREE.WebGLRenderer( { antialias: true }, {aplha: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

};

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

};


