var camera, scene, renderer;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var width = 300;
var height = 150;

var windowHalfX = width / 2;
var windowHalfY = height / 2;

function drawStar(canvas) {

	camera = new THREE.PerspectiveCamera( 50, width / height, 1, 1000 );
	camera.position.y = 100;
	camera.position.z = 600;

	scene = new THREE.Scene();

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 0, 0, 1 );
	light.position.normalize();
	scene.add( light );

	parent = new THREE.Object3D();
	parent.position.y = 50;
	scene.add( parent );


	var extrudeSettings = {	amount: 50,  bevelEnabled: true, bevelSegments: 5, steps: 5 };

	// Star

	var x = 0, y = 0;
	
	var starPts = [];
	starPts.push( new THREE.Vector2 ( 0, -46 ) );
	starPts.push( new THREE.Vector2 ( -13, -14 ) );
	starPts.push( new THREE.Vector2 ( -48, -10 ) );
	starPts.push( new THREE.Vector2 ( -23, 13 ) );
	starPts.push( new THREE.Vector2 ( -29, 47 ) );
	starPts.push( new THREE.Vector2 ( 0, 31 ) );
	starPts.push( new THREE.Vector2 ( 32, 47) );
	starPts.push( new THREE.Vector2 ( 25, 13 ) );
	starPts.push( new THREE.Vector2 ( 50, -10) );
	starPts.push( new THREE.Vector2 ( 15, -15 ) );
	starPts.push( new THREE.Vector2 ( 0, -46 ) );

	var starShape = new THREE.Shape(starPts); // From http://blog.burlock.org/html5/130-paths
	
	var radius = 100;

	var star3d = new THREE.ExtrudeGeometry( starShape, { amount: 11	} );


	var scale = 2.5;
	var mesh = THREE.SceneUtils.createMultiMaterialObject( star3d, [ new THREE.MeshLambertMaterial( { color: 0xff0000 }  ) ] );
	mesh.position.set( 0, 0, 0	 );
	mesh.rotation.set( Math.PI, 0, 0 );
	mesh.scale.set( scale, scale, scale );
	parent.add( mesh );
	
	renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height );

	renderer.domElement.id = "webGLCanvas";
	$(document.body)[0].appendChild(renderer.domElement);
	$("#webGLCanvas").css({
		"position" : "absolute",
		"top":0,
		"z-index":4
	});
	
	$("#webGLCanvas").mousedown( function(event){
		onStarMouseDown(event);
	});
	
	render();
}



function animateStar() {

	requestAnimFrame( animateStar );

	render();

}

function render() {

	parent.rotation.y += ( targetRotation - parent.rotation.y ) * 0.05;
	parent.rotation.y += (targetRotation - parent.rotation.y ) * 0.05;
	renderer.render( scene, camera );

}

function onStarMouseDown( event ) {

	$("#webGLCanvas").mousemove( function(event){
		onStarMouseMove(event);
	});
	$("#webGLCanvas").mouseout( function(event){
		onStarMouseOut(event);
	});
	
	$("#webGLCanvas").mouseup( function(event){
		onStarMouseUp(event);
	});
	
	$("#webGLCanvas").mouseleave( function(event){
		onStarMouseLeave(event);
	});
	
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;

}

function onStarMouseMove( event ) {
	
	mouseX = event.clientX - windowHalfX;
	
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

}

function removeListeners() {
	$("#webGLCanvas").unbind("mousemove");
	$("#webGLCanvas").unbind("mouseout");
	$("#webGLCanvas").unbind("mouseup");
}

function onStarMouseUp( event ) {
	removeListeners();	
}

function onStarMouseOut( event ) {
	removeListeners();
}

function onStarMouseLeave(event) {
	removeListeners();
}
