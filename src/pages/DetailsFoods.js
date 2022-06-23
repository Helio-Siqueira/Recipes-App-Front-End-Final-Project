import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import RecipesContext from '../context/RecipesContext';

function DetailsFoods() {
  // const { recipesInProgres,
  //   setrecipesInProgres } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  const idFood = pathname.replace(/\D/gim, '');
  const [detailMeals, setDetailMeals] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [drinkRecomendation, setDrinkRecomendation] = useState([]);
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

  // verifica se id existe na local syorage
  // useEffect(() => {
  //   const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  //   console.log(recipeDone);
  //   const isDone = recipesDone.some((item) => item.id === idFood);
  //   // const isDone = false;
  //   // pegar o estato que traz a informação da localstorage
  //   // se o id existir na localsotare
  //   setRecipeDone(!isDone);
  //   // se não
  // }, []);

  // function startRecipe() {
  //   setprogress(true);
  //   const objetoRecipesProgres = [{
  //     cocktail: {},
  //     meals: {},
  //   }];
  //   const foodProgress = {
  //     [idFood]: [...ingredient],
  //   }

  //   // history.push(`/foods/${idFood}/in-progress`)
  // }

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
      {recipeDone
      && (
        <div className="details__start">
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ startRecipe }
            className="datails__start__button"
          >
            Iniciar receita
          </button>
        </div>
      )}

    </div>
  );
}

export default DetailsFoods;
