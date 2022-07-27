import { GET_ALL_RECIPES , GET_ALL_DIETS, GET_RECIPE_DETAIL, CREATE_RECIPE, FILTER_BY_CREATE, FILTER_BY_DIET, ORDER_FILTER, SEARCH_RECIPE, CLEAN} from './actions'
import axios from 'axios'
const initialState={
    allRecipes: [], //ESTE BI SE INMUTA
    recipes: [], // ESTE SE RENDERIZA
    allDiets: [],
    diets:[],
    apiRecipes: [],
    dbRecipes:[],
    recipeDetail: {},
    newRecipes: [],
    notFound: false
}   

function rootReducer (state = initialState, action){
    const all = state.allRecipes
    const recipes = state.recipes

    switch (action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state,
                allRecipes: action.payload,
                recipes: action.payload,
                apiRecipes: action.payload.filter(el => !el.createdinDB),
                dbRecipes: action.payload.filter(el =>el.createdinDB),
                notFound: false
            }
        
        case GET_ALL_DIETS:
            return{
                ...state,
                diets: action.payload
            }    
    
        case GET_RECIPE_DETAIL:
            return{
                ...state,
                recipeDetail: action.payload
            }
        
        case CREATE_RECIPE:
            return{
                ...state,
                newRecipes: action.payload
            }    
        
        case FILTER_BY_CREATE:
               const api = state.apiRecipes;
               const db = state.dbRecipes;
            if(action.payload === 'api'){
                return {
                    ...state,
                    recipes: api
                }
            }
            if(action.payload === 'db'){
                return{
                    ...state,
                    recipes:db
                }
            }
            if(action.payload === 'all'){
                return{
                    ...state,
                    recipes:all
                }
            }
        case FILTER_BY_DIET:
            const recipesByDiet = action.payload === 'all' ? all : all.filter( el => el.diets.includes(action.payload))
            return{
                ...state,
                recipes: recipesByDiet
            }
        
        
        
        
            case ORDER_FILTER:
                const initialOrder = state.recipes

                const low = initialOrder.slice().sort(function(a,b){
                    if(a.healthScore > b.healthScore) return 1;
                    if(b.healthScore > a.healthScore) return -1
                    return 0;
                })
                const high = low.slice().reverse()
                
                if(action.payload ==='asc2'){
                    const order = recipes.slice().sort(function(a,b){
                        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                        if(b.title.toLowerCase() > a.title.toLowerCase()) return -1;
                        return 0
                    })
                    return{
                        ...state,
                        recipes: order
                    }
                }
                
                if(action.payload ==='asc'){
                    const order = recipes.slice().sort(function(a,b){
                        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                        if(b.title.toLowerCase() > a.title.toLowerCase()) return -1;
                        return 0
                    })
                    return{
                        ...state,
                        recipes: order
                    }
                }
                if(action.payload === 'des'){
                    const order = recipes.slice().sort(function(a,b){
                        if(a.title.toLowerCase() > b.title.toLowerCase()) return -1;
                        if(b.title.toLowerCase() > a.title.toLowerCase()) return 1;
                        return 0
                    })
                    return{
                        ...state,
                        recipes: order
                    }
                }
                if(action.payload === 'high'){
                    return{
                        ...state,
                        recipes: high
                    }
                }
                if(action.payload ==='low'){
                    return{
                        ...state,
                        recipes: low
                    }
                }
            
            case SEARCH_RECIPE:
                
                console.log('VOY A ENTRAR AL IF CON ESTE PAYLOAD: ', action.payload.length)
                if(action.payload.length === 0){
                    console.log('ENTRE AL IF')
                    return{
                        ...state,
                        notFound: true,
                        recipes: []
                    }

                }
                return{
                    ...state,
                    recipes: action.payload
                }
            case CLEAN:
                return{
                    ...state,
                    recipes: [],
                    recipeDetail: {}
                }           
        default:
            return state;
        } 

}

export default rootReducer;