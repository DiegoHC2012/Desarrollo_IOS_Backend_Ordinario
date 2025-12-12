import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      {message && <p style={{ marginTop: '16px', color: '#6c757d' }}>{message}</p>}
    </div>
  );
};

export default Loading;
