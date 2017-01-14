$(document).ready(function(){$.ajax({url:"https://unpkg.com/leaflet@1.0.2/dist/leaflet.js",dataType:"script",cache:!0,success:function(){var e=L.icon({iconUrl:"assets/images/markers/marker.png",iconRetinaUrl:"assets/images/markers/markerx2.png",iconSize:[21,32],iconAnchor:L.Point[32],popupAnchor:L.Point[-32]}),n=L.map("map",{icon:e,scrollWheelZoom:!1,center:[54.790961,9.435912],zoom:13});L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'}).addTo(n);var t=function(t){L.marker([t.nodeinfo.location.latitude,t.nodeinfo.location.longitude],{icon:e}).addTo(n).bindPopup('<h3><a href="http://map.foerdefunk.de/#!n:'+t.nodeinfo.node_id+'" target="_blank">'+t.nodeinfo.hostname+"</a></h3>")};$.ajax({cache:!1,url:"nodes.json",dataType:"json",success:function(e){var n=0,o=0;for(var a in e.nodes){var i=e.nodes[a];i.flags.online&&(n++,o+=i.statistics.clients),i.nodeinfo.location&&i.flags.online&&(t(i),o+=i.statistics.clients)}var r=document.getElementById("bojen"),s=document.createTextNode("Derzeit gibt es schon "+n+" Bojen in Flensburg und Umgebung. Vielleicht auch in deiner Nähe."),d=document.createTextNode("Im Moment sind "+o+" Nutzer verbunden."),c=document.createElement("p");c.appendChild(s);var l=document.createElement("p");l.appendChild(d),r.appendChild(c),r.appendChild(l)}})}})}),$(document).ready(function(){var e=$("#choose-customer li"),n=$("#show-customer article");n.removeClass("active"),$("#show-customer article:nth-child(2)").addClass("active"),e.click(function(){e.removeClass("active"),n.removeClass("active"),$(this).addClass("active"),$("#"+$(this).data("show-customer")).addClass("active")})}),$(document).ready(function(){$("#download-form").submit(function(e){e.preventDefault();var n;return n=$("#download-form-router").val(),"-1"===n?window.alert("Bitte wähle eine Router aus. Den genauen Namen und die Version deines Routers findest du auf seiner Unterseite."):(prefix="gluon-foerdefunk-stable-2015-08",window.location.href="http://firmware.foerdefunk.de/stable/factory/"+prefix+n),!1})});
