import React, {PureComponent} from 'react';

const withOpened = (Component) => {
  class WithOpened extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {isOpened: false};

      this.handleToggleState = this.handleToggleState.bind(this);
    }

    handleToggleState() {
      this.setState((prevState) => ({isOpened: !prevState.isOpened}));
    }

    render() {
      return (
        <Component
          {...this.props}
          isOpened={this.state.isOpened}
          onToggle={this.handleToggleState}
        />
      );
    }
  }

  WithOpened.propTypes = {};

  return WithOpened;
};

export default withOpened;
