import React from 'react';

import '../styles/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
