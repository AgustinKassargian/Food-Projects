import React, {useState} from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";


export default function NavBar({onSearch}){
    return(
        <nav>
            <SearchBar /* setCurrentPage={setCurrentPage} */ onSearch={onSearch}/>
        </nav>
    )
}