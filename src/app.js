import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/app-container.jsx';

import { onDomReady } from './dom-utils';

onDomReady(function() {
  ReactDOM.render(<AppContainer />, document.getElementById('root'));
});
