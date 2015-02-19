function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Your Current Position is:<br> <br>Latitude: ' + latitude + '° <br>Longitude:  ' + longitude + '°<br><br> We sent a WHO squad to<br><strong>Quarantine the Area</strong></p>';

    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&markers=icon:http://tinyurl.com/2ftvtt6|" + latitude + "," + longitude + "&zoom=15&size=300x300&sensor=false";

    output.appendChild(img);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

// Google MAPS
// +++++++++++++++++++++
 
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.



function initialize() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(59.90,10.7),
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'You Are Here!'
      });

      map.setCenter(pos);
      map.setZoom(16);
      map.setmapTypeId(ROADMAP);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}


google.maps.event.addDomListener(window, 'load', initialize);
