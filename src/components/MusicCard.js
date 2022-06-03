import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

import { addSong, removeSong } from '../services/favoriteSongsAPI';

import '../styles/musicCard.css';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  componentDidMount() {
    this.pageLoading();
  }

  handleClick = ({ target }) => {
    this.favoriteMusic(target);

    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
  };

  favoriteMusic = async (target) => {
    const { music, fetchFavorites } = this.props;

    this.setState({ isLoading: true });

    if (target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }

    await fetchFavorites();

    this.setState({
      isLoading: false,
    });
  };

  pageLoading = () => {
    const { favorites, music } = this.props;

    const result = favorites.some(
      (favorite) => favorite.trackId === music.trackId,
    );

    if (result) {
      this.setState({
        isChecked: true,
      });
    }
  };

  render() {
    const {
      music: { trackId, trackName, previewUrl },
    } = this.props;
    const { isLoading, isChecked } = this.state;

    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <section className="music-card-content">
            <div className="music-card">
              <p className="track-name">{trackName}</p>
              <div className="player-and-checker">
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o
                  elemento
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ trackId } className="checker">
                  <input
                    data-testid={ `checkbox-music-${trackId}` }
                    type="checkbox"
                    id={ trackId }
                    name="checkbox"
                    onChange={ this.handleClick }
                    checked={ isChecked }
                  />
                  <p>Favorita</p>
                </label>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  fetchFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape).isRequired,
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    trackName: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
