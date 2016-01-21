
const CLIENT_ID = '407102783207-cfilj8ul82ipdigkcr0osdr14pvqg9hh.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

/**
 * Authentifie un utilisateur.
 * L'action après l'authent est renvoyé dans un callback.
 * @param cb
 */
export function authenticateUser(cb) {
  const params = {
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': false
  };
  gapi.auth.authorize(params, cb);
}

/**
 * Vérifie si l'utilisateur est connecté
 * J'utilise une Promise ES6 native, pour éviter d'avoir a renvoyer un callback dans la fonction
 * c'est juste du sucre syntaxique en plus
 */
export function userConnected() {
  return new Promise(function(resolve, reject) {
    authenticateUser(function(authResult) {
      if(authResult && !authResult.error) {
        resolve();
      } else {
        reject(authResult);
      }
    });
  });
}

/**
 * Charge 10 évenements à partir d'aujourd'hui sur un calendrier
 * @param eventId
 * @returns {Promise}
 */
export function loadEvents(eventId) {
  return new Promise(function(resolve, reject) {
    if(!eventId) reject('eventId undefined');
    // Toujours loader les calendrier avant
    gapi.client.load('calendar', 'v3', function() {
      const request = gapi.client.calendar.events.list({
        // J'affiche les events que à partir d'aujourd'hui
        'timeMin': (new Date()).toISOString(),
        'calendarId': eventId,
        'showDeleted': true,
        'singleEvents': true,
        // J'affiche uniquement une 10aine d'évenements, parce que sinon on s'en sort plus.
        'maxResults': 10,
        'orderBy': 'startTime'
      });
      request.execute(function(resp) {
        const events = resp.items;
        resolve(events);
      });
    });
  });
}

/**
 * Load les events du calendar par défaut
 */
/*
export function loadEvents() {
  gapi.client.load('calendar', 'v3', function() {

    // On faire une requête Google Calendar "classique"
    const request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      const events = resp.items;

      events.map((event) => {
        console.log(event);
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        append(`* ${event.summary} ( ${when})`);
      });
    });
  });
}
*/

/**
 * Ajoute un évenement random sur le calendrier par défaut
 */
export function createRandomEvent(eventAttributes, calendarId) {
  return new Promise(function(reject, resolve) {

    const random = Math.random();

    var event = {
      'summary': !eventAttributes.summary ?
          `Event N° ${random}` : eventAttributes.summary,
      'location': !eventAttributes.localisation ?
          '800 Howard St., San Francisco, CA 94103' : eventAttributes.localisation,
      'description': !eventAttributes.description ?
          'Je suis un évenement aléatoire crée depuis une appli web!.' : eventAttributes.description,
      'start': {
        'dateTime': !eventAttributes.startDateTime ?
            '2016-01-25T09:00:00-07:00' : eventAttributes.startDateTime
      },
      'end': {
        'dateTime': !eventAttributes.endDateTime ?
            '2016-01-25T17:00:00-07:00' : eventAttributes.endDateTime
      }
    };
    var request = gapi.client.calendar.events.insert({
      'calendarId': !calendarId ? 'primary' : calendarId,
      'resource': event
    });

    request.execute(function(event) {
      resolve(event);
    });
  });
}

/**
 * Charge l'ensemble des calendriers du compte
 * @returns {Promise}
 */
export function loadCalendars() {
  return new Promise(function (resolve, reject) {
    gapi.client.load('calendar', 'v3', function() {
      const request = gapi.client.calendar.calendarList.list();
      request.execute(function(resp){
        const calendars = resp.items;
        resolve(calendars);
      });
    });
  });
}