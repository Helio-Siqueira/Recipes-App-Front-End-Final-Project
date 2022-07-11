import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FoodCard.css';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { removeFavoriteRecipe } from '../services/LocalStorage';
import '../style/favoriteCard.css';

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
    removeFavoriteRecipe(id);
    setIsfavorite(false);
    document.location.reload(true);
  }

  return (
    <div>
      <div className="acard">
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            src={ recipe.image }
            height="170px"
            width="170px"
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <div className="subcard">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h2
              className="fname"
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </h2>
          </Link>
          <h2
            className="category"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {
              isFood
                ? (`${recipe.nationality} - ${recipe.category}`) : (recipe.alcoholicOrNot)
            }
          </h2>
          <button
            type="button"
            className="fshare_button"
            onClick={ shareButton }
          >
            {shareMessage ? (<p>Link copied!</p>) : (
              <img
                src={ shareIcon }
                // className="share_button"
                alt="Share"
                height="38px"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            )}
          </button>
          <button
            type="button"
            className="ffavorite_button"
            onClick={ favoriteRecipe }
          >
            <img
              width="36px"
              height="36px"
              src={ isFavorite ? (whiteHeartIcon) : (blackHeartIcon) }
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="favorite"
            />
          </button>
        </div>
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
