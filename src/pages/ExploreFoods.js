import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  return (
    <div>
      <Header title="Explore Foods" />
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
      <Footer />
    </div>
  );
}

export default ExploreFoods;
