import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function ProviderRecipes({ children }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const [drinks, setDrinks] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function getDrinks() {
      try {
        const endopint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endopint);
        const { drinks: array } = await response.json();

        let newListDrink = array;
        const ELEVEN = 11;
        if (array.length > ELEVEN) {
          const TWELVE = 12;
          newListDrink = array.slice(0, TWELVE);
        }
        setDrinks(newListDrink);
      } catch (error) {
        return error;
      }
    }

    async function getFoods() {
      try {
        const endopint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endopint);
        const { meals: array } = await response.json();

        let newListFood = array;
        const ELEVEN = 11;
        if (array.length > ELEVEN) {
          const TWELVE = 12;
          newListFood = array.slice(0, TWELVE);
        }
        setFoods(newListFood);
      } catch (error) {
        return error;
      }
    }

    getFoods();
    getDrinks();
  }, []);

  const contextValue = {
    email,
    setEmail,
    senha,
    setSenha,
    mealsToken,
    setMealsToken,
    cocktailsToken,
    setCocktailsToken,
    foods,
    drinks,
  };

  return (
    <RecipesContext.Provider
      value={ contextValue }
    >
      {children}
    </RecipesContext.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default ProviderRecipes;
