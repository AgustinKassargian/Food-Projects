import { getAllRecipes, filterByCreate, filterByDiet, orderFilter } from "../../Redux/actions";

//BOTON REFRESH
export function handleClickRefresh(e, dispatch){
    e.preventDefault();
    dispatch(getAllRecipes())
}
//SOURCE FILTER
export function handleCreateFilter(e, dispatch){
    e.preventDefault();
    dispatch(filterByCreate(e.target.value));
}
//DIET FILTER
export function handleDietFilter(e, dispatch){
    e.preventDefault();
    dispatch(filterByDiet(e.target.value))
}
//ORDER FILTER
// export function handleOrderFilter(e, dispatch) {
//     e.preventDefault();
//     dispatch(orderFilter(e.target.value));
//     setOrder(`Ordered ${e.target.value}`);
//   }
