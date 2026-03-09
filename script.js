// ===== Inisialisasi Peta =====
var map = L.map('map').setView([0,0],2);
var marker;
var currentLat;
var currentLng;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  maxZoom:19
}).addTo(map);

// ===== Auto load lokasi HP saat buka website =====
function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      currentLat = pos.coords.latitude;
      currentLng = pos.coords.longitude;
      addOrUpdateMarker(currentLat,currentLng);
    });
  }
}

// ===== Fungsi marker =====
function addOrUpdateMarker(lat,lng){
  if(marker) map.removeLayer(marker);
  marker = L.marker([lat,lng]).addTo(map);
  map.setView([lat,lng],16);
  document.getElementById("lat").innerHTML = lat.toFixed(6);
  document.getElementById("lng").innerHTML = lng.toFixed(6);
}

// ===== Klik peta tetap opsional =====
map.on('click', function(e){
  currentLat = e.latlng.lat;
  currentLng = e.latlng.lng;
  addOrUpdateMarker(currentLat,currentLng);
});

// ===== Joystick untuk gerak marker =====
var joystick = nipplejs.create({
  zone: document.getElementById('joystick'),
  mode:'static',
  position:{left:'60px', bottom:'60px'},
  color:'blue'
});

joystick.on('move', function(evt,data){
  if(data.vector){
    currentLat += data.vector.y*0.0001; // atas/bawah
    currentLng += data.vector.x*0.0001; // kiri/kanan
    addOrUpdateMarker(currentLat,currentLng);
  }
});

// ===== Simulasi jalan otomatis =====
function walk(){
  var step = 0.0001;
  setInterval(function(){
    currentLat += step;
    addOrUpdateMarker(currentLat,currentLng);
  },2000);
}

// ===== Simpan lokasi favorit =====
function saveLocation(){
  localStorage.setItem("favLat", currentLat);
  localStorage.setItem("favLng", currentLng);
  alert("Lokasi disimpan!");
}

// ===== Pencarian kota =====
function searchLocation(){
  var city = document.getElementById("search").value;
  fetch("https://nominatim.openstreetmap.org/search?format=json&q="+city)
  .then(response => response.json())
  .then(data =>{
    currentLat = parseFloat(data[0].lat);
    currentLng = parseFloat(data[0].lon);
    addOrUpdateMarker(currentLat,currentLng);
  });
}

// ===== Jalankan auto lokasi saat buka website =====
getLocation();
