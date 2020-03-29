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
    "east delhi (mayur vihar)" : "28.598894119262695,77.29437255859375",
    "hyderabad" : "25.3801017,68.3750376",
    "telangana" : "17.8495919,79.1151663",
    "jaipur" : "26.916194,75.820349",
    "rajasthan" : "26.8105777,73.7684549",
    "gurugram" : "28.4646148,77.0299194" ,
    "haryana" : "29,76" ,
    "agra" : "27.1752554,78.0098161" ,
    "uttar pradesh" : "27.239450454711914,80.5861587524414" ,
    "janakpuri" : "28.6219272,77.0874757" ,
    "south west delhi" : "28.5864481,76.979153" ,
    "ghaziabad" : "28.711241,77.4445372" ,
    "uttam nagar" : "28.61954116821289,77.06377410888672" ,
    "west delhi" : "28.6479519,77.0855654" ,
    "ladakh" : "33.9456407,77.6568576" ,
    "leh" : "34.1642029,77.5848133" ,
    "kancheepuram" : "12.837309837341309,79.70512390136719" ,
    "tamil nadu" : "10.9094334,78.3665347" ,
    "ranni" : "9.3425187,76.9807657" ,
    "pathanamthitta" : "9.273028373718262,76.79476928710938" ,
    "kerala" : "10.3528744,76.5120396" ,
    "tri nagar" : "28.67839241027832,77.15699768066406" ,
    "north delhi" : "28.6141793,77.2022662" ,
    "jammu" : "32.7185614,74.8580917" ,
    "jammu and kashmir" : "34.0476564,76.7972892" ,
    "bengaluru" : "12.9791198,77.5912997" ,
    "karnataka" : "14.5203896,75.7223521" ,
    "kannur" : "11.8762254,75.3738043" ,
    "pune" : "11.8762254,75.3738043" ,
    "maharashtra" : "19.499393463134766,75.83102416992188" ,
    "amritsar" : "31.6343083,74.8736788" ,
    "punjab" : "30.9293211,75.5004841" ,
    "kozhencherry" : "9.3369731,76.7064286" ,
    "kochi" : "33.6569018,133.5606241" ,
    "ernakulam" : "10.0383947,76.5074145" ,
    "chengalam" : "9.6191014,76.7085675" ,
    "kottayam" : "9.6285704,76.645525" ,
    "chuchot" : "34.0744411,77.6026686" ,
    "mumbai" : "18.9387711,72.8353355" ,
    "nellore" : "14.4493717,79.9873763" ,
    "s.p.s. nellore" : "14.4493717,79.9873763" ,
    "andhra pradesh" : "15.9240905,80.1863809" ,
    "kalaburagi" : "17.166667,77.083333" ,
    "nagpur" : "21.1498134,79.0820556" ,
    "thane" : "19.1943294,72.9701779" ,
    "lucknow" : "26.8381,80.9346001" ,
    "varkala" : "8.7352627,76.7080221" ,
    "thiruvananthapuram" : "8.5058909,76.9570481",
    "delhi" : "28.6517178,77.2219388",
    "new delhi" : "28.6517178,77.2219388", 
    "nedumangad" : "8.6053371,77.0028331", 
    "ahmednagar" : "19.1627725,74.8580243", 
    "yavatmal" : "20.15,78.35",
    "munnar" : "10.0867239,77.060982", 
    "idukki" : "9.8497872,76.9797914", 
    "aurangabad" : "19.877263,75.3390241",
    "pimpri-chinchwad" : "18.6279288,73.8009829",
    "dehradun" : "30.3255646,78.0436813", 
    "uttarakhand" : "30.0919936,79.3217666", 
    "rajouri" : "33.3772495,74.3132332",
    "kalanadu" : "12.5,74.98333",
    "malappuram" : "11.1068448,76.1099551", 
    "bhubaneswar" : "20.2667774,85.8435592", 
    "khordha" : "20.2256472,85.5605947",
    "odisha" : "20.5431241,84.6897321",
    "saket" : "28.5244107,77.2137253", 
    "south delhi" : "28.4851694,77.1963797", 
    "kargil" : "34.4208943,75.665486",
    "mahe" : "11.7021978,75.5364701",
    "puducherry" : "11.9340568,79.8306447", 
    "noida" : "28.5726442,77.3547609", 
    "gautam buddha nagar" : "28.3676097,77.5974033",
    "kolkata" : "22.5677459,88.3476023",
    "west bengal" : "22.9964948,87.6855882", 
    "chennai" : "13.0801721,80.2838331", 
    "shrungartali" : "17.485397338867188,73.26256561279297",
    "ratnagiri" : "17.2826079,73.4569787"
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
            var district = (ob && ob.detecteddistrict && ob.detecteddistrict != "") ?  ob.detecteddistrict: "";
            var state = (ob && ob.detectedstate && ob.detectedstate != "") ?  ob.detectedstate : "";
            var address;
            if(city != ""){
                address = MAPAPP.cordinates[city.toLowerCase().trim()];
            }
            if(!address && district != ""){
                console.log("Coordinate not found for city : " + city.toLowerCase());
                address = MAPAPP.cordinates[district.toLowerCase().trim()];
            }
            if(!address && state != ""){
                console.log("Coordinate not found for district : " + district.toLowerCase());
                address = MAPAPP.cordinates[state.toLowerCase().trim()];
            }
            if(!address){
                console.log("Coordinate not found for state : " + state.toLowerCase());
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
    });    
    
}
