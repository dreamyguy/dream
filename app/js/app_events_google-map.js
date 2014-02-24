function initGM() {
    
    var options = {
        canvas: 'event-map',
        center: new google.maps.LatLng(59.9072848, 10.7547325),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    // the id in which the map will be rendered
    var mapCanvas = document.getElementById(options.canvas);
    // the map
    var map = new google.maps.Map(mapCanvas, options);
    // the pin/marker image
    var pin = 'src/images/pin.png';

    // event 1 [mëllon, bjølsen park]
    var event1 = new google.maps.LatLng(59.9399354, 10.7552046);
    var event1Pin = new google.maps.Marker({
        position: event1,
        map: map,
        icon: pin,
        title: 'Event 1',
        zIndex: 1
    });
    var event1Content = '<div style="min-height: 38px">'+
        '<h1>Mëllon & Friends</h1>'+
        '<p>Join Mëllon and his doggy friends!</p>'+
        '</div>';
    var event1Tooltip = new google.maps.InfoWindow({
        content: event1Content
    });
    google.maps.event.addListener(event1Pin, 'click', function() {
        event1Tooltip.open(map,event1Pin);
    });

    // event 2 [vigeland's park]
    var event2 = new google.maps.LatLng(59.9204612, 10.7172822);
    var event2Pin = new google.maps.Marker({
        position: event2,
        map: map,
        icon: pin,
        title: 'Event 2',
        zIndex: 2
    });
    var event2Content = '<div style="min-height: 38px">'+
        '<h1>A stroll in the park</h1>'+
        '<p>Vigeland park on a summer afternoon? Yes!</p>'+
        '</div>';
    var event2Tooltip = new google.maps.InfoWindow({
        content: event2Content
    });
    google.maps.event.addListener(event2Pin, 'click', function() {
        event2Tooltip.open(map,event2Pin);
    });

}
google.maps.event.addDomListener(window, 'load', initGM);
