import React, { Component } from 'react';

export default class EventForm extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      newEvent: {
        description: "",
        summary:"",
        localisation: "",
        start: {
          dateTime : new Date()
        }
      }
    }
  }

  onChange(name) {
    const value = arguments[1].target.value;

  }

  render() {
    return (
        <div className="jumbotron">
          <p>Créer un évenement sur ce calendrier</p>
          <form onSubmit={this.props.createEventCallback.bind(event)} className="form-inline" noValidate>
            <div className="form-group">
              <input type="text"
                     onKeyPress={this.onChange.bind(this, 'summary')}
                     className="form-control"
                     id="nom"
                     placeholder="Nom" />
            </div>
            <div className="form-group">
              <input type="text"
                     onKeyPress={this.onChange.bind(this, 'description')}
                     className="form-control"
                     id="description"
                     placeholder="Description" />
            </div>
            <div className="form-group">
              <input type="text"
                     onKeyPress={this.onChange.bind(this, 'localisation')}
                     className="form-control"
                     id="localisation"
                     placeholder="Localisation" />
            </div>
            <button type="submit" className="btn btn-default">Créer</button>
          </form>
        </div>
    );
  }
}