import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function ProviderRecipes({ children }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const contextValue = {
    email,
    setEmail,
    senha,
    setSenha,
    mealsToken,
    setMealsToken,
    cocktailsToken,
    setCocktailsToken,
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
