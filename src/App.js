import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderRecipes from './context/ProviderRecipes';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DetailsFoods from './pages/DetailsFoods';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ProgressDrinks from './pages/ProgressDrinks';
import ProgressFoods from './pages/ProgressFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import IngredientsFoods from './pages/IngredientsFoods';
import IngredientsDrinks from './pages/IngredientsDrinks';
import Nationalities from './pages/Nationalities';
import Profile from './pages/Profile';
import RecipesDone from './pages/RecipesDone';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DetailsDrinks from './pages/DetailsDrinks';

function App() {
  return (
    <Switch>
      <ProviderRecipes>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id-da-receita" component={ DetailsFoods } />
        <Route exact path="/drinks/:id-da-receita" component={ DetailsDrinks } />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          component={ ProgressDrinks }
        />
        <Route
          exact
          path="/foods/:id-da-receita/in-progress"
          component={ ProgressFoods }
        />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
        <Route exact path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
        <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ RecipesDone } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </ProviderRecipes>
    </Switch>

  );
}

export default App;
