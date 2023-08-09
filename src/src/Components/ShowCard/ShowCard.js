import React,{useContext} from 'react'
import { AppContext } from '../../Context';
import logo from './no.png'
import { NavLink } from 'react-router-dom';


const ShowCard = () => {
  const {ShowData} = useContext(AppContext);
  return (
    <>

    <section className='show-section'>
    
    
      <div className=" container grid grid-4-col">
      <div class="head"><h1 >Show List </h1></div>
         {ShowData.map((curshow, key)=>{
           const { id, name, language } = curshow.show;
          

      return(
      <div className='card'>
        <div className="card-info">
            <h2>{name}</h2>
            <div className="hidden-content">
              <ul>
                
                <li>{language}</li>
                <li>Rating:{curshow.show.rating.average!=null? curshow.show.rating.average:"N/A"}</li>
              
                
              </ul>
            </div>
            <img src={curshow.show.image ? curshow.show.image.medium:logo}alt={id}/>
          <div >  <NavLink to={`show/${id}`}><button>Detail</button></NavLink></div>
        </div>
        </div>
      )})}
      </div>
      

    </section>
   
    
    </>
  )
}

export default ShowCard;