import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import burgerReducer from './store/burger';
import orderReducer from './store/orders';
import authReducer from './store/auth';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  brg: burgerReducer,
  ord: orderReducer,
  auth: authReducer
})

const logger = state => {
  return next => {
    return action => {
      next(action)
    }
  }
}

const composeEnhancers =process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger, thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
