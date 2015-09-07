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
          var bojen = document.getElementById("bojen");
          var text = document.createTextNode("Derzeit gibt es schon " + countNodes + " Bojen in Flensburg und Umgebung. Vielleicht auch in deiner Nähe.");
          bojen.appendChild(text);
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
  $('#show-customer article:first-child').addClass('active');

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

    var type = '',
      fileExtension = '',
      router;


    switch ($('#download-form-type').val()) {
      case '0':
        type = 'factory';
        break;
      case '1':
        type = 'sysupgrade';
        fileExtension = '-sysupgrade';
        break;
      default:
        type = 'factory';
        break;
    }

    router = $('#download-form-router').val();

    if (router === '-1') {
      window.alert('Bitte wähle eine Router aus. Den genauen Namen und die Version deines Routers findest du auf seiner Unterseite.');
    } else {
      cfflPrefix = 'gluon-cffl-cffl-stable-2014.4.0-0';
      window.location.href = 'media/firmware/' + type + '/' + cfflPrefix + router + fileExtension + '.bin';



    }

    return false;
  });
});
