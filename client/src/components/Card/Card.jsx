import React from "react";

//COMPONENTS
import missing from '../Multimedia/MISSING.jpg'
import styles from './Card.module.css'

export default function Card({title, image, diets}){
    return(
        <div>
            <h3 style={{alignItems: 'baseline', marginTop: "1vh"}}>{title} </h3>
            <h5>{diets.length > 1 ? diets.join(' - ') : diets}</h5>
            <img className={styles.image} src={image? image : missing} alt={title}/>
            {/* <img src={image? image : missing} alt={title} width='100px' height='auto'/> */}
        </div>
    )
}   