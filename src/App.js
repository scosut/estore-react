import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';

const App = () => {
  return (
    <BrowserRouter basename='/'>
      <MainComponent />
    </BrowserRouter>
  );
}

export default App;