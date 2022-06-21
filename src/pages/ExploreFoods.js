import React from 'react';
import Header from '../components/Header';

function ExploreFoods() {
  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
        >
          By Ingredient
        </button>
        <button
          type="button"
        >
          By Nationality
        </button>
        <button
          type="button"
        >
          Surprise me!
        </button>
      </div>
    </div>
  );
}

export default ExploreFoods;
