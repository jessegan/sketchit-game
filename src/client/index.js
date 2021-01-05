import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'

import { connect } from './networking'

Promise.all([
  connect()
]). then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})


