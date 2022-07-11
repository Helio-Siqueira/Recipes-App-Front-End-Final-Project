import React from 'react';
import { Link } from 'react-router-dom';
import imgDrink from '../images/drinkIcon.svg';
import imgExplore from '../images/exploreIcon.svg';
import imgMeal from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >

      <Link to="/drinks" className="footer_link_drinks">
        <img
          src={ imgDrink }
          className="footer_button_drink"
          type="button"
          data-testid="drinks-bottom-btn"
          alt="link to drinks"
        />
      </Link>

      <Link to="/explore">
        <img
          src={ imgExplore }
          className="footer_button_explore"
          type="button"
          data-testid="explore-bottom-btn"
          alt="link to explore"
        />
      </Link>

      <Link to="/foods">
        <img
          src={ imgMeal }
          className="footer-btn-3"
          type="button"
          data-testid="food-bottom-btn"
          alt="link to meals"
        />
      </Link>

    </footer>
  );
}

export default Footer;
