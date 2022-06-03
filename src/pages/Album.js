import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import '../styles/album.css';

class Album extends React.Component {
  state = {
    musics: [],
    favorites: [],
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const musicsList = await getMusics(id);
    const favoritesMusics = await getFavoriteSongs();

    this.setState({
      musics: musicsList,
      favorites: favoritesMusics,
    });
  };

  fetchFavorites = async () => {
    const favoritesMusics = await getFavoriteSongs();

    this.setState({
      favorites: favoritesMusics,
    });
  };

  render() {
    const { musics, favorites } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div className="musics-page-content">
          {musics.length > 0 && (
            <div className="album-title-container">
              <section className="album-title-content">
                <img
                  src={ musics[0].artworkUrl100 }
                  alt={ musics[0].collectionName }
                />
                <p data-testid="artist-name">{musics[0].artistName}</p>
                <p data-testid="album-name">{musics[0].collectionName}</p>
              </section>
            </div>
          )}
          {musics.map(
            ({ trackId, trackName, previewUrl }, index) => index > 0 && (
              <div key={ trackId } className="music-list">
                <MusicCard
                  music={ { trackId, trackName, previewUrl } }
                  favorites={ favorites }
                  fetchFavorites={ this.fetchFavorites }
                />
              </div>
            ),
          )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
