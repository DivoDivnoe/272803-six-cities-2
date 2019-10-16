import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/main-page/main-page.jsx';

const init = () => {
  ReactDOM.render(<MainPage />, document.querySelector(`#root`));
};

init();
