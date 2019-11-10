import React from 'react';
import PropTypes from 'prop-types';

const CitiesWrapper = (props) => {
  const {offers} = props;

  return (
    <div className="cities">
      <div className={
        `cities__places-container container ${!offers ? `cities__places-container--empty` : ``}`
      }>
        {props.children}
      </div>
    </div>
  );
};

CitiesWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  offers: PropTypes.number.isRequired
};

export default CitiesWrapper;
