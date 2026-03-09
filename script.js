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

function setFake(){

alert("Fake GPS diset ke : "+currentLat+","+currentLng);

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
