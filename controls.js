function initControls(){
	$(document).keydown(function(event){
		if(event.keyCode == 9){//Tab (debug: toggle physics)
			toggleTick();
			event.preventDefault();
		}else if(event.keyCode == 32){//Space (toggle colors)
			invert();
			event.preventDefault();
		}else if(event.keyCode == 37 || event.keyCode == 65){//Left or A (move left)
			player.vx = -1;
			event.preventDefault();
		}else if(event.keyCode == 38 || event.keyCode == 87){//Up or W (jump)
			if(!player.wasFloating) player.vy = -25;//Prevent air-jump
			event.preventDefault();
		}else if(event.keyCode == 39 || event.keyCode == 68){//Right or D (move right)
			player.vx = 1;
			event.preventDefault();
		}else if(event.keyCode == 33){//Page up (debug: next level)
			loadLevel(level.index+1);
		}else if(event.keyCode == 34){//Page down (debug: previous level)
			loadLevel(level.index-1);
		}
	});
	$(document).keyup(function(event){
		if(event.keyCode == 37 || event.keyCode == 65){//Left
			if(player.vx < 0) player.vx = 0;//If moving left, stop.
			event.preventDefault();
		}else if(event.keyCode == 39 || event.keyCode == 68){//Right
			if(player.vx > 0) player.vx = 0;
			event.preventDefault();
		}
	});
}
