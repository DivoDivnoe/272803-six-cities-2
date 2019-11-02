import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review.jsx';

const ReviewsList = (props) => {
  const {reviews} = props;
  const sortedReviews = reviews
    .slice()
    .sort((prev, next) => Date.parse(next.date) - Date.parse(prev.date));

  return (
    <React.Fragment>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map((review, index) => (<Review review={review} key={`review-${index}`}/>))}
      </ul>
    </React.Fragment>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    user: PropTypes.exact({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
};

export default ReviewsList;
