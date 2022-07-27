require('dotenv').config();
const { Diet } = require("../db");


//                                                        ~ GET DIETS ~ 
async function getAllDiets(){
    const dietTypes = [
        "gluten free",
        "dairy free",
        "ketogenic",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "paleolithic",
        "primal",
        "fodmap friendly",
        "whole 30",
      ];
      dietTypes.forEach((el)=>{
        Diet.findOrCreate({where: {name: el}})
      })
      const allDiets =  await Diet.findAll({attributes: ["name"]})
      return allDiets;

}




module.exports = {getAllDiets}