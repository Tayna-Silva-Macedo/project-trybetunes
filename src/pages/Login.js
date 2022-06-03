import React from 'react';
import { Redirect } from 'react-router-dom';

import { createUser } from '../services/userAPI';

import Loading from '../components/Loading';

import logo from '../img/logoTrybeTunes.png';

import '../styles/login.css';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    loginName: '',
    isLoading: false,
    saved: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState(
      {
        [name]: value,
      },
      () => this.validation(),
    );
  };

  validation = () => {
    const { loginName } = this.state;
    const minimumNameLength = 3;

    if (loginName.length >= minimumNameLength) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  onSaveButtonClick = async () => {
    const { loginName } = this.state;

    this.setState({ isLoading: true });

    await createUser({ name: loginName });

    this.setState({
      isLoading: false,
      saved: true,
    });
  };

  render() {
    const { isButtonDisabled, loginName, isLoading, saved } = this.state;

    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div data-testid="page-login" className="login-main-page">
            <div className="login-logo-container">
              <img src={ logo } alt="Logo TrybeTunes" />
            </div>
            <form className="login-content">
              <input
                data-testid="login-name-input"
                type="text"
                name="loginName"
                id="loginName"
                value={ loginName }
                placeholder="Nome"
                onChange={ this.handleChange }
                className="login-input"
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ isButtonDisabled }
                onClick={ this.onSaveButtonClick }
                className="login-button"
              >
                Entrar
              </button>
            </form>
            {saved && <Redirect to="/search" />}
          </div>
        )}
      </div>
    );
  }
}

export default Login;
