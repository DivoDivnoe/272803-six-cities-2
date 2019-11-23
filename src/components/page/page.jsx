import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';

const Page = (props) => {
  const {mods, user} = props;

  return (
    <div className={`page ${mods.map((mod) => `page--${mod}`).join(` `)}`}>
      <Header user={user} />
      {props.children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  mods: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.strins,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }).isRequired,
};

Page.defaultProps = {
  mods: []
};

export default Page;
