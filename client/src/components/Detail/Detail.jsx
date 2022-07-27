//REACT
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
//REDUX
import {useDispatch, useSelector} from 'react-redux';
import { getRecipeDetail, clean } from "../../Redux/actions";
//COMPONENTS
import missing from '../Multimedia/MISSING.jpg';
import banana from '../Multimedia/Banana.gif'
import styles from './Detail.module.css';




export default function Detail(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const recipe = useSelector((state)=> state.recipeDetail)
    useEffect(()=>{
        dispatch(getRecipeDetail(id))
        dispatch(clean())
    },[dispatch, id])

    return(
        <div>
            {
            recipe.title ?
            <div className={styles.landing}>
                <div className={styles.leftSheet}>
                    <h2  className="" style={{marginTop: '4vh', marginLeft: '12%'}}>{recipe.title}</h2>
                    <h3 className={styles.probar}>Diet Types</h3>
                    <h4 className={styles.diets}>
                        {!recipe.createdinDB ?
                            recipe.diets.length > 1 ? recipe.diets.join(' - '): recipe.diets
                            :
                            recipe.diets.length > 1 ?
                             recipe.diets.map(ele => ele.name).join(' - ')
                             :
                             recipe.diets.map(ele => ele.name)
                    }
                    </h4>
                    <h4 className={styles.summaryHeader}>Summary</h4>
                    <div className={styles.summary} dangerouslySetInnerHTML={{__html:`${recipe.summary}`}}/>
                    <Link  to= '/home'>
                            <button style={{cursor:"pointer"}} className={styles.toHome}>Back To Home</button>
                        </Link>
                
                {/* El div hoja izquierda */}
                </div>



                <div className={styles.rightSheet}>
                    <div>
                    <img className={styles.image} src={recipe.image ? recipe.image : missing} alt={recipe.title}/>
                    </div>

                    
                    {!recipe.steps ?
                    <p>This recipe has no steps</p>
                    :
                    <div className={styles.stepsBox}>
                        <h4>Steps</h4>
                        <div>
                            {!recipe.createdinDB ?
                            recipe.steps?.map((e)=>{
                                return <li style={{fontSize: '11.25px'}} key={e}>{e}</li>
                            })
                            :
                            <p>{recipe.steps}</p>
                            }
                        </div>
                    </div>
                }
                    
                </div>{/* el div hoja derecha */}                


            {/* el div del libro */}    
            </div> 
            :
            <div className={styles.loadingBackground}>
                <div className={styles.loadingBook}>
                    <div className={styles.leftLoading}> </div>
                    <div className={styles.rigthLoading}>
                        <img src={banana} alt='bananita'style={{width: '33%', minWidth: '80px', height: 'auto',minHeight: '60px'}}/>
                        <img src={banana} alt='bananita'style={{width: '33%', minWidth: '80px', height: 'auto',minHeight: '60px'}}/>
                        <img src={banana} alt='bananita'style={{width: '33%', minWidth: '80px', height: 'auto',minHeight: '60px'}}/>
                    </div>
                </div>
            </div>
        
        }
        {/*El div mayor*/}
        </div> 
    )}
