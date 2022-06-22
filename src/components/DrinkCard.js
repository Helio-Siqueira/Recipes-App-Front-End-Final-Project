import React from 'react';
import PropTypes from 'prop-types';
import './FoodCard.css';

function DrinkCard(props) {
  const { drink, idTest } = props;

  return (
    <div className="card" data-testid={ `${idTest}-recipe-card` }>
      <img
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        data-testid={ `${idTest}-card-img` }
      />
      <h3 data-testid={ `${idTest}-card-name` }>{ drink.strDrink }</h3>
    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.objectOf(
    PropTypes.shape({
      strDrink: PropTypes.string.isRequired,
      strDrinkThumb: PropTypes.string.isRequired,
    }),
  ).isRequired,
  idTest: PropTypes.string.isRequired,
};

export default DrinkCard;
