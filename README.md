# bxl-restaurants
Restaurant review site | Site d'avis de restaurants

*L'API de Google Places peut ne plus fonctionner sur l'application.*

[Les meilleurs restaurants de Bruxelles](https://yoplala.github.io/bxl-restaurants/)


## Contexte

Projet réalisé dans le cadre de ma formation "Développeur frontend" chez OpenClassrooms.

**Lancez votre propre site d'avis de restaurants**
- Développer une application JavaScript complète en respectant un cahier des charges
- Utiliser une API externe en JavaScript

Consignes :
- Deux sections principales : une carte chargée via API et une liste de restaurants correspondant à la zone affichée sur la carte 
- La carte sera centrée immédiatement sur la position de l'utilisateur. Vous utiliserez l'API de géolocalisation de JavaScript. Un marqueur de couleur spécifique sera placé à l'emplacement de l'utilisateur.
- Une liste de restaurants est fournie sous forme de données JSON présentées dans un fichier à part. En temps normal, ces données vous seraient renvoyés par un backend via une API, mais pour cet exercice il sera pour le moment suffisant de charger en mémoire tous les restaurants en mémoire directement.
- Affichez ces restaurants grâce à leurs coordonnées GPS sur la carte. Les restaurants qui sont actuellement visibles sur la carte doivent être affichés sous forme de liste sur le côté de la carte. Vous afficherez la moyenne des commentaires de chaque restaurant (qui va de 1 à 5 étoiles).
- Lorsqu'on clique sur un restaurant, la liste des avis enregistrés s'affiche avec les commentaires. Affichez aussi la photo Google Street View grâce à l'API correspondante.
- Un outil de filtre permet d'afficher uniquement les restaurants ayant entre X et Y étoiles. La mise à jour de la carte s'effectue en temps réel.
- Ajouter la possibilité pour les visiteurs d'ajouter un avis ou d'ajouter un restaurant.
- Une fois un avis ou un restaurant ajouté, il apparaît immédiatement sur la carte. Un nouveau marqueur apparaît pour indiquer la position du nouveau restaurant.
- Les informations ne seront pas sauvegardées si on quitte la page (elles restent juste en mémoire le temps de la visite).
- Afficher des restaurants et avis supplémentaires sur votre carte en utilisant l'API de Google Places.

Livrables : Code HTML/CSS/JS du projet


## Apprentissage
- API
- JSON


## Pistes d'amélioration
- Adaptabilité à terminer pour mobile
- Possibilité de faire une recherche à partir d'une localisation décidée par l'utilisateur
