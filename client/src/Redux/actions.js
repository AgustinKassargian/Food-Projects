import axios from 'axios';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL'
export const GET_ALL_DIETS = 'GET_ALL_DIETS';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const FILTER_BY_CREATE = 'FILTER_BY_CREATE'
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const ORDER_FILTER = 'ORDER_FILTER';
export const SEARCH_RECIPE = 'SEARCH_RECIPE'
export const CLEAN = "CLEAN"

//                                                        ~ ROUTES ACTIONS ~ 
//GET ALL RECIPES
export const getAllRecipes = ()=>{
    return async function (dispatch){
        const recipes = await axios.get(`http://localhost:3001/recipes`)
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: recipes.data
            }
        )
    }
}

//GET RECIPE DETAIL
export const getRecipeDetail = (id) =>{
    return async function (dispatch){
        const recipeDetail = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: GET_RECIPE_DETAIL,
            payload: recipeDetail.data
        })
    }
}

//GET ALL DIETS
export const getAllDiets = ()=>{
    return async function(dispatch){
       const diets = await axios.get(`http://localhost:3001/diets`)
       return dispatch({
        type: GET_ALL_DIETS,
        payload: diets.data
       })
    }
}
//CREATE RECIPE (POST RECIPE)
export const createRecipe = (recipe) =>{
    try {
        return async function(dispatch){
            return await axios.post(`http://localhost:3001/recipes`, recipe)
        .then((newRecipe)=>{
            dispatch({
                type: CREATE_RECIPE,
                payload: newRecipe.data
            })
        })
        }
    } catch (error) {console.log(error)}
}
//FILTER BY CREATE (CREATED IN API ~ CREATED IN DATABASE)
export const filterByCreate = (payload) =>{
    return function(dispatch){
        return dispatch({
            type: FILTER_BY_CREATE,
            payload
        }
        )
    }
}
//FILTER BY DIETS
export const filterByDiet = (payload) =>{
    return function(dispatch){
        return dispatch({
            type: FILTER_BY_DIET,
            payload
        })
    }
}
//ORDER FILTER
export const orderFilter = (payload) =>{
    return function(dispatch){
        return dispatch({
            type: ORDER_FILTER,
            payload
        })
    }
}
//SEARCH RECIPE
export const searchRecipe = (payload)=>{
    return async function(dispatch){
        try {
            const recipe = await axios.get(`http://localhost:3001/recipes?name=${payload}`)
            return dispatch({
             type: SEARCH_RECIPE,
             payload: recipe.data   
            })
        } catch (error) {console.log(error)}
    }
}
//CLEAN
export const clean = ()=>{
    return{
        type: CLEAN
    }
}