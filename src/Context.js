
import React, { useEffect, useState } from 'react';



const API_URL ='https://api.tvmaze.com/search/shows?q=all'

const AppContext = React.createContext();

const AppProvider =({children}) =>{

    const [isLoading,setIsLoading]= useState(true);
    const[ShowData,setShowData]=useState([]);
    const[isError,setisError]=useState({show:"false",msg:""})
    const getShows = async (url) => {
        setIsLoading(true);
    try{
        const res = await fetch(url);
        const data = await res.json();
        if(data){
            setIsLoading(false);
            setShowData(data)
        }else{
            setisError({show:true,
                msg : data.error,});
        }
    }catch(error){
        console.log(error);
    }
}



    useEffect(()=>{
        getShows(API_URL);
    },[]);
    return <AppContext.Provider value={{ isLoading, isError , ShowData} }>{children}</AppContext.Provider>;

};

export { AppContext ,AppProvider};