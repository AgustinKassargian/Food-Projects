//REACT
import React from "react";
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
//REDUX
import {useDispatch, useSelector} from 'react-redux';
import { getAllDiets, createRecipe } from "../../Redux/actions";
//COMPONENTES
import styles from './CreateRecipe.module.css';
import banana from '../Multimedia/Banana.gif';
import missing from '../Multimedia/MISSING.jpg';

function validate(input){
    let errors = {};
    if(!input.title) errors.title = 'Title is required';
    if(!input.healthScore) errors.healthScore = 'Health Score is required';
    if((input.healthScore && input.healthScore < 1) || input.healthScore > 100) errors.healthScore = 'HealthScore must be a number between 1 & 100';

    if(!input.diets || input.diets.length < 1) errors.diets = 'At least one Diet Type is required'
    if(!input.summary) errors.summary = 'Summary is required';

    return errors
}

export default function CreateRecipe(){
    const dispatch = useDispatch()
    useEffect(()=>{dispatch(getAllDiets())}, [dispatch])

    const diets = useSelector((state)=>state.diets)
    
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        title:'',
        healthScore: 0,
        image: '',
        summary: '',
        steps: "",
        diets: []

    })
    function handleSubmit(e){
        e.preventDefault()
        setError(validate(input))
        let error = validate(input)
        if(Object.values(error).length !== 0){
            alert('Failed to create your recipe')
        }
        else{
            dispatch(createRecipe(input))
            setInput({
                title: '',
                healthScore: 0,
                image: '',
                summary: '',
                steps: "",
                diets: []
                })
            alert('Recipe Added Succesfully :D')    
        }
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    function handleSelect(e){
        if(!input.diets.includes(e.target.value)){
        setInput({
            ...input,
            [e.target.name]: [...input[e.target.name], e.target.value]
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
        else{
            return alert('Cannot add the same Diet Type twice')
        }
    }
    function handleDeleteDiets(el){
        setInput({
          ...input,
          diets: input.diets.filter(g => g !== el)
        })
      }



    return(
        <div>
            {diets.length > 0 ?
            <div className={styles.back}>
                <div className={styles.book}>
                    <div className={styles.leftSheet}>
                    <h1 style={{marginLeft: "4%"}}>Add your own Recipe!</h1>
                    <form style={{marginLeft: "5%"}} onSubmit={(e)=>handleSubmit(e)}>
                        <br/>
                        <label>Title: </label>
                        <input  className={styles.inputs} type='text' name='title' value={input.title} placeholder='Title...' onChange={(e)=>handleChange(e)}/>
                        <br/>
                        <label> Health Score: </label>
                        <input  className={styles.inputs}type='number' name='healthScore' value={input.healthScore} placeholder='Betweenn 1 & 100' onChange={(e)=>handleChange(e)}/>
                        <br/>
                        <label>Summary: </label>
                        <input className={styles.inputs} type='text' name='summary' value={input.summary} placeholder='Summary...' onChange={(e)=>handleChange(e)}/>
                        <br/>
                        <label> Diet Types: </label>
                        <select className={styles.inputs} name="diets" placeholder="Select Diet Types" onChange={handleSelect}>
                        {diets?.map((el)=>{
                            return(
                                <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            })}
                        </select>
                        <br/>
                        <label>Steps: </label>
                        <input className={styles.inputs} type='text' name='steps' value={input.steps} placeholder='Steps...' onChange={handleChange}/>
                        <br/>
                        <label> Image: </label>
                        <input className={styles.inputs} type='text' name='image' value={input.image} placeholder='URL Image Addres' onChange={(e)=>handleChange(e)}/>
                        <div className={styles.previewImageBox}>
                            <img className={styles.previewImage} src={input.image ? input.image : missing}/>
                        </div>
                        <br/>
                    <div className={styles.buttonBox}>
                        <Link to='/home'>
                            <button className={styles.button}>Back to home</button>
                        </Link>
                            <button className={styles.button} disabled={!error} type="submit">Add Recipes</button>
                        
                    </div>    
                    </form>
                        <br/>
                        <br/>    
                </div>
            <div className={styles.rightSheet}>
                <h1> This is Your Recipe</h1>
                <label>Title</label>
                <label> {error.title ? error.title : input.title}</label>
                {/* <label>{input.title.length > 0 ? input.title : error.title}</label> */}
                <label>Health Score</label>
                <label>{error.healthScore ? error.healthScore : input.healthScore}</label>
                <label>Summary </label>
                <div className={styles.summaryBox}>{input.summary.length > 0 ? input.summary : error.summary}</div>
                <label>Diet Types</label>
                <div className={styles.dietsBox}>
                    {input.diets.length > 0?
                        input.diets .map((el)=>{
                            return(
                                <div key={el.id}>
                                    <p>{el}</p> 
                                    <button name={el} type='button' onClick={()=>handleDeleteDiets(el)}>X</button>
                                </div>
                            )
                        })
                    :
                    <label>{error.diets}</label>
                    }
                    {/* dietbox div */}
                </div>
                {/* rightSheet box */}
                </div> 
                {/* book box div */}
                </div>
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
        </div>
    )

}