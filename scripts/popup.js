function showPopupWithFile(filePath, dimensions) {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var side = Math.min(windowWidth,windowHeight) * 0.8;

	var fullImageOverlay = document.createElement("div");
	var fullImageOverlayId = "#fullImageOverlay";
	fullImageOverlay.id = "fullImageOverlay";
	
	$("#mainDiv")[0].appendChild(fullImageOverlay);
	$(fullImageOverlayId).css( {"opacity":0.0});
	$(fullImageOverlayId).animate({"opacity":1.0}, 400);
	
	//
	// Media element
	//
	var media;
	var mediaId;
	var top;
	var left;
	var width;
	var height;
	if( filePath.indexOf("jpeg") >= 0) {
		
		left = windowWidth / 2 - side / 2;
		top = windowHeight / 2 - side / 2;
		width = height = side;
		
		var fullImage = document.createElement("img");
		mediaId = "#fullImage";
		fullImage.id = "fullImage";
		fullImage.width = side;
		fullImage.height = side;
		fullImage.src = filePath;
		
		media = fullImage;
	} else {
		
		side = Math.min(windowWidth,windowHeight);
		var video = document.createElement("video");
		
		width = side;
		height = side * 9 / 16;
		
		mediaId = "#myVideo";
		video.id="myVideo";
		video.src = filePath;
		video.width = side;
		video.height = height;
		
		left = windowWidth / 2 - side / 2;
		top = windowHeight / 2 - video.height / 2;
		
		
		video.controls = "controls";
		video.autoplay = "autoplay";
		
		media = video;
	}
	
	$(fullImageOverlayId)[0].appendChild(media);
	$(mediaId).css({
		"top": dimensions.y,
		"left": dimensions.x,
		"width": dimensions.width,
		"height": dimensions.height
	});
	$(mediaId).animate({"width": width, "height": height, "left": left, "top": top}, 400, "linear");

	
	var closeButton = document.createElement("div");
	var closeButtonId = "#closeButton";
	closeButton.id = "closeButton";
	
	$(closeButton).click(function(event){
	  	event.bubbles = false;
		event.stopPropagation();
		
		$(fullImageOverlayId).animate({"opacity":0.0}, 200, "linear", function(){
			$("#mainDiv")[0].removeChild(fullImageOverlay);
		});
		
		return false;
	});
	
	
	$(fullImageOverlayId)[0].appendChild(closeButton);
	

	
	var closeOffset = 15;
	var closeLeft = left + side - closeOffset;
	var closeTop = top - closeOffset;
	$(closeButtonId).css("left",closeLeft);
	$(closeButtonId).css("top",closeTop);
	$(closeButtonId).html("<p class='buttonTitle'>X</p>");
}