let resultOfSearch = document.getElementById("resultOfSearch")
let inputSearch = document.getElementById("inputSearch")
let searchIngredientInput = document.getElementById("searchIngredientInput")

// dropdown ingrédients pour y mettre la liste des ingrédients 
let dropdown__ingredients__list = document.querySelector("dropdown__ingredients__list")

let search = ""
let tags
let tag
let tagIngredient
let tagAppareil
let tagUstensils

let ingredients
let recipeName
let ingredientsArray = []
let recipes
let ingredientName
let recetteCree

let resultOfSearchingInDescAndNameAndIngr
let resultOfSearchingInIngr = []
let initial

// fonction pour passer une string en minusucle sans accent
function lowerCaseWithoutAccent(string) {
    return string.replaceAll('é', 'e').replaceAll('à', 'a').replaceAll('â', 'a').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('ï', 'i').replaceAll('î', 'i').replaceAll('\'', ' ').toLowerCase()
}

inputSearch.addEventListener('keydown', (e) => {
    if (e.target.value.length >= 3) {
        console.log(search)
        test()
        return search = lowerCaseWithoutAccent(e.target.value);
    }
})

function hasInRecipe(recipe, search) {
    for (let ingredient of recipe.ingredients) {
        const ingredientName = ingredient.ingredient;
        if (ingredientName.includes(search)) {
            return true
        }
    }
    return false
}

///////////////// Guillaume algo recursif
class Recipes2 {
    constructor() {
        this.data = []
        this.filteredRecipes = []
        this.filteredtags = []
    }

    async fetchData() { //ok
        //ici on recupere la data depuis le fichier json et on initialise la list des recettes 
        this.data = await fetch('recipes.json')
            .then(res => res.json())
            .then(res => res.recipes)
        recipes = this.data
        console.log("étape data ok")
            //console.log(recipes)
    }

    async check() {
        console.log("étape check")
        await this.fetchData()
        this.displayRecipes(recipes)

        // console.log(this.getIngredientsFromRecipes(this.data)) //ok
        // console.log(this.filterByText(this.data, 'coco')) //ok
        //console.log(this.filterByTag(this.data, { ingredient: 'Oeuf' }))
        // console.log(this.filterByTag(this.data, { appliance: 'Blender' }))
        // console.log(this.filterByTag(this.data, { ustensil: 'saladier' }))

        //const filteredRecipes = this.filterByTag(this.data, { ingredient: 'Pomme' })
        //console.log(this.filterByTag(filteredRecipes, { ustensil: 'couteau' }))
        // console.log(this.getIngredientsFromRecipes(search)) //ok
    }

    async displayRecipes(recipes) {
        await this.fetchData()
        console.log("parée pour l'affichage")
            //console.log(recipes)
            /////// affichage de base ///////
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

    getIngredientsFromRecipes(recipes) { //ok //pour le dropdown ingrédients
        console.log("-------------------------------------------------")
        console.log("étape liste des ingredient")
        const ingredients = [];
        // créee un tableau avec tous les ingrédients de toutes les recettes, doublons supprimés
        for (let recipe of recipes) {
            for (let ingredient of recipe.ingredients) {
                const ingredientName = ingredient.ingredient;
                ingredients.indexOf(ingredientName) === -1 ? ingredients.push(ingredientName) : console.log( /*`${ingredientName} est deja present dans ma liste d'ingredient`+*/ "doublon");
            }
        }

        //je mets les ingrédients dans le dropdown ingrédients
        // dropdown__ingredients__list.innerHTML = ingredients

        return ingredients
    }

    getTagValuesFromRecipes(recipes, tagName) {
        return []
    }

    filterByTags(recipes, tags) {
        return recipes;
    }


    filterByTag(recipes, tag) {
        console.log("-------------------------------------------------")
        console.log("étape filtre par tag")

        const key = Object.keys(tag)[0]
        const value = Object.values(tag)[0]

        return recipes.filter(function(recipe) {
                switch (key) {
                    case 'ingredient':
                        for (let ingredient of recipe.ingredients) {
                            const ingredientName = ingredient.ingredient;
                            if (ingredientName === value) {
                                return true
                            }
                        }
                        return false

                    case 'appliance':
                        return recipe.appliance === value;
                    case 'ustensil':
                        return recipe.ustensils.includes(value)
                    default:
                        return true;
                }
            })
            ///// ATTENTION, si y'a des doublons de recette already exists? /////////
            //// grâce à l'id? ///////
    }

    filterByText(recipes, search) {
        //console.log(`je filtre les recettes ayant "${search}" dans la description, le nom ou l'un des ingredients `)
        console.log("-------------------------------------------------")
        console.log("étape filtre dans tout")
        return recipes.filter(recipe => lowerCaseWithoutAccent(recipe.name).includes(search) || lowerCaseWithoutAccent(recipe.description).includes(search) || hasInRecipe(recipe, search))
    }
};

const recipes2 = new Recipes2()
const test = async() => {
    recipes2.check();
}
test()






//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

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
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Errors/is_not_iterable