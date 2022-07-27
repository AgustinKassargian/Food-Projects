import React, {useState} from 'react';
import { useDispatch} from 'react-redux';
import { searchRecipe } from '../../Redux/actions';

//COMPOENENTS
import styles from './SearchBar.module.css'



export default function SearchBar({}){
    const dispatch = useDispatch()
    const [recipe, setRecipe] = useState('');

    function handleInputText(e){
        setRecipe(e.target.value)
    }

    function handleButtonSubmit(e){
        dispatch(searchRecipe(recipe))
        setRecipe('')
        /* setCurrentPage(1) */
    }

    return(
        <div>
            <input
            className={styles.searchBar}
            type= 'text'
            value={recipe}
            placeholder= 'Search a recipe...'
            onChange={(e)=>handleInputText(e)}
            />
            <button style={{cursor:"pointer"}} className={styles.searchBar} type='submit' onClick={(e)=>handleButtonSubmit(e)}>Search</button>
        </div>
    )




}