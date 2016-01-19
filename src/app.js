// Récupération des fonctions définies dans le fichier google-api.
import { authenticateUser, loadEvents, userConnected, createRandomEvent } from './google-api';
import { $, onDomReady } from './dom-utils';

// DOM ELEMENTS
const btn_connexion = $('#connexion');
const btn_random = $('#randomEvent');

const hideBtnConnexion = () => btn_connexion.style.display = 'none';
const showBtnConnexion = () => btn_connexion.style.display = 'block';


// Lorsqu'on clique sur le bouton de connexion
btn_connexion.addEventListener('click', () => {

  // On authentifie l'utilisateur
  authenticateUser(function(authResult) {
    if(authResult && !authResult.error) {
      // TODO, loader les events
      hideBtnConnexion();
      loadEvents();
    } else {
      console.error('La connection n\'a pas fonctionné merci de réessayer');
      console.log(authResult);
    }
  })
});

btn_random.addEventListener('click', () => {
  createRandomEvent();
});

// Quand le DOM est ready
onDomReady(function() {
  // On cache le bouton de connexion au début
  hideBtnConnexion();
  // On teste si l'utilisateur est connecté
  userConnected()
    // L'utilisateur est connecté et tout va bien on affiche les events
    .then(function() {
      console.info('User connecté');
      loadEvents();
    })
    // L'utilisateur n'est pas connecté, on affiche le bouton de connexion.
    .catch(function(error) {
      console.info('User pas connecté');
      showBtnConnexion();
      console.error(error)
    });
});



