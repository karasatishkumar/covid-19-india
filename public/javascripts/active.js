var rawData = "https://api.covid19india.org/raw_data.json";

$(document).ready(function() {
    initialize();
    var filter = {"key":"currentstatus", "value":"hospitalized"}
    populateMarkers(rawData, filter);
});