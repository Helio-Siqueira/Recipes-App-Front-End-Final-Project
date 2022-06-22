import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { drinks } = useContext(RecipesContext);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [filterDrinks, setFilterDrinks] = useState([]);
  const [magigNumber] = useState('5');
  const [filtro, setFiltro] = useState('');
  console.log(filterDrinks);
  console.log(drinks);
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

  const filterByCategory = async ({ target }) => {
    if (filtro === target.name) {
      setFiltro('');
      setFilterDrinks(drinks);
    } else {
      setFiltro(target.name);
      try {
        const endopint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.name}`;
        console.log(endopint);
        const response = await fetch(endopint);
        const { drinks: array } = await response.json();
        console.log(array);

        let newListFood = array;
        const ELEVEN = 11;
        if (array.length > ELEVEN) {
          const TWELVE = 12;
          newListFood = array.slice(0, TWELVE);
        }
        console.log(newListFood);
        setFilterDrinks(newListFood);
      } catch (error) {
        return error;
      }
    }
  };

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
            name={ category.strCategory }
            onClick={ filterByCategory }
          >
            { category.strCategory }

          </button>
        )).slice(0, Number(magigNumber)) }
      </section>

      {filterDrinks.length > 0 ? filterDrinks.map((item, index) => (
        <DrinkCard key={ item.idDrink } drink={ item } idTest={ index } />
      )) : (
        drinks.map((item, index2) => (
          <DrinkCard key={ item.idDrink } drink={ item } idTest={ index2 } />
        ))
      )}
      <Footer />
    </div>
  );
}

export default Drinks;
