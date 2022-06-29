import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FoodCard.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { setFavoriteRecipes, removeFavoriteRecipe } from '../services/LocalStorage';
// teste
const copy = require('clipboard-copy');

function FavoriteCard(props) {
  const [shareMessage, setshareMessage] = useState(false);
  const [isFavorite, setIsfavorite] = useState(true);
  const [id, setId] = useState('');
  const [isFood, setIsFood] = useState(false);
  const { recipe, index } = props;
  function shareButton() {
    setshareMessage(true);
    const { type, id: idFav } = recipe;
    copy(`http://localhost:3000/${type}s/${idFav}`);
  }
  useEffect(() => {
    const { id: recievedId, type } = recipe;
    const checktype = (type === 'food');
    setIsFood(checktype);
    setId(recievedId);
  });

  function favoriteRecipe() {
    if (isFavorite === true) {
      removeFavoriteRecipe(id);
      setIsfavorite(false);
    } else {
      setIsfavorite(true);
      setFavoriteRecipes(recipe);
    }
  }

  return (
    <div>
      <div className="card">
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
        <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
        <h2 data-testid={ `${index}-horizontal-top-text` }>
          {
            isFood
              ? (`${recipe.nationality} - ${recipe.category}`) : (recipe.alcoholicOrNot)
          }
        </h2>
        <button
          type="button"
          onClick={ shareButton }
        >
          {shareMessage ? (<p>Link copied!</p>) : (
            <img
              src={ shareIcon }
              alt="Share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          )}
        </button>
        <button
          type="button"
          onClick={ favoriteRecipe }
        >
          <img
            src={ isFavorite ? (blackHeartIcon) : (whiteHeartIcon) }
            data-testid={ `${index}-horizontal-favorite-btn` }
            alt="favorite"
          />
        </button>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.objectOf(
    PropTypes.shape({
      // id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteCard;
