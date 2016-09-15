/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

var apiKey = "";

var main = new UI.Card({
  title: "tiny3words",
  style: "small",
  scrollable: true
});

var refresh = new UI.Card({
  title: "Refresh",
  style: "large"
});

var lat;
var long;

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};

function locationSuccess(pos) {
  lat = pos.coords.latitude;
  long = pos.coords.longitude;
  var w3wUrl = "https://api.what3words.com/v2/reverse?coords="+lat+"%2C"+long+"&key="+apiKey+"&display=minimal";
  
  var method = 'GET';
  // Create the request
  var request = new XMLHttpRequest();
  
  request.onload = function() {
    var data = JSON.parse(this.responseText);
    main.body("Your location:\n"+data.words+"\nPress select for refresh");
    refresh.hide();
  };
  
  // Send the request
  request.open(method, w3wUrl);
  request.send();
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

function loadLocation(){
  refresh.show();
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
}

main.show();
loadLocation();
main.on("click","select",function(){
  loadLocation();
});