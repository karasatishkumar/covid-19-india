//Create a single global variable
var MAPAPP = {};
MAPAPP.markers = [];
MAPAPP.currentInfoWindow;
MAPAPP.rawData = "https://api.covid19india.org/raw_data.json";
MAPAPP.cordinates = cordinates;
MAPAPP.new_cordinates = {};
MAPAPP.labels  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
function populateMarkers(rawData, filter) {
    apiLoc = rawData;
    // jQuery AJAX call for JSON
    $.getJSON(apiLoc, function(data) {
        //For each item in our JSON, add a new map marker
        $.each(data.raw_data, function(i, ob) {
            if(!filter){
                constructMarker(ob, i);
            }else if (ob[filter.key].toLowerCase().trim() === filter.value){
                constructMarker(ob), i;
            }
        });
        var markerCluster = new MarkerClusterer(map, MAPAPP.markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        console.log(JSON.stringify(MAPAPP.new_cordinates));    
    });    
    
}

function constructMarker(ob, i){
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

    //Build the content for InfoWindow
    var content = '<div class="mt0"><b>Patient No : </b>' + ob.patientnumber+ ' [ ' + ob.statepatientnumber + ' ]</div>'
                + '<div class="mt0"><b>Gender : </b>' + ob.gender + '</div>'
                + '<div class="mt0"><b>Nationality </b>: ' + ob.nationality + '</div>'
                + '<div class="mt0"><b>Status : </b>' + ob.currentstatus + '</div>'
                + '<div class="mt0"><b>Note : </b>' + ob.notes + '</div>'
                + '<div class="mt0"><b>Location : </b>' + ob.detectedcity+ ', ' + ob.detecteddistrict + ', ' + ob.detectedstate + '</div>'
                + '<div class="mt0"><b>Affected From : </b>' + ob.contractedfromwhichpatientsuspected + '</div>'
                + '<div class="mt0"><b><a href="' + ob.source1 + '" target="_blank">Source</a></b></div>';

    marker.infowindow = new google.maps.InfoWindow({
        content: content,
        maxWidth: 400
    });
    //Add InfoWindow
    google.maps.event.addListener(marker, 'click', function() {
        if (MAPAPP.currentInfoWindow) MAPAPP.currentInfoWindow.close();
        marker.infowindow.open(map, marker);
        MAPAPP.currentInfoWindow = marker.infowindow;
    });
    
    MAPAPP.markers.push(marker);
}
