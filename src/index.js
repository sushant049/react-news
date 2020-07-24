import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/app';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import persistState from 'redux-sessionstorage';

const middleware = [
  thunk
];

const composeEnhancers =
    (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
        compose;

const store = createStore(rootReducer, composeEnhancers(
  persistState(['news']),
  applyMiddleware(...middleware)
));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));