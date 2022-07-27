import React from "react";
import { useState } from "react";
//COMPONENTS
import styles from './Paginated.module.css'

export default function Paginated({recipesPerPage, allRecipes, paginated, currentPage, setCurrentPage}){
    const pageNumber = []
    const [input, setInput] = useState(1)

    for(let i = 1; i<= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i)
    }



    return(
        <nav className={styles.nav}>
            <div style={{display: "flex", flexDirection: "row", textDecoration: "none", justifyContent: 'space-around', width: '50%'}}>
                {
                    pageNumber &&
                    pageNumber.map(number =>(
                        number !== currentPage ?
                        <div  style={{cursor:"pointer"}} className={styles.notSelected} key={number}>
                        <a onClick={() => paginated(number)}>{number}</a>
                        </div> :
                        
                        <div className={styles.actual} key={number}>
                        <a onClick={() => paginated(number)}>{number}</a>
                        </div>  
                    ))
                }
            </div>
        </nav>
    )
}
                    