import './App.css';
import React from 'react'
import Jumbotron from './views/Jumbotron'
import Popular from './views/Popular'
import Airing from './views/Airing';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Jumbotron />
      <Popular />
      <Airing />
    </div>
  );
}

export default App;
