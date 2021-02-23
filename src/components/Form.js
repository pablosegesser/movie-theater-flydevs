import React, { useState,useEffect } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';
import {Box,Grid,Typography, TextField, InputAdornment, Button} from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';
import {  makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const Form = ({ busqueda, guardarBusqueda, guardarConsultar, guardarRating, consultar}) => {

    const useStyles = makeStyles((theme) => ({
            inputText:{
                borderRadius:"30px !important"
            },
            contform:{
                textAlign:"center"
            },
          buttonLight:{
                color:"#fff !important"
              }
    
    
      }));
const classes = useStyles();

//state error

const [error, guardarError] = useState(false);


//funcion que coloca los elementos en el state

const handleChange = e => {
    //actualizar el state
    guardarBusqueda(e.target.value);

}



//cuando el usuario da al submit

const handleSubmit = e =>{
    e.preventDefault();

    //validar
    if(busqueda === ''){
        guardarError(true);
        return
    }

    guardarError(false);
    

    //pasarlo al componente principal
    guardarConsultar(true);
    
}
const [rating, setrating] = useState(0)
const onStarClick = (nextValue, prevValue, name)=> {
    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    if(nextValue == prevValue){
        setrating(0);
        guardarRating(0);
        return
    }
    setrating(nextValue);
    guardarRating(nextValue*2);
   
  }
    return ( 
        <Grid container className={classes.contform}>
              <Grid item xs={12}>
               

              
                <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Filter by Rating</Typography>
               <StarRatingComponent 
                name="rating" 
                starCount={5}
                value={rating}
                onStarClick={onStarClick.bind(this)}
                editing={busqueda !== '' ? true : false}
                
                /> </Box>
           
          </Grid>
            <Grid item xs={12}>
            <form
         
         onSubmit={handleSubmit}
         
         >
             { error ? <Error mensaje="The field is required" /> : null }
             <div className="col-lg-12">
                 <TextField 
                 placeholder={'Write a keyword'}
                 type="text"
                  name="busqueda"
                       className={classes.inputText}
                defaultValue={busqueda}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                  }}
                  variant="outlined"
                 
                 />
                
                  
                   
             </div>

         

        <div style={{marginTop:10}}>
           <Button variant="contained" className={classes.buttonLight} color="primary" type="Submit">SEARCH</Button>


        </div>




         </form>
            </Grid>
        
        
       
        </Grid>

     );
}
Form.propTypes = {
    busqueda : PropTypes.string.isRequired,
    guardarBusqueda : PropTypes.func.isRequired,
    guardarConsultar : PropTypes.func.isRequired,
    guardarRating : PropTypes.number.isRequired,
    consultar : PropTypes.bool.isRequired
}
export default Form;