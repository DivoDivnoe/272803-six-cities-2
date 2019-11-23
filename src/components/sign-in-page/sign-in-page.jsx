import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Page from '../page/page.jsx';
import {StatusCode} from '../../constants';

const style = {
  position: `absolute`,
  top: `calc(100% + 5px)`,
  left: `50%`,
  color: `red`,
  whiteSpace: `pre`,
  transform: `translateX(-50%)`
};

class SignInPage extends PureComponent {
  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange(evt) {
    const {name, value} = evt.target;

    this.props.onChange(name, value);
  }

  _handleSubmit(evt) {
    const {email, password, onSubmit, onChangeServerStatus} = this.props;

    evt.preventDefault();

    onSubmit({email, password}, onChangeServerStatus);
  }

  render() {
    const {email, password, serverStatus, user} = this.props;

    return (
      <Page mods={[`gray`, `login`]} user={user}>
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={this._handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    value={email}
                    onChange={this._handleChange}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    value={password}
                    onChange={this._handleChange}
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit"
                  disabled={!(email.length && password.length)}
                >Sign in</button>
                {serverStatus === StatusCode.BAD_REQUEST && <div style={style}>Введите корректные данные</div>}
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </Page>
    );
  }
}

SignInPage.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  serverStatus: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.strins,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeServerStatus: PropTypes.func.isRequired
};

export default SignInPage;
