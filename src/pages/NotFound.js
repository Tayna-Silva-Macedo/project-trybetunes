import React from 'react';

import imageNotFound from '../img/not-found.png';

import '../styles/notFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found-container">
        <h1>Error 404 page not found</h1>
        <img alt="not found turma 21" width={ 800 } src={ imageNotFound } />
      </div>
    );
  }
}

export default NotFound;
