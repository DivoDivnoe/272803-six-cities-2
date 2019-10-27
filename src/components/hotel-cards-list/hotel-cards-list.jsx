import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import HotelCard from '../hotel-card/hotel-card.jsx';

class HotelCardsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {currentCard: null};
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
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
  offers: PropTypes.arrayOf(
      PropTypes.exact({
        type: PropTypes.oneOf([`apartment`, `private room`]),
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        picture: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired,
      })).isRequired
};

export default HotelCardsList;
