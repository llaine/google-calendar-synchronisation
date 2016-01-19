const CLIENT_ID = '';
const SCOPES = ['https://www.googleapis.com/auth/calendar'];


export default function checkUserAuthentication() {
  const params = {
    'client_id': CLIENT_ID,
    'scope': SCOPES,
    'immediate': true
  };
  gapi.auth.authorize(params, onUserConnection);
};


export default function onUserConnection(authResult) {
  if(authResult && !authResult.error) {
    // TODO, loader les events
    gapi.client.load('calendar', 'v3', loadEvents);
  } else {
    alert('La connection n\'a pas fonctionné merci de réessayer');
    // FIXME : On est pas connecté
  }
};


export default function loadEvents() {
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
    var events = resp.items;
    console.log(events);
  });
};