//REACT
import './App.css';
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
//COMPONENTS
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail'
import CreateRecipe from './components/CreateRecipe/CreateRecipe';



function App() {
  return (
    <div className='App'>
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/recipe/:id' element={<Detail/>}/>
          <Route path='/add-your-recipe' element={<CreateRecipe/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
