var player = {
	x: 0,
	y: 0,
	vx: 0,
	maxVx: 10,
	vy: 0,
	ay: 2.25,
	
	wasFloating: false,
	
	inverted: false
};
function initPlayer(){
	player.element = $("#player");
	player.getLeft = function(){return player.element.position().left;}
	player.getRight = function(){return player.getLeft() + player.element.width();}
	player.setLeft = function(pos){player.element.css("left", pos + "px");}
	player.getTop = function(){return player.element.position().top;}
	player.getBottom = function(){return player.getTop() + player.element.height();}
	player.getCollisionTop = function(){return player.getBottom() - player.element.height()/2;}
	player.setTop = function(pos){player.element.css("top", pos + "px");}
	player.getCollidingElement = function(){
		for(var i=0; i<level.collisionObjects.length; i++){
			if((level.collisionObjects[i].left < player.getRight() && level.collisionObjects[i].right > player.getLeft()) &&
				(level.collisionObjects[i].top < player.getBottom() && level.collisionObjects[i].bottom > player.getCollisionTop()) &&
				level.collisionObjects[i].isVisible())
				return level.collisionObjects[i];
		}
		return null;
	}
	player.getCeilingedElement = function(){
		var top = player.getTop();
		var bottom = (player.getBottom() + player.getTop())/2;
		for(var i=0; i<level.collisionObjects.length; i++){
			if((level.collisionObjects[i].left < player.getRight() && level.collisionObjects[i].right > player.getLeft()) &&
				(level.collisionObjects[i].top < bottom && level.collisionObjects[i].bottom > top) &&
				level.collisionObjects[i].isVisible())
				return level.collisionObjects[i];
		}
		return null;
	}
	player.isCeilinged = function(){return player.getCeilingedElement() != null;}
	player.isFloating = function(){return player.getCollidingElement() === null;}
	player.isDead = function(){
		for(var i=0; i<level.dangers.length; i++){
			if((level.dangers[i].left < player.getRight() && level.dangers[i].right > player.getLeft()) &&
				(level.dangers[i].top < player.getBottom() && level.dangers[i].bottom > player.getTop())) return true;
		}
		return false;
	}
	player.isComplete = function(){
		for(var i=0; i<level.goals.length; i++){
			if((level.goals[i].left < player.getRight() && level.goals[i].right > player.getLeft()) &&
				(level.goals[i].top < player.getBottom() && level.goals[i].bottom > player.getTop())) return true;
		}
		return false;
	}
	player.setColor = function(color){player.element.css("background-color", colors.rgb(color));}
	player.getColor = function(){return colors.name(player.element.css("background-color"));}
	player.isNaturalColor = function(){
		var color = player.getColor();
		return color === "white" || color === "black";
	}
	player.getNaturalColor = function(){return inverted ? "white" : "black";}
	player.resetColor = function(){player.setColor(player.getNaturalColor());}
	player.reset = function(){
		player.resetColor();
		player.element.css({
			top: "75%",
			left: "500px"
		});
	}
	player.updateVelocity = function(){
		player.maxVx = 10;
		for(var i=0; i<level.slowers.length; i++){
			if((level.slowers[i].left < player.getRight() && level.slowers[i].right > player.getLeft()) &&
				(level.slowers[i].top < player.getBottom() && level.slowers[i].bottom > player.getTop())) player.maxVx = 5;
		}
		for(var i=0; i<level.speeders.length; i++){
			if((level.speeders[i].left < player.getRight() && level.speeders[i].right > player.getLeft()) &&
				(level.speeders[i].top < player.getBottom() && level.speeders[i].bottom > player.getTop())) player.maxVx = 20;
		}
	}
}