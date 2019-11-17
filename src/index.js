import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import {reviews} from './mocks/reviews';
import leaflet from 'leaflet';
import reducer from './reducer/index';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App
          leaflet={leaflet}
          reviews={reviews}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
