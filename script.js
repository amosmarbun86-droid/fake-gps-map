var map = L.map('map').setView([0,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

var marker;
var currentLat;
var currentLng;

map.on('click', function(e){

currentLat = e.latlng.lat;
currentLng = e.latlng.lng;

document.getElementById("lat").innerHTML = currentLat;
document.getElementById("lng").innerHTML = currentLng;

if(marker){
map.removeLayer(marker);
}

marker = L.marker([currentLat,currentLng]).addTo(map);

});

function getLocation(){

navigator.geolocation.getCurrentPosition(function(pos){

var lat = pos.coords.latitude;
var lng = pos.coords.longitude;

map.setView([lat,lng],15);

if(marker){
map.removeLayer(marker);
}

marker = L.marker([lat,lng]).addTo(map);

});

}

function saveLocation(){

localStorage.setItem("favLat",currentLat);
localStorage.setItem("favLng",currentLng);

alert("Lokasi disimpan");

}

function searchLocation(){

var city = document.getElementById("search").value;

fetch("https://nominatim.openstreetmap.org/search?format=json&q="+city)

.then(response => response.json())

.then(data =>{

var lat = data[0].lat;
var lon = data[0].lon;

map.setView([lat,lon],13);

if(marker){
map.removeLayer(marker);
}

marker = L.marker([lat,lon]).addTo(map);

});

}

function walk(){

var lat = currentLat;
var lng = currentLng;

setInterval(function(){

lat = lat + 0.0001;

marker.setLatLng([lat,lng]);

map.panTo([lat,lng]);

},2000);

}
