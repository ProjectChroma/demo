var stopwatch = {
	running: false,
	time: 0,
	element: null
}
$(document).ready(function(){
	stopwatch.element = $("#stopwatch");
});
stopwatch.start = function(){
	stopwatch.running = window.setInterval(function(){
		stopwatch.time += 0.1;
		if(stopwatch.element) stopwatch.element.text(stopwatch.timeS() + "s");
	}, 100);
}
stopwatch.stop = function(){
	stopwatch.pause();
	stopwatch.time = 0;
}
stopwatch.pause = function(){
	window.clearInterval(stopwatch.running);
	stopwatch.running = null;
}
stopwatch.timeS = function(){
	var hr = Math.floor(stopwatch.time / 3600);
	var min = Math.floor((stopwatch.time % 3600) / 60);
	var sec = Math.floor(stopwatch.time % 60);
	var dsec = Math.floor((stopwatch.time % 1) * 10);//deciseconds (0.1s)
	
	if(hr > 0) return hr + ":" + (min<10 ? "0" + min : min) + ":" + (sec<10 ? "0" + sec : sec) + "." + (dsec < 10 ? "0" + dsec : dsec);
	else if(min > 0) return (min<10 ? "0" + min : min) + ":" + (sec<10 ? "0" + sec : sec) + "." + (dsec < 10 ? "0" + dsec : dsec);
	else return sec + "." + dsec;
}
