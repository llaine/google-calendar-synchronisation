import React, { Component } from 'react';


export default class Calendar extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const divStyle = {
      backgroundColor: this.props.bgColor,
    };

    return (
        <div className="panel panel-default calendar-item">
          <div className="panel-body" style={divStyle}>
           {this.props.description} - {this.props.summary}
          </div>
        </div>
    )
  }
}