import React from 'react';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import '../styles/favorites.css';

class Favorites extends React.Component {
  state = {
    favorites: [],
  };

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const favoritesList = await getFavoriteSongs();

    this.setState({ favorites: favoritesList });
  };

  render() {
    const { favorites } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {favorites.length === 0 ? (
          <p>Não há músicas favoritas</p>
        ) : (
          <div className="favorite-songs">
            {favorites.map(({ trackId, trackName, previewUrl }) => (
              <MusicCard
                key={ trackId }
                music={ { trackId, trackName, previewUrl } }
                favorites={ favorites }
                fetchFavorites={ this.getFavorites }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
