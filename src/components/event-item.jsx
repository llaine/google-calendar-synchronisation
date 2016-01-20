import React, { Component } from 'react';

export default class Event extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
        <li className="list-group-item">
          {this.props.summary} <strong>@</strong>
          {this.props.location} <strong>le</strong>
          {this.props.startDate.date}
          <a target="_blank" href={this.props.link}>Plus d'informations</a>
        </li>
    )
  }
}