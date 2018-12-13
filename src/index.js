import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import decode from 'jwt-decode';
import isFuture from 'date-fns/is_future';
import { addReactorsToStore } from './reactors/HumanRedux';
import createRootReducer from './reducers';
import { loadData, loadGroupDetails } from './reactors';
// import { loadData, loadAccountDetails, loadGroupDetails } from './reactors';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

let token = null;
const localToken = localStorage.getItem('jwt');
if (localToken) {
  const decodedToken = decode(localToken);
  const expiryDate = new Date(decodedToken.exp * 1000);
  if (isFuture(expiryDate)) {
    token = localToken;
  }
}

const defaultState = {
  auth: {
    token,
  }
};

const store = createStore(
  createRootReducer(history),
  defaultState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      reduxThunk,
    )
  )
);

addReactorsToStore({
  store: store,
  reactors: [ loadData, loadGroupDetails ],
  // reactors: [ loadData, loadAccountDetails, loadGroupDetails ],
  runIdle: true,
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
