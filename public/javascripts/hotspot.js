//Create a single global variable
var MAPAPP = {};
MAPAPP.markers = [];
MAPAPP.currentInfoWindow;
MAPAPP.rawData = "https://api.covid19india.org/travel_history.json";
MAPAPP.cordinates = {};

MAPAPP.labels  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

$(document).ready(function() {
    initialize();
    populateMarkers(MAPAPP.rawData);
});

//Initialize our Google Map
function initialize() {
    var center = new google.maps.LatLng(22.3511148,78.6677428);
    var mapOptions = {
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: center,
    };
    this.map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
};

// Fill map with markers
function populateMarkers(rawData) {
    apiLoc = rawData;
    // jQuery AJAX call for JSON
    $.getJSON(apiLoc, function(data) {
        //For each item in our JSON, add a new map marker
        $.each(data.travel_history, function(i, ob) {
            
            var latlong = (ob && ob.latlong && ob.latlong != "") ?  ob.latlong : "22.3511148,78.6677428";
               
            latlong = latlong.split(",");
            latlng = new google.maps.LatLng(latlong[0], latlong[1]);
            var marker = new google.maps.Marker({
                position: latlng,
                label: MAPAPP.labels[i % MAPAPP.labels.length]
            });
            
            MAPAPP.markers.push(marker);
        
        });
        var markerCluster = new MarkerClusterer(map, MAPAPP.markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});   
    });    
    
}
