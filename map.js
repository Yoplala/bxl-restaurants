

// ---=== Affichage de la carte OpenStreetMap via l'API Leaflet ===--- //

let mymap = L.map('map').setView([50.8350, 4.3800], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(mymap);


// ---=== Géolocalisation de l'utilisateur ===--- //

// Réglages du marqueur de position
let circle = L.circle([0, 0], {
		color: 'var(--main-color)',
		fillColor: 'var(--main-color)',
		fillOpacity: 0.5,
		radius: 50
	}).addTo(mymap);

// Fonction de géolocalisation
function geo_success(position) {
	// Si la géolocalisation de l'utilisateur est hors de Bruxelles
	if (position.coords.latitude > 50.931 || position.coords.latitude < 50.7712 || position.coords.longitude > 4.5068 || position.coords.longitude < 4.2661) {
		displayNotifs("Cette application fonctionne pour la ville de Bruxelles.<br><br> Il semblerait que vous êtes hors de la zone concernée.<br><br> L'application a centré la carte sur la Grand-Place de la ville.");
		circle.setLatLng([50.8467, 4.3524]);
		mymap.setView([50.8467, 4.3524 + 0.01], 15);
	// Si la géolocalisation de l'utilisateur est bien à Bruxelles
	} else {
		circle.setLatLng([position.coords.latitude, position.coords.longitude]);
		mymap.setView([position.coords.latitude, position.coords.longitude + 0.01], 15);
		// Affichage de l'heure pour montrer que l'application recalcule bien la position
		let today = new Date();
		let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		document.getElementById('logs').innerHTML = "Dernier calcul de la localisation : " +time;
	}	
}

function geo_error() {
	displayNotifs("Désolé, votre géolocalisation n'est pas disponible.<br><br> L'application a centré la carte sur la Grand-Place de la ville.");
	circle.setLatLng([50.8467, 4.3524]);
	mymap.setView([50.8467, 4.3524 + 0.01], 15);
}

let geo_options = {
	enableHighAccuracy: true, 
	maximumAge        : 30000, 
	timeout           : 27000
};

let wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

