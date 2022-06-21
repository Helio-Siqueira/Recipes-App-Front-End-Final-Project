import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  console.log(history.location.pathname);
  const { pathname } = history.location;
  const path = pathname.substring(1);
  const title = path.charAt(0).toUpperCase() + path.slice(1);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const search = ['/foods', '/drinks', '/explore/drinks', '/explore/foods/nationalities'];

  useEffect(() => {
    if (search.includes(pathname)) {
      setShowSearchBtn(true);
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

      <h1 data-testid="page-title">{ title }</h1>
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
