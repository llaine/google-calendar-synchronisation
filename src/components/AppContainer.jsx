import React, { Component } from 'react';

import CalendarList from './calendar-list.jsx';
import EventList from './event-list.jsx';

import { loadEvents, userConnected, createRandomEvent } from '../google-api';


export default class AppContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      events:[],
      currentCalendar: null,
      userConnected:false
    }
  }

  componentDidMount() {
    userConnected()
      .then(() => {
        this.setState({userConnected:true})
      })
      .catch((error) => {
        console.log(error);
        this.setState({userConnected:false})
      })
  }

  displayEventFromCalendar(id) {
    loadEvents(id).then((events) => {
      this.setState({events: events, currentCalendar:id})
    });
  }

  render() {
    console.log('Render called');
    const renderMainApp = function() {
      // L'utilisateur est connecté
      if(this.state.userConnected) {

        // On vérifie qu'il a sélectionné un calendrier
        let eventList = function() {
          if(this.state.currentCalendar) {
            return (<EventList events={this.state.events} />);
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
              <button className="btn btn-default">Connexion</button>
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