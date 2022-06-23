import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEmail } from '../services/LocalStorage';

function Profile() {
  const [btnClick, setBtnClick] = useState();
  const [btnClickDone, setBtnClickDone] = useState();
  const [btnClickLogout, setBtnClickLogout] = useState();

  const history = useHistory();
  const email = getEmail();

  const handleButton = ({ target }) => {
    setBtnClick(target.value);
    history.push('/favorite-recipes');
  };

  const handleButtonDone = ({ target }) => {
    setBtnClickDone(target.value);
    history.push('/done-recipes');
  };

  const handleButtonLogout = ({ target }) => {
    setBtnClickLogout(target.value);
    history.push('/');
    localStorage.clear();
  };

  console.log(email);
  return (
    <div className="profile__container">
      <Header />
      <h3 data-testid="profile-email">{ email?.email }</h3>

      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ handleButtonDone }
        name={ btnClickDone }
      >
        Done Recipes
      </button>

      <button
        type="button"
        name={ btnClick }
        data-testid="profile-favorite-btn"
        onClick={ handleButton }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        name={ btnClickLogout }
        data-testid="profile-logout-btn"
        onClick={ handleButtonLogout }

      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
// teste req 10
