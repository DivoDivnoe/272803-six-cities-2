import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import HotelCard from '../hotel-card/hotel-card.jsx';

class HotelCardsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {currentCard: null};
  }

  render() {
    const {offers, classNames} = this.props;

    return (
      <div className={classNames.join(` `)}>
        {offers.map((data, index) => (
          <HotelCard
            data={data}
            onMouseEnter={(card) => this.mouseEnterHandler(card)}
            onMouseLeave={() => this.mouseLeaveHandler()}
            key={`card-${index}`}
          />
        ))}
      </div>
    );
  }

  mouseEnterHandler(card) {
    this.setState({
      currentCard: card
    });
  }

  mouseLeaveHandler() {
    this.setState({currentCard: null});
  }
}

HotelCardsList.propTypes = {
  classNames: PropTypes.arrayOf(
      PropTypes.string
  ).isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        city: PropTypes.exact({
          name: PropTypes.string.isRequired,
          location: PropTypes.exact({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            zoom: PropTypes.number.isRequired
          }).isRequired
        }).isRequired,
        type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]),
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        picture: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        goods: PropTypes.arrayOf(PropTypes.string).isRequired,
        bedrooms: PropTypes.number.isRequired,
        maxAdults: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired,
        host: PropTypes.exact({
          id: PropTypes.number.isRequired,
          isPro: PropTypes.bool.isRequired,
          name: PropTypes.string.isRequired,
          avatarUrl: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.exact({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired
        }).isRequired
      })).isRequired,
};

export default HotelCardsList;
