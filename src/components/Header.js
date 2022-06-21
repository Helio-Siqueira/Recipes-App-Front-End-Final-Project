import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';

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
  const search = ['/foods', '/drinks', '/explore/foods/nationalities'];

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
      && <img
        type="button"
        data-testid="search-top-btn"
        className="header__button"
        src={ imgSearch }
        alt="Search"
      />}

    </header>
  );
}

export default Header;
