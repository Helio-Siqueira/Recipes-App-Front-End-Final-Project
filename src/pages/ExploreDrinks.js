import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  return (
    <div>
      <Header />
      <div>
        <Link to="/explore/drinks/ingredients">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            By Ingredient
          </button>
        </Link>

        <button
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
