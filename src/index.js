import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import leaflet from 'leaflet';

const init = () => {
  ReactDOM.render(
      <App
        offers={offers}
        leaflet={leaflet}
        reviews={reviews}
      />, document.querySelector(`#root`)
  );
};

init();
