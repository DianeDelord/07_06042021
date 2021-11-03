let resultOfSearch = document.getElementById("resultOfSearch")
let inputSearch = document.getElementById("inputSearch")
    //let searchIngredientInput = document.getElementById("searchIngredientInput")

let inputSearchIngredient = document.querySelector(".dropdown__ingredients_box-input")
let inputSearchAppareil = document.querySelector(".dropdown__appareils_box-input")
let inputSearchUstensile = document.querySelector(".dropdown__ustensiles_box-input")
let dropdown__ingredients_box = document.querySelector(".dropdown__ingredients_box")
let dropdown__appareils_box = document.querySelector(".dropdown__appareils_box")
let dropdown__ustensiles_box = document.querySelector(".dropdown__ustensiles_box")

let search = ""
let searchIngredient = ""
let tags
let tag

let ingredients
let appareils
let ustensiles
let recipes

const multiTagsSearch = []
let compteurTags = 0

// fonction pour passer une string en minuscule sans accent
function lowerCaseWithoutAccent(string) {
    return string.replaceAll('é', 'e').replaceAll('à', 'a').replaceAll('â', 'a').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('ï', 'i').replaceAll('î', 'i').replaceAll('\'', ' ').toLowerCase()
}

//fonction pour passer la première lettre d'une string en majuscule
function firstLetterOfAstringToUpperCase(string) {
    return string.replace(/^./, string[0].toUpperCase());
}

inputSearch.addEventListener('keyup', (e) => {
    if (e.target.value.length > 2) {
        console.log("recherche input ")
        search = lowerCaseWithoutAccent(e.target.value).length > 2 ? lowerCaseWithoutAccent(e.target.value) : false;
        recipes2.filterByText(recipes, tags, search)
        return recipes, search // = lowerCaseWithoutAccent(e.target.value).length > 2 ? lowerCaseWithoutAccent(e.target.value) : false;
    }
})

//input recherche du dropdown ingrédients
inputSearchIngredient.addEventListener('keyup', (e) => {
    if (e.target.value.length > 2) {
        console.log("recherche input ingrédient")
        search = lowerCaseWithoutAccent(e.target.value).length > 2 ? lowerCaseWithoutAccent(e.target.value) : false;
        tag = 'ingrédient'
        recipes2.getTagValuesFromRecipes(recipes, tag, search)
        return recipes, tag, search
    }
})

//input recherche du dropdown appareils
inputSearchAppareil.addEventListener('keyup', (e) => {
    if (e.target.value.length > 2) {
        console.log("recherche input appareil")
        search = lowerCaseWithoutAccent(e.target.value).length > 2 ? lowerCaseWithoutAccent(e.target.value) : false;
        tag = 'appareil'
        recipes2.getTagValuesFromRecipes(recipes, tag, search)
        return recipes, tag, search
    }
})

//input recherche du dropdown ustensiles
inputSearchUstensile.addEventListener('keyup', (e) => {
    if (e.target.value.length > 2) {
        console.log("recherche input ustensile")
        search = lowerCaseWithoutAccent(e.target.value).length > 2 ? lowerCaseWithoutAccent(e.target.value) : false;
        tag = 'ustensile'
        recipes2.getTagValuesFromRecipes(recipes, tag, search)
        return recipes, tag, search
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

///////////////// algo recursif
class Recipes2 {
    constructor() {
        this.data = []
        this.filteredRecipes = []
        this.filteredtags = []
    }

    async fetchData() { //ok
        //ici on recupere la data depuis le fichier json et on initialise la liste des recettes 
        this.data = await fetch('recipes.json')
            .then(res => res.json())
            .then(res => res.recipes)
        recipes = this.data
        console.log("-------------------------------------------------")
        console.log("étape data ok")
            //console.log(recipes)
    }

    async check() {
        console.log("-------------------------------------------------")
        console.log("étape check")
        await this.fetchData()
        this.displayRecipes(recipes)
            // this.displayRecipes(recipes) // affiche les recettes
            // récupère les ingrédients des recettes affichées
            //  this.getAppareilsFromRecipes(recipes, search) // récupère les appareils des recettes affichées
            //  this.getUstensilesFromRecipes(recipes, search) // récupère les ustensils des recettes affichées
            //this.displayCategorieIngredients(ingredients, appareils, ustensiles)

        // this.addTagOnHTML(ingredients, appareils, ustensiles)

        //  console.log(this.getIngredientsFromRecipes(this.data)) //ok
        ///  console.log(this.filterByText(this.data, 'coco')) //ok
        //  console.log("recherche pas tag ingrédient oeuf")
        // console.log(this.filterByTag(this.data, { ingredient: 'Oeuf' }))
        // console.log("recherche pas tag appareil blender")
        //  console.log(this.filterByTag(this.data, { appliance: 'Blender' }))
        //  console.log("recherche pas tag ustensile saladier")
        //  console.log(this.filterByTag(this.data, { ustensil: 'saladier' }))

        //  console.log("recherche par tag ingrédient pomme")
        //  const filteredRecipes = this.filterByTag(this.data, { ingredient: 'Pomme' })

        //  console.log("recherche par tag ustensil couteau dans les résultats de précédente recherche pomme")
        //  console.log("ajout de tag!!!")
        //  console.log(this.filterByTag(filteredRecipes, { ustensil: 'couteau' }))
        //console.log(this.getIngredientsFromRecipes(recipes, search)) //ok
    }

    displayRecipes(recipes) { // ok
        console.log("parée pour l'affichage")
            //console.log(recipes)
            /////// affichage des recettes - SOIT recettes de base SOIT recettes déjà filtrées ///////
        resultOfSearch.innerHTML = "" // réinitialiser l'affichage sinon ça ajoute les cartes recettes à la suite du display non filtré

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
        this.getIngredientsFromRecipes(recipes, search)
        return recipes
    }

    async displayCategorieDropdown(ingredients, appareils, ustensiles) {
        // await this.check()
        console.log("-------------------------------------------------")
        console.log("les ingrédients, appareils et ustensiles dans les dropdown")

        const tagsToFilterRecipes = [] // tableau pour stocker les tags que l'utilisateur a clické pour filtrer

        // dropdown pour y mettre la liste des ingredients, appareils, ustensiles 
        let dropdown__ingredients__list = document.querySelector(".dropdown__ingredients__list")
        let dropdown__appareils__list = document.querySelector(".dropdown__appareils__list")
        let dropdown__ustensiles__list = document.querySelector(".dropdown__ustensiles__list")
        dropdown__ingredients__list.innerHTML = "" //vider le dropdown ingrédient avant de le re-remplir
        dropdown__appareils__list.innerHTML = "" //vider le dropdown appareils avant de le re-remplir
        dropdown__ustensiles__list.innerHTML = "" //vider le dropdown ustensiles avant de le re-remplir
            // problème : si l'utilisateur efface sa saisie, les tags ne se remettent pas

        //je mets les éléments dans le dropdown de leur catégorie
        //est-ce que ça peut devenir une méthode dispatche les tag par catégorie? j'ai essayé mais pas réussi
        for (let ingredient of ingredients) {
            let liIngredient = document.createElement("li");
            liIngredient.setAttribute("class", "dropdown__ingredients__list-item");
            liIngredient.innerHTML = ingredient;
            dropdown__ingredients__list.appendChild(liIngredient)
            liIngredient.addEventListener('click', function() {
                let tag_ingredient = document.querySelector(".tag_ingredient")
                let li_tag_ingredient = document.createElement("li");
                li_tag_ingredient.innerHTML = this.innerHTML
                tag_ingredient.appendChild(li_tag_ingredient)
                dropdown__ingredients__list.removeChild(this)
                tagsToFilterRecipes.push(this.innerHTML)
                if (tagsToFilterRecipes.length > 0) { // lancer le filtrage dès qu'on clicke sur un tag
                    console.log(tagsToFilterRecipes)
                    recipes2.filterByTags(recipes, tagsToFilterRecipes, ingredients, appareils, ustensiles)
                }
            })
        }
        for (let appareil of appareils) {
            let liAppareil = document.createElement("li");
            liAppareil.setAttribute("class", "dropdown__appareils__list-item");
            liAppareil.innerHTML = appareil;
            dropdown__appareils__list.appendChild(liAppareil)
            liAppareil.addEventListener('click', function() {
                let tag_appareil = document.querySelector(".tag_appareil")
                let li_tag_appareil = document.createElement("li");
                li_tag_appareil.innerHTML = this.innerHTML
                tag_appareil.appendChild(li_tag_appareil)
                dropdown__appareils__list.removeChild(this)
                tagsToFilterRecipes.push(this.innerHTML)
                if (tagsToFilterRecipes.length > 0) { // lancer le filtrage dès qu'on clicke sur un tag
                    console.log(tagsToFilterRecipes)
                    recipes2.filterByTags(recipes, tagsToFilterRecipes, ingredients, appareils, ustensiles)
                }
            })
        }
        for (let ustensile of ustensiles) {
            let liUstensil = document.createElement("li");
            liUstensil.setAttribute("class", "dropdown__ustensiles__list-item");
            liUstensil.innerHTML = ustensile;
            dropdown__ustensiles__list.appendChild(liUstensil)
            liUstensil.addEventListener('click', function() {
                let tag_ustensile = document.querySelector(".tag_ustensile")
                let li_tag_ustensile = document.createElement("li");
                li_tag_ustensile.innerHTML = this.innerHTML,
                    tag_ustensile.appendChild(li_tag_ustensile)
                    //if (tag_ustensile.includes(this))
                dropdown__ustensiles__list.removeChild(this)
                tagsToFilterRecipes.push(this.innerHTML)
                if (tagsToFilterRecipes.length > 0) { // lancer le filtrage dès qu'on clicke sur un tag
                    console.log(tagsToFilterRecipes)
                    recipes2.filterByTags(recipes, tagsToFilterRecipes, ingredients, appareils, ustensiles)
                }
            })
        }

        dropdown__ingredients_box.addEventListener('click', function() { // dropdown__${catégorie}_box
            dropdown__ingredients__list.classList.add("dropdown_open")
            dropdown__appareils__list.classList.remove("dropdown_open")
            dropdown__ustensiles__list.classList.remove("dropdown_open")
            inputSearchIngredient.setAttribute("placeholder", "Rechercher un ingrédient");
            console.log("ingrédients ouvert")
                // this.style.display='none'
            return
        })

        dropdown__appareils_box.addEventListener('click', function() { // dropdown__${catégorie}_box
            dropdown__appareils__list.classList.add("dropdown_open")
            dropdown__ingredients__list.classList.remove("dropdown_open")
                //inputSearchIngredient.removeAttribute("placeholder", "Rechercher un ingrédient");
            inputSearchIngredient.setAttribute("placeholder", "Ingrédients");
            dropdown__ustensiles__list.classList.remove("dropdown_open")
            console.log("appareils ouvert")
                // this.style.display='none'
            return
        })

        dropdown__ustensiles_box.addEventListener('click', function() { // dropdown__${catégorie}_box
            dropdown__ustensiles__list.classList.add("dropdown_open")
            dropdown__ingredients__list.classList.remove("dropdown_open")
                // inputSearchIngredient.removeAttribute("placeholder", "Rechercher un ingrédient");
            inputSearchIngredient.setAttribute("placeholder", "Ingrédients");
            dropdown__appareils__list.classList.remove("dropdown_open")
            console.log("ustensiles ouvert")
                // this.style.display='none'
            return
        })
        console.log(tagsToFilterRecipes)
            // supprimer le tag du bandeau au click dessus
            // puis le remettre dans sa catégorie

        /*document.addEventListener("click", function(e) {
            console.log("clic dans le document")
            console.log(e.target)
                //  if (dropdown__ingredients__list.classList.contains('dropdown_open')) {
                //     console.log("ingrédients qui doit être fermé")
                // dropdown__ingredients__list.classList.remove("dropdown_open")
                // }
            if (!e.target.classList.contains('dropdown__ingredients__list-item') && dropdown__ingredients__list.classList.contains("dropdown_open")) {
                // hideIngredients();
                console.log("clic quelque part")
                console.log(e.target)
                dropdown__ingredients__list.classList.remove("dropdown_open")
            }
            if (!dropdown__ingredients__list.classList.contains("dropdown_open")) {
                dropdown__ingredients__list.classList.add("dropdown_open")

            } else if (!dropdown__ingredients__list.classList.contains("dropdown_open")) {
                dropdown__ingredients__list.classList.add("dropdown_open")

            }
        })*/

        return search, tagsToFilterRecipes, ingredients, appareils, ustensiles
    }

    getIngredientsFromRecipes(recipes) { //ok 
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
        console.log(ingredients)
            //this.displayCategorieIngredients(ingredients)

        console.log("-------------------------------------------------")
        console.log("étape liste des appareils")
        const appareils = [];
        // créee un tableau avec tous les appareils de toutes les recettes, doublons supprimés
        for (let recipe of recipes) {
            const applianceName = firstLetterOfAstringToUpperCase(recipe.appliance);
            appareils.indexOf(applianceName) === -1 ? appareils.push(applianceName) : console.log( /*`${applianceName} est deja present dans ma liste d'ingredient`+*/ "doublon");
        }
        console.log(appareils)
            //this.displayCategorieIngredients(appareils)

        //this.displayDropdownAppareils(appareils)
        console.log("-------------------------------------------------")
        console.log("étape liste des ustensiles")
        const ustensiles = [];
        // créee un tableau avec tous les ustensiles de toutes les recettes, doublons supprimés
        for (let recipe of recipes) {
            for (let ustensil of recipe.ustensils) {
                const ustensilName = firstLetterOfAstringToUpperCase(ustensil);
                ustensiles.indexOf(ustensilName) === -1 ? ustensiles.push(ustensilName) : console.log( /*`${ustensilName} est deja present dans ma liste d'ingredient`+*/ "doublon");
            }
        }
        console.log(ustensiles)
        this.displayCategorieDropdown(ingredients, appareils, ustensiles)
            // this.displayRecipes(recipes)
            //this.displayDropdownUstensiles(ustensiles)
        return recipes, ingredients, appareils, ustensiles
    }

    getTagValuesFromRecipes(recipes, tag, search) {
        console.log("-------------------------------------------------")
        console.log("étape get tag values from recipes")
        console.log(search)
        console.log(tag)
        const matchingRecipes = []

        // créee un tableau avec tous les tags ingrédients des recettes (oui y'a les doublons)
        const tagsIngredients = [];
        const tagsAppareils = [];
        const tagsUstensiles = [];

        switch (tag) {
            case 'ingrédient':
                // cas recherche dans les ingrédients
                for (let recipe of recipes) {
                    for (let ingredient of recipe.ingredients) {
                        const ingredientName = lowerCaseWithoutAccent(ingredient.ingredient);
                        if (ingredientName.includes(search)) {
                            tagsIngredients.indexOf(ingredientName) === -1 ? tagsIngredients.push(ingredientName) : console.log( /*`${ingredientName} est deja present dans ma liste d'ingredient`+*/ );
                            matchingRecipes.indexOf(recipe) === -1 ? matchingRecipes.push(recipe) : console.log( /*`${recipe} est deja present dans ma liste d'ingredient`+*/ );
                        }
                    }
                    for (let recipe of matchingRecipes) {
                        // créee un tableau avec les appareils des recettes qui matchent, doublons supprimés
                        const applianceName = lowerCaseWithoutAccent(recipe.appliance);
                        tagsAppareils.indexOf(applianceName) === -1 ? tagsAppareils.push(applianceName) : console.log( /*`${applianceName} est deja present dans ma liste d'appareils`+*/ );

                        // créee un tableau avec tous les ustensiles des recettes qui matchent, doublons supprimés
                        for (let ustensil of recipe.ustensils) {
                            const ustensilName = lowerCaseWithoutAccent(ustensil);
                            tagsUstensiles.indexOf(ustensilName) === -1 ? tagsUstensiles.push(ustensilName) : console.log( /*`${ustensilName} est deja present dans ma liste d'ustensiles`+*/ );
                        }
                    }
                }
                break;

            case 'appareil':
                // cas recherche dans les appareils
                for (let recipe of recipes) {
                    const applianceName = lowerCaseWithoutAccent(recipe.appliance);
                    if (applianceName.includes(search)) {
                        tagsAppareils.indexOf(applianceName) === -1 ? tagsAppareils.push(applianceName) : console.log( /*`${applianceName} est deja present dans ma liste d'appareils`+*/ );
                        matchingRecipes.indexOf(recipe) === -1 ? matchingRecipes.push(recipe) : console.log( /*`${recipe} est deja present dans ma liste d'ingredient`+*/ );
                    }
                    for (let recipe of matchingRecipes) {
                        for (let ingredient of recipe.ingredients) {
                            const ingredientName = lowerCaseWithoutAccent(ingredient.ingredient);
                            tagsIngredients.indexOf(ingredientName) === -1 ? tagsIngredients.push(ingredientName) : console.log( /*`${ingredientName} est deja present dans ma liste d'ingredient`+*/ );
                        }
                        for (let ustensil of recipe.ustensils) {
                            const ustensilName = lowerCaseWithoutAccent(ustensil);
                            tagsUstensiles.indexOf(ustensilName) === -1 ? tagsUstensiles.push(ustensilName) : console.log( /*`${ustensilName} est deja present dans ma liste d'ustensiles`+*/ );
                            tagsUstensiles.indexOf(ustensilName) === -1 ? tagsUstensiles.push(ustensilName) : console.log( /*`${ustensilName} est deja present dans ma liste d'ustensiles`+*/ );
                        }
                    }
                }
                break;

            case 'ustensile':
                // cas recherche dans les ustensiles
                for (let recipe of recipes) {
                    for (let ustensil of recipe.ustensils) {
                        const ustensilName = lowerCaseWithoutAccent(ustensil);
                        if (ustensilName.includes(search)) {
                            tagsUstensiles.indexOf(ustensilName) === -1 ? tagsUstensiles.push(ustensilName) : console.log( /*`${ustensilName} est deja present dans ma liste d'ustensiles`+*/ );
                            matchingRecipes.indexOf(recipe) === -1 ? matchingRecipes.push(recipe) : console.log( /*`${recipe} est deja present dans ma liste d'ingredient`+*/ );
                        }
                    }
                    for (let recipe of matchingRecipes) {
                        // créee un tableau avec les appareils des recettes qui matchent, doublons supprimés
                        const applianceName = lowerCaseWithoutAccent(recipe.appliance);
                        tagsAppareils.indexOf(applianceName) === -1 ? tagsAppareils.push(applianceName) : console.log( /*`${applianceName} est deja present dans ma liste d'appareils`+*/ );

                        for (let ingredient of recipe.ingredients) {
                            const ingredientName = lowerCaseWithoutAccent(ingredient.ingredient);
                            tagsIngredients.indexOf(ingredientName) === -1 ? tagsIngredients.push(ingredientName) : console.log( /*`${ingredientName} est deja present dans ma liste d'ingredient`+*/ );
                        }
                    }
                }
                break;
        }

        console.log("tags ingrédients " + tagsIngredients)
        console.log("tags ustensiles " + tagsUstensiles)
        console.log("tags appareils " + tagsAppareils)

        console.log("recettes avec ingrédient " + search);
        console.log(matchingRecipes)

        this.displayRecipes(matchingRecipes)
            //this.displayCategorieDropdown(ingrédients, appareils, ustensiles)
        return matchingRecipes, recipes, tagsIngredients, tagsAppareils, tagsUstensiles
    }

    filterByTags(recipes, tagsToFilterRecipes, ingredients, appareils, ustensiles) { // depuis les dropdown?
        console.log("-------------------------------------------------")
        console.log("étape filtre par tous les tags")
        console.log(tagsToFilterRecipes)
            //console.log(recipes)
        for (let tag of tagsToFilterRecipes) {
            console.log(tag)
            if (this.filterByTag(recipes, { ingredient: tag })) {
                console.log("y'a un ingredient là dedans")
                return tag
            }
            if (this.filterByTag(recipes, { appliance: tag })) {
                console.log("y'a un appareil là dedans")
                return tag
            }
            if (this.filterByTag(recipes, { ustensil: tag })) {
                console.log("y'a un ustensil là dedans")
                return tag
            }
            console.log(multiTagsSearch)
            return tag
        }
        //https://ultimatecourses.com/blog/array-find-javascript

        // chercher dans les ingrédients, les appareils et les ustensils
        return recipes, tag, tagsToFilterRecipes, multiTagsSearch;
    }

    filterByTag(recipes, tag, search) {
        console.log("-------------------------------------------------")
        console.log("étape filtre de tag par type")
            // console.log(tag)
        console.log(multiTagsSearch)
        console.log(search)

        const key = Object.keys(tag)[0]
        const value = Object.values(tag)[0]
        recipes = recipes.filter(function(recipe) {
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
        if (recipes.length > 0) {
            multiTagsSearch.push(recipes)
            compteurTags++
            console.log("j'ajoute un truc, tu permets " + compteurTags)
        }
        console.log(recipes)
        console.log(multiTagsSearch)
        return recipes, multiTagsSearch

        ///// ATTENTION, si y'a des doublons de recette already exists? /////////
        //// grâce à l'id? ///////
    }

    filterByText(recipes, tags, search) {
        //console.log(`je filtre les recettes ayant "${search}" dans la description, le nom ou l'un des ingredients `)
        console.log("-------------------------------------------------")
        console.log("étape filtre dans tout")
            // const resultOfSearchByText = recipes.filter(recipe => lowerCaseWithoutAccent(recipe.name).includes(search) || lowerCaseWithoutAccent(recipe.description).includes(search) || hasInRecipe(recipe, search))
            //console.log(resultOfSearchByText)
        recipes = recipes.filter(recipe => lowerCaseWithoutAccent(recipe.name).includes(search) || lowerCaseWithoutAccent(recipe.description).includes(search) || hasInRecipe(recipe, search))
        console.log(recipes)
        this.displayRecipes(recipes)
        if (recipes.length == 0) {
            resultOfSearch.innerHTML = `<p>Aucune recette ne correspond à votre recherche, tapez par exemple "smoothie", "chocolat", "blender"…</p>`

        }
        this.getIngredientsFromRecipes(recipes)
        return recipes
    }
};

const recipes2 = new Recipes2()
const test = async() => {
    recipes2.check();
}
test()


/*async addTagOnHTML(recipes, ingredients, appareils, ustensiles) {
    await this.fetchData()
    await this.getAppareilsFromRecipes(recipes, search)
    await this.getUstensilesFromRecipes(recipes, search)
    console.log("-------------------------------------------------")
    console.log("étape ajout tags dans les dropdown")
        // pour mettre un listener sur les tags  du dropdown
    let dropdown__ingredients__listItem = document.querySelectorAll(".dropdown__ingredients__list-item") //tags ingrédients
        //tags appareils
        //tags ustensiles

    console.log(dropdown__ingredients__listItem)

    for (let i = 0; i < dropdown__ingredients__listItem.length; i++) {
        dropdown__ingredients__listItem[i].addEventListener("click", function() {
            dropdown__ingredients__listItem[i].classList.toggle("red");
        });
    }
}*/




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