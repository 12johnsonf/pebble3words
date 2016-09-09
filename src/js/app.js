/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

var main = new UI.Card({
  title: "pebble3words",
  style: "small",
  scrollable: true
});


var lat;
var long;

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};

function locationSuccess(pos) {
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  lat = pos.coords.latitude;
  //lat = 25;
  long = pos.coords.longitude;
  var w3wUrl = "https://api.what3words.com/v2/reverse?coords="+lat+"%2C"+long+"&key=KZR9Z8TC&display=minimal";
  console.log(w3wUrl);
  
  var method = 'GET';
  // Create the request
  var request = new XMLHttpRequest();
  
  // Specify the callback for when the request is completed
  request.onload = function() {
    // The request was successfully completed!
    var data = JSON.parse(this.responseText);
    console.log(data.words);
    main.body("Your location:\n"+data.words+"\nPress select for refresh");
  };
  
  // Send the request
  request.open(method, w3wUrl);
  request.send();
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

function loadLocation(){
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
  console.log("location loaded");
}

main.show();
loadLocation();
main.on("click","select",function(){
  loadLocation();
});
