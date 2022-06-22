import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { drinks } = useContext(RecipesContext);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [magigNumber] = useState('5');
  useEffect(() => {
    async function getCategorysDrink() {
      try {
        const endopint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(endopint);
        const { drinks: drink } = await response.json();
        setCategoryDrink(drink);
      } catch (error) {
        return error;
      }
    }

    getCategorysDrink();
  }, []);
  return (
    <div>
      <Header />
      <div>Drinks</div>
      <section>
        { categoryDrink.map((category, index) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            key={ index }
          >
            { category.strCategory }

          </button>
        )).slice(0, Number(magigNumber)) }
      </section>
      {
        drinks.map((item, i) => (
          <DrinkCard
            key={ item.idDrink }
            drink={ item }
            idTest={ i }
          />
        ))
      }
      <Footer />
    </div>
  );
}

export default Drinks;
