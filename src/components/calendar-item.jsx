import React, { Component } from 'react';


export default class Calendar extends Component {
  constructor() {
    super(...arguments);
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
            <a style={hrefStyle} onClick={this.props.displayEvents.bind(null, this.props.id)}>Afficher les évenement de ce calendrier</a>
          </div>
        </div>
    )
  }
}