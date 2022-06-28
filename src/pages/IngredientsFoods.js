import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function IngredientsFoods() {
  const [ingredients, setIngredients] = useState([]);
  console.log(ingredients);
  console.log('xablau');

  useEffect(() => {
    async function getIngredients() {
      try {
        const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
        const response = await fetch(url);
        const { meals } = await response.json();
        // console.log('retorno da API:');
        // console.log(meals);
        const TWELVE = 12;
        const newListIngredients = meals.slice(0, TWELVE);
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
            {`${item.strIngredient}`}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
            alt="imagem dos ingredientes"
          />
        </div>
      ))}

      <Footer />
    </div>
  );
}

// IngredientsFoods.propTypes = {
//   food: PropTypes.objectOf(
//     PropTypes.shape({
//       strMeal: PropTypes.string.isRequired,
//       strMealThumb: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   idTest: PropTypes.string.isRequired,
// };

export default IngredientsFoods;
