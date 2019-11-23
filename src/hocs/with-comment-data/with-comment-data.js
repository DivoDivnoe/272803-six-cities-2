import React, {PureComponent} from 'react';

const withCommentData = (Component) => {
  class WithCommentData extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: `0`,
        review: ``
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleResetState = this.handleResetState.bind(this);
    }

    render() {
      const {rating, review} = this.state;

      return (
        <Component
          {...this.props}
          rating={rating}
          review={review}
          onResetForm={this.handleResetState}
          onChange={this.handleChange}
        />
      );
    }

    handleChange(name, value) {
      this.setState({[name]: value});
    }

    handleResetState() {
      this.setState({
        rating: `0`,
        review: ``
      });
    }
  }

  WithCommentData.propTypes = {};

  return WithCommentData;
};

export default withCommentData;
