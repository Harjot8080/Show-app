import React from 'react';
import Home from './Components/Home/Home';
import { Routes,Route} from "react-router-dom";
import "./App.css";
import ShowSum from './Components/Summary/ShowSum';

const App=()=> {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="Show/:id" element={<ShowSum/>}/>
     </Routes>



    </>
  );
}

export default App;
