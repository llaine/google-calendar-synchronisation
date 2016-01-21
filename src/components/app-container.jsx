import React, { Component } from 'react';

import CalendarList from './calendar-list.jsx';
import EventList from './event-list.jsx';
import ConnexionBtn from './connexion-btn.jsx';

import { loadEvents, userConnected, createEventForCalendar, authenticateUser } from '../google-api';


export default class AppContainer extends Component {
  constructor() {
    super(...arguments);
    // Ce composantn dispose du calendrier courant (celui qui a été cliqué par l'utilsiateur)
    // Ainsi que la liste des évenements associé à ce calendrier.
    this.state = {
      events:[],
      currentCalendar: null,
      userConnected:false
    }
  }

  /**
   * Avant que le composant se "render", on vérifie que l'utilisateur est connecté
   */
  componentDidMount() {
    userConnected()
      .then(() => {
        this.setState({userConnected:true})
      })
      .catch((error) => {
        if(error.error_subtype === "access_denied") {
          this.setState({userConnected:false})
        } else {
          console.error(error);
        }
      });
  }

  /**
   * Fonction qui est utilisé au moment ou l'utilisateur appuye
   * sur le bouton de connexion.
   */
  onBtnConnexionClick() {
    authenticateUser(function(authResult) {
      if(authResult && !authResult.error) {
        this.setState({userConnected:true});
      } else {
        console.error(authResult);
        alert('Impossible de vous connecter')
      }
    }.bind(this))
  }

  /**
   * Fonction qui permet d'afficher les evenements d'un calendrier.
   * @param id
   */
  displayEventFromCalendar(id) {
    loadEvents(id).then((events) => {
      this.setState({events: events, currentCalendar:id})
    });
  }

  /**
   * Mets à jour la liste d'évenement affiché sur la page.
   * Attention la méthode setState fait re-appel à la méthode render() du composant
   * @param newEvent
   */
  updateEvents(newEvent) {
    const currentEvents = this.state.events;
    currentEvents.push(newEvent);
    this.setState({events:currentEvents});
  }

  /**
   * Fonction permettant de créer un évenement via l'api Google.
   * Puis de réafficher la liste des composants.
   * Cette fonction est passé en attribut aux composants enfants (en particulier EventList -> EventForm).
   * @param eventAttributes
   */
  createEventInCalendar(eventAttributes) {
    createEventForCalendar(eventAttributes, this.state.currentCalendar).then((eventCreated) => {
      this.updateEvents(eventCreated)

    }).catch((eventCreated) => {
      // FIXME, la promise plante à tout les coups, alors que le calendrier est bien ajouté.
      // Cette behaviour provient de la Promise (je pense).
      this.updateEvents(eventCreated)
    })
  }

  /**
   * Fonction appelé pour afficher le HTML correspondant au composant
   * @returns {XML}
   */
  render() {
    /**
     * Fonction qui va afficher + ou - moins de composannt
     * à partir de l'état de l'application.
     * @type {function(this:AppContainer)}
     */
    const renderMainApp = function() {
      // L'utilisateur est connecté
      if(this.state.userConnected) {

        // On vérifie que l'utilisateur connecté a sélectionné un calendrier
        let eventList = function() {
          if(this.state.currentCalendar) {
            // On passe la fonction de création d'évent au composant
            // enfant, pour que celui-ci n'est pas à se charger de faire l'appel à l'API, etc.
            return (<EventList createEventCallback={this.createEventInCalendar.bind(this)} events={this.state.events} />);
          }
        }.bind(this);

        // On affiche la liste des calendriers avec les events (si selectionné)
        // Encore une fois, on passe la fonction pour afficher les évenements au composant enfant,
        // pour que le composant enfant n'est pas besoin de se charger d'afficher les events du calendrier.
        return (
            <div>
              <div className="col-md-3">
                <CalendarList displayEvents={this.displayEventFromCalendar.bind(this)} />
              </div>
              <div className="col-md-9">
                {eventList()}
              </div>
            </div>
        );
      } else {
        // L'utilisateur n'est pas connecté, on affiche un bouton de connexion
        return (
            <div className="col-md-12">
              <ConnexionBtn onBtnClick={this.onBtnConnexionClick.bind(this)} />
            </div>
        )
      }
    }.bind(this);

    // On render l'application
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="page-header">
                <h3>Simple multidirectionnal calendar sync</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {renderMainApp()}
          </div>
        </div>
    )
  }
}