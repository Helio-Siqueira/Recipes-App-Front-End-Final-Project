import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function ProgressDrinks() {
  const history = useHistory();
  const { pathname } = history.location;
  const idDrink = pathname.replace(/\D/gim, '');
  const [detailDrinks, setDetailDrinks] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [foodsRecomendation, setFoodsRecomendation] = useState([]);
  const [recipeDone] = useState(true);
  console.log(foodsRecomendation);

  useEffect(() => {
    async function detailsDrinksById() {
      try {
        const endopint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
        const response = await fetch(endopint);
        const { drinks } = await response.json();
        console.log(drinks);
        setDetailDrinks(drinks[0]);
        // setVideo(meals[0].strYoutube);
      } catch (error) {
        return error;
      }
    }
    detailsDrinksById();
  }, []);

  useEffect(() => {
    const ingredientes = [];
    setIngredient(ingredientes);
    Object.entries(detailDrinks).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingredientes.push(value);
      }
    });
  }, [detailDrinks]);

  useEffect(() => {
    const quantidade = [];
    setMeasure(quantidade);
    Object.entries(detailDrinks).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        quantidade.push(value);
      }
    });
  }, [detailDrinks]);

  useEffect(() => {
    async function getFoodsRec() {
      try {
        const endopint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endopint);
        const { meals: array } = await response.json();
        let newListFoods = array;
        const FIVE = 5;
        if (array.length > FIVE) {
          const SIX = 6;
          newListFoods = array.slice(0, SIX);
        }
        setFoodsRecomendation(newListFoods);
      } catch (error) {
        return error;
      }
    }
    getFoodsRec();
  }, []);

  function finishRecipe() {
    // history.push(`/foods/${idFood}/in-progress`);
    console.log('finalizar');
  }

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
        data-testid="share-btn"
        type="button"
        onClick={ () => console.log('compartilhar') }
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => console.log('Favoritar') }
      >
        Favoritar
      </button>
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
