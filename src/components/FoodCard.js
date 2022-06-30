import React from 'react';
import PropTypes from 'prop-types';
import './FoodCard.css';
import { Link } from 'react-router-dom';

function FoodCard(props) {
  const { food, idTest } = props;
  return (
    <div className="food_card">
      <Link to={ `/foods/${food.idMeal}` }>
        <div className="card" data-testid={ `${idTest}-recipe-card` }>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid={ `${idTest}-card-img` }
          />
          <h3 data-testid={ `${idTest}-card-name` }>{ food.strMeal }</h3>
        </div>
      </Link>
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
