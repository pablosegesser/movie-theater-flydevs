import React,{ Fragment, useState, useEffect } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Form from './components/Form';
import {Grid, Typography } from '@material-ui/core';
import Movies from './components/Movies';
import Error from './components/Error';

function App() {
  const axios = require('axios');
  const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#019DF4'
        }
      },
  });
  const useStyles = makeStyles((theme) => ({
    appBar:{
      width:"100%",
      height:80,
      backgroundColor: "#019DF4"
    },
    titleMain:{
      fontSize: 28,
      color: "#fff",
      fontWeight: "bold",
      textAlign:"center",
      marginTop:15
    },
    contForm:{
      backgroundColor:"#fff",
      padding:50
    },
    contMovies:{
      backgroundColor:"#f5f5f5",
      padding:30
    }


  }));

const [busqueda, guardarBusqueda] = useState('');
const [consultar, guardarConsultar ] = useState(false);

const [resultado, guardarResultado] = useState({});

const [error, guardarError] = useState(false);

const [defaultMovies, setDefaultMovies] = useState({});

const [rating, guardarRating] = useState(0);

// Make a request for a user with a given ID

useEffect(()=>{
  const searchMovie = () =>{

    if(consultar){
    const apikey = '5f870fc0f9ac63f3a3d43209fa5d14fd';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${busqueda}&page=1&include_adult=false`;
    axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response.data);
      guardarResultado(response.data);
      guardarConsultar(false);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      const resultado = error;
    })
  
    }else{
      DefaultMovies();
    }
    
    //detecta si hubo contacto correcta en la consulta
  
    if(resultado.cod === "404"){
      guardarError(true);
    }else{
      guardarError(false);
    }
    
    
  }
  const DefaultMovies =() =>{
  
    const apikey = '5f870fc0f9ac63f3a3d43209fa5d14fd';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
    `;
   axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response.data);
      setDefaultMovies(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      const resultado = error;
    })

    //detecta si hubo contacto correcta en la consulta
  
    if(resultado.cod === "404"){
      guardarError(true);
    }else{
      guardarError(false);
    }
  
    }
  
  
  searchMovie();
  DefaultMovies();
 
  // eslint-disable-next-line
},[consultar]);

const classes= useStyles();

let componente;

if(error){

  componente = <Error mensaje="No hay resultados" />
}else{
  componente = <Movies resultado={resultado} defaultMovies={defaultMovies} rate={rating} />
}


  return (
    <ThemeProvider theme={theme}>
      <Grid container>
      <Grid className={classes.appBar}>
          <Typography className={classes.titleMain}>MOVIE THEATER</Typography>

          </Grid>
        <Grid item xs={12} className={classes.contForm}>
         
          <Form 
                  busqueda={busqueda}
                  guardarBusqueda={guardarBusqueda}
                  guardarConsultar={guardarConsultar}
                  guardarRating={guardarRating}
                  consultar={consultar}
                 
                
                />
        </Grid>
        
  
      </Grid>

      <Grid container className={classes.contMovies}>
        <Grid item xs={12}>

        </Grid>
        {componente}

      </Grid>
           
       
    </ThemeProvider>
  );
}

export default App;
