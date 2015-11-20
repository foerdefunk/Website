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
        }).addTo(map).bindPopup('<h3><a href="http://map.foerdefunk.de/#!n:' + node.nodeinfo.node_id + '" target="_blank">' + node.nodeinfo.hostname + '</a></h3>');
      };
      $.ajax({
        cache: false,
        url: 'nodes.json',
        dataType: 'json',
        success: function(data) {
          var countNodes = 0;
          var numOfClients=0;
          for (var nodeKey in data.nodes) {
            var node = data.nodes[nodeKey];
            if (node.flags.online){
              countNodes++;
              numOfClients += node.statistics.clients;
            };
            if (node.nodeinfo.location && node.flags.online) {
              setNodeToMap(node);
              numOfClients = numOfClients+node.statistics.clients;
            }
          };
          var bojen = document.getElementById("bojen");
          var textBojenCount = document.createTextNode("Derzeit gibt es schon " + countNodes + " Bojen in Flensburg und Umgebung. Vielleicht auch in deiner Nähe.");
          var textClientCount = document.createTextNode("Im Moment sind "+ numOfClients+" Nutzer verbunden.");
          var firstP= document.createElement("p");
          firstP.appendChild(textBojenCount);
          var secondP=document.createElement("p");
          secondP.appendChild(textClientCount);
          bojen.appendChild(firstP);
          bojen.appendChild(secondP);
        }
      });

    }
  });

});

/*
    choose customer
*/
$(document).ready(function() {
  var $chooseCustomerItems = $('#choose-customer li');
  var $showCustomerItems = $('#show-customer article');

  $showCustomerItems.removeClass('active');
  $('#show-customer article:nth-child(2)').addClass('active');

  $chooseCustomerItems.click(function() {
    $chooseCustomerItems.removeClass('active');
    $showCustomerItems.removeClass('active');

    $(this).addClass('active');
    $('#' + $(this).data('show-customer')).addClass('active');
  });
});

/*
    firmware download
*/
$(document).ready(function() {

  $('#download-form').submit(function(event) {
    event.preventDefault();

    var router;


    router = $('#download-form-router').val();

    if (router === '-1') {
      window.alert('Bitte wähle eine Router aus. Den genauen Namen und die Version deines Routers findest du auf seiner Unterseite.');
    } else {
      prefix = 'gluon-foerdefunk-stable-2015-08';
      window.location.href = 'http://firmware.foerdefunk.de/stable/factory/' + prefix + router;



    }

    return false;
  });
});
