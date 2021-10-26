let resultOfSearch = document.getElementById("resultOfSearch")
let inputSearch = document.getElementById("inputSearch")
let search = ""
let affichage = ``
let ingredientsArray
let matchingRecipe
let arrayOfRecipeBySearch = []
let tags
let tag
let recipeName

let recipes

// fonction pour passer une string en minusucle sans accent
function lowerCaseWithoutAccent(string) {
    return string.replaceAll('é', 'e').replaceAll('à', 'a').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('ï', 'i').replaceAll('\'', ' ').toLowerCase()
}
/////////////////////////////

// récupération des données
const fetchRecipes = async() => {
    recipes = await fetch('recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
        // console.log(recipes)
        // console.log(recipes[1].photo)
    return recipes
}


const searchDisplay = async() => {
    await fetchRecipes();
}

inputSearch.addEventListener('input', (e) => {
    if (e.target.value.length >= 3) {
        // console.log(e.target.value)
        search = lowerCaseWithoutAccent(e.target.value);
        console.log(search)
        test()

        return search
            // searchDisplay()
    }
})

/////// affichage de base ///////
const initialDisplay = async() => {
    await fetchRecipes();
    for (let recipe of recipes) {
        affichage +=
            `<div class="recipe_card_container">
            <img src="./images/${recipe.photo}" class="recipe_img">
            <div class="recipe_title_infos">
                <h2 class="recipe_name">${recipe.name}</h2>
                <img class="clock" src="/images/clock-regular.svg">
                <p>${recipe.time} min</p>
            </div>
            <div class="howTo">
                <div class="recipe_ingredients">`;
        // boucle pour récupérer un à un les ingrédients vu que le nombre varie d'une recette à l'autre
        recipe.ingredients.forEach((e) => {
            affichage +=
                `<p class="recipe_title_ingredient" >${e.ingredient}</p>`;
        });
        affichage += `</div>
                <div class="recipe_ingredients_steps">`;
        affichage += `<p class="recipe_steps">${recipe.description}</p> `;
        affichage += `</div></div></div>`;
    }
    resultOfSearch.innerHTML = affichage

}
initialDisplay()
let resultOfSearchingInDescAndNameAndIngr


///////////////// Guillaume algo recursif
class Recipes2 {
    constructor(appliance, description, id, ingredients, name, photo, servings, time, ustensils) {
        this.appliance = appliance;
        this.description = description;
        this.id = id;
        this.ingredients = ingredients;
        this.name = name;
        this.photo = photo;
        this.servings = servings;
        this.time = time;
        this.ustensils = ustensils;
        this.data = recipes
        this.filteredRecipes = []
    }
    fetchData() { //ok
        //ici on recupere la data depuis le fichier json et on initialise la list des recettes 
        //console.log(recipes) 
    }

    check() {
        this.fetchData()
        console.log("etape check")
            // console.log(recipes)

        // console.log(this.getIngredientsFromRecipes(search)) //ok
        //console.log(this.filterByTag(this.data, { ingredient: ['poivron'] }))
    }

    getIngredientsFromRecipes() { //ok
        console.log("etape ingredient")
            //console.log(`je recupere tous les ingredients des recettes`)
        recipes.forEach(function(recipe) {
            let ingredients = recipe.ingredients
            recipeName = lowerCaseWithoutAccent(recipe.name)
                // console.log(ingredients) //tableau des ingredients de chaque recette //ok!
                //console.log("dans la recette de " + recipeName)
            ingredients.forEach(function(ingredient) {
                    tag = lowerCaseWithoutAccent(ingredient.ingredient)
                        // console.log("il y a " + tag) // chaque ingredient de TOUTES les recettes //ok!
                })
                // console.log(tag)
            return recipe, recipeName, tag; // ok retourne bien les noms de recettes et les ingredients
        })
    }

    filterByTag(search, recipeName, tag) {
        console.log("etape filtre par tag")
            //console.log(`je filtre les recettes ayant comme ${Object.keys(tag)[0]} les valeurs ${Object.values(tag)[0]} `)
            // console.log(`je filtre les recettes ayant comme ${Object.keys(tag)[0]} les valeurs ${Object.values(tag)[0]} `)
        return recipeName, tag
    }

    filterByText(search, recipeName, tag) {
        console.log(`je filtre les recettes ayant "${search}" dans la description, le nom ou l'un des ingredients `)
        console.log("etape filtre dans tout")

        resultOfSearchingInDescAndNameAndIngr = recipes.filter(recipe => lowerCaseWithoutAccent(recipe.name).includes(search) || lowerCaseWithoutAccent(recipe.description).includes(search) ||
            recipe.ingredients.includes(search)
        )
        console.log(resultOfSearchingInDescAndNameAndIngr)
            //console.log(forEach (recipes => recipe.Object.keys(recipes[1]), Object.values(recipes[1]))
        return resultOfSearchingInDescAndNameAndIngr // ça marche mais n'a pas cherché dans les ingrédients

        // rechercher à nouveau dans les ingrédients????
        // si oui, j'ai une fonction qui récupère les ingrédients donc je dois trouver comment réutiliser ça
    }
};

const recipes2 = new Recipes2()
const test = async() => {
    recipes = await fetch('recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
        //console.log(recipes)
    recipes2.fetchData();
    recipes2.check();
    recipes2.getIngredientsFromRecipes(recipes);
    recipes2.filterByTag(recipes, tag);
    recipes2.filterByText(search, recipeName, tag);
    return recipes
}
test()




/*
const fromScratch = async() => {
    recipes = await fetchRecipes()
    recipes
        .filter(recipe => recipe.description.toLowerCase().startsWith(search))
        .map(recipe => (
            console.log(recipe.name)
        )).join('')
    recipes
        .filter(recipe => recipe.name.toLowerCase().includes(search))
        .map(recipe => (
            console.log(recipe.name) // ok, renvoie le titre des recette qui contiennent la recherche saisie
        )).join('')
    recipes
        .filter(recipe => recipe.appliance.toLowerCase().includes(search))
        .map(recipe => (
            console.log(recipe.name)
        )).join('')

    // pour les ustensils et les ingredients je dois faire une boucle sur getIngredientsFromRecipes

    /* recipes
         .filter(recipe => eachIngredient.toLowerCase().includes(search))
         .map(recipe => (
             console.log(eachIngredient)
         )).join('')*/
/*
}




*/












//resultOfSearch.innerHTML = meals[0]

// ressources utiles //
// https://www.youtube.com/watch?v=ETx4QF_k8so //fromscratch API cuisine
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=24s // weFromYou fetch API
// https://www.youtube.com/watch?v=ZCrh59Bvbts // fromScratch pays API
// https://www.youtube.com/watch?v=6BozpmSjk-Y //dcode SPA

// ALGORITHMES
// https://www.youtube.com/watch?v=U8EJnJAwH1c

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/length
// https://www.it-swarm-fr.com/fr/javascript/accestraitement-imbrique-dobjets-de-tableaux-ou-de-json/1068080863/
// "This_is_my_name".replaceAll(/_/," ")
// https://www.youtube.com/watch?v=U8EJnJAwH1c designer du web algorithmes

// https://www.youtube.com/watch?v=LteNqj4DFD8 devsage recursif
// https://www.youtube.com/watch?v=lMBVwYrmFZQ ++++!!!!




/*for (let recipe of recipes) {
      for (let i of recipe.ingredients) {
          if (i.ingredient == search) {
              console.log("j'ai trouvé!")

              resultOfSearch.innerHTML = ``
              affichage =
                  `<div class="recipe_card_container">
              <img src="/images/${recipe.photo}" class="recipe_img">
              <div class="recipe_title_infos">
                  <h2 class="recipe_name">${recipe.name}</h2>
                  <img class="clock" src="/images/clock-regular.svg">
                  <p>${recipe.time} min</p>
              </div>
              <div class="howTo">
                  <div class="recipe_ingredients">`;
              // boucle pour récupérer un à un les ingrédients vu que le nombre varie d'une recette à l'autre
              recipe.ingredients.forEach((e) => {
                  affichage +=
                      `<p class="recipe_title_ingredient" >${e.ingredient}</p>`;
              });
              affichage += `</div>
                  <div class="recipe_ingredients_steps">`;
              affichage += `<p class="recipe_steps">${recipe.description}</p> `;
              affichage += `</div></div></div>`;
              resultOfSearch.innerHTML = affichage
          } else {
              affichage =
                  `<p class="noRecipe">Aucune recette ne correspond à votre recherche, retentez votre chance avec un autre mot!</p>`
              resultOfSearch.innerHTML = affichage
          }
      }
  }*/





/*
  filterByText(search, recipeName, tag) {
    console.log(`je filtre les recettes ayant "${search}" dans la description, le nom ou l'un des ingredients `)
    console.log("etape filtre dans tout")
        //this.getIngredientsFromRecipes(search)
        //fromScratch() // ok pour l'algo version filter et loop
        /*switch (search) {
            case recipes // le nom de la recette commence
            .filter(recipe => recipe.description.toLowerCase().includes(search))
            .map(recipe => (
                console.log(recipe.name)
            )).join(''):
                return
            case recipes // le nom de la recette contient
            .filter(recipe => recipeName.includes(search))
            .map(recipe => (
                console.log(recipe.name) // ok, renvoie le titre des recette qui contiennent la recherche saisie
            )).join(''):
                console.log(recipe.name)
                return recipe.name
            case (recipes.ingredients.forEach((ingredient) => console.log(ingredient.includes(search)))):
                console.log(recipes.name)
                console.log(ingredient)
                return recipe.name
            default:
                console.log("aucune recette ne correspond")
        }*/