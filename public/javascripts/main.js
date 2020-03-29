//Create a single global variable
var MAPAPP = {};
MAPAPP.markers = [];
MAPAPP.currentInfoWindow;
MAPAPP.rawData = "https://api.covid19india.org/raw_data.json";
MAPAPP.cordinates = {
    "india" : "22.3511148,78.6677428",
    "thrissur" : "10.5256264,76.2132542",
    "alappuzha" : "9.4887006,76.4125641",
    "kasaragod" : "12.421713,75.1904498",
    "east delhi (mayur vihar)" : "28.598894119262695,77.29437255859375"
}

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
        $.each(data.raw_data, function(i, ob) {
            var city = (ob && ob.detectedcity && ob.detectedcity != "") ?  ob.detectedcity : "";
            var district = (ob && ob.detecteddistrict && ob.detecteddistrict != "") ?  ob.detecteddistrict + ", " : "";
            var state = (ob && ob.detectedstate && ob.detectedstate != "") ?  ob.detectedstate + ", " : "";
            var address;
            if(city != ""){
                address = MAPAPP.cordinates[city.toLowerCase()];
            }
            if(!address){
                console.log("Coordinate not found for city : " + city);
                address = MAPAPP.cordinates[district.toLowerCase()];
            }
            if(!address){
                console.log("Coordinate not found for district : " + district);
                address = MAPAPP.cordinates[state.toLowerCase()];
            }
            if(!address){
                console.log("Coordinate not found for state : " + state);
                address = MAPAPP.cordinates["india"];
            }
                
            console.log("Address :" + address);     
            var cord = address.split(",");
            var latlng = new google.maps.LatLng(cord[0], cord[1]);
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
