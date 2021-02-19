import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <MainComponent />
    </BrowserRouter>
  );
}

export default App;