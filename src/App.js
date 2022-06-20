import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderRecipes from './context/ProviderRecipes';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <Switch>
      <ProviderRecipes>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        {/* <Route exact path="/foods" component={ foods } />
        <Route exact path="/drinks" component={ drinks } />
        <Route exact path="/foods/:{id-da-receita}" component={ receitas } /> */}
      </ProviderRecipes>
    </Switch>

  );
}

export default App;
