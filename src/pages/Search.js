import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

import '../styles/search.css';

class Search extends React.Component {
  state = {
    search: '',
    saveSearch: '',
    isLoading: false,
    searchList: [],
    notFound: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { search } = this.state;

    this.setState({ isLoading: true });

    const searchList = await searchAlbumsAPI(search);
    const notFound = searchList.length === 0;

    this.setState({
      isLoading: false,
      searchList,
      saveSearch: search,
      search: '',
      notFound,
    });
  };

  render() {
    const { search, isLoading, searchList, notFound, saveSearch } = this.state;
    const minimumLength = 2;

    return (
      <div data-testid="page-search">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <Header />
              <form className="search-input-content">
                <input
                  data-testid="search-artist-input"
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Nome do artista"
                  value={ search }
                  onChange={ this.handleChange }
                  className="input-area"
                />
                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ search.length < minimumLength }
                  onClick={ this.handleClick }
                  className="search-button"
                >
                  Pesquisar
                </button>
              </form>
            </div>
            {notFound && <p>Nenhum álbum foi encontrado</p>}
            {searchList.length > 0 && (
              <section className="albuns-content">
                <p>{`Resultado de álbuns de: ${saveSearch}`}</p>
                <div className="album-card-content">
                  {searchList.map(
                    ({
                      collectionId,
                      artworkUrl100,
                      collectionName,
                      artistName,
                    }) => (
                      <div key={ collectionId } className="album-card">
                        <img src={ artworkUrl100 } alt={ collectionName } />
                        <p className="album-colletion-name">{collectionName}</p>
                        <p>{artistName}</p>
                        <Link
                          data-testid={ `link-to-album-${collectionId}` }
                          to={ `/album/${collectionId}` }
                        >
                          <button type="button" className="album-button">
                            Ir para o album
                          </button>
                        </Link>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
