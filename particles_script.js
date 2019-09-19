var ww = window.innerWidth,
	wh = window.innerHeight;

function init(){

	/* WEBGL RENDERER */
	renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene')});
	renderer.setSize(ww,wh);

	/* SCENE */
	scene = new THREE.Scene();

	/* CAMERA */
	camera = new THREE.OrthographicCamera(ww/-2,ww/2,wh/2,wh/-2,0,1000);
	camera.position.set(0, 0, 500);
	scene.add(camera);


	/* LIGHT */
	light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set( 0, 250, 700 );
	scene.add(light);

	//particles will be the 3D object containing all the particles
	particles = new THREE.Object3D();;
	scene.add(particles);

	//Add events listeners on the page
	document.addEventListener("mousemove", mouseMove);
	document.addEventListener("touchemove", mouseMove);

	renderer.render(scene,camera);

	//Init request animation frame
	animate();
};

//Init var with mouse position
var mouse = {x:0,y:0};
function mouseMove(e){

	//3D universe come from the center so I substract half of the screen on the mouse position
	//By doing that, the cursor on the left will give -window/2 and on the right window/2
	//For the Y axis it's a bit different because the top equal 0 but in the scene the top is the positive side
	mouse.x = e.clientX-(ww/2);
	mouse.y = (wh/2)-e.clientY;

};

function createParticle(){

	//Create a geometry used for the particles which contains nothing for now
	var geometry = new THREE.Geometry();
	//Create a vector which equal to the mouse position
	var vertices = new THREE.Vector3(
		mouse.x,
		mouse.y,
		-10
	);
	//We apply our vector inside the geometry
	geometry.vertices.push(vertices);
	//We create a white material
	//sizeAttenuation defines if the particle will be small if far from the camera
	var material = new THREE.PointsMaterial({
		color : 0XFFFFFF,
		size : 3,
		transparent : true,
		sizeAttenuation : false
    });
    //Point cloud is a specific Mesh for particles
	particle = new THREE.Points(geometry, material);
	//We create a random speed for each particle for aesthetics
	particle.speed = Math.random()/100+0.002
	//We set a random position for each particle
	particle.direction = {
		x : (Math.random()-.5)*ww*2,
		y : (Math.random()-.5)*wh*2
	};
	
	particles.add(particle);
}

var animate = function () {
	requestAnimationFrame(animate);

	//Create a new particle
	createParticle();

	//We loop through all our particles
	for(var i=0,j=particles.children.length;i<j;i++){
		//Get the next particle
		var particle = particles.children[i];

		//We move our particle closer to its destination
		particle.geometry.vertices[0].x += (particle.direction.x - particle.geometry.vertices[0].x)*particle.speed;
		particle.geometry.vertices[0].y += (particle.direction.y - particle.geometry.vertices[0].y)*particle.speed;
		//We reduce the opacity of the particle
		particle.material.opacity -= .005
		//Prevents ThreeJs the particle has moved
		particle.geometry.verticesNeedUpdate = true;

		//If the opacity of the particle is too low
		if(particle.material.opacity < .05){
			//We remove our particle from the scene
			particles.remove(particle);
			//The loop must go through the same 'i' because we removed one particle from the array
			i--;j--;
		}
	}

	renderer.render(scene, camera);
};

init();