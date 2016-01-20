import React, { Component } from 'react';

import { loadCalendars } from '../google-api';

import Calendar from './calendar-item';

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
    let calendars = this.state.calendars.map(function(cal) {
      console.log(cal);
      return (<Calendar
                key={cal.id}
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