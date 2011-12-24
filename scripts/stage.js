var snowflakes = [];
var mouseClicked = false;
var isSnowing = true;

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
})();

function drawSnowflake(context, snowflake) {
	
	var xOffset = snowflake.radius*Math.cos(Math.PI/3);
	var yOffset = snowflake.radius*Math.sin(Math.PI/3);
	
	context.globalAlpha = 0.6;
	
	context.beginPath();
	context.strokeStyle = "gray";
	context.moveTo(snowflake.x - snowflake.radius, snowflake.y);
	context.lineTo(snowflake.x + snowflake.radius, snowflake.y);
	
	context.moveTo(snowflake.x - xOffset, snowflake.y - yOffset);
	context.lineTo(snowflake.x + xOffset, snowflake.y + yOffset);
	context.moveTo(snowflake.x + xOffset, snowflake.y - yOffset);
	context.lineTo(snowflake.x - xOffset, snowflake.y + yOffset);
	context.lineWidth = snowflake.thickness;
	context.lineCap = "round";
	context.stroke();
}

function animate(canvas, lastTime ){
	
 	var context = canvas.getContext("2d");
 	context.clearRect(0, 0, canvas.width, canvas.height);

    // update
    var date = new Date();
    var time = date.getTime();
    var timeDiff = time - lastTime;
    
	//console.log("timeDiff = "+timeDiff);

	// request new frame
	lastTime = time;	
	
	var start = 0;
	var removeSnowflakes = [];
	for( var i=start; i < snowflakes.length; i++) {

		var snowflake = snowflakes[i]; 
		
		//var r = snowflake.radius + 2;
		//context.clearRect(snowflake.x-r, snowflake.y-r, r*2, r*2);
		
		if (snowflake.y < canvas.height + snowflake.radius) {
		
			//if( i < snowflakes.length*0.2 ) {
				var speedIncrementEachFrame = snowflake.gravity * timeDiff / 1000; // pixels / second
				snowflake.vy += speedIncrementEachFrame;
		    	snowflake.y += (snowflake.vy * timeDiff);
				snowflake.x += i%2 == 0 && snowflake.y < canvas.height / 2 || i%2==1 && snowflake.y > canvas.height / 2 ? 2 : -2;
			//}
	
			if( snowflake.y < 0 ) continue;
			//console.log("snowflake "+i+ " ("+snowflake.x+","+snowflake.y+") speedInc="+speedIncrementEachFrame);

			drawSnowflake(context, snowflake);

		
	    } else {
			//console.log("snowflake shift");
			removeSnowflakes.push(i);
		}
	}
	
	for( var i=0; i < removeSnowflakes.length; i++ ) {
		snowflakes.splice(removeSnowflakes[i],1);
	}
	
	if( snowflakes.length > 0 ) {
		requestAnimFrame(function(){
	        animate(canvas, lastTime);
	    });
	}
	

 	if( snowflakes.length < 15 && isSnowing ) letItSnow();

}

function initStageWithCanvas(canvas) {
	var context = canvas.getContext("2d");
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	
	context.canvas.width  = windowWidth;
	context.canvas.height = windowHeight;
	
	context.fillStyle = "#e9ebea";
	context.fillRect(0,0,canvas.width,canvas.height);
	//context.globalCompositeOperation = "destination-in";
	
}

function initSnowCanvas(canvas) {
  var context = canvas.getContext("2d");
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	
	context.canvas.width  = windowWidth;
	context.canvas.height = windowHeight;
}


function addSnowflake(x,y) {
	var snowflake = {
		x: x,
		y: y,
		vx: 0,
		vy: 0,
		radius: Math.random()*6,
		thickness: Math.random()*2+1,
		gravity: Math.random()*0.4
	};
	snowflakes.push(snowflake);
	
	var canvas = $("#snow")[0];
	var context = canvas.getContext('2d');
	drawSnowflake(context, snowflake);
	
	if( snowflakes.length == 1) {
		
		setTimeout(function(){
	        var date = new Date();
			var time = date.getTime();
			
	        animate(canvas, time);
	    }, 0.25*1000);
	}
}

function letItSnow() {
	var snowWidth = Math.max(Math.round(window.innerWidth*0.7), 400);
	var xOffset = (window.innerWidth - snowWidth) / 2;
	
	for( var i=0; i < 20; i++) {
		var snowflake = {
			x: Math.round(snowWidth*Math.random()) + xOffset,
			y: -10,
			vx: 0,
			vy: 0,
			radius: Math.round(Math.random()*6),
			thickness: Math.round(Math.random()*2)+1,
			gravity: Math.random()*0.05+0.01
		};
		snowflakes.push(snowflake);
	}
}


//
// Event Handlers
//

function onMouseDown(event) {
	mouseClicked = true;
}

function onMouseUp(event) {
	if( event.isPropagationStopped() ) {
    	return;
  	}
  
	if( isSnowing && snowflakes.length == 0 ) {
		var x = event.clientX;
		var y = event.clientY;
		addSnowflake(x,y);
	}
	mouseClicked = false;
}

function onMouseMove(event) {
	if( mouseClicked && isSnowing ) {
		var rightclick;
		if (!event) var event = window.event;

		var x = event.clientX;
		var y = event.clientY;

		addSnowflake(x,y);
	}
}

function onAudioPlayPauseClick(event) {
	var audioPlayer = $("#audioPlayer")[0];
	if( !audioPlayer.paused ) {
		audioPlayer.pause();
		$("#playPauseButton")[0].src = "assets/buttons/playButton.png";
	} else {
		audioPlayer.play();
		$("#playPauseButton")[0].src = "assets/buttons/pauseButton.png";
	}
}

function onSnowClick(event) {
	isSnowing = !isSnowing;
	if( isSnowing ) {
		$("#snowButton")[0].src = "assets/buttons/stopSnowButton.png";
		letItSnow();
		var date = new Date();
		var time = date.getTime();
		
        animate($("#snow")[0], time);
	} else {
		$("#snowButton")[0].src = "assets/buttons/startSnowButton.png";
		snowflakes = [];
	}
}

function onVideoClick(event) {
	
	var audioPlayer = $("#audioPlayer")[0];
	if( !audioPlayer.paused ) onAudioPlayPauseClick();
	
	var videoTest = document.createElement("video");
	var extension = videoTest.canPlayType("video/mp4") ? "m4v" : "ogg";
	var dimensions = {
		x : event.clientX,
		y : event.clientY,
		width : event.target.width,
		height : event.target.height
	};
	showPopupWithFile("assets/media/abasin."+extension, dimensions);
}


function redrawScreen() {
	initStageWithCanvas($("#stage")[0]);
	initSnowCanvas($("#snow")[0]);
	drawTree($("#xmasTree")[0]);
	addTreeOrnaments($("#xmasTree")[0]);
}

//
// It all begins when the document is ready
//
$(document).ready( function() {

	$("#snow").mousedown( function(event) {
		onMouseDown(event);
	});

	$("#snow").mouseup( function(event) {
		onMouseUp(event);
	});

	$("#snow").mousemove( function(event) {
		onMouseMove(event);
	});
	
	$("#playPauseButton").click( function(event) {
		onAudioPlayPauseClick(event);
	});
	
	$("#snowButton").click( function(event) {
		onSnowClick(event);
	});
	
	$("#videoButton").click( function(event) {
		onVideoClick(event);
	});

	
	redrawScreen();
	
	$(window).resize(function (){
		redrawScreen();
	});
	
	
	letItSnow();
	var date = new Date();
	var time = date.getTime();
    animate($("#snow")[0], time);
});