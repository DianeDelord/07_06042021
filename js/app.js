let resultOfSearch = document.getElementById("resultOfSearch")
let inputSearch = document.getElementById("inputSearch")

const fetchSearch = async() => {
    recipes = await fetch('recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
        // console.log(recipes)
        // console.log(recipes[1].photo)
}

let affichage = ``
let newRecipe
const searchDisplay = async() => {
    await fetchSearch();
    for (let recipe of recipes) {
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
    }

}

inputSearch.addEventListener('input', (e) => {
    if (e.target.value.length >= 4) {
        // console.log(e.target.value)
        search = e.target.value;
        searchDisplay()
    }
})

/////// affichage de base ///////
const initialDisplay = async() => {
    await fetchSearch();
    for (let recipe of recipes) {
        affichage +=
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
    }
    resultOfSearch.innerHTML = affichage

}
initialDisplay()



//resultOfSearch.innerHTML = meals[0]

// ressources utiles //
//    https://www.youtube.com/watch?v=ETx4QF_k8so
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=24s
// https://www.youtube.com/watch?v=ZCrh59Bvbts
// https://www.youtube.com/watch?v=6BozpmSjk-Y