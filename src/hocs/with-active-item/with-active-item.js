import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {activeItem: {}};

      this.handleChangeActiveItem = this.handleChangeActiveItem.bind(this);
      this.handleResetActiveItem = this.handleResetActiveItem.bind(this);
    }

    handleChangeActiveItem(item) {
      this.setState({activeItem: item});
    }

    handleResetActiveItem() {
      this.setState({activeItem: {}});
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          onChangeActiveItem={this.handleChangeActiveItem}
          onResetActiveItem={this.handleResetActiveItem}
        />
      );
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
