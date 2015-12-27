var levels = [];
var level = null;

function initLevels(){
	$(".level").each(function(levelIndex){
		var levelObj = {
			index: levelIndex,
			title: $(this).attr("id"),
			element: $(this),
			collisionObjects: [],
			dangers: [],
			goals: [],
			slowers: [],
			speeders: []
		};
		$(this).children(".platform").each(function(platformIndex){
			var platform = registerElement($(this));
			platform.level = levelIndex;
			platform.isVisible = function(){return this.level == level.index && this.element.css("background-color") != $("html").css("background-color");}
			levelObj.collisionObjects.push(platform);
		});
		$(this).children(".danger").each(function(dangerIndex){
			var danger = registerElement($(this));
			danger.level = levelIndex;
			danger.isVisible = function(){return this.level == level.index;}
			levelObj.dangers.push(danger);
			levelObj.collisionObjects.push(danger);
		});
		$(this).children(".goal").each(function(goalIndex){
			var goal = registerElement($(this));
			goal.level = levelIndex;
			goal.isVisible = function(){return this.level == level.index;}
			levelObj.goals.push(goal);
			levelObj.collisionObjects.push(goal);
		});
		$(".block").each(function(blockIndex){
			var block = registerElement($(this));
			block.isVisible = function(){return true;}
			levelObj.collisionObjects.push(block);
		});
		$(this).children(".slower").each(function(slowerIndex){
			var slower = registerElement($(this));
			slower.level = levelIndex;
			slower.isVisible = function(){return this.level == level.index;}
			levelObj.slowers.push(slower);
			levelObj.collisionObjects.push(slower);
		});
		$(this).children(".speeder").each(function(speederIndex){
			var speeder = registerElement($(this));
			speeder.level = levelIndex;
			speeder.isVisible = function(){return this.level == level.index;}
			levelObj.speeders.push(speeder);
			levelObj.collisionObjects.push(speeder);
		});
		
		levelObj.element.css("display", "none");
		levels.push(levelObj);
	});
}

function registerElement(element){
	var object = {};
	var pos = element.position();
	object.left = pos.left;
	object.right = object.left + element.width();
	object.top = pos.top;
	object.bottom = object.top + element.height();
	object.element = element;
	return object;
}

function loadLevel(lvl){
	if(level) level.element.css("display", "none");
	level = levels[lvl];
	level.element.css("display", "block");
	$("#level-title").text(level.title || "");
	if(!level.title){//End credits level
		stopwatch.stop();
		
		//Flicker the stopwatch
		var el = $("#stopwatch");
		el.css("font-size", "150%");
		var flickers = 0;
		var flicker = window.setInterval(function(){
			if(el.css("visibility") == "hidden") el.css("visibility", "visible"); else el.css("visibility", "hidden");
			flickers++;
			if(flickers == 10) window.clearInterval(flicker);
		}, 200);
	}
}
