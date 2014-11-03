	(function(){
	var t; //timeout variable
	//sizing function 
	//argument boolean to resize or not
	var array_chart;
	function sendRequest(){
		console.log("calling main");
		function createRequest() {
			var result = null;
			if (window.XMLHttpRequest) {
	    // FireFox, Safari, etc.
	    result = new XMLHttpRequest();
	    if (typeof result.overrideMimeType != 'undefined') {
	      result.overrideMimeType('text/xml'); // Or anything else
	  }
	}
	else if (window.ActiveXObject) {
	    // MSIE
	    result = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	else {
	    // No known mechanism -- consider aborting the application
	}
	return result;
	}
	var req = createRequest(); // defined above
	// Create the callback:
	req.onreadystatechange = function() {
	  if (req.readyState != 4) return; // Not there yet
	  if (req.status != 200) {
	  	console.log(req);
	   // Handle request failure here...
	   return;
	}
	  // Request successful, read the response
	  array_chart = req.responseText;
	  
	// ... and use it as needed by your app.
	console.log( array_chart);
	return array_chart;
	}
	console.log("request sent to server for chart values");
	var url ="http://54.77.185.99:4711/api/chart"; 
	req.open("GET", url, false);
	req.send();
	}
	function size(animate){
	//sendRequest();
	if (animate == undefined){
		animate = false;
	}
	clearTimeout(t);
	t = setTimeout(function(){
		$("canvas").each(function(i,el){
			$(el).attr({
				"width":$(el).parent().width(),
				"height":$(el).parent().outerHeight()
			});
		});
		redraw(animate);
		var m = 0;
		$(".widget").height("");
		$(".widget").each(function(i,el){ m = Math.max(m,$(el).height()); });
		$(".widget").height(m);
	}, 30);
	}
	$(window).on('resize', function(){ size(false); });


	function redraw(animation){
		var options = {};
		if (!animation){
			options.animation = false;
		} else {
			options.animation = true;
		}

	var labels =[];
	var value =[];

	$.ajax({
		url:"http://54.77.185.99:4711/api/summary", 
		dataType:'json', 
		type: 'GET',
		async: false,  
		success: function(data) {

	//empty the table while redrawing
		$("#tableUsage").empty();

		$("#tableUsage").append("<tr><th>Cient ID</th><th>Link to Client</th><th>CPU Usage</th></tr>");

	               //TMDb is nice enough to return a message if nothing was found, so we can base our if statement on this information

	               if (data != "Nothing found."){
	               	console.log(data);
	               	var temp = data;
	               	for(var key in temp){
	               		value.push(temp[key].usagebythisprocess);
	               		labels.push(temp[key]._id);
	               		var item = $('<li/>')
	               		var link = $('<a/>').html(temp[key]._id  + '   ## ' + temp[key].usagebythisprocess)
	               		link.click(function() { alert(temp[key]._id) })
	               		item.append(link)
	       
	           $("#tableUsage").append("<tr><td>"+temp[key]._id +"</td><td><a href="+'"/test/#"'+" > "+temp[key]._id +"</a></td><td>"+temp[key].usagebythisprocess+"</td></tr>")

	       }
	       console.log(value);
	       console.log(labels);

	   }else{
	   	console.log(typeof data);
	   }
	}});

	var data = {
		labels : labels,
		datasets : [
		{
			fillColor : "rgba(99,123,133,0.4)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : value
		}
		]
	}

        var options = {
  legendTemplate : '<ul>'
                  +'<% for (var i=0; i<datasets.length; i++) { %>'
                    +'<li>'
                    +'<span style=\"background-color:<%=datasets[i].lineColor%>\"></span>'
                    +'<% if (datasets[i].label) { %><%= datasets[i].label %><% } %>'
                  +'</li>'
                +'<% } %>'
              +'</ul>'
  }
	var canvas = document.getElementById("shipments");
	var ctx = canvas.getContext("2d");
	var lineChart = new Chart(ctx).Line(data, options);
var legend = lineChart.generateLegend();

  //and append it to your page somewhere
  $('#shipments').append(legend);


	console.log(typeof data);
	sendRequest();
	var canvas = document.getElementById("departments");
	var ctx = canvas.getContext("2d");
	console.log(typeof array_chart);
	var data = JSON.parse(array_chart);
	console.log(data);
	console.log(typeof data);
	var myc= new Chart(ctx).PolarArea(data, options);
	ctx.onclick = function(evt){
		var activePoints = myc.getPointsAtEvent(evt);
	    // => activePoints is an array of points on the canvas that are at the same position as the click event.
	    alert(activePoints);
	    console.log("onlcick");
	};
	}
	size(true);

	}());
