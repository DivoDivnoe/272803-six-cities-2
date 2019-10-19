import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/main-page/main-page.jsx';

const descriptions = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
];

const init = () => {
  ReactDOM.render(
      <MainPage descriptions={descriptions} onClick={() => {}} />,
      document.querySelector(`#root`)
  );
};

init();
