import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/main-page/main-page.jsx';
import {offers} from './mocks/offers';

const init = () => {
  ReactDOM.render(
      <MainPage offers={offers} />, document.querySelector(`#root`)
  );
};

init();
