require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

//5b6faadb8b3540b6a7f759300437e254
//
//https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true


//                                                        ~ GET RECIPES ~ 
async function getApiRecipes() {
    const allApiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const apiRecipes = allApiRecipes.data.results.map((el) => {
      return {
        id: el.id,
        title: el.title,
        healthScore: el.healthScore,
        image: el.image,
        summary: el.summary,
        steps:
          el.analyzedInstructions[0] &&
          el.analyzedInstructions[0].steps.map((el) => el.step),
        diets: el.diets,
      };
    });
    return apiRecipes;
}

async function getdbRecipes() {
    const dbRecipes = await Recipe.findAll({
      include: { model: Diet, attributes: ["name"] },
    });
    return dbRecipes;
}

async function getAllRecipes(name) {
    const api = await getApiRecipes();
    const db= await getdbRecipes();
    const allRecipes = await api.concat(db)
    if(!name){
      return allRecipes.sort(function(a, b){
        if(a.title > b.title) return 1;
        if(b.title > a.title) return -1;
        return 0;
      })
    }
    let recipesByName = await allRecipes.filter(el => el.title.toLowerCase().includes(name.toLowerCase()))
    return recipesByName.sort(function(a, b){
      if(a.title > b.title) return 1;
      if(b.title > a.title) return -1;
      return 0;
  })

}



//                                                        ~ GET RECIPE BY ID ~ 
async function getApiIdRecipe(id){
  const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
  const recipe = 
         {
          id: apiInfo.data.id,
          title: apiInfo.data.title,
          healthScore: apiInfo.data.healthScore,
          image: apiInfo.data.image,
          summary: apiInfo.data.summary,
          steps:
            apiInfo.data.analyzedInstructions[0] &&
            apiInfo.data.analyzedInstructions[0].steps.map((el) => el.step),
          diets: apiInfo.data.diets,
      }

  return recipe;
}

async function getDbIdRecipe(id){
  const dbRecipe = Recipe.findOne({
    where: {id: id},
    include:{model: Diet,
      attributes: ["name"]}
  });

  return dbRecipe
}

//                                                        ~ POST RECIPE ~ 
async function createRecipe(title, healthScore, image, summary, steps, createdinDB, diets){
  const newRecipe = await Recipe.create({title, healthScore, image, summary, steps, createdinDB})
  
  diets?.map(async (el)=>{
    const mapeo = await Diet.findAll({
      where: {name: el}
    })
    newRecipe.addDiets(mapeo)
  })
  // const dbDiets = await Diet.findAll({
  //   where: {name: diets}
  // })
  
  // const mapDiets = dbDiets.map((d)=>{d.name})
  // newRecipe.addDiets(mapDiets)
}

//MODULE EXPORTS
module.exports = {
  getAllRecipes,
  getApiIdRecipe,
  getDbIdRecipe,
  createRecipe
};
