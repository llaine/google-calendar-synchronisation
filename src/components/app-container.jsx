import React, { Component } from 'react';

import CalendarList from './calendar-list.jsx';
import EventList from './event-list.jsx';
import ConnexionBtn from './connexion-btn.jsx';

import { loadEvents, userConnected, createRandomEvent, authenticateUser } from '../google-api';


export default class AppContainer extends Component {
  constructor() {
    super(...arguments);
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


  createEventInCalendar(event) {
    event.preventDefault();
    console.log('toto');
  }

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
            return (<EventList createEventCallback={this.createEventInCalendar.bind(this)} events={this.state.events} />);
          }
        }.bind(this);

        // On affiche la liste des calendriers avec les events (si selectionné)
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