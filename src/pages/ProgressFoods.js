import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function ProgressFoods() {
  // import RecipesContext from '../context/RecipesContext';

  // const { recipesInProgres,
  //   setrecipesInProgres } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  const idFood = pathname.replace(/\D/gim, '');
  const [detailMeals, setDetailMeals] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  // const [recipeDone, setRecipeDone] = useState(true);
  const [recipeDone] = useState(true);
  // const [progress, setprogress] = useState(false);

  useEffect(() => {
    async function detailsFoodsById() {
      try {
        const endopint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`;
        const response = await fetch(endopint);
        const { meals } = await response.json();
        setDetailMeals(meals[0]);
        // setVideo(meals[0].strYoutube);
      } catch (error) {
        return error;
      }
    }

    detailsFoodsById();
  }, []);

  useEffect(() => {
    const ingredientes = [];
    setIngredient(ingredientes);
    Object.entries(detailMeals).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingredientes.push(value);
      }
    });
  }, [detailMeals]);

  useEffect(() => {
    const quantidade = [];
    setMeasure(quantidade);
    Object.entries(detailMeals).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        quantidade.push(value);
      }
    });
  }, [detailMeals]);

  function startRecipe() {
    history.push(`/foods/${idFood}/in-progress`);
  }

  // function continueRecipe() {
  //   // history.push(`/foods/${idFood}/in-progress`)
  // }

  return (
    <div>
      {/* <p>{detailMeals.idMeal}</p> */}
      <img
        src={ detailMeals.strMealThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <p
        data-testid="recipe-title"
      >
        {detailMeals.strMeal}
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
        data-testid="recipe-category"
      >
        {detailMeals.strCategory}
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
        {detailMeals.strInstructions}
      </p>

      {recipeDone
      && (
        <div className="details__start">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ startRecipe }
            className="datails__start__button"
          >
            Finalizar Receita
          </button>
        </div>
      )}

    </div>
  );
}

export default ProgressFoods;
