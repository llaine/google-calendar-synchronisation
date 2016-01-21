import React, { Component } from 'react';

import { loadCalendars } from '../google-api';

import Calendar from './calendar-item.jsx';

class CalendarList extends Component {
  constructor() {
    super();
    // Ce composant contient un tableau de calendrier
    this.state = {
      calendars: []
    }
  }

  /**
   * Avant que le composant se render, on récupère les composantns
   * puis on les assigne dans l'état définit dans le constructeur.
   */
  componentDidMount() {
    loadCalendars().then((calendars) => {
      this.setState({calendars:calendars});
    });
  }

  render() {
    const displayEventsFn = this.props.displayEvents;
    // On boucle sur les calendriers dans l'état
    const calendars = this.state.calendars.map(function(cal) {
      return (<Calendar
                displayEvents={displayEventsFn}
                key={cal.id}
                id={cal.id}
                description={cal.description}
                summary={cal.summary}
                accessRole={cal.accessRole}
                bgColor={cal.backgroundColor}
              />)
    });

    // On affiche la liste des composannts Calendrier.
    return (<div id="calendarList">{calendars}</div>)
  }
}

export default CalendarList;