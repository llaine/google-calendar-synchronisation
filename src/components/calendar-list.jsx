import React, { Component } from 'react';

import { loadCalendars } from '../google-api';

import Calendar from './calendar-item.jsx';

class CalendarList extends Component {
  constructor() {
    super();
    this.state = {
      calendars: []
    }
  }

  componentDidMount() {
    loadCalendars().then((calendars) => {
      this.setState({calendars:calendars});
    });
  }

  render() {
    let toggleEvents = this.props.callbacks;
    let calendars = this.state.calendars.map(function(cal) {

      return (<Calendar
                toggleEventsCallback={toggleEvents}
                key={cal.id}
                id={cal.id}
                description={cal.description}
                summary={cal.summary}
                accessRole={cal.accessRole}
                bgColor={cal.backgroundColor}
              />)
    });

    return (
        <div id="calendarList">{calendars}</div>
    )
  }
}

export default CalendarList;