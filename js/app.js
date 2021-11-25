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

//fonction pour stoper la propagation
function cliqueAndStop(e) {
    // console.log('Paragraphe cliqué - Arrêt de la propagation');
    e.stopPropagation();
}
// créee un tableau avec tous les tags ingrédients des recettes 
const tagsIngredients = [];
const tagsAppareils = [];
const tagsUstensiles = [];

const multiTagsSearch = []
const tagsToFilterRecipes = [] // tableau pour stocker les tags que l'utilisateur a clické pour filtrer

let compteurTags = 0

// fonction pour passer une string en minuscule sans accent
function lowerCaseWithoutAccent(string) {
    return string.replaceAll('é', 'e').replaceAll('à', 'a').replaceAll('â', 'a').replaceAll('è', 'e').replaceAll('ê', 'e').replaceAll('ï', 'i').replaceAll('î', 'i').replaceAll('\'', ' ').toLowerCase()
}
//fonction pour passer la première lettre d'une string en majuscule
function firstLetterOfAstringToUpperCase(string) {
    return string.replace(/^./, string[0].toUpperCase());
}
// fonction pour mettre en majuscule la première lettre d'une string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

////////////////////////////////////////////////////////////////////
//recherche tapée dans l'input global
inputSearch.addEventListener('keyup', (e) => {
    search = ""
    if (e.target.value.length > 2) {
        search = lowerCaseWithoutAccent(e.target.value)
        recipes2.search = search;
        console.log(search)
        return recipes2.displayRecipes(recipes2.filterByText(recipes2.filterByTags(recipes2.data, recipes2.filteredtags), recipes2.search)), search
    } else {
        recipes2.search = ""
            // console.log("cas où y'a moins de 3 lettres saisies")
        recipes2.filteredRecipes = []
        return recipes2.displayRecipes(recipes2.filterByTags(recipes2.data, recipes2.filteredtags))
    }
    // console.log('we start a display', recipes2.filteredtags, recipes2.search)
    // console.log(recipes2.filterByTags(recipes2.data, recipes2.filteredtags))
    // return recipes2.displayRecipes(recipes2.filterByText(recipes2.filterByTags(recipes2.data, recipes2.filteredtags), recipes2.search)), search
})


//input recherche du dropdown ingrédients
inputSearchIngredient.addEventListener('keyup', (e) => {
    search = ""
    console.log("-------------------------------------------------")
    console.log("recherche input ingrédient")
        // if (e.target.value.length > 1) {
    search = lowerCaseWithoutAccent(e.target.value)
        // recipes2.filteredtags = ({ 'ingredient': `${search}` })
    console.log(search)
    let dropdown__ingredients__list_item = document.querySelectorAll(".dropdown__ingredients__list-item")
    for (let item of dropdown__ingredients__list_item) {
        itemInner = lowerCaseWithoutAccent(item.innerHTML)
        item.classList.remove("hidden")
        if ((itemInner.startsWith(search)) || (itemInner.includes(search))) {
            console.log(itemInner + " ok")
        } else {
            // console.log(item)
            item.classList.add("hidden")
        }

    }
})

//input recherche du dropdown appareils
inputSearchAppareil.addEventListener('keyup', (e) => {
    search = ""
    console.log("-------------------------------------------------")
    console.log("recherche input appareil")
    search = lowerCaseWithoutAccent(e.target.value)
        // recipes2.filteredtags = ({ 'appareil': `${search}` })
    console.log(search)
    let dropdown__appareils__list_item = document.querySelectorAll(".dropdown__appareils__list-item")
    for (let item of dropdown__appareils__list_item) {
        itemInner = lowerCaseWithoutAccent(item.innerHTML)
        item.classList.remove("hidden")
        if ((itemInner.startsWith(search)) || (itemInner.includes(search))) {
            console.log(itemInner + " ok")
        } else {
            // console.log(item)
            item.classList.add("hidden")
        }

    }
})

//input recherche du dropdown ustensiles
inputSearchUstensile.addEventListener('keyup', (e) => {
    search = ""
    console.log("-------------------------------------------------")
    console.log("recherche input ustensile")
    search = lowerCaseWithoutAccent(e.target.value)
        // recipes2.filteredtags = ({ 'ustensile': `${search}` })
    console.log(search)
    let dropdown__ustensiles__list_item = document.querySelectorAll(".dropdown__ustensiles__list-item")
    for (let item of dropdown__ustensiles__list_item) {
        itemInner = lowerCaseWithoutAccent(item.innerHTML)
        item.classList.remove("hidden")
        if ((itemInner.startsWith(search)) || (itemInner.includes(search))) {
            console.log(itemInner + " ok")
        } else {
            // console.log(item)
            item.classList.add("hidden")
        }

    }
})

function hasInRecipe(recipe, search) {
    for (let ingredient of recipe.ingredients) {
        const ingredientName = ingredient.ingredient;
        if (ingredientName.includes(search)) {
            return true
        }
    }
    return false;
}



///////////////// algo 
class Recipes2 {
    constructor() {
        this.data = []
        this.filteredRecipes = []
        this.filteredtags = []
        this.search = ''
    }

    async fetchData() { //ok
        //ici on recupere la data depuis le fichier json et on initialise la liste des recettes 
        this.data = await fetch('recipes.json')
            .then(res => res.json())
            .then(res => res.recipes)
        recipes = this.data
            // console.log("-------------------------------------------------")
            //  console.log("étape data ok")
        return recipes // ajouté vendredi matin
            //console.log(recipes)
    }

    async check() {
        // console.log("-------------------------------------------------")
        // console.log("étape check")
        await this.fetchData()
        this.displayRecipes(recipes2.data)
        this.setDropDown()
            // this.getTagValuesFromRecipes(recipes, this.getIngredientsFromRecipes(recipes), this.getAppliancesFromRecipes(recipes), this.getUstensilsFromRecipes(recipes))
    }

    displayRecipes(recipes) { // ok
        // console.log("parée pour l'affichage")
        //console.log(recipes)
        /////// affichage des recettes - SOIT recettes de base SOIT recettes déjà filtrées ///////
        resultOfSearch.innerHTML = "" // réinitialiser l'affichage sinon ça ajoute les cartes recettes à la suite du display non filtré
        console.log(recipes)
            // console.log(recipes.length)
        if ((recipes.length === 0) || (recipes == null)) {
            resultOfSearch.innerHTML = `<p>Aucune recette ne correspond à votre recherche, tapez par exemple "smoothie", "chocolat", "blender"…</p>`
        }
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

        // récupérer les ingrédients, appareils et ustensils des recettes
        this.displayCategorieDropdown(recipes)
        this.getTagValuesFromRecipes(recipes, ingredients, appareils, ustensiles)
    }

    setDropDown() { //ok
        let dropdown__ingredients = document.querySelector(".dropdown__ingredients")
        let dropdown__appareils = document.querySelector(".dropdown__appareils")
        let dropdown__ustensiles = document.querySelector(".dropdown__ustensiles")
        let dropdown__ingredients__list = document.querySelector(".dropdown__ingredients__list")
        let dropdown__appareils__list = document.querySelector(".dropdown__appareils__list")
        let dropdown__ustensiles__list = document.querySelector(".dropdown__ustensiles__list")

        dropdown__ingredients.addEventListener('click', function() {
            dropdown__ingredients__list.classList.toggle("dropdown_open")
        })

        dropdown__appareils.addEventListener('click', function() {
            dropdown__appareils__list.classList.toggle("dropdown_open")
        })

        dropdown__ustensiles.addEventListener('click', function() {
            dropdown__ustensiles__list.classList.toggle("dropdown_open")
        })
    }

    filterCategoriDropdown(categorieName, search) { // à faire

    }

    displayCategorieDropdown(recipes) { // ok en silence étape 2
        //console.log("-------------------------------------------------")
        // console.log("les ingrédients, appareils et ustensiles dans les dropdown")
        // console.log(ingredients, appareils, ustensiles)
        const ingredients = this.getIngredientsFromRecipes(recipes)
        const appareils = this.getAppliancesFromRecipes(recipes)
        const ustensiles = this.getUstensilsFromRecipes(recipes)

        let dropdown__ingredients__list = document.querySelector(".dropdown__ingredients__list")
        let dropdown__appareils__list = document.querySelector(".dropdown__appareils__list")
        let dropdown__ustensiles__list = document.querySelector(".dropdown__ustensiles__list")

        dropdown__ingredients__list.innerHTML = "" //vider le dropdown ingrédient avant de le re-remplir
        dropdown__appareils__list.innerHTML = "" //vider le dropdown appareils avant de le re-remplir
        dropdown__ustensiles__list.innerHTML = "" //vider le dropdown ustensiles avant de le re-remplir

        inputSearchIngredient.setAttribute("placeholder", "Ingrédients");
        inputSearchAppareil.setAttribute("placeholder", "Appareils");
        inputSearchUstensile.setAttribute("placeholder", "Ustensils");

        //je mets les items/tags dans le dropdown de leur catégorie
        function createList(categorie, items) {
            let affichageItem = ``
            items.forEach((item) => {
                affichageItem += `<li class="dropdown__${categorie}__list-item">${item}</li>`;
            })
            if (categorie == "ingredients") {
                dropdown__ingredients__list.innerHTML = affichageItem
            }
            if (categorie == "appareils") {
                dropdown__appareils__list.innerHTML = affichageItem
            }
            if (categorie == "ustensiles") {
                dropdown__ustensiles__list.innerHTML = affichageItem
            }
        }

        createList("ingredients", ingredients);
        createList("appareils", appareils);
        createList("ustensiles", ustensiles);
        //return ingredients, appareils, ustensiles
    }


    getIngredientsFromRecipes(recipes) { //ok // ok en silence étape 3 
        // console.log("-------------------------------------------------")
        // console.log("étape liste des ingredient")
        // créee un tableau avec tous les ingrédients des recettes, doublons supprimés
        const ingredients = [];
        for (let recipe of recipes) {
            for (let ingredient of recipe.ingredients) {
                const ingredientName = firstLetterOfAstringToUpperCase(ingredient.ingredient);
                ingredients.indexOf(ingredientName) === -1 ? ingredients.push(ingredientName) : console.log( /*`${ingredientName} est deja present dans ma liste d'ingredient`+ "doublon"*/ );
            }
        }
        // console.log(ingredients)
        return ingredients
    }

    getAppliancesFromRecipes(recipes) { // ok // ok en silence étape 4
        //  console.log("-------------------------------------------------")
        //  console.log("étape liste des appareils")
        // créee un tableau avec tous les appareils des recettes, doublons supprimés
        const appareils = [];
        for (let recipe of recipes) {
            const applianceName = firstLetterOfAstringToUpperCase(recipe.appliance)
            appareils.indexOf(applianceName) === -1 ? appareils.push(applianceName) : console.log() /*(`${applianceName} en doublon`)*/ ;
        }
        // console.log(appareils)
        return appareils;
    }

    getUstensilsFromRecipes(recipes) { // ok // ok en silence étape 5
        // console.log("-------------------------------------------------")
        // console.log("étape liste des ustensiles")
        // créee un tableau avec tous les ustensiles des recettes, doublons supprimés
        const ustensiles = [];
        for (let recipe of recipes) {
            for (let ustensil of recipe.ustensils) {
                ustensil = firstLetterOfAstringToUpperCase(ustensil)
                ustensiles.indexOf(ustensil) === -1 ? ustensiles.push(ustensil) : console.log( /*`${ustensiles} est deja present dans ma liste d'ingredient`+ "doublon"*/ );
            }
        }
        //  console.log(ustensiles)
        return ustensiles;
    }

    getTagValuesFromRecipes(recipes, ingredients, appareils, ustensiles) { // ok en silence étape 6
        // console.log("-------------------------------------------------")
        //console.log("étape get tag values from recipes")
        //  console.log(recipes)
        //  console.log(ingredients, appareils, ustensiles)
        let dropdown__ingredients__list_item = document.querySelectorAll(".dropdown__ingredients__list-item")
        let dropdown__appareils__list_item = document.querySelectorAll(".dropdown__appareils__list-item")
        let dropdown__ustensiles__list_item = document.querySelectorAll(".dropdown__ustensiles__list-item")

        for (var i = 0; i < dropdown__ingredients__list_item.length; i++) {
            dropdown__ingredients__list_item[i].addEventListener("click", (e) => {
                tag = { 'ingredient': e.target.innerHTML }
                    // console.log(tag)
                console.log("nouveau tag ingrédient")
                recipes2.addtag(tag);
                recipes2.displayTags()
                return tag
            })
        }
        for (var i = 0; i < dropdown__appareils__list_item.length; i++) {
            dropdown__appareils__list_item[i].addEventListener("click", (e) => {
                tag = { 'appareil': e.target.innerHTML }
                    // console.log(tag)
                console.log("nouveau tag appareil")
                recipes2.addtag(tag);
                recipes2.displayTags()
                return tag
            });
        }
        for (var i = 0; i < dropdown__ustensiles__list_item.length; i++) {
            dropdown__ustensiles__list_item[i].addEventListener("click", (e) => {
                tag = { 'ustensile': e.target.innerHTML }
                    // console.log(tag)
                console.log("nouveau tag ustensile")
                recipes2.addtag(tag);
                recipes2.displayTags()
                return tag
            });
        }
    }

    addtag(tag) { // semble ok     // étape 7
        console.log("-------------------------------------------------")
        const key = Object.keys(tag)[0];
        const value = lowerCaseWithoutAccent(Object.values(tag)[0]);
        console.log("clické sur tag " + key + " " + value);
        // console.log(key) //catégorie
        //  console.log(value) //item
        let filteredtags = recipes2.filteredtags
        console.log(filteredtags)
            // console.log(this.filteredRecipes)
            // vérifier les doublons pour l'ajouter au tableau des tags qui filtrent les résultats
        const foundTag = filteredtags.find((currentTag) => {
            console.log(Object.keys(currentTag)[0])
            console.log(Object.values(currentTag)[0])
                // console.log(currentTag)
            if (Object.keys(currentTag)[0] === key && Object.values(currentTag)[0] === value) { // éviter les doublons
                return true
            } else {
                return false
            }
        });
        // console.log(foundTag) // si ok, c'est que c'est un doublon donc on l'ajoute pas au tableau
        //  console.log(!foundTag)
        if (!foundTag) {
            console.log("** ------ AJOUT d'un tag")
            recipes2.filteredtags.push(tag) // je push le tag 
            let filteredtags = recipes2.filteredtags
            console.log("tableau de tags pour filtrer les recettes")
            console.log(filteredtags)
                // là il doit manquer un truc!

            return recipes2.displayRecipes(recipes2.filterByTags(recipes, filteredtags))
        }
    }

    deleteTag(tag) { // ok étape 9 - si delete tag
        console.log("-------------------------------------------------")
        console.log("étape supprime tag dans le bandeau de tags clickés")
        const key = Object.keys(tag)[0];
        const value = Object.values(tag)[0];
        console.log(search)
        if (search) {
            this.filteredRecipes = this.filterByText(recipes, search)
        } //else {
        //  this.filteredRecipes = []
        //}
        const newTagslist = this.filteredtags.filter((currentTag) => {
            if (Object.keys(currentTag)[0] === key && Object.values(currentTag)[0] === value) {
                return false
            } else {
                return true
            }
        })
        this.filteredtags = newTagslist // mettre à jour les tags qui servent de filtre après delete les tags non voulus
        console.log(this.filteredtags)
            // filteredtags = newTagslist
        this.filterByTags(this.data, this.filteredtags)
    }

    displayTags() { // semble ok // ok étape 8
        console.log("-------------------------------------------------")
        console.log("display les tags selectionnés depuis la liste this.filteredtags()")
        console.log(this.filteredtags)
        const tagNames = ['ingredient', 'appareil', 'ustensile'];
        tagNames.forEach((tagName) => {
            const tagContainer = document.querySelector(`.tag_${tagName}`)
            tagContainer.innerHTML = ''
        })

        for (let tag of this.filteredtags) {
            console.log(tag)
            const key = Object.keys(tag)[0]
            const value = Object.values(tag)[0]
                //  console.log(key) // catégorie du tag
                // console.log(value) // nom du tag
            let tag_container = document.querySelector(`.tag_${key}`)
            let li_tag = document.createElement("li");
            li_tag.innerHTML = value;
            li_tag.addEventListener('click', () => {
                this.deleteTag(tag);
                this.displayTags();
                this.displayRecipes(this.filterByTags(this.filterByText(this.data, this.search), this.filteredtags))
            });
            tag_container.appendChild(li_tag);
        }
    }

    filterByTags(recipes, filteredtags) {
        console.log("-------------------------------------------------")
        console.log("étape filtre sur plusieurs tags")
            //console.log(recipes)
        let newFilteredRecipes = recipes
        filteredtags.forEach(tag => {
            // console.log(tag)
            // console.log(recipes) // c'est vide, c'est pour ça que ça marche pas
            newFilteredRecipes = this.filterByTag(newFilteredRecipes, tag) //  
            console.log(" nouveau tableau de recettes en résultat")
            console.log(newFilteredRecipes) // tableau des recettes après filtre du tableau des tags à filtrer
            this.filteredRecipes = newFilteredRecipes
        })
        return newFilteredRecipes;
    }

    filterByTag(recipes, filteredtag) {
        console.log("-------------------------------------------------")
        console.log("étape filtre par 1 tag, peu importe sa catégorie")
        const key = Object.keys(filteredtag)[0]
        const value = lowerCaseWithoutAccent(Object.values(filteredtag)[0])
            //console.log(key) // catégorie
            // console.log(value) // item
        console.log(filteredtag) // tag
        console.log("filteredeRecipes = ")
        if (recipes2.filteredRecipes.length > 0) {
            recipes = recipes2.filteredRecipes
            console.log("un tri avait déjà eu lieu")
        }
        console.log(recipes)
        return recipes.filter(function(recipe) {
            switch (key) {
                case 'ingredient':
                    //console.log("c'est un ingrédient, les recettes qui en contiennent")
                    for (let ingredient of recipe.ingredients) {
                        const ingredientName = lowerCaseWithoutAccent(ingredient.ingredient);
                        // console.log(ingredientName)
                        if ((ingredientName == value) || (ingredientName.includes(value))) {
                            // console.log("trouvé ")
                            console.log(recipes)
                            return true
                        }
                    }
                    return false
                case 'appareil':
                    // console.log("c'est un appareil, les recettes qui l'utilisent")
                    recipe.appliance = lowerCaseWithoutAccent(recipe.appliance)
                    if ((recipe.appliance == value) || (recipe.appliance) == filteredtag.toString() || (recipe.appliance).includes(value)) {
                        // console.log("trouvé ")
                        console.log(recipes)
                        return true
                    }
                    return false;
                case 'ustensile':
                    // console.log("c'est un ustensile, les recettes qui en ont besoin")

                    for (let ustensil of recipe.ustensils) {
                        ustensil = lowerCaseWithoutAccent(ustensil)
                        if ((ustensil == value) || (ustensil.includes(filteredtag.toString())) || (ustensil.includes(value))) {
                            // console.log("trouvé ")
                            console.log(recipes)
                            return true
                        }
                        return false
                    }
                default:
                    return
            }
        })
    }

    filterByText(recipes, search) {
        //console.log(`je filtre les recettes ayant "${search}" dans la description, le nom ou l'un des ingredients `)
        console.log("-------------------------------------------------")
        console.log("étape filtre dans la description, le nom ou l'un des ingredients")
            // console.log(search)

        recipes = recipes.filter(recipe => lowerCaseWithoutAccent(recipe.name).includes(search) || lowerCaseWithoutAccent(recipe.description).includes(search) || hasInRecipe(recipe, search))
        recipes2.filteredRecipes = recipes
        return recipes //.filter(recipe => lowerCaseWithoutAccent(recipe.name).includes(search) || lowerCaseWithoutAccent(recipe.description).includes(search) || hasInRecipe(recipe, search))
    }
}

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