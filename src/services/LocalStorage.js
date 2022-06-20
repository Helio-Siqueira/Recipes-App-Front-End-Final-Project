export function setEmailStorage(email) {
  const userEmail = { email: `${email}` };
  localStorage.setItem('user', JSON.stringify(userEmail));
}

export function getEmail() {
  const storage = JSON.parse(localStorage.getItem('user'));
  return storage;
}

export function setSenhaStorage(senha) {
  localStorage.setItem('senha', senha);
}

export function getSenha() {
  const senhaStore = localStorage.getItem('senha');
  return senhaStore;
}

export function setMealsTokenStorage(token) {
  localStorage.setItem('mealsToken', token);
}

export function getMealsTokenStorage() {
  return localStorage.setItem('mealsToken');
}

export function setCocktailsTokenStorage(token) {
  localStorage.setItem('cocktailsToken', token);
}

export function getCocktailsToken() {
  return localStorage.setItem('cocktailsToken');
}
