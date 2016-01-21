import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer.jsx';

import { onDomReady } from './dom-utils';

onDomReady(function() {
  ReactDOM.render(<AppContainer />, document.getElementById('root'));
});
