import React, { Component } from 'react';

export default class Event extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
        <li>
          {this.props.summary} @ {this.props.location} le {this.props.startDate.date}
          <a target="_blank" href={this.props.link}>Plus d'informations</a>
        </li>
    )
  }
}