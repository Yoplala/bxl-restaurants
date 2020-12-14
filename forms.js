

// ---=== Ajouter une notation (valable dans les 2 formulaires) ===--- //

// Une variable pour enregistrer la notation
let newStar;

// Fonction pour noter le restaurant
function addRating() {
	let personnalRating = event.currentTarget.getAttribute("stars");
	let addStars = document.getElementsByClassName("rating_perso");
	// Permet de noter le restaurant, changement d'avis possible tant que le formulaire n'est pas envoyé
	for (const addStar of addStars) {
		addStar.style.color = "var(--dark-color)";
	}
	for (let i = 0; i < personnalRating; i++) {
		addStars[i].style.color = "var(--accent-color)";
	}
	// On enregistre la notation dans la variable
	return newStar = personnalRating;;
}


// ---=== Ajouter un commentaire ===--- //

// Fonction pour afficher le formulaire via le bouton "Ajouter un commentaire"
function addReview() {
	document.getElementById("button_add_review").style.display = "none";
	document.getElementById("formComment").style.display = "contents";
}

// Fonction pour enregistrer le commentaire
function sendComment() {
	
	// Validation du formulaire
	if (document.getElementById("comment_perso").value === "") {
		document.getElementById("comment_perso").classList.add("required");
	} else {
		// Récupérer le restaurant concerné
		let relatedName = document.querySelector("h4").textContent;
		let relatedRest = restaurantsArray.filter(elem => elem.name === relatedName);
	
		// Ajouter cet avis aux avis du restaurant
		let newComment = document.getElementById('comment_perso').value;
		let newObject = {stars: Number(newStar), comment: newComment};
		relatedRest[0].reviews.unshift(newObject);
	
		// Rafraîchir la moyenne de ce restaurant
		if (relatedRest[0].origin === "originPlaces") {  // Parce qu'on n'a pas toutes les notations avec Google Places
			let sumRatings = (relatedRest[0].average * relatedRest[0].totalReviews) + Number(newStar);
			let roundedAverage = (sumRatings / (relatedRest[0].totalReviews + 1)).toFixed(0);
			relatedRest[0].average = Number(roundedAverage);
		} else {	
			let sumRatings = relatedRest[0].reviews.reduce((a, b) => a + b.stars, 0);
			let roundedAverage = (sumRatings / relatedRest[0].reviews.length).toFixed(0);
			relatedRest[0].average = Number(roundedAverage);
		}

		relatedRest[0].totalReviews ++;
	
		// Relancer l'affichage en ouvrant le pop-up du restaurant modifié
		display();
		relatedRest[0].marker.openPopup();
		displayNotifs("Votre commentaire a été ajouté avec succès !");	
	}
}


// ---=== Ajouter un restaurant ===--- //

let popup = L.popup();
let coordonates;
let newAdress;

// Fonction pour ouvrir un pop-up au clic sur la carte
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('<p class="button_add"><button id="button_addRest" type="button" onclick="addRest()">Ajouter un restaurant ?</button></p>')
        .openOn(mymap);
	coordonates = (e.latlng);
}

mymap.on('click', onMapClick);

// Fonction pour afficher le formulaire
function addRest() {
	
	// Utilisation d'un plugin de Leaflet pour récupérer l'adresse
	let geocodeService = L.esri.Geocoding.geocodeService();
    geocodeService.reverse().latlng(coordonates).run(function (error, result) {
      if (error) {
        return;
      }
		newAdress = result.address.Match_addr;
		popup.setContent('<p id="form2"><strong>Nom du restaurant :</strong><br><input type="text" id="new_rest" name="new_restaurant" required autofocus><br><br><strong>Adresse :</strong> '+ newAdress +'<br><br><strong>Votre commentaire :</strong><br><span class="fa fa-star rating_perso" stars="1" onclick="addRating()"></span><span class="fa fa-star rating_perso" stars="2" onclick="addRating()"></span><span class="fa fa-star rating_perso" stars="3" onclick="addRating()"></span><span class="fa fa-star rating_perso" stars="4" onclick="addRating()"></span><span class="fa fa-star rating_perso" stars="5" onclick="addRating()"></span><br><input type="text" id="comment_new_rest" name="comment_added" required><button id="button_send" type="button" onclick="sendRest()">Envoyer</button></p>');	
    });
}

// Fonction pour enregistrer le nouveau restaurant
function sendRest() {
	
	// Validation du formulaire
	if (document.getElementById("new_rest").value === "" || document.getElementById("comment_new_rest").value === "") {
		document.getElementById("new_rest").classList.add("required");
		document.getElementById("comment_new_rest").classList.add("required");
	} else {
		// Création d'un tableau pour le commentaire
		let newArray = [{stars: Number(newStar), comment: document.getElementById('comment_new_rest').value}];
		
		// Création d'un nouveau restaurant
		let newRest = new Restaurant(document.getElementById("new_rest").value, coordonates.lat, coordonates.lng, newAdress, newArray, 1, "originAdded", Number(newStar), true);
		
		// Ajout de ce restaurant au tableau global
		restaurantsArray.push(newRest);
		
		// Relancer l'affichage en ouvrant le pop-up du restaurant ajouté
		display();
		newRest.marker.openPopup();
		displayNotifs("Le nouveau restaurant a été ajouté avec succès !");
	}
}


