const { Router } = require('express');
const router = Router();
const {getAllDiets} = require('./dietsFunctions')

//GET ALL DIETS ROUTER
router.get('', async(req,res)=>{
    try {res.status(200).json(await getAllDiets())}
    catch (error) {res.status(404).json('Error: ',error)}
})


module.exports = router;