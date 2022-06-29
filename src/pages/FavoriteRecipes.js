import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
// teste

function FavoriteRecipes() {
  const [display, setDsplay] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setDsplay(favorites);
  }, []);

  const showFavorites = () => {
    if (display === null) {
      return <p>No favorite recipes</p>;
    }
    return display.map((recipe, index) => (<FavoriteCard
      recipe={ recipe }
      key={ index }
      index={ index }
    />));
  };
  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          all
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <div>
        {showFavorites()}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
