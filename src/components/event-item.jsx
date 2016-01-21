import React, { Component } from 'react';

import Moment from 'moment';

export default class Event extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    var date;
    if(this.props.startDate.dateTime) {
      date = new Moment(this.props.startDate.dateTime).fromNow()
    } else if(this.props.startDate.date) {
      date = new Moment(this.props.startDate.date).fromNow()
    }

    return (
        <li className="list-group-item">
          <p><strong>{date}</strong></p>
          <p>{this.props.summary} {this.props.location}</p>
          <a target="_blank" href={this.props.link}>Plus d'informations</a>
        </li>
    )
  }
}