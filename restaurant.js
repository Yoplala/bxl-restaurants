

// ---=== Classe Restaurant ===--- //


// Une classe pour les unifier tous
class Restaurant {
	constructor (name, latitude, longitude, address, reviews, totalReviews, origin, average, display, idPlaces) {
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.coordinates = [latitude, longitude];
		this.address = address; 
		this.reviews = reviews;				// Format : [{stars, comment}]
		this.totalReviews = totalReviews;
		this.origin = origin;
		this.average = average;
		this.display = display;
		this.idPlaces = idPlaces;
		this.marker;
	}
	
	addFafastar() {							// Méthode pour afficher des étoiles en fonction de la moyenne
		let fafastar ="";
  
		for (let i = 0; i < 5; i++) {
			if (i < this.average) {
				fafastar += "<span class='fa fa-star checked'></span>";
			} else {
				fafastar += "<span class='fa fa-star'></span>";
			}
		}
		return fafastar;
	}
	
	popupContent() {						// Méthode pour afficher le contenu des pop-ups
		// Variable pour récupérer les commentaires
		let reviewsDisplayed ="";
		// Ajout des commentaires au bon format
		for (const review of this.reviews) {
			// Caclul du nombre d'étoile en fonction de la notation du commentaire
			let fafastar = "";					
			for (let i = 0; i < review.stars; i++) {
				fafastar += "<span class='fa fa-star checked'></span>";
			}
			// Affichage de chaque commentaire
			reviewsDisplayed += '<li>' + fafastar + '  ' + review.comment + '</li>';
		}
		// Affichage du pop-up avec un formulaire d'ajout de commentaire caché par défaut
		return '<h4>' + this.name +'</h4><br><p><img src="https://maps.googleapis.com/maps/api/streetview?size=250x150&location=' + this.name + ',Bruxelles&fov=40&key=AIzaSyDO1uCmD-9oxiW6IWfRAmJnGH_WGqkrGng" alt="Photo du restaurant"></p><br><strong>Adresse : </strong>' + this.address + '<br><br><strong>Commentaires : </strong><ul>' + reviewsDisplayed + '</ul>' + '<br><p class="button_add"><button id="button_add_review" type="button" onclick="addReview()">Ajouter un commentaire</button></p><br><p id="formComment"><strong>Votre commentaire :</strong><br><span class="fa fa-star rating_perso" stars="1" onclick="addRating()"></span><span class="fa fa-star rating_perso" stars="2" onclick="addRating()"></span><span class="fa fa-star rating_perso" stars="3" onclick="addRating()"></span><span class="fa fa-star rating_perso" stars="4" onclick="addRating()"></span><span class="fa fa-star rating_perso" stars="5" onclick="addRating()"></span><br><input type="text" id="comment_perso" name="comment_added" required><button id="button_send" type="button" onclick="sendComment()">Envoyer</button></p>'
	}
}

// et dans un tableau les grouper
let restaurantsArray = [];


// ---=== Récupérer les restaurants du fichier JSON ===--- //

let request = new XMLHttpRequest();
	request.open('GET', 'https://yoplala.github.io/restaurants/restaurants.json');
	request.responseType = 'text';
	request.send();

request.onload = function() {
	let restaurantsJson = request.response; 
	let restaurants = JSON.parse(restaurantsJson);
	
	// Parcourir la liste des restaurants
	for (const restaurant of restaurants) {
		
		// Calculer la moyenne
		let average = "";
		let sumRatings = restaurant.ratings.reduce((a, b) => a + b.stars, 0);
		let roundedAverage = (sumRatings / restaurant.ratings.length).toFixed(0);
		average = Number(roundedAverage);
		
		// Créer des nouvelles instances de la classe et les ajouter au tableau
		let newRestaurant = new Restaurant(restaurant.restaurantName, restaurant.lat, restaurant.long, restaurant.address, restaurant.ratings, restaurant.ratings.length, "originJson", average, true);
		restaurantsArray.push(newRestaurant);		
	}
	
	// Lancer l'affichage
	display();
	
}


// ---=== Récupérer les restaurants de Google Places via le bouton associé ===--- //


function addPlaces() {
	
	// Récupération des coordonnées de la géolocalisation (utilisateur ou Grand-Place)
	let coordonates  = new google.maps.LatLng(circle._latlng.lat,circle._latlng.lng);
	
	// Requête vers Google Places
	let newRequest = {
		location: coordonates,
		radius: '500',
		types: ['restaurant']
	};
	service = new google.maps.places.PlacesService(liste2);
	service.nearbySearch(newRequest, callback);
}

function callback(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
			
			// Parcourir la liste des restaurants
			for (const result of results) {
				// Appel console nécessaire pour quand Google change le chemin pour la longitude (tous les 15 jours / 3 semaines)
				//console.log(results);
				
				// Nouveau tableau pour les commentaires
				let newArray = [];	
		
				// Nouvelle requête pour obtenir les commentaires
				let request = {											
					placeId: result.place_id,
					field: ['reviews']
				};
				service = new google.maps.places.PlacesService(liste2);
				service.getDetails(request, cb);
			
				// Ajuster les commentaires au format voulu
				function cb(place, status) {						
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						// Parcourir la liste des commentaires
						for (const review of place.reviews) {
							// Ajuster les commentaires au format voulu
							let newReview = {stars:review.rating,comment:review.text};	
							// Les ajouter au tableau des commentaires
							newArray.push(newReview);	
						}
					}
				}
				
				// Créer des nouvelles instances de la classe et les ajouter au tableau
				let newRestaurant = new Restaurant(result.name, result.geometry.viewport.Wa.i, result.geometry.viewport.Ra.i, result.vicinity, newArray, result.user_ratings_total, "originPlaces", Number(result.rating.toFixed(0)), false, result.place_id);
				restaurantsArray.push(newRestaurant);
			}
	};
}


// Lancer l'affichage des restaurants de Google Place une fois le bouton cliqué
function places() {	
	restaurantsArray.forEach(restaurant => {
		restaurant.display = true
	});
	// Cacher le bouton d'ajout, afficher les filtres
	document.getElementById("button_add_places").style.display = "none";
	document.getElementById("filter_stars").style.display = "block";
	// Lancer l'affichage
	display();
	displayNotifs("Restaurants de Google Places ajoutés !");
}
