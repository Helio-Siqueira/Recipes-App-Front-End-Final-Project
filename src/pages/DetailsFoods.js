import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { setRecipesProgress } from '../services/LocalStorage';
import shareIcon from '../images/shareIcon.svg';
import './Details.css';

const copy = require('clipboard-copy');

function DetailsFoods() {
  const history = useHistory();
  const { pathname } = history.location;
  const idFood = pathname.replace(/\D/gim, '');
  const [detailMeals, setDetailMeals] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [drinkRecomendation, setDrinkRecomendation] = useState([]);
  // const [recipeDone, setRecipeDone] = useState(true);
  const [recipeUnDone, SetRecipeUnDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [shareMessage, setshareMessage] = useState(false);

  useEffect(() => {
    async function detailsFoodsById() {
      const endopint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`;
      const response = await fetch(endopint);
      const { meals } = await response.json();
      setDetailMeals(meals[0]);
      const ingredientsList = Object.entries(meals[0])
        .filter((info) => (info[0].includes('strIngredient') && info[1]))
        .map((item) => item[1]);
      setIngredient(ingredientsList);
      const quantitiesList = Object.entries(meals[0])
        .filter((info) => (info[0].includes('strMeasure') && info[1]))
        .map((quantity) => quantity[1]);
      setMeasure(quantitiesList);
    }
    detailsFoodsById();
  }, [idFood]);

  useEffect(() => {
    async function getDrinkRec() {
      try {
        const endopint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endopint);
        const { drinks: array } = await response.json();
        let newListDrink = array;
        const FIVE = 5;
        if (array.length > FIVE) {
          const SIX = 6;
          newListDrink = array.slice(0, SIX);
        }
        setDrinkRecomendation(newListDrink);
      } catch (error) {
        return error;
      }
    }
    getDrinkRec();
  }, []);

  useEffect(() => {
    const getInprogress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      cocktails: {},
      meals: {},
    };
    const { meals } = getInprogress;
    const isInProgress = Object.keys(meals).some((item) => item === idFood);
    setInProgress(isInProgress);
    if (inProgress === false) {
      return SetRecipeUnDone(true);
    } SetRecipeUnDone(false);
  }, [inProgress]);

  function startRecipe() {
    setRecipesProgress('foods', idFood, ingredient);
    history.push(`/foods/${idFood}/in-progress`);
  }

  function shareButton() {
    setshareMessage(true);
    copy(`http://localhost:3000${pathname}`);
  }

  return (
    <div>
      {/* <p>{detailMeals.idMeal}</p> */}
      <img
        src={ detailMeals.strMealThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
        className="details__img"
      />
      <p
        data-testid="recipe-title"
      >
        {detailMeals.strMeal}
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
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => console.log('Favoritar') }
      >
        Favoritar
      </button>
      <p
        data-testid="recipe-category"
      >
        {detailMeals.strCategory}
      </p>
      <h1>Ingredientes</h1>
      {ingredient.map((item, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {`- ${item} - ${measure[index]}`}
        </p>
      ))}
      <p
        data-testid="instructions"
      >
        {detailMeals.strInstructions}
      </p>

      <iframe
        title="RecipeTutorial"
        width="100%"
        height="315"
        data-testid="video"
        // src={ `https://www.youtube.com/embed/${video}` }
        src={ detailMeals.strYoutube }
      />
      {/* <p
        data-testid="${index}-recomendation-card"
      >
        {detailMeals.strInstructions}
      </p> */}
      <div className="datails__card__recomendation">
        {drinkRecomendation.map((drink, index) => (

          <Link
            to={ `/drinks/${drink.idDrink}` }
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <div className="card" data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</h3>
            </div>
          </Link>

        ))}
      </div>
      {/* {isdone? 'mostra' : ''} */}
      {inProgress
        && (
          <div className="details__start">
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/foods/${idFood}/in-progress`) }
              className="datails__start__button"
            >
              Continue Recipe
            </button>
          </div>)}

      {recipeUnDone
      && (
        <div className="details__start">
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ startRecipe }
            className="datails__start__button"
          >
            Start Recipe
          </button>

        </div>
      )}

    </div>
  );
}

export default DetailsFoods;
