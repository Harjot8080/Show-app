import React from 'react';
import Home from './Components/Home/Home';
import { Routes,Route, NavLink} from "react-router-dom";
import "./App.css";
import ShowSum from './Components/Summary/ShowSum';

const App=()=> {
  return (
    <>
     <header class="header">
    <NavLink to="/" style={{textDecoration : "none" , color : "#457fb4"}} >
    <div class="header__logo">ShowApp</div>
    </NavLink>
    <div class="header__buttons">
      <button class="header__button">Home</button>
      <button class="header__button">Movie</button>
    </div>
    </header>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="Show/:id" element={<ShowSum/>}/>
     </Routes>
    </>
  );
}

export default App;
