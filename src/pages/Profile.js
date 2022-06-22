import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEmail } from '../services/LocalStorage';

function Profile() {
  const email = getEmail();
  console.log(email);
  return (
    <div className="profile__container">
      <Header />
      <h3 data-testid="profile-email">{ email.email }</h3>

      <button
        data-testid="profile-done-btn"
        type="button"
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
