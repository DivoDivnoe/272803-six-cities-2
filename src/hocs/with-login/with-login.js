import React, {PureComponent} from 'react';

const withLogin = (Component) => {
  class WithLogin extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this.handleChange = this.handleChange.bind(this);
    }

    render() {
      const {email, password} = this.state;

      return (
        <Component
          {...this.props}
          email={email}
          password={password}
          onChange={this.handleChange}
        />
      );
    }

    handleChange(name, value) {
      this.setState({
        [name]: value
      });
    }
  }

  WithLogin.propTypes = {};

  return WithLogin;
};

export default withLogin;
