import React,{useContext} from 'react'
import { AppContext } from '../../Context';
import logo from './no.png'
import { NavLink } from 'react-router-dom';


const ShowCar2 = () => {
  const {ShowData} = useContext(AppContext);
  return (
    <>

    <section className='show-section '>
    
      <div className=" container grid grid-4-col ">
         {ShowData.map((curshow, key)=>{
           const { id, name, language , summary } = curshow.show;
      return(
        <div className="main-container">
            <div className="poster-container">
                <a href="#"><img src={curshow.show.image ? curshow.show.image.medium:logo} className="poster" /></a>
            </div>
            <div className="ticket-container">
                <div className="ticket__content">
                    <h4 className="ticket__movie-title"> <h2>{name}</h2></h4>
                    <p className="ticket__movie-slogan">
                Language : {language}
                    </p>
                    <p className="ticket__movie-slogan">
                    Genres : 
                          {curshow.show.genres ? curshow.show.genres.map((genre, key)=>{
                            return(
                              <span className="ticket__movie-genre">{genre}</span>
                            )
                          }):""}
                        
                    </p>
                    <p className="ticket__current-price">Rating : {curshow.show.rating.average!=null? curshow.show.rating.average:"N/A"}</p>
                    <NavLink to={`show/${id}`}>
                    <button class="ticket__buy-btn">
                      Summary</button>
                    </NavLink>
                    
                </div>
            </div>
        </div>
      )})}
      </div>
      

    </section>
   
    
    </>
  )
}

export default ShowCar2