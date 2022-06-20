import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { setEmailStorage,
  setSenhaStorage,
  setMealsTokenStorage,
  setCocktailsTokenStorage } from '../services/LocalStorage';

function Login() {
  const history = useHistory();
  const {
    email,
    setEmail,
    senha,
    setSenha,
    mealsToken,
    // setMealsToken,
    cocktailsToken,
    // setCocktailsToken,
  } = useContext(RecipesContext);

  const [lockButton, setLockbutton] = useState(true);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const FLOOR = 6;
    const MAX = 12;

    if (regex.test(email) && (senha.length > FLOOR && senha.length <= MAX)) {
      setLockbutton(false);
    } else {
      setLockbutton(true);
    }
  }, [email, senha]);

  const submitButton = () => {
    setEmailStorage(email);
    setSenhaStorage(senha);
    setMealsTokenStorage(mealsToken);
    setCocktailsTokenStorage(cocktailsToken);
    history.push('/foods');
  };

  return (
    <div className="login_container">
      <form className="login_form">
        <label htmlFor="login_email" className="login_label">
          Email
          <input
            type="email"
            className="login_email"
            nome="login_email"
            placeholder="adicione seu email aqui"
            id="login_email"
            value={ email }
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="login_senha" className="login_label">
          Senha
          <input
            className="login_senha"
            type="password"
            nome="login_senha"
            placeholder="adicione sua senha aqui"
            id="login_senha"
            data-testid="password-input"
            value={ senha }
            onChange={ ({ target }) => setSenha(target.value) }
          />
        </label>

        <button
          data-testid="login-submit-btn"
          type="button"
          className="login_button"
          onClick={ submitButton }
          disabled={ lockButton }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
