import React, { Component } from 'react';


import Event from './event-item.jsx';

export default class EventList extends Component {
  constructor() {
    super(...arguments);
  }

  /**
   * Renvoie un tableau d'event component
   * @returns {XML}
   */
  render() {
    const eventList = this.props.events.map(function(event) {
      return (<Event key={event.id}
              location={event.location}
               link={event.htmlLink}
               created={event.created}
               summary={event.summary}
               startDate={event.start}
              />)
    });


    return (
        <ul>{eventList.length === 0 ? 'Aucun évenement pour ce calendrier' : eventList}</ul>
    )
  }
}