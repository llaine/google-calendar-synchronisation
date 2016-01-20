import React, { Component } from 'react';


export default class ConnexionBtn extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
        <div>
          Merci de vous &nbsp;
          <button className="btn btn-default" onClick={this.props.onBtnClick.bind()}>Connecter</button>
          &nbsp; pour accéder au contenu.
        </div>
    )
  }
}