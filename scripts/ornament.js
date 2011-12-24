function drawOrnament(canvas, ornamentX, ornamentY, ornamentUrl) {
  var context = canvas.getContext("2d");
  
  var width = canvas.width;
  var height = canvas.height;
  var centerX = canvas.width / 2;
  var centerY = canvas.width / 2;
   
  
  var handleSide = height * 0.1;
  var lineWidth = 3;
  var radius = (height - handleSide) / 2 - lineWidth;
  
  
  var image = new Image();
  image.onload = function () {
    context.fillStyle = "gray";
    context.fillRect(centerX-handleSide/2,0,handleSide,handleSide);

    context.strokeStyle = "gray";
    context.lineWidth = lineWidth;
    context.arc(centerX, radius+handleSide, radius, 0, 2*Math.PI, false);
    context.stroke();
    context.clip();
    
    context.drawImage(image,0,handleSide);
  };
  image.src = ornamentUrl;
  
  
}

function onOrnamentClick(event) {
	
	var filePath = "assets/photos/0"+event.target.id.replace("ornament","")+".jpeg";
	var dimensions = {
		x : event.clientX,
		y : event.clientY,
		width : event.target.width,
		height : event.target.height
	};
	showPopupWithFile(filePath, dimensions);
	
}