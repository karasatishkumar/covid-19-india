//Create a single global variable
var MAPAPP = {};
MAPAPP.markers = [];
MAPAPP.currentInfoWindow;
MAPAPP.rawData = "https://api.covid19india.org/raw_data.json";
MAPAPP.cordinates = {};
MAPAPP.new_cordinates = {};

MAPAPP.labels  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

$(document).ready(function() {
    $.ajaxSetup({
        async: false
    });
    $.getJSON("../data/loc.json", function(data) {
        MAPAPP.cordinates = data;
    });
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
            var district = (ob && ob.detecteddistrict && ob.detecteddistrict != "") ?  ob.detecteddistrict: "";
            var state = (ob && ob.detectedstate && ob.detectedstate != "") ?  ob.detectedstate : "";
            var address;
            if(city != ""){
                address = MAPAPP.cordinates[city.toLowerCase().trim()];
            }
            if(!address && district != ""){
                MAPAPP.new_cordinates[city.toLowerCase().trim()] = "";
                address = MAPAPP.cordinates[district.toLowerCase().trim()];
            }
            if(!address && state != ""){
                MAPAPP.new_cordinates[district.toLowerCase().trim()] = "";
                address = MAPAPP.cordinates[state.toLowerCase().trim()];
            }
            if(!address){
                MAPAPP.new_cordinates[state.toLowerCase().trim()] = "";
                address = MAPAPP.cordinates["india"];
            }
                
            //console.log("Address :" + address);     
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
        console.log(JSON.stringify(MAPAPP.new_cordinates));    
    });    
    
}
