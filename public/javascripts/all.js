var rawData = "https://api.covid19india.org/raw_data.json";

$(document).ready(function() {
    initialize();
    populateMarkers(rawData);
});