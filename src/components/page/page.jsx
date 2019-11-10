import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';

const Page = (props) => {
  const mods = props.mods;

  return (
    <div className={`page ${mods.join(` `)}`}>
      <Header />
      {props.children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  mods: PropTypes.arrayOf(PropTypes.string)
};

Page.defaultProps = {
  mods: []
};

export default Page;
