import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderRecipes from './context/ProviderRecipes';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <ProviderRecipes />
    </Switch>

  );
}

export default App;
