import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function DetailsDrinks() {
  const history = useHistory();
  const { pathname } = history.location;
  const idDrink = pathname.replace(/\D/gim, '');
  const [detailDrinks, setDetailDrinks] = useState([]);
  console.log(detailDrinks);

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
        data-testid="recipe-category"
      >
        {detailDrinks?.strCategory}
      </p>
    </div>
  );
}

export default DetailsDrinks;
