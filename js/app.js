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

//recherche tapée dans l'input global
inputSearch.addEventListener('keyup', (e) => {
    const filterdRecipesByTags = recipes2.filterByTags(recipes2.data,recipes2.filteringTags)
        search = e.target.value.length > 2 ? e.target.value : ''
        recipes2.displayRecipes(recipes2.filterByText(filterdRecipesByTags, search))
})

//input recherche du dropdown ingrédients
inputSearchIngredient.addEventListener('keyup', (e) => {
   
    if (e.target.value.length > 2) {
        console.log("recherche input ingrédient")
        searchTag = e.target.value
        recipes2.updatelistDropdownBytag('ingredient',searchTag)
    }  
   
})

//input recherche du dropdown appareils
inputSearchAppareil.addEventListener('keyup', (e) => {
    if (e.target.value.length > 2) {
        console.log("recherche input appareil")
        searchtag = e.target.value;
        recipes2.updatelistDropdownBytag('appareil',searchTag)
    }
})

//input recherche du dropdown ustensiles
inputSearchUstensile.addEventListener('keyup', (e) => {
    if (e.target.value.length > 2) {
        console.log("recherche input ustensile")
        searchtag = e.target.value;
        recipes2.updatelistDropdownBytag('ustensile',searchTag)
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

///////////////// algo recursif
class Recipes2 {
    filteringTags = []
    data = []


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
        this.setDropdowns()
        this.displayRecipes(recipes)
    }

    displayRecipes(recipes) { // ok
        console.log("parée pour l'affichage")
            //console.log(recipes)
            /////// affichage des recettes - SOIT recettes de base SOIT recettes déjà filtrées ///////
        resultOfSearch.innerHTML = "" // réinitialiser l'affichage sinon ça ajoute les cartes recettes à la suite du display non filtré
        if (recipes.length == 0) {
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
        this.updateListDropdown(recipes)
        // this.displayRecipes(recipes)
        //this.displayDropdownUstensiles(ustensiles)(recipes, search)
        return recipes
    }

    updatelistDropdownBytag(tagName,search){
        
        let dropdown__list = document.querySelector(`.dropdown__${tagName}s__list`)
        const newList = dropdown__list.innerHTML.filter((li_element)=>!li_element.innerHTML.inclused(search))
        dropdown__list.innerHTML ='' 
        dropdown__list = newList;
    }

    updateListDropdown(recipes) {
        
        const ingredients =  this.getIngredientsFromRecipes(recipes)    
        const ustensiles = this.getUstensilsFromRecipes(recipes)
        const appareils = this.getAppliancesFromRecipes(recipes)
        
        console.log("-------------------------------------------------")
        console.log("les ingrédients, appareils et ustensiles dans les dropdown")

        // dropdown pour y mettre la liste des ingredients, appareils, ustensiles 
        let dropdown__ingredients__list = document.querySelector(".dropdown__ingredients__list")
        let dropdown__appareils__list = document.querySelector(".dropdown__appareils__list")
        let dropdown__ustensiles__list = document.querySelector(".dropdown__ustensiles__list")
        dropdown__ingredients__list.innerHTML = "" //vider le dropdown ingrédient avant de le re-remplir
        dropdown__appareils__list.innerHTML = "" //vider le dropdown appareils avant de le re-remplir
        dropdown__ustensiles__list.innerHTML = "" //vider le dropdown ustensiles avant de le re-remplir
            // problème : si l'utilisateur efface sa saisie, les tags ne se remettent pas
        inputSearchIngredient.setAttribute("placeholder", "Ingrédients");
        inputSearchAppareil.setAttribute("placeholder", "Appareils");
        inputSearchUstensile.setAttribute("placeholder", "Ustensils");


        //je mets les éléments dans le dropdown de leur catégorie
        //est-ce que ça peut devenir une méthode dispatche les tag par catégorie? j'ai essayé mais pas réussi
        for (let ingredient of ingredients) {
            let liIngredient = document.createElement("li");
            liIngredient.setAttribute("class", "dropdown__ingredients__list-item");
            liIngredient.innerHTML = ingredient;
            dropdown__ingredients__list.appendChild(liIngredient)
            liIngredient.addEventListener('click',()=>{ // l'élément tag est supprimé du dropdown pour aller dans le bandeau des tags
                this.addtag({ingredient})
                this.displayTags();
                this.displayRecipes(this.filterByTags(this.data,this.filteringTags));
            })
        }
        for (let appareil of appareils) {
            let liAppareil = document.createElement("li");
            liAppareil.setAttribute("class", "dropdown__appareils__list-item");
            liAppareil.innerHTML = appareil;
            dropdown__appareils__list.appendChild(liAppareil)
            liAppareil.addEventListener('click', ()=>{ // l'élément tag est supprimé du dropdown pour aller dans le bandeau des tags
                this.addtag({appareil})
                this.displayTags();
                this.displayRecipes(this.filterByTags(this.data,this.filteringTags));
            })
        }
        for (let ustensile of ustensiles) {
            let liUstensil = document.createElement("li");
            liUstensil.setAttribute("class", "dropdown__ustensiles__list-item");
            liUstensil.innerHTML = ustensile;
            dropdown__ustensiles__list.appendChild(liUstensil)
            liUstensil.addEventListener('click', ()=> {
                this.addtag({ustensile})
                this.displayTags();
                this.displayRecipes(this.filterByTags(this.data,this.filteringTags));
        // l'élément tag est supprimé du dropdown pour aller dans le bandeau des tags
            })
        }

    }
    setDropdowns(){
        // dropdown pour y mettre la liste des ingredients, appareils, ustensiles 
        let dropdown__ingredients__list = document.querySelector(".dropdown__ingredients__list")
        let dropdown__appareils__list = document.querySelector(".dropdown__appareils__list")
        let dropdown__ustensiles__list = document.querySelector(".dropdown__ustensiles__list")

        dropdown__ingredients_box.addEventListener('click', function() { // dropdown__${catégorie}_box
            dropdown__ingredients__list.classList.toggle("dropdown_open")
            dropdown__appareils__list.classList.remove("dropdown_open")
            dropdown__ustensiles__list.classList.remove("dropdown_open")
            inputSearchIngredient.removeAttribute("placeholder", "Ingrédients");
            inputSearchIngredient.setAttribute("placeholder", "Rechercher un ingrédient");
            inputSearchAppareil.removeAttribute("placeholder", "Rechercher un appareil");
            inputSearchAppareil.setAttribute("placeholder", "Appareil");
            inputSearchUstensile.removeAttribute("placeholder", "Rechercher un ustensile");
            inputSearchUstensile.setAttribute("placeholder", "Ustensile");
            return
        })

        dropdown__appareils_box.addEventListener('click', function() { // dropdown__${catégorie}_box
            dropdown__appareils__list.classList.toggle("dropdown_open")
            dropdown__ingredients__list.classList.remove("dropdown_open")
            inputSearchIngredient.removeAttribute("placeholder", "Rechercher un ingrédient");
            inputSearchIngredient.setAttribute("placeholder", "Ingrédients");
            dropdown__ustensiles__list.classList.remove("dropdown_open")
            inputSearchAppareil.setAttribute("placeholder", "Rechercher un appareil");
            inputSearchUstensile.removeAttribute("placeholder", "Rechercher un ustensile");
            inputSearchUstensile.setAttribute("placeholder", "Ustensile");
            return
        })

        dropdown__ustensiles_box.addEventListener('click', function() { // dropdown__${catégorie}_box
            dropdown__ustensiles__list.classList.toggle("dropdown_open")
            dropdown__ingredients__list.classList.remove("dropdown_open")
            dropdown__appareils__list.classList.remove("dropdown_open")
            inputSearchUstensile.setAttribute("placeholder", "Rechercher un ustensile");
            inputSearchIngredient.removeAttribute("placeholder", "Rechercher un ingrédient");
            inputSearchIngredient.setAttribute("placeholder", "Ingrédients");
            inputSearchAppareil.removeAttribute("placeholder", "Rechercher un appareil");
            inputSearchAppareil.setAttribute("placeholder", "Appareil");
            return
        })

    }
    

    getAppliancesFromRecipes(recipes){
        const appliances = [];
        for (let recipe of recipes) {
            const applianceName = recipe.appliance
            appliances.indexOf(applianceName) === -1 ? appliances.push(applianceName) : console.log(`${applianceName} en doublon`);
        }
        return appliances;
    }

    addtag(tag){
        // ajoute un tag dans la liste des tags 
        this.filteringTags = [...this.filteringTags,tag]
    }

    deleteTag(tag){
        //retire  le tag de la liste des tag 
        const key = Object.keys(tag)[0]
        const value = Object.values(tag)[0]
        this.filteringTags  = this.filteringTags.filter((tag)=> tag[key] !== value) 
    }

    displayTags(){
        const containers = ['ingredient','appareil','ustensile'].reduce((accu,tagName)=>{
            const tagContainer = document.querySelector(`.tag_${tagName}`)
            tagContainer.innerHTML =''
            accu[tagName] = tagContainer;
            return accu 
        },{})
        if (this.filteringTags.length)
        {
            this.filteringTags.forEach((tag)=>{
                const key = Object.keys(tag)[0]
                const value = Object.values(tag)[0]
                let li_tag = document.createElement("li");
                li_tag.innerHTML =value;
                li_tag.addEventListener('click', ()=> {
                    this.deleteTag(tag);
                    this.displayTags();
                    this.displayRecipes(this.filterByTags(this.data,this.filteringTags));
            // l'élément tag est supprimé du dropdown pour aller dans le bandeau des tags
                })
                containers[key].appendChild(li_tag)
            })
        }
        
        // display les differents tags selectionnées dans leur container respectif depuis la liste this.filteredTa        
    }

    getUstensilsFromRecipes(recipes){
        const ustensils = [];
        for (let recipe of recipes) {
            for (let ustensil of recipe.ustensils) {
                ustensils.indexOf(ustensil) === -1 ? ustensils.push(ustensil) : console.log( /*`${ingredientName} est deja present dans ma liste d'ingredient`+*/ "doublon");
            }
        }
        return ustensils;
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
       
        return ingredients
    }

    getTagValuesFromRecipes(recipes, tag) {
        console.log("-------------------------------------------------")
        console.log("étape get tag values from recipes")
        console.log("filtre depuis les input catégorie dans les dropdown")

        switch (tag) {
            case 'ingrédient':
                // cas recherche dans les ingrédients
                return this.getIngredientsFromRecipes(recipes)
            case 'appareil':
                // cas recherche dans les appareils
               return this.getAppliancesFromRecipes(recipes)

            case 'ustensile':
                // cas recherche dans les ustensiles
               return this.getUstensilsFromRecipes(recipes)
        }

    }

    filterByTags(recipes,tagsToFilterRecipes) { // depuis les dropdown?
        console.log("-------------------------------------------------")
        console.log("étape filtre au click sur un ou plusieurs tags")
        let filteredRecipes = recipes;
        tagsToFilterRecipes.forEach(tag=>{
            const newFilteredecipes = this.filterByTag(filteredRecipes,tag)
            filteredRecipes = newFilteredecipes;
        })

        return filteredRecipes;
    }

   

    filterByTag(recipes, tag) {
        console.log("-------------------------------------------------")
        console.log("étape filtre de tag par type")
            // console.log(tag)
    

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
                case 'appareil':
                    return recipe.appliance === value;
                case 'ustensile':
                    return recipe.ustensils.includes(value)
                default:
                    return true;
            }
        })
        return recipes 

        ///// ATTENTION, si y'a des doublons de recette already exists? /////////
        //// grâce à l'id? ///////
    }

    filterByText(recipes, search) {
        //console.log(`je filtre les recettes ayant "${search}" dans la description, le nom ou l'un des ingredients `)
        console.log("-------------------------------------------------")
        console.log("étape filtre dans tout")
        recipes = recipes.filter(recipe => lowerCaseWithoutAccent(recipe.name).includes(search) || lowerCaseWithoutAccent(recipe.description).includes(search) || hasInRecipe(recipe, search))
      
        this.getIngredientsFromRecipes(recipes)
        return recipes
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