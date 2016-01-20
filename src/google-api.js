import { append } from './dom-utils';

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
    'immediate': true
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
 * Load les events du calendar par défaut
 */
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

/**
 * Ajoute un évenement random sur le calendrier par défaut
 */
export function createRandomEvent() {
  const random = Math.random();

  var event = {
    'summary': `Event N° ${random}`,
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'Je suis un évenement aléatoire crée depuis une appli web!.',
    'start': {
      'dateTime': '2016-01-25T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles'
    },
    'end': {
      'dateTime': '2016-01-25T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles'
    }
  };
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });

  request.execute(function(event) {
    append('Event created: ' + event.htmlLink);
  });
}


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