function initGM() {
    
    var options = {
        canvas: 'event-map',
        center: new google.maps.LatLng(59.9072848, 10.7547325),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var mapCanvas = document.getElementById(options.canvas);
    var map = new google.maps.Map(mapCanvas, options)
}
google.maps.event.addDomListener(window, 'load', initGM);
