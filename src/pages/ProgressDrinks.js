import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from '../components/FavoriteButton';
import { setDoneRecipe } from '../services/LocalStorage';

const copy = require('clipboard-copy');

function ProgressDrinks() {
  const history = useHistory();
  const { pathname } = history.location;
  const idDrink = pathname.replace(/\D/gim, '');
  const [detailDrinks, setDetailDrinks] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recipeDone] = useState(true);
  const [shareMessage, setshareMessage] = useState(false);
  const [isFavorite, setIsfavorite] = useState(false);

  useEffect(() => {
    async function detailsDrinksById() {
      const endopint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
      const response = await fetch(endopint);
      const { drinks } = await response.json();
      setDetailDrinks(drinks[0]);
      const ingredientsList = Object.entries(drinks[0])
        .filter((info) => (info[0].includes('strIngredient') && info[1]))
        .map((item) => item[1]);
      setIngredient(ingredientsList);
      const quantitiesList = Object.entries(drinks[0])
        .filter((info) => (info[0].includes('strMeasure') && info[1]))
        .map((quantity) => quantity[1]);
      setMeasure(quantitiesList);
    }
    detailsDrinksById();
  }, [idDrink]);

  function finishRecipe() {
    setDoneRecipe(detailDrinks);
    console.log('finalizar');
  }

  const shareButton = () => {
    setshareMessage(true);
    copy(`http://localhost:3000${pathname}`);
  };

  return (
    <div>
      <div>DetailsDrinks</div>
      <img
        src={ detailDrinks?.strDrinkThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <p
        data-testid="recipe-title"
      >
        {detailDrinks?.strDrink}
      </p>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareButton }
      >
        {shareMessage ? (<p>Link copied!</p>) : (
          <img src={ shareIcon } alt="Share" />
        )}
      </button>
      <FavoriteButton
        isFavorite={ isFavorite }
        setIsfavorite={ setIsfavorite }
        recipe={ detailDrinks }
      />
      <p
        data-testid="alcoholic"
      >
        {detailDrinks?.strAlcoholic}
      </p>
      <p
        data-testid="recipe-category"
      >
        {detailDrinks?.strAlcoholic}
      </p>
      <h1>Ingredientes</h1>
      {ingredient.map((item, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          key={ index }
          htmlFor="ingredientes"
        >
          {`- ${item} - ${measure[index]}`}
          <input type="checkbox" id="ingredientes" />
        </label>
      ))}
      <p
        data-testid="instructions"
      >
        {detailDrinks?.strInstructions}
      </p>

      {recipeDone
      && (
        <div className="details__start">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ finishRecipe }
            className="datails__start__button"
          >
            Finalizar Receita
          </button>
        </div>
      )}
    </div>

  );
}

export default ProgressDrinks;
