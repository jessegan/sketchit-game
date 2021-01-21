import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/root'
import thunk from 'redux-thunk'

import App from './App'

import { connect } from './networking'

const store = createStore(rootReducer, applyMiddleware(thunk))

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


