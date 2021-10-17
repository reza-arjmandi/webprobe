import React from 'react';
import thunkMiddleware from 'redux-thunk'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import { ToastContainer } from 'react-toastify';
import reduxWebsocket from '@giantmachines/redux-websocket';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from './reducers';
import { load_store } from './store';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxWebsocketMiddleware = reduxWebsocket({
  deserializer:(message)=>JSON.parse(message)
});

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(reduxWebsocketMiddleware)
  )
);
load_store(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer 
        limit={3}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
