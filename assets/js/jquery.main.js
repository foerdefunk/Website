/*
    get json data for map
*/
$(document).ready(function() {

    $.ajax({
      url: 'assets/js/leaflet-0.7.3/leaflet.js',
      dataType: 'script',
      cache: true,
      success: function() {

        var myIcon = L.icon({
            iconUrl: 'assets/images/logos/foerdefunk-logo-boje.svg',
            iconRetinaUrl: 'assets/images/logos/foerdefunk-logo-boje.svg',
            iconSize: [30, 32],
            iconAnchor: L.Point[30, 32],
            popupAnchor: L.Point[-15, -32]
        });

        var map = L.map('ffmap', {
            icon: myIcon,
            scrollWheelZoom: false,
            center: [54.790961, 9.435912],
            zoom: 13
        });

        L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var setNodeToMap = function(node) {
            if(node.geo && node.flags.online) {
                L.marker([node.geo[0], node.geo[1]], {icon: myIcon}).addTo(map).bindPopup('<h3>'+node.name+'</h3>');
            }
        }

        $.ajax({
            cache: false,
            url: 'nodes.json',
            dataType: 'json',
            success: function(data) {
              //console.log(JSON.parse(data));
                data.nodes.forEach(setNodeToMap);

                var countNodes = 0;

                for (var i = data.nodes.length - 1; i >= 0; i--) {
                    if(data.nodes[i].flags.online && data.nodes[i].name != '') {
                        countNodes++;
                    }
                };

            }
        });

      }
    });

});
