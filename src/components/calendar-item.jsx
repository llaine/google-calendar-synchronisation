import React, { Component } from 'react';


export default class Calendar extends Component {
  constructor() {
    super(...arguments);
  }

  toggleEvents(){
    this.props.toggleEventsCallback(this.props.id);
  }

  render() {
    const divStyle = { backgroundColor: this.props.bgColor };

    const hrefStyle = {
      color:'black',
      textDecoration:'underline',
      cursor:'pointer'
    };

    return (
        <div className="panel panel-default calendar-item">
          <div className="panel-body" style={divStyle}>
            <div>
              {this.props.description} - {this.props.summary}
            </div>
            <a style={hrefStyle} onClick={this.toggleEvents.bind(this)}>Afficher les évenement de ce calendrier</a>
          </div>
        </div>
    )
  }
}