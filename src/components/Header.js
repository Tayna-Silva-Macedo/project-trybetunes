import React from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';

import Loading from './Loading';

import '../styles/header.css';

import logo from '../img/logoHeader.png';
import imgUser from '../img/imageUser.png';

class Header extends React.Component {
  state = {
    isLoading: false,
    user: {},
  };

  componentDidMount() {
    this.fetchUserName();
  }

  fetchUserName = async () => {
    this.setState({ isLoading: true });

    const userName = await getUser();

    this.setState({
      isLoading: false,
      user: userName,
    });
  };

  render() {
    const { isLoading, user } = this.state;
    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <header data-testid="header-component" className="header-content">
            <div className="header-logo">
              <img src={ logo } alt="Logo TrybeTunes" />
            </div>
            <div className="user-container">
              <img
                src={ user.image ? user.image : imgUser }
                alt="avatar de usuário"
                className="user-image"
              />
              <p className="user-name-paragraph">
                Olá,
                {' '}
                <span data-testid="header-user-name">{user.name}</span>
              </p>
            </div>
            <div className="header-links">
              <Link data-testid="link-to-search" to="/search">
                SEARCH
              </Link>
              <Link data-testid="link-to-favorites" to="/favorites">
                FAVORITES
              </Link>
              <Link data-testid="link-to-profile" to="/profile">
                PROFILE
              </Link>
            </div>
          </header>
        )}
      </div>
    );
  }
}

export default Header;
