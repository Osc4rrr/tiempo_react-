import React, { useEffect, useState, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { MenuItem } from '@material-ui/core';

const styles = theme => ({
  container: 
  {
    backgroundColor:'#ccc'
  }
})



function App({props}) {


  const [ciudades, guardarCiudad] = useState([]); 
  const [codCiudad, guardarCodCiudad] = useState({
    cod_ciudad: ''
  });
  const [climaCiudad, guardarClimaCiudad] = useState([]);
  const [cargando, guardarCargando] = useState(true); 

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://api.gael.cl/general/public/clima'; 

      const respuesta = await fetch(url); 
      const resultado = await respuesta.json(); 

      console.log(resultado);

      guardarCiudad(resultado);
    }

    consultarAPI();
  },[guardarCiudad])

  const handleChange = async (e) => {

    guardarCodCiudad({
      ...codCiudad, 
      [e.target.name] : e.target.value
    });

    /*const url = `https://api.gael.cl/general/public/clima/${codCiudad}`; 

    const response = await fetch(url); 
    const resultado = await response.json(); 

    guardarClimaCiudad(resultado);

    console.log(codCiudad);

    console.log(climaCiudad);
    */
    
  }

  const consultar = async (e) => {
    e.preventDefault(); 

    console.log(codCiudad.cod_ciudad);

    const url = `https://api.gael.cl/general/public/clima/${codCiudad.cod_ciudad}`; 

    const response = await fetch(url); 
    const resultado = await response.json(); 

    console.log(resultado);
    guardarClimaCiudad(resultado);
    guardarCargando(false); 
  }


  return (

    <Fragment>

    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{  backgroundColor:'#ccc', 
                fontSize:'1.1em', 
                height:'100vh'}}
    >

<Fragment>
    <form
      onSubmit={consultar}>
    <Select
      onChange={handleChange}
      name="cod_ciudad"
      style={{width:'200px',height:'50px', marginRight:'2em'}}>
      
      {ciudades.map(ciudad => (
        <MenuItem value={ciudad.Codigo}>{ciudad.Estacion}</MenuItem>
      ))}
    </Select>

    <Button 
      type="submit"
      variant="contained"
      color="secondary"
      style={{height:'45px'}}>Consultar</Button>
    </form>
      {cargando ? <div class="spinner"></div> : 
      <Fragment>
            <h1>{climaCiudad.Estacion}</h1>
            <span>Temperatura: {climaCiudad.Temp}</span>   <span>Humedad: {climaCiudad.Humedad}</span>
            <h5>Estado: {climaCiudad.Estado}</h5>
            <p>Hora Ultimo Update: {climaCiudad.HoraUpdate}</p>
      </Fragment>
      
      
      }
    
    </Fragment>
    
    </Grid>


    </Fragment>



    


  );

  
}



export default withStyles(styles)(App);
