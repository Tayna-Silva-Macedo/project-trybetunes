import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';

import { getUser } from '../services/userAPI';

import '../styles/profile.css';

class Profile extends React.Component {
  state = {
    isLoading: false,
    user: {},
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true });

    const user = await getUser();

    this.setState({
      isLoading: false,
      user,
    });
  };

  render() {
    const { isLoading, user } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="profile-page-content">
              <div className="profile-content">
                <div className="profile-container">
                  <img
                    data-testid="profile-image"
                    src={ user.image }
                    alt={ `Imagem de perfil de ${user.name}` }
                    className="profile-image"
                  />
                  <button type="button" className="profile-button">
                    <Link to="/profile/edit">Editar perfil</Link>
                  </button>
                </div>
                <div className="title-content">
                  <p className="title">Nome</p>
                  <p>{user.name}</p>
                </div>
                <div className="title-content">
                  <p className="title">Email</p>
                  <p>{user.email}</p>
                </div>
                <div className="title-content">
                  <p className="title">Descrição</p>
                  <p>{user.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
