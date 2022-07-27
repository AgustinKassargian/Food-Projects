//REACT
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, orderFilter, clean, filterByCreate, filterByDiet } from "../../Redux/actions";

//FUNCTIONS
import { handleClickRefresh, handleCreateFilter, handleDietFilter, handleOrderFilter } from "./functions";

//COMPONENTS
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../NavBar/SearchBar";
import missing from '../Multimedia/MISSING.jpg';
import gatito from '../Multimedia/GATITO.gif'
import pizza from '../Multimedia/Pizza.gif'
import banana from '../Multimedia/Banana.gif'

//CSS
import styles from './Home.module.css'


export default function Home(){

const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(clean())
        dispatch(getAllRecipes())
    },[dispatch])
    
    const allRecipes = useSelector((state) =>state.recipes);
    const notFound = useSelector((state) => state.notFound);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(8);
    const indexLastRecipe = currentPage * recipesPerPage;
    const indexFirstRecipe = indexLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe)
    const [order, setOrder] = useState("")
    const [prueba, setPrueba] =useState(1)

    const paginated = (pageNumber)=>{
        setCurrentPage(pageNumber)
        setPrueba(prueba+1)
    }
    
    function handleOrderFilter(e) {
        paginated()
        dispatch(orderFilter(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
      }

      


    return( 
        <div className={styles.fondo}>  
            {allRecipes.length  > 0 ?
                <>
                <div className={styles.title}>
                <Link to='/add-your-recipe' style={{marginTop:"1%", marginBottom: '1%'}} >
                    <button  className={styles.buttonTitle} style={{cursor:"pointer", fontStyle: 'bold', fontSize: "14px", height: '80%', width: '130%'}}>
                    Add your own Recipe!
                    </button>
                    </Link>
                <h1 className={styles.buttonTitle}>My Foods App</h1>
                <Link to='/' style={{marginTop:"1%", marginBottom: '1%'}}>
                 <button className={styles.buttonTitle} style={{ cursor:"pointer", fontStyle: 'bold',fontSize: "14px", height: '80%', width: '130%'}}>About Me</button>
                </Link>
                </div>
                <div className={styles.navBar}>
                    <button className={styles.buttonTitle} style={{cursor:"pointer"}} onClick={e => {handleClickRefresh(e, dispatch)}}>
                     Refresh Recipes
                    </button>
                    {/* Order Filter */}
                    <select className={styles.buttonTitle} onClick={e=>{handleOrderFilter(e, dispatch)}}>
                        <option value='asc'>A-Z</option>
                        <option value='des'>Z-A</option>
                        <option value='high'>Higher HealthScore</option>
                        <option value='low'>Lower HealthScore</option>
                    </select>
                    {/* Source Filter */}
                    <select className={styles.buttonTitle} onChange={e=>{handleCreateFilter(e, dispatch)}}>
                        <option value='all'>All</option>
                        <option value='api'>Spoonacular</option>
                        <option value='db'>Database</option>
                    </select>
                    {/* Diet Filter */}
                    <select className={styles.buttonTitle} onChange={e=>{handleDietFilter(e, dispatch)}}>
                        <option value='all'>All Diets</option>
                        <option value='dairy free'>Dairy Free</option>
                        <option value='fodmap friendly'>Fodmap Friendly</option>
                        <option value='gluten free'>Gluten Free</option>
                        <option value='ketogenic'>Ketogenic</option>
                        <option value='lacto ovo vegetarian'>Lacto Ovo Vegetarian</option>
                        <option value='paleolithic'>Paleolithic</option>
                        <option value='pescatarian'>Pescatarian</option>
                        <option value='primal'>Primal</option>
                        <option value='vegan'>Vegan</option>
                        <option value='whole 30'>Whole 30</option>
                    </select>   
                    <NavBar className={styles.buttonTitle}/>
                </div>
            <div className={styles.cardbox}>
                {currentRecipes.map((el) =>(
                    <Link  className={styles.card} key={el.id} to = {`/recipe/${el.id}`}>
                        <Card key={el.id} title={el.title} diets={!el.createdinDB ? el.diets : el.diets.map(ele => ele.name)} image={el.image}/>
                        
                        </Link>
                ))}

            </div>
            <div className={styles.pages}>Pages</div>
            <Paginated
                    style={{cursor:"pointer"}}
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginated={paginated}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />
            </>
            :
            notFound?
                (<div className={styles.notFoundBackground}>
                    <div className={styles.notFoundBook}>
                        <div className={styles.notFoundLeftSheet}>
                                <h1>Recipe Not Found</h1>
                                <img src={gatito} alt='gatito' style={{width:" 90%", height: 'auto'}}/>
                                <button  className={styles.notFoundButton} onClick={e=>{dispatch(getAllRecipes())}}> Back to Home </button>
                        </div>
                        <div className={styles.notFoundRightSheet}></div>
                    </div>
                </div>)    
            :
                (<div className={styles.loading}>
                    <div className={styles.book}>
                        <div className={styles.leftLoading}></div>
                        <div className={styles.rigthLoading}>
                            <img src={banana} alt='gatito' style={{width: '33%', minWidth: '80px', height: 'auto',minHeight: '60px'}}/>
                            <img src={banana} alt='gatito' style={{width: '33%', minWidth: '80px', height: 'auto',minHeight: '60px'}}/>
                            <img src={banana} alt='gatito' style={{width: '33%', minWidth: '80px', height: 'auto',minHeight: '60px'}}/>
                        </div>
                    </div>
                </div>)

            
            }
        </div>
    )



}