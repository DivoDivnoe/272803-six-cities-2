import React from 'react';
import PropTypes from 'prop-types';

const MAX_CITIES_AMOUNT = 6;

const CitiesList = (props) => {
  const {cities, city, onChangeCity} = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.slice(0, MAX_CITIES_AMOUNT).map((item, index) => {
            return (
              <li className="locations__item" key={`city-tab-${index}`}>
                <a
                  className={`locations__item-link tabs__item ${item === city ? `tabs__item--active` : ``}`}
                  href="#"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onChangeCity(item);
                  }}
                >
                  <span>{item}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  onChangeCity: PropTypes.func.isRequired
};

export default CitiesList;
