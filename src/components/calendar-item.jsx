import React, { Component } from 'react';


export default class Calendar extends Component {
  constructor() {
    super(...arguments);
  }

  /**
   * Va renvoyer une calendrier tout simple.
   * On va pouvoir afficher les évenements du calendrier en utilisant
   * la fonction de callback displayEvents, qui est passé comme propriété au composant.
   * Cette méthode est définie dans le app-container.jsx
   * @returns {XML}
   */
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