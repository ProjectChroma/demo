var colors = {
	white: "rgb(255, 255, 255)",
	black: "rgb(0, 0, 0)",
	red: "rgb(255, 0, 0)",
	gold: "rgb(255, 215, 0)",
	blue: "rgb(0, 0, 255)",
	orange: "rgb(255, 127, 0)"
};
var classes = {
	white: ".platform.inverted",
	black: ".platform",
	red: ".danger",
	gold: ".goal",
	blue: ".slower",
	orange: ".speeder"
};

colors.rgb = function(name){
	for(var colName in colors){
		if(name === colName) return colors[colName];
	}
}
colors.name = function(rgb){
	for(var colName in colors){
		if(rgb === colors[colName]) return colName;
	}
}

colors.initStyle = function(){
	var style = "";
	for(var color in classes){
		style += classes[color] + "{background-color:" + color + ";}\r\n";
	}
	$("head").append($("<style></style>").html(style));
}
