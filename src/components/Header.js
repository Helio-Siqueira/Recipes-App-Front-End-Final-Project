import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';

function Header() {
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.substring(1);
  const title = path.charAt(0).toUpperCase() + path.slice(1);
  const title1 = title.replace('/', ' ');
  const editedTitle = title1.replace('/', ' ');
  const titleFinal = editedTitle.replace(/(^\w{1})|(\s+\w{1})/g, (letra) => (
    letra.toUpperCase()));
  const [titleState, setTitleState] = useState(titleFinal);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [showSearchImp, setShowSearchImp] = useState(false);
  const search = ['/foods', '/drinks', '/explore/foods/nationalities'];
  const [inputedSearchText, setInputedSearchText] = useState('');
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('Ingredient');
  const { searchAPI } = useContext(RecipesContext);

  useEffect(() => {
    if (search.includes(pathname)) {
      setShowSearchBtn(true);
    }
    if (titleState === 'Explore Foods Ingredients'
    || titleState === 'Explore Drinks Ingredients') {
      setTitleState('Explore Ingredients');
    }
    if (titleState === 'Explore Foods Nationalities') {
      setTitleState('Explore Nationalities');
    }
    if (titleState === 'Done-recipes') {
      setTitleState('Done Recipes');
    }
    if (titleState === 'Favorite-recipes') {
      setTitleState('Favorite Recipes');
    }
  }, []);

  const handlerSearchChange = ({ target }) => {
    const { value, type, id } = target;
    if (type === 'radio') setSelectedSearchCategory(id);
    if (type === 'text') setInputedSearchText(value);
  };

  function searchButton() {
    if (selectedSearchCategory === 'Fist-Letter' && inputedSearchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      searchAPI(titleState, inputedSearchText, selectedSearchCategory);
    }
  }

  return (
    <header className="header">
      <Link to="/profile">
        <img
          src={ imgProfile }
          className="header__button"
          type="button"
          data-testid="profile-top-btn"
          alt="profile"
        />
      </Link>

      <h1 data-testid="page-title">{ titleState }</h1>
      {showSearchBtn
      && (
        <button type="button" onClick={ () => setShowSearchImp(!showSearchImp) }>
          <img
            type="button"
            data-testid="search-top-btn"
            className="header__button"
            src={ imgSearch }
            alt="Search"
          />
        </button>)}
      {showSearchImp
      && (
        <div>
          <label htmlFor="Ingredients">
            Ingredients
            <input
              id="Ingredient"
              type="radio"
              data-testid="ingredient-search-radio"
              checked={ selectedSearchCategory === 'Ingredient' }
              onClick={ handlerSearchChange }
            />
          </label>
          <label htmlFor="Name">
            Name
            <input
              id="Name"
              type="radio"
              data-testid="name-search-radio"
              checked={ selectedSearchCategory === 'Name' }
              onClick={ handlerSearchChange }
            />
          </label>
          <label htmlFor="Fist-Letter">
            Fist Letter
            <input
              id="Fist-Letter"
              type="radio"
              data-testid="first-letter-search-radio"
              checked={ selectedSearchCategory === 'Fist-Letter' }
              onClick={ handlerSearchChange }
            />
          </label>
          <input
            type="text"
            data-testid="search-input"
            name={ inputedSearchText }
            // value={ inputedSearchText }
            onChange={ handlerSearchChange }
          />
          <button
            data-testid="exec-search-btn"
            type="button"
            className="search_button"
            onClick={ searchButton }
          >
            Search
          </button>
        </div>
      )}

    </header>
  );
}

export default Header;
