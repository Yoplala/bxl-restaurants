

// ---=== Fonction d'affichage des restaurants ===--- //

function display() {

	let liste = document.getElementById('liste');			// Vider la liste (en cas de rafraichissement de l'affichage)
	liste.innerHTML ="";
	
	for (const rest of restaurantsArray) {
		
		// Retirer les marqueurs existants (en cas de rafraichissement de l'affichage)
		if (rest.marker) {
			rest.marker.remove(mymap);
		}
		
		// Afficher les restaurants
		if (rest.display === true) {						// Si le booléen d'affichage est OK

			// Ajoute chaque restaurant dans la liste
			let liste = document.getElementById('liste');
			let newElem = document.createElement("li");
			newElem.innerHTML += '<span id="liste_elem"><strong>' + rest.name + '</strong><br><span id="stars_average">' + rest.addFafastar() + '</span> -  ' + rest.totalReviews + ' avis</span>';
			liste.appendChild(newElem); 
		
			// Ajoute un marqueur de carte pour chaque restaurant avec un pop-up associé
			rest.marker = L.marker([rest.latitude, rest.longitude]).addTo(mymap);
			rest.marker.bindPopup(rest.popupContent());
		
			// Ouvre le pop-up correspondant au clic sur un des restaurants de la liste
			newElem.querySelector("strong").addEventListener("click", e => {
				rest.marker.openPopup();
			});
		}	
		
	}
}


// ---=== Fonction de filtre ===--- //

function filterDisplay(nb) {
	
	restaurantsArray.forEach(restaurant => {					
		if (restaurant.average === nb) {
			document.getElementById('stars_' + nb).checked ? restaurant.display = true : restaurant.display = false;
		}
	});

	// Relancer l'affichage des restaurants
	display();
	displayNotifs("Filtre appliqué !");
}


// ---=== Fonction d'affichage des notifications ===--- //

let divNotifs = document.getElementById('notifications');
let divNotifsContent = document.getElementById('notifs_content');

function displayNotifs(text) {
	divNotifsContent.innerHTML = text;
	divNotifs.classList.add('notifications_animated');
	setTimeout(function() {
		divNotifsContent.innerHTML = "";
		divNotifs.classList.remove('notifications_animated');
	},4000);
}

