let resultOfSearch = document.getElementById("resultOfSearch")
let inputSearch = document.getElementById("inputSearch")
let searchIngredientInput = document.getElementById("searchIngredientInput")
let search = ""
let affichage = ``
let matchingRecipe
let arrayOfRecipeBySearch = []
let tags
let tag
let ingredients
let recipeName
let ingredientsArray
let recipes
let ingredientName
let eachIngredient
let tableauPourEssai = []
let recetteCree


// fonction pour passer une string en minusucle sans accent
function lowerCaseWithoutAccent(string) {
    return string.replaceAll('é', 'e').replaceAll('à', 'a').replaceAll('â', 'a').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('ï', 'i').replaceAll('î', 'i').replaceAll('\'', ' ').toLowerCase()
}

/////////////////////////////
// récupération des données
const fetchRecipes = async() => {
    recipes = await fetch('recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
    return recipes
}

const searchDisplay = async() => {
    await fetchRecipes();
}

inputSearch.addEventListener('input', (e) => {
    tableauPourEssai = [] // là je récupère que des true/false alors comment je peux savoir les true?

    if (e.target.value.length >= 3) {
        search = lowerCaseWithoutAccent(e.target.value);
        console.log(search)

        arrayOfRecipeBySearch = [] // parce que sinon les résultats s'ajoutaient
            // console.log(arrayOfRecipeBySearch)
        test()
        return search
    }
})

/////// affichage de base ///////
const initialDisplay = async() => {
    await fetchRecipes();
    // for (let recipe of recipes) {
    recipes.forEach(recipe => {
        let recipe_card_container = document.createElement("div");
        recipe_card_container.setAttribute("class", "recipe_card_container");

        let recipe_img = document.createElement("img");
        recipe_img.setAttribute("src", `./images/${recipe.photo}`);
        recipe_img.setAttribute("class", "recipe_img");

        let recipe_title_infos = document.createElement("div");
        recipe_title_infos.setAttribute("class", "recipe_title_infos");

        let recipe_name = document.createElement("h2");
        recipe_name.setAttribute("class", "recipe_name");
        recipe_name.innerHTML = recipe.name;

        let clock = document.createElement("p");
        clock.setAttribute("class", "clockTime");
        clock.innerHTML = `<img class="clock" src="./images/clock-regular.svg"><span>${recipe.time} min</span>`;

        let howTo = document.createElement("div");
        howTo.setAttribute("class", "howTo");

        let recipe_ingredients = document.createElement("ul");
        recipe_ingredients.setAttribute("class", "recipe_ingredients");

        let recipe_ingredients_steps = document.createElement("div");
        recipe_ingredients_steps.setAttribute("class", "recipe_ingredients_steps");

        let recipe_steps = document.createElement("p");
        recipe_steps.setAttribute("class", "recipe_steps");
        recipe_steps.innerHTML = `${recipe.description}`

        recipe.ingredients.forEach(ingredientElement => {
            let ingredient = document.createElement("li");
            ingredient.setAttribute("class", "recipe_title_ingredient");
            let quantity = document.createElement("span");
            quantity.setAttribute("class", "quantity");

            ingredient.innerHTML = `${ingredientElement.ingredient} : `;

            if (ingredientElement.quantity == undefined) {
                ingredientElement.quantity = "";
            }
            if (ingredientElement.unit == "grammes") {
                ingredientElement.unit = "g";
            }
            if (ingredientElement.unit == "cuillères à soupe") {
                ingredientElement.unit = "cs";
            }
            if (ingredientElement.unit == undefined) {
                ingredientElement.unit = "";
            }
            quantity.innerHTML = `${ingredientElement.quantity}&nbsp;${ingredientElement.unit}`; // espace insécable!

            ingredient.appendChild(quantity);
            recipe_ingredients.appendChild(ingredient);
        })

        recipe_card_container.appendChild(recipe_img);
        recipe_card_container.appendChild(recipe_title_infos);

        recipe_title_infos.appendChild(recipe_name);
        recipe_title_infos.appendChild(clock);

        recipe_card_container.appendChild(howTo);
        howTo.appendChild(recipe_ingredients);
        howTo.appendChild(recipe_ingredients_steps);

        recipe_ingredients_steps.appendChild(recipe_steps);

        resultOfSearch.appendChild(recipe_card_container);
    })
}

initialDisplay()

let resultOfSearchingInDescAndNameAndIngr
let resultOfSearchingInIngr = []
let initial

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
        for (let recipe of recipes) {
            recetteCree = new Recipes2(recipe.appliance, recipe.description, recipe.id, recipe.ingredients, recipe.name, recipe.photo, recipe.servings, recipe.time, recipe.ustensils)
                // console.log(recetteCree)
        }
    }

    check() {
        this.fetchData()
            //console.log("etape check")
        console.log(recipes)

        // console.log(this.getIngredientsFromRecipes(search)) //ok
        //console.log(this.filterByTag(this.data, { ingredient: ['poivron'] }))

        //if la saisie est dans l'input ingredient, on lance la fonction recherche dans ingrédient
        // sinon recherche dans tout 
    }

    getIngredientsFromRecipes() { //ok
        console.log("-------------------------------------------------")
        console.log("etape liste des ingredient")

        function recupEach() {
            for (let recipe of recipes) {
                for (let ingredient of recipe.ingredients) {
                    recipeName = recipe.name
                    tag = ingredient.ingredient
                        //console.log(search)   
                    if (search.length < 3) {
                        return false
                    } else if (tag.includes(search)) {
                        console.log(recipe.name + " contient du " + tag)
                        arrayOfRecipeBySearch.indexOf(recipe.name) === -1 ? arrayOfRecipeBySearch.push(recipe.name) : console.log("doublon de résultat");
                    }
                }
            }
            console.log(arrayOfRecipeBySearch)
        }
        recupEach()


        //console.log(search)
        //return recipeName, tag; // ok retourne bien les noms de recettes et les ingredients*/

        ///// ATTENTION, si y'a des doublons? already exists? /////////
        //// grâce à l'id? ///////

        for (const key in recipes) {
            //console.log(recipes[key])
            for (const key2 in recipes[key]) {
                //console.log(key2)
                //console.log(key + key2)
            }
        }
    }

    filterByTag() {
        console.log("-------------------------------------------------")
        console.log("etape filtre par tag")
            //console.log(`je filtre les recettes ayant comme ${Object.keys(tag)[0]} les valeurs ${Object.values(tag)[0]} `)
            //console.log(`je filtre les recettes ayant comme ${tag} les valeurs ${search} `)
            //console.log(recipes)
            //console.log(recetteCree) // seulement la dernière

        for (let recipe of recipes) {
            let alors = recipe.ingredients.map(ing => ing.ingredient.toLowerCase()).join(" ").includes(search)
                // tableauPourEssai.push(recipe)
            console.log(alors)
        }
    }

    filterByText(search, recipeName, tag) {
        console.log(`je filtre les recettes ayant "${search}" dans la description, le nom ou l'un des ingredients `)
        console.log("etape filtre dans tout")

        resultOfSearchingInDescAndNameAndIngr = recipes.filter(recipe => lowerCaseWithoutAccent(recipe.name).includes(search) || lowerCaseWithoutAccent(recipe.description).includes(search))
        console.log(resultOfSearchingInDescAndNameAndIngr)
        return resultOfSearchingInDescAndNameAndIngr
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
    recipes2.getIngredientsFromRecipes(recipes, search);
    recipes2.filterByTag();
    //recipes2.filterByText(search, recipeName, tag); // ça ça marche! ça renvoie un array des résultats
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


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////// pour la recherche par ingrédients, bonjour la galère //////////////////////////////////////

/*recipes.forEach(function(recipe) {
         ingredients = recipe.ingredients
         recipeName = lowerCaseWithoutAccent(recipe.name)
             // console.log(ingredients) //tableau des ingredients de chaque recette //ok!
             //console.log("dans la recette de " + recipeName)
         ingredients.forEach(function(ingredient) {
             tag = lowerCaseWithoutAccent(ingredient.ingredient)
                 //console.log("il y a " + tag) // chaque ingredient de TOUTES les recettes //ok!
             console.log(tag)
                 //  return tag
             if (tag.includes(search)) {
                 //  console.log("coucou" + recipeName + "---------------------------------")
             }
             //return recipe, tag
         })
     })*/



/*
              const truc = recipes.map(obj => obj.name)
                  // console.log(truc) // un tableau avec tous les noms des recettes

              const truc2 = recipes.map(obj => obj.ingredients)
                  // console.log(truc2) // un tableau avec les tableaux d'ingrédients de toutes les recettes
      */

//return tag
//}
//returnIngredientsOneByOne()

//console.log(`je recupere tous les ingredients des recettes`)
/* recipes.forEach(function(recipe) {
         ingredients = recipe.ingredients
         recipeName = lowerCaseWithoutAccent(recipe.name)
             // console.log(ingredients) //tableau des ingredients de chaque recette //ok!
             //console.log("dans la recette de " + recipeName)
         ingredients.forEach(function(ingredient) {
             tag = lowerCaseWithoutAccent(ingredient.ingredient)
                 //console.log("il y a " + tag) // chaque ingredient de TOUTES les recettes //ok!
                 //console.log(tag)
             return tag
         })
         console.log("hello")
         return recipe, tag

     })
     //return recipeName, tag; // ok retourne bien les noms de recettes et les ingredients*/


/*Array.prototype.forEach.call(recipes, recipe => {
    recipeName = lowerCaseWithoutAccent(recipe.name)
    Array.prototype.forEach.call(recipe.ingredients, ingredient => {
        tag = lowerCaseWithoutAccent(ingredient.ingredient)
            //console.log(recipeName, tag)
        console.log(tag)
        if (tag.includes(search)) {
            console.log(search + " trouvé " + tag)
        }
        return recipeName, tag
    })
    return recipeName, tag
})*/












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