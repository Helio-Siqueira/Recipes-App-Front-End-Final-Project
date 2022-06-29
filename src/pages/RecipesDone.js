import React, { useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { getDoneRecipes } from '../services/LocalStorage';

function RecipesDone() {
  const [doneRecipes] = useState(getDoneRecipes() || []);
  const [filterRecipes] = useState(doneRecipes);
  const [shareMessage, setshareMessage] = useState(false);
  console.log(doneRecipes);

  const shareButton = () => {
    setshareMessage(true);
    // copy(`http://localhost:3000/foods/${idFood}`);
    console.log('share');
  };

  const filterAll = (target) => {
    console.log(target.name);
  };

  const exibirTags = (tags, index) => {
    if (tags === null) {
      return <p>tags</p>;
    }
    if (typeof tags === 'string') {
      return (
        <p
          data-testid={ `${index}-${tags}-horizontal-tag` }
        >
          {tags}
        </p>);
    }
    return tags.map((tag) => (
      <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
        { tag }
      </p>));
  };

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          onClick={ ({ target }) => filterAll(target) }
          name="All"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ ({ target }) => filterAll(target) }
          name="Food"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ ({ target }) => filterAll(target) }
          name="Drinks"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {filterRecipes.map(({ image, category, name, doneDate, tags }, index) => (
        <div key={ index }>
          <img
            src={ image }
            alt="imagem da receita"
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ shareButton }
          >
            {shareMessage ? (<p>Link copied!</p>) : (
              <img src={ shareIcon } alt="Share" />
            )}
          </button>
          {exibirTags(tags, index)}
          {/* {(typeof tags === 'string') ? (
            <p
              data-testid={ `${index}-${tags}-horizontal-tag` }
            >
              {tags}
            </p>)
            : (tags.map((tag) => (
              <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
                { tag }
              </p>
            )))} */}
        </div>
      ))}
    </div>
  );
}

export default RecipesDone;
