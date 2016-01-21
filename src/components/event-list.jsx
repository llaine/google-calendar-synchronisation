import React, { Component } from 'react';

import Event from './event-item.jsx';
import EventForm from './event-form.jsx';

export default class EventList extends Component {
  constructor() {
    super(...arguments);
  }

  /**
   * Renvoie un tableau d'event component
   * @returns {XML}
   */
  render() {

    const createEventFn = this.props.createEventCallback;
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
        <div>
          <EventForm createEventCallback={createEventFn} />
          <ul className="list-group">{eventList.length === 0 ? 'Aucun évenement pour ce calendrier' : eventList}</ul>
        </div>
    )
  }
}