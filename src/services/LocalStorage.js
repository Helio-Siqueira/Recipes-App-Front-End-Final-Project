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

export function setDoneRecipes(foodObject) {
  const PrevState = JSON.parse(localStorage.getItem('doneRecipes'));
  if (PrevState === null) {
    return localStorage.setItem('doneRecipes', JSON.stringify(foodObject));
  }
  const updatedRecepies = { ...PrevState, foodObject };
  return localStorage.setItem('doneRecipes', JSON.stringify(updatedRecepies));
}

// export function getDoneRecipes() {
//   const storage = JSON.parse(localStorage.getItem('doneRecipes'));
//   return storage;
// }

export function setRecipesProgress(category, foodID, ingredients) {
  const newEntry = { [foodID]: [...ingredients] };
  console.log(newEntry);
  const inProgressRecipes = {
    cocktails: {},
    meals: {},
  };
  const PrevState = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || inProgressRecipes;
  console.log(PrevState);

  const { cocktails, meals } = PrevState;

  if (category === 'foods') {
    const prevMeals = { ...meals, ...newEntry };
    PrevState.meals = prevMeals;
    console.log(PrevState);
    return localStorage.setItem('inProgressRecipes', JSON.stringify(PrevState));
  }
  const prevDrinks = { ...cocktails, ...newEntry };
  PrevState.cocktails = prevDrinks;
  console.log(PrevState);
  return localStorage.setItem('inProgressRecipes', JSON.stringify(PrevState));
}

export function getInProgressRecipes() {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return storage;
}
