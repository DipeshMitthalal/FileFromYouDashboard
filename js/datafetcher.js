var array_chart;

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
  array_chart= req.responseText;
  // ... and use it as needed by your app.
console.log( array_chart);
}
console.log("request sent to server for chart values");
var url ="http://54.77.185.99:4711/api/chart"; 
req.open("GET", url, false);
req.send();

