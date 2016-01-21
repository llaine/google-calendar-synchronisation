[gdc_all]: public/img/gdc_all.png 
[gdc_oauth_new]: public/img/gdc_oauth_new.png 
[gdc_oauth_form]: public/img/gdc_oauth_form.png 
[gdc_oauth_infos]: public/img/gdc_oauth_infos.png 
[gdc_oauth_form_ok]: public/img/gdc_oauth_form_ok.png 

# Documentation

Pour toutes informations supplémentaire : louis.laine7@gmail.com 

## Préambule

Cette petite page de wiki accompagne le POC qui méritent quelques explications sur certains aspects,
telle que les clés d'API Google, ou la manière dont est écrit le POC. 

Dans un premier temps nous verrons comment récupérer les clés d'authentification Google et pouvoir
 accéder à l'API Google. 
 
Dans un second temps, nous verrons comment le POC a été écrit et quelles méthodes ont été utilisées.
  
  
## Nota Bene

Tout le code qui va être montré dans cette page de wiki est situé dans le dossier `src/` du projet.  




# Première partie 

## Créer des identifiants pour l'api Google

Chaque application qui utilise des données provenant de Google (maps, calendar, youtube, etc) doit obligatoirement
fournir une clé d'API. 
On peut créer plusieurs type de clé différentes, mais pour nos besoins (une application web), 
seule une clé oauth sera nécessaire. 



### Générer la clé OAuth

Pour générer cette clé, il faut se rendre sur la [Google Developer Console](https://console.developers.google.com/apis/credentials?project=thematic-scope-119418&authuser=0)

La page doit rensembler à quelque chose comme ça. 

![gdc_all][gdc_all]


Pour générer la clé OAuth, se placer sur le menu correspondant aux **Identifiants**.
  
Cliquer sur **Nouveaux identifiants** puis sur **Id client OAuth**

![gdc_oauth_new][gdc_oauth_new]

Une page s'ouvre, nous demandant quel type d'application sera destiné cette clé, nous cliquons sur  
**Application Web** et un formulaire s'affiche, qu'il sera nécessaire de remplir. 

Il est très important de ne pas oublier de remplir le champ correspondant aux **Origines Javascript autorisés**. 
 
Il est utilisé pour les requêtes effectuées depuis un navigateur. Il s'agit de l'URI d'origine de l'applicable cliente. 

Une mauvaise configuration de ce champ pourra entrainé des erreurs de CORS domain.
 

![gdc_oauth_form][gdc_oauth_form]


En cliquant sur **Créer**, une popup s'ouvre avec les identifiants associés. 

Notez les bien, ils vous serviront dans votre application. 

(Ne vous inquietez pas si vous avez omit de les noter, vous pouvez les retrouver sur le panneau d'administration).
 
![gdc_oauth_form_ok][gdc_oauth_form_ok]


 
#### Ecran d'autorisation OAuth
 

Pour que vous puissiez utiliser votre clé, Google vous demandera des informations concernant certaines informations
qui vont être affichés aux utilisateurs lorsqu'il s'appreterons à utiliser votre application.

Remplissez ces champs, pour pouvoir utiliser le token OAuth. 


![gdc_oauth_infos][gdc_oauth_infos]


### Utiliser la clé OAuth

Maintenant que vous avez votre clé oauth, vous pouvez commencer à utiliser l'application, autant que vous le voulez.
 
La clé correspond au champ **ID client** dans le panneau identifiant de la Google Developer Console


#### Attention

Google par défaut vous propose un compte gratuit qui bloque à partir d'un certain nombre de requêtes par jours.

Voyez a upgrader votre compte si vous voulez augmenter ce nombre.  


#### Dans le code


Maintenant, il ne reste plus qu'à utiliser la clé dans le code, dans les paramètres de connexion.  

```javascript

// Notre token oauth crée précédemment 
var CLIENT_ID = 'xxxxxx';

// Les informations utilisateur qu'on veut accéder par notre application.
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