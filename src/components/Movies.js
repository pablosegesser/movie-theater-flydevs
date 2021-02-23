import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Typography} from '@material-ui/core';
import {  makeStyles} from '@material-ui/core/styles';
import { DialogDetaills } from './DialogDetaills';



const Movies = ({resultado, defaultMovies, rate}) => {




const {results: defresults} = defaultMovies;
const {results} = resultado;
const [arrFilt, setarrFilt] = useState(results);
useEffect(() => {
   const checkRate = ()=>{
    if(resultado.results !== undefined){
        if(rate == 0){
            setarrFilt(results)
        }else{
            setarrFilt(results.filter(m=>m.vote_average<=rate))
            
        }
    }   
      
   }
   checkRate();
}, [resultado, rate])
const useStyles = makeStyles((theme) => ({
    boxMovie:{
        width:"100%",
        padding:"10px 0px",
       textAlign:"center",
       cursor:"pointer",
       
    },
    backGrey:{
       backgroundColor:"#F5F5F5"
    },
    width220:{
        width:220,
        height:330
    }
    


}));
const classes = useStyles();

const [open, setopen] = useState({
    open:false,
    id:''
})
const showDetaills = (e,id)=>{
    e.stopPropagation();
let idd= id;
console.log(idd);    
setopen({
open: !open.open,
id:idd
})
console.log(open.id);
}

const closeDetaills = ()=>{
    setopen({
        open:false
    });
    }  
    return ( 
            <div className="card-panel white col s12">
                <div className="black-text">
                         <div className="container">
                             <div className="row">
                                 <div className="col-lg-12">
                                 <p>{results !== undefined ? 'Results:' : 'Top rated movies:'}</p>
                                 </div>
                                   
                             {arrFilt !== undefined ?  arrFilt.map(m=>
                                               
                                            <div className={classes.boxMovie+' col-lg-3 col-sm-12'} key={m.id} onClick={(e)=>{showDetaills(e,m.id)}}>
                                            <img src={m.poster_path !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face${m.poster_path}`: '/noImage2.png'} className={m.poster_path !== null ? '':classes.width220} />
                                            <p><strong>{m.title}</strong></p>
                                               
                                           <DialogDetaills open={open} movie={m} close={closeDetaills} />
                                           

                                            </div>
                                           
                                            
                                            ):defresults && defresults.map(m=> 
                                    
                                    <div className={classes.boxMovie+' col-lg-3 col-sm-12'} key={m.id} onClick={(e)=>{showDetaills(e,m.id)}}>
                                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${m.poster_path}`} className />
                                        <p><strong>{m.title}</strong></p>
                                        <DialogDetaills open={open} movie={m} close={closeDetaills} />
                             </div>)}
                            
                             
                            </div>
                        </div>
                   
                   
                </div>

            </div>


     );
}
 
Movies.propTypes = {
    resultado: PropTypes.object.isRequired,
    defaultMovies: PropTypes.object.isRequired,
    rate: PropTypes.number.isRequired
}
export default Movies;
