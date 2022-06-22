import React from 'react';
import PropTypes from 'prop-types';
import './FoodCard.css';

function FoodCard(props) {
  const { food, idTest } = props;

  return (
    <div>
      <div className="card" data-testid={ `${idTest}-recipe-card` }>
        <img
          src={ food.strMealThumb }
          alt={ food.strMeal }
          data-testid={ `${idTest}-card-img` }
        />
        <h3 data-testid={ `${idTest}-card-name` }>{ food.strMeal }</h3>
      </div>
    </div>
  );
}

FoodCard.propTypes = {
  food: PropTypes.objectOf(
    PropTypes.shape({
      strMeal: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
    }),
  ).isRequired,
  idTest: PropTypes.string.isRequired,
};

export default FoodCard;
