import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {MAX_RATING, MIN_REVIEW_LENGTH, StatusCode} from '../../constants.js';

const style = {
  position: `absolute`,
  top: `calc(100% + 5px)`,
  left: `50%`,
  color: `red`,
  whiteSpace: `pre`,
  transform: `translateX(-50%)`
};

class CommentForm extends PureComponent {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    const {rating, review, serverStatus} = this.props;

    return (
      <form
        className="reviews__form form"
        style={{position: `relative`}}
        action="#"
        method="post"
        onSubmit={this._handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {Array.from({length: MAX_RATING}, (_, i) => MAX_RATING - i).map((value) => {
            return (
              <React.Fragment key={`input-${value}`}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={value}
                  id={`${value}-stars`}
                  type="radio"
                  defaultChecked={rating === value}
                  onChange={this._handleChange}
                />
                <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={review}
          onChange={this._handleChange}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!+rating || review.length < MIN_REVIEW_LENGTH}
          >Submit</button>
        </div>
        {serverStatus === StatusCode.BAD_REQUEST && <div style={style}>Введите корректные данные</div>}
      </form>
    );
  }

  _handleSubmit(evt) {
    const {id, rating, review, onSubmit, onResetForm, onChangeServerStatus} = this.props;

    evt.preventDefault();

    onSubmit(id, {rating: +rating, comment: review}, onResetForm, onChangeServerStatus);

  }

  _handleChange(evt) {
    const {name, value} = evt.target;
    const {onChange} = this.props;

    onChange(name, value);
  }
}

CommentForm.propTypes = {
  id: PropTypes.number.isRequired,
  rating: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  serverStatus: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeServerStatus: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired
};

export default CommentForm;
