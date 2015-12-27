var ticking = null;
var inverted = false;

$(document).ready(function(){
	//Initialize the player object (player.js)
	initPlayer();
	
	//Initialize the world (levels.js)
	initLevels();
	
	//Load the first level
	loadLevel(0);
	
	//Bind key handlers
	initControls();
	
	//Add <style> to set all of the background colors
	colors.initStyle();
	
	//Start ticking physics engine
	toggleTick();
	
	//Start stopwatch
	stopwatch.start();
});

function toggleTick(){
	if(ticking){
		window.clearInterval(ticking);
		ticking = null;
	}else{
		ticking = window.setInterval(tick, 50);
	}
}

function tick(){
	//Set velocity
	if(player.isFloating()){
		player.vy += player.ay;
		player.wasFloating = true;
		if(player.isCeilinged()){
			player.vy = 0;
			player.setTop(player.getCeilingedElement().bottom);
		}
	}else{
		if(player.vy > 0) player.vy = 0;
		if(player.wasFloating){//Just landed
			player.setTop(player.getCollidingElement().top - player.element.height() + player.ay);//Set player right on top of block
		}
		player.wasFloating = false;
	}
	player.updateVelocity();
	
	//Set position
	player.setLeft(player.getLeft() + player.vx * player.maxVx);
	player.setTop(player.getTop() + player.vy);
	
	//Deal with dangers
	if(player.isDead()){
		player.setColor("red");
		toggleTick();
		window.setTimeout(function(){
			player.reset();
			toggleTick();
		}, 1000);
	}
	
	//Deal with goals
	if(player.isComplete()){
		player.setColor("gold");
		toggleTick();
		window.setTimeout(function(){
			loadLevel(level.index+1);
			player.reset();
			toggleTick();
		}, 1000);
	}
};

function invert(){
	if(inverted){//Platforms are currently white
		$("html").css("background-color", "white");
		inverted = false;
	}else{
		$("html").css("background-color", "black");
		inverted = true;
	}
	if(player.isNaturalColor()) player.resetColor();//Reset color if it's not a special color
	$(".block, .constant").css("background-color", player.getNaturalColor());//Match level's-edge blocks to player's color
	$("p").css("color", player.getNaturalColor());//Make sure text is visible
}