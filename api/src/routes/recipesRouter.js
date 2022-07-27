const { Router } = require('express');
const router = Router();
const {getAllRecipes, getApiIdRecipe, getDbIdRecipe, createRecipe} = require('./recipesFunctions')
//ESTAS SON LAS RUTAS QUE VAN A SER USADAS POR LAS RUTAS DEL INDEX

//GET ALL DIETS ~ GET DIET BY NAME
router.get('', async(req, res)=>{
    const name = req.query.name;
    try {
        if(name){
            const recipesByName = await getAllRecipes(name)
            res.status(200).json(recipesByName)
        }
        else{
            res.status(200).json(await getAllRecipes())
        }
    } catch (error){res.status(404).json('Error: ' + error)
    }
})

//POST DIET
router.post('', async(req, res)=>{
    const {title, healthScore, image, summary, diets, steps, createdinDB } = req.body
    try {
        const newRecipe = await createRecipe(title, healthScore, image, summary, steps, createdinDB, diets)
        res.status(200).json(` ${title} Added! :D`)
    } catch (error) { res.status(404).json('Error: ' + error)}
})

//GET DIET BY ID
router.get('/:id', async (req, res)=>{
    const idRecipe = req.params.id //El Id llega por params
    try {
        if(!isNaN(idRecipe)){
            const apiRecipe = await getApiIdRecipe(idRecipe)
            res.status(200).json(apiRecipe)
        }
        else{
            const dbRecipe = await getDbIdRecipe(idRecipe)
            res.status(200).json(dbRecipe)
        }
    } catch (error) { res.status(404).json('Error: ' + error)}
})



module.exports = router;