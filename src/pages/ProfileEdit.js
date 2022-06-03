import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';

import { getUser, updateUser } from '../services/userAPI';

import '../styles/profileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    saved: false,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true });

    const user = await getUser();
    const { name, email, image, description } = user;

    this.setState({
      isLoading: false,
      name,
      email,
      image,
      description,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  areInputValid = () => {
    const { name, image, description } = this.state;

    if (name.length < 1 || image.length < 1 || description.length < 1) {
      return false;
    }

    return true;
  };

  isEmailValid = () => {
    const { email } = this.state;

    const validation = email.toLowerCase().match(/\S+@\S+\.\S+/);

    if (validation) {
      return validation[0] === email;
    }

    return false;
  };

  isFormInvalid = () => !(this.isEmailValid() && this.areInputValid());

  updateInfo = async () => {
    this.setState({ isLoading: true });

    const { name, email, image, description } = this.state;

    await updateUser({ name, email, image, description });

    this.setState({ isLoading: false, saved: true });
  };

  render() {
    const { isLoading, name, email, image, description, saved } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          {saved && <Redirect to="/profile" />}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="edit-page-content">
              <form className="edit-content">
                <div className="input-content">
                  <p className="input-label">Nome:</p>
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={ name }
                    onChange={ this.handleChange }
                    className="edit-input"
                  />
                </div>

                <div className="input-content">
                  <p className="input-label">Email:</p>
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={ email }
                    onChange={ this.handleChange }
                    className="edit-input"
                  />
                </div>

                <div className="input-content">
                  <p className="input-label">Descrição</p>
                  <textarea
                    data-testid="edit-input-description"
                    name="description"
                    id="description"
                    defaultValue={ description }
                    onChange={ this.handleChange }
                    className="edit-input-textarea"
                  />
                </div>

                <div className="input-content">
                  <p className="input-label">Imagem de perfil:</p>
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="image"
                    id="image"
                    defaultValue={ image }
                    onChange={ this.handleChange }
                    className="edit-input"
                  />
                </div>

                <button
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ this.isFormInvalid() }
                  onClick={ this.updateInfo }
                  className="edit-button"
                >
                  Salvar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
