import React, { Component } from 'react';


class UserInfos extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div id="userInfos">
          Welcome, {this.props.username}
        </div>
    )
  }
}