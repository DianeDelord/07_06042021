let resultOfSearch = document.getElementById("resultOfSearch")
let inputSearch = document.getElementById("inputSearch")

const fetchSearch = async() => {
    recipes = await fetch('recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
    console.log(recipes)
    console.log(returnName(recipes[1].name))
}

var createEachCard
class CardRecipe {
    constructor(appliance, description, id, ingredients, name, servings, time, ustensils) {
        this.appliance = appliance;
        this.description = description;
        this.id = id;
        this.ingredients = ingredients;
        this.name = name;
        this.servings = servings;
        this.time = time;
        this.ustensils = ustensils;
    }

    get createTheCard() {
        return this.createCard()
    }
    createCard() {
        createEachCard = `<a href="./photographer.html?id=` + this.id + `" id="` + this.id + `" class="restrict" aria-label="` + this.name + `"> 
        <li class="photographers-items"> <section> <img class="photographer-portrait" alt="${this.name}" src="images/Sample Photos/Photographers ID Photos/${this.portrait}">
       </section> <section> <h2 class="photographer-name">${this.name}</h2> <p class="photographer-city">${this.city}, ${this.country}</p> <p class="tagline">${this.tagline}</p>
    <p class="photographerPrice">${this.price}€/jour</p> <div class="photographer_listOfTags">`;
        // boucle pour récupérer un à un les tags du photographe vu que le nombre de tags varie d'un photographe à l'autre
        this.ingredients.forEach((element) => {
            createEachCard +=
                `<h5 class="generatedTags" title="ce photographe est spécialisé dans les photos sur le thème ${element}" >#${element}</h5>`;
        });
        this.ustensils.forEach((element) => {
            createEachCard +=
                `<h5 class="generatedTags" title="ce photographe est spécialisé dans les photos sur le thème ${element}" >#${element}</h5>`;
        });
        createEachCard += `</div> </section> </li> </a>`;
        return createEachCard
    }
}


const searchDisplay = async() => {
    await fetchSearch();
    if (recipes == null) {
        resultOfSearch.innerHTML = "Aucune recette ne correspond à votre recherche :,("
    } else {
        resultOfSearch.innerHTML = (
            recipes.map(recipe => (
                `<div class="recipe_card_container">
                <img src="/images/${returnName(recipe.name)}" class="recipe_img">
                <div class="recipe_title_infos"><h2 class="recipe_name">${recipe.name}</h2>
                <p>${recipe.time}</p><em class="far fa-clock"></em></div>
                <div class="recipe_ingredients"><p>${recipe.ingredients}</p></div>
                </div>`
            )).join(''));
    }
}
fetchSearch()

inputSearch.addEventListener('input', (e) => {
    if (e.target.value.length >= 3) {
        console.log(e.target.value)
        search = e.target.value;
        searchDisplay()
    }
})

function returnName(name) {
    return name.toLowerCase().replaceAll(" ", "_").replaceAll("à", "a").replaceAll("é", "e").replaceAll("è", "e").replaceAll("ê", "e").replaceAll(",", "").replaceAll("â", "a").replaceAll("'", "_") + (".jpeg")
}

//resultOfSearch.innerHTML = meals[0]

// ressources utiles //
//    https://www.youtube.com/watch?v=ETx4QF_k8so
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=24s
// https://www.youtube.com/watch?v=ZCrh59Bvbts
// https://www.youtube.com/watch?v=6BozpmSjk-Y