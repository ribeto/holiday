var numBranches = 5;
var trunkWidth = 40;
var trunkHeight = 50;

function drawTree(canvas) {
	var context = canvas.getContext("2d");

	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var width = 400;
	var height = 400;

	var left = windowWidth / 2 - width / 2;
	var top = windowHeight / 2 - height / 2;

	$("#xmasTree").css("left",left);
	$("#xmasTree").css("top",top);

	context.canvas.width = width;
	context.canvas.height = height;

	var branchHeight = (height - trunkHeight) / numBranches;
	var centerX = width / 2;


	for( var i=numBranches-1; i >= 0; i--) {
		var branchWidth = width * (1 - i*0.2);
		var branchTop = height - trunkHeight - (i+1)*branchHeight;
		var branchBottom = branchTop+branchHeight-20;


		context.beginPath();
		context.moveTo(centerX-branchWidth/2, branchBottom);
		context.quadraticCurveTo(centerX, branchTop+branchHeight+20, centerX+branchWidth/2, branchBottom);
		context.quadraticCurveTo(centerX, branchBottom, centerX, branchTop);
		context.quadraticCurveTo(centerX, branchBottom, centerX-branchWidth/2, branchBottom);
		context.fillStyle = "green";
		context.lineWidth = 5;
		context.lineJoin = "round";
		context.lineCap = "round";

		context.fill();
	}

	context.fillStyle = "#6d4a10";
	context.fillRect(centerX-trunkWidth/2, height-trunkHeight, trunkWidth, trunkHeight);
}

function addTreeOrnaments(canvas) {
	var numOrnaments = 5;
	var height = canvas.height;
	var branchHeight = (height - trunkHeight) / numBranches;

	var treeX = parseInt( $("#xmasTree").css("left").replace("px","") );
	var treeY = parseInt( $("#xmasTree").css("top").replace("px","") );


	for( var i=1; i <= numOrnaments; i++) {
		var ornamentCanvasName = "ornament"+i;
		var ornamentCanvasId = "#"+ornamentCanvasName;

		var ornamentCanvas = $(ornamentCanvasId)[0];
		if( $(ornamentCanvasId).length == 0 ) {
			ornamentCanvas = document.createElement("canvas"); 
			ornamentCanvas.id = ornamentCanvasName;
			ornamentCanvas.width = 60;
			ornamentCanvas.height = 60;

			$("#mainDiv")[0].appendChild(ornamentCanvas);

			var fullImageUrl = "assets/0"+i+"_thumb.jpeg";
			drawOrnament(ornamentCanvas, 0, 0, "assets/photos/0"+i+"_thumb.jpeg");

			$(ornamentCanvasId).click(function(event){
				event.bubbles = false;
				event.stopPropagation();
				onOrnamentClick(event);
				return false;
			});
		}


		var xOffset = i % 2 == 0 ? 200+(i-1)*20 : 130-(i-1)*20;
		var yOffset = i*branchHeight-15;

		$(ornamentCanvasId).css({
			"z-index":  4,
			"position": "absolute",
			"left":     treeX+xOffset,
			"top":      treeY+yOffset
		}); 

	}
	
	if( $("#webGLCanvas").length == 0 ) {
		drawStar();
		animateStar();
	}
	$("#webGLCanvas").css({
		"left":     treeX + 50,
		"top":      treeY - 100
	});
	
}