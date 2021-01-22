import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'

import App from './App'

import { connect } from './networking'

Promise.all([
  connect()
]). then(() => {
  ReactDOM.render(
    <Provider store={ store }>
      <App />
    </Provider>
    ,
    document.getElementById('root')
  );
})


