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
        iconUrl: 'assets/images/boje_85x85.png',
        iconRetinaUrl: 'assets/images/boje_85x85.png',
        iconSize: [30, 32],
        iconAnchor: L.Point[30, 32],
        popupAnchor: L.Point[-15, -32]
      });

      var map = L.map('map', {
        icon: myIcon,
        scrollWheelZoom: false,
        center: [54.790961, 9.435912],
        zoom: 13
      });

      L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      var setNodeToMap = function(node) {
        L.marker([node.nodeinfo.location.latitude, node.nodeinfo.location.longitude], {
          icon: myIcon
        }).addTo(map).bindPopup('<h3>' + node.nodeinfo.hostname + '</h3>');
      };
      $.ajax({
        cache: false,
        url: 'nodes.json',
        dataType: 'json',
        success: function(data) {
          var countNodes = 0;
          for (var nodeKey in data.nodes) {
            var node = data.nodes[nodeKey];
            if (node.nodeinfo.location && node.flags.online) {
              setNodeToMap(node);
              countNodes++;
            }
          };
        }
      });

    }
  });

});
