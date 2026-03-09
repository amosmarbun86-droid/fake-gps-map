var map = L.map('map').setView([0,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

var marker;

map.on('click', function(e){

var lat = e.latlng.lat;
var lng = e.latlng.lng;

document.getElementById("lat").innerHTML = lat;
document.getElementById("lng").innerHTML = lng;

if(marker){
map.removeLayer(marker);
}

marker = L.marker([lat,lng]).addTo(map);

});
