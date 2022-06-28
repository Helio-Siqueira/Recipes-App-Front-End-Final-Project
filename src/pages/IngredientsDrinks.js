import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function IngredientsDrinks() {
  const [ingredients, setIngredients] = useState([]);
  console.log(ingredients);

  useEffect(() => {
    async function getIngredients() {
      try {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
        const response = await fetch(url);
        const { drinks } = await response.json();
        console.log(drinks);
        const TWELVE = 12;
        const newListIngredients = drinks.slice(0, TWELVE);
        console.log(newListIngredients);
        setIngredients(newListIngredients);
      } catch (error) {
        console.log(error);
      }
    }
    getIngredients();
  }, []);

  return (
    <div>
      <Header />

      {ingredients.map((item, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <p data-testid={ `${index}-card-name` }>
            {`${item.strIngredient1}`}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
            alt="imagem dos ingredientes"
          />
        </div>
      ))}

      <Footer />
    </div>
  );
}

export default IngredientsDrinks;
