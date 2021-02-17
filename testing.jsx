import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <div className="container has-text-black">Hey! How you doin?</div>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
