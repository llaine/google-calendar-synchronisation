import React, { Component } from 'react';

import Moment from 'moment';

export default class EventForm extends Component {
  constructor() {
    super(...arguments);

    const CALENDAR_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

    this.state = {
      description: "",
      summary:"",
      localisation: "",
      startDateTime : new Moment().format(CALENDAR_FORMAT),
      endDateTime : new Moment().add(1, 'days').format(CALENDAR_FORMAT)
    }
  }


  resetState() {
    this.setState({
      description: null,
      summary: null,
      localisation: null,
      startDateTime : null,
      endDateTime : null
    })
  }

  /**
   * Mets à jour l'objet state
   * Le nom correspond à la propriété dans le state
   * @param name
   */
  onChange(name) {
    const value = arguments[1].target.value;
    this.setState({[name]:value});
  }

  /**
   * Au submit du formulaire,
   * on évite qu'il se valide et on appelle le callback de création d'event.
   * @param e
   */
  onSubmit(e) {
    e.preventDefault();
    // On appelle la fonction déclaré dans le app-container qui nous était passé en tant que propriété.
    this.props.createEventCallback(this.state);
    // Reset le form
    e.target.reset();
    // Reset l'état attaché au formulaire
    this.resetState();
  }

  render() {
    return (
        <div className="jumbotron">
          <p>Créer un évenement sur ce calendrier</p>
          <form onSubmit={this.onSubmit.bind(this)} className="form-inline" noValidate>
            <div className="form-group">
              <input type="text"
                     onKeyUp={this.onChange.bind(this, 'summary')}
                     className="form-control"
                     id="nom"
                     placeholder="Nom" />
            </div>
            <div className="form-group">
              <input type="text"
                     onKeyUp={this.onChange.bind(this, 'description')}
                     className="form-control"
                     id="description"
                     placeholder="Description" />
            </div>
            <div className="form-group">
              <input type="text"
                     onKeyUp={this.onChange.bind(this, 'localisation')}
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