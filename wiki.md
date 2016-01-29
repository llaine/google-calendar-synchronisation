[gdc_all]: public/img/gdc_all.png 
[gdc_oauth_new]: public/img/gdc_oauth_new.png 
[gdc_oauth_form]: public/img/gdc_oauth_form.png 
[gdc_oauth_infos]: public/img/gdc_oauth_infos.png 
[gdc_oauth_form_ok]: public/img/gdc_oauth_form_ok.png 

# Documentation

Pour toutes informations supplémentaire : louis.laine7@gmail.com 

## Préambule

**Question** : La question sous-jacente au POC était, "est-il possible d'avoir une synchronisation bi-directionnelle 
entre une application et un calendrier Google".
 
**Réponse** : La réponse est OUI ! L'API Google se charge de tout et on a juste besoin de manipuler le SDK
très facilement pour pouvoir créer des évenements dans un calendrier, etc. 


Cette petite page de wiki accompagne le POC qui mérite quelques explications sur certains aspects,
tels que les clés d'API Google, ou la manière dont est écrit le POC. 
 
Dans un premier temps nous verrons comment récupérer les clés d'authentification Google et pouvoir
 accéder à l'API Google. 
 
Dans un second temps, nous verrons comment le POC a été écrit et quelles méthodes ont été utilisées.
  
  
## Nota Bene

Tout le code qui va être montré dans cette page de wiki est situé dans le dossier `src/` du projet.  

Ce projet est réalisé simplement avec des composants, si vous voulez savoir comment utiliser redux pour manipuler
les états de ces composants, j'ai réecrit le même projet en utilisant redux

[Le dépot ici](https://github.com/llaine/redux-poc)


# Première partie 

## Créer des identifiants pour l'api Google

Chaque application qui utilise des données provenant de Google (maps, calendar, youtube, etc) doit obligatoirement
fournir une clé d'API. 
On peut créer plusieurs type de clés différentes, mais pour nos besoins (une application web), 
seule une clé oauth sera nécessaire. 



### Générer la clé OAuth

Pour générer cette clé, il faut se rendre sur la [Google Developer Console](https://console.developers.google.com/apis/credentials?project=thematic-scope-119418&authuser=0)

La page doit rensembler à quelque chose comme ça. 

![gdc_all][gdc_all]


Pour générer la clé OAuth, se placer sur le menu correspondant aux **Identifiants**.
  
Cliquer sur **Nouveaux identifiants** puis sur **Id client OAuth**

![gdc_oauth_new][gdc_oauth_new]

Une page s'ouvre, nous demandant a quel type d'application sera destinée cette clé, nous cliquons sur  
**Application Web** et un formulaire s'affiche, qu'il sera nécessaire de remplir. 

Il est très important de ne pas oublier de remplir le champ correspondant aux **Origines Javascript autorisés**. 
 
Il est utilisé pour les requêtes effectuées depuis un navigateur. Il s'agit de l'URI d'origine de l'applicable cliente. 

Une mauvaise configuration de ce champ pourra entrainer des erreurs de CORS domain.
 

![gdc_oauth_form][gdc_oauth_form]


En cliquant sur **Créer**, une popup s'ouvre avec les identifiants associés. 

Notez les bien, ils vous serviront dans votre application. 

(Ne vous inquietez pas si vous avez omis de les noter, vous pouvez les retrouver sur le panneau d'administration).
 
![gdc_oauth_form_ok][gdc_oauth_form_ok]


 
#### Ecran d'autorisation OAuth
 

Pour que vous puissiez utiliser votre clé, Google vous demandera des informations
qui vont être affichées aux utilisateurs lorsqu'ils s'appreterons à utiliser votre application.

Remplissez ces champs, pour pouvoir utiliser le token OAuth. 


![gdc_oauth_infos][gdc_oauth_infos]


### Utiliser la clé OAuth

Maintenant que vous avez votre clé oauth, vous pouvez commencer à utiliser l'application, autant que vous le voulez.
 
La clé correspond au champ **ID client** dans le panneau identifiant de la Google Developer Console


#### Attention

Google par défaut vous propose un compte gratuit qui bloque à partir d'un certain nombre de requêtes par jour.

Veillez a upgrader votre compte si vous voulez augmenter ce nombre.  


#### Dans le code


Maintenant, il ne reste plus qu'à utiliser la clé dans le code, dans les paramètres de connexion.  

```javascript

// Notre token oauth créé précédemment 
var CLIENT_ID = 'xxxxxx';

// Les informations utilisateur auquelles on veut accéder par notre application.
var SCOPES = ['https://www.googleapis.com/auth/calendar'];

var params_auth = {
    client_id: CLIENT_ID,
    scope: SCOPES.join(' '),
    immediate:false
};

// Fonction de connexion, qui va ouvrir une popup d'acceptation, etc. 
gapi.auth.authorize(params_auth, function(authResult){
    // Callback of the auth
});

``` 


Vous pouvez trouver un exemple dans `src/google-api.js`


# Seconde partie 

Maintenant que vous savez comment setup un projet utilisant l'api Google, intéressons nous à la manière de 
récupérer les informations. 


## Preuve de Concept 

### Avant propos sur le POC
 
La totalité est écrite en ECMAScript 6 (ES6 ou Ecmascript2015), correspondant à la dernière spécification du langage JavaScript.

Pour comprendre directement comment le code a été écrit, passez cette section et allez directement dans **Dive to the code**
 

#### Ecmascript 6
 
**Toutes les fonctionnalités qui sont utilisées ici fonctionnent très bien en version 5 du langage** et sont d'ailleurs transpilées en 
version 5 avec Babel, mais nous reviendrons là-dessus plus tard. 

Utiliser ES6 permet d'avoir une meilleure visibilité dans le code, c'est plus propre, énormément de nouvelles fonctionnalités sont incluses
nativement comme les Promises (entre autres). 

Pour approfondir le sujet et voir la myriade de nouvelles fonctionnalités : 

[(Excellente) conférence sur ES6](https://www.youtube.com/watch?v=uL9uAAzkFmI)

#### Babel 

A l'heure actuelle, ES6 n'est pas compatible avec l'ensemble des navigateurs (la spec date de fin 2015 et tout les navigateurs
n'ont pas encore pu se mettre à jour). 

Cependant, pour utiliser ES6 dès à présent on peut utiliser un transpileur.

Un transpileur prend du code source ES6 en entrée et génère du code ES5, qui peut tourner dans n’importe quel navigateur. 
Il génère même les fichiers source map﻿, qui permettent de débugger directement le code ES6 depuis le navigateur. 
Au moment de l’écriture de ces lignes, il y a deux outils principaux pour transpiler de l’ES6 :
Traceur, un projet Google.
Babeljs, un projet démarré par Sebastian McKenzie, un jeune développeur de 17 ans (oui, ça fait mal), et qui a reçu beaucoup de contributions extérieures.

[Documentation officielle](https://babeljs.io/)

Babel nous permet ainsi d'utiliser quasi toutes les fonctionnalités d'ES6 directement dans une runtime ES5. 

L'ensemble du code front chez Facebook est basé sur ES6 et Babel, donc coté stabilité ça fonctionne plutôt bien! ;-) 
   
#### React

[Documentation officielle](http://facebook.github.io/react/index.html)

Pour construire l'interface utilisateur, j'ai utilisé React plutôt que de manipuler le DOM avec jQuery. 

React est une lib développée par facebook en interne et faite pour créer des interfaces utilisateurs à partir de composants 
(un peu comme les directives angular).
 
React est spécialisée là-dedans et le fait très bien. Attention, ce n'est pas un framework mais une librairie. 

Elle utilise quelques concepts plutôt sympa tels que, le virtual DOM ou l'immutabilité des états dans les composants permettant 
de composer des interfaces utilisateurs beaucoup plus maintenables et simples.

Quelques web-app qui utilisent React : Facebook (certaines parties), Instagram (en totalité), Khan Academy, ... 

La compréhension du code du POC ne sera pas impactée par React qui est très simple à lire et l'ensemble des fonctionnalités concernant l'api
google sont dans des fichiers séparés. 

De plus j'ai essayé d'agrémenter le code de commentaire explicatif au maximum.
   
   
#### Webpack

Comme gestionnaire de build j'ai volontairement décidé de ne pas utiliser Grunt/Gulp pour plutôt utiliser webpack 

(qui est juste un module bundler) pour transpiler mon code ES6 vers ES5 et gérer les dépendances coté front et tout bundler
dans un seul fichier. 
  
D'autres part, j'utilise des tâches npm pour lancer le serveur de dev (cf `package.json`)

[Documentation webpack](https://webpack.github.io/docs/)
   
### SDK JS

Avant toute choses, il est nécessaire d'importer le SDK JavaScript de Google pour avoir les fonctions nous permettant de taper sur l'API. 


```html
<!-- index.html -->
...
<script src="https://apis.google.com/js/client.js"></script>
```



### Dive to the code

#### Archi des composants

L'application contient plusieurs composants :

```
+- AppContainer -------------------------+
|                                        |
| +- CalendarList -+ +- EventList +----+ |
| | +- Calendar -+ | | +- EventForm -+ | |
| | +- Calendar -+ | |   +- Event -+   | |
| | +- Calendar -+ | |   +- Event -+   | |
| | etc ..         | |   +- Event -+   | |
| +----------------+ +-----------------+ |
+----------------------------------------+
```


- CalendarList : Affiche la liste des Calendar
- Calendar : Une div affichant les informations sur un calendrier
- EventList : Affiche la liste de composants Event
- EventForm : Un formulaire pour ajouter un évenement 
- Event : Une div affichant un évenement d'un calendrier. 


```bash

npm install
npm run start
# http://localhost:8080

```


Le point d'entrée de l'application est le fichier app.js

J'attends que le dom soit entièrement "ready" pour render mon composant principal qui contient les composants enfants. 

Je fais ça pour éviter que le composant soit affiché plus rapidement que la librairie google maps et donc provoquer des undefined
à foison. 

```javascript

import React from 'react';
import ReactDOM from 'react-dom';
// Mon composantn principal
import AppContainer from './components/app-container.jsx';

import { onDomReady } from './dom-utils';

onDomReady(function() {
  ReactDOM.render(<AppContainer />, document.getElementById('root'));
});
```



##### App Container

C'est le composant principal puisqu'il contient deux sous composants majeurs ainsi que l'état général de l'application. 
 
La méthode **render** est celle qui va afficher le HTML, je vérifie que l'utilisateur soit connecté pour 
lui afficher les informations, sinon on lui affiche un bouton de connexion. 



### Google Api 

[La documentation](https://developers.google.com/google-apps/calendar/overview)

Il est nécessaire d'être authentifié pour accéder aux informations utilisateurs.
 
 
#### Afficher les calendriers d'un utilisateur 


Cette fonctionnalité est prisé en charge par le composant **calendar-list.jsx** 

```javascript

// toujours bien "loader" les calendriers avant, sinon on ne pourra pas faire de request
gapi.client.load('calendar', 'v3', function() {
  const request = gapi.client.calendar.calendarList.list();
  request.execute(function(resp){
    // La liste des calendriers 
    const calendars = resp.items;
  });
});

```


#### Afficher les évenements d'un calendrier

[La documentation](https://developers.google.com/google-apps/calendar/v3/reference/calendarList/list)

Cette fonctionnalité est prise en charge par le composant app-container.

En effet celui-ci garde dans son état interne le calendrier qui a été sélectionné ainsi que 

ses événements associés.

```javascript

gapi.client.load('calendar', 'v3', function() {
  // Les informations qu'on veut avoir, il peut y en avoir + ou moins. 
  const request = gapi.client.calendar.events.list({
    // J'affiche les events que à partir d'aujourd'hui
    'timeMin': (new Date()).toISOString(),
    // L'id du calendrier qu'on veut afficher. Par défaut on peut choisir le calendrier 'primary' correspondant à celui par défaut
    'calendarId': 'xxxxxx',
    'showDeleted': false,
    'singleEvents': true,
    // J'affiche uniquement une 10aine d'événements, parce que sinon on s'en sort plus.
    'maxResults': 10,
    'orderBy': 'startTime'
  });
  request.execute(function(resp) {
    // La liste des événements
    const events = resp.items;
  });
});

```



#### Créer un événement 


Cette fonctionnalité est associée au composantn app-container, dans la fonction **createEventInCalendar**


```javascript

var request = gapi.client.calendar.events.insert({
    'calendarId': 'xxxx', // Ou primary par défaut
    'resource': {
        summary: 'Foo',
        location: 'Bar',
        description: 'FooBar',
        start: {
            date: new Date()
        },
        end: {
            date: // Deux jours plus tard par exemple  
        }
    }
});

request.execute(function(result) {
    // Yay, mon event est créé ... 
});
```




