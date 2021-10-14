
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/header'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast.js'
import { Loader } from 'semantic-ui-react'
import { Card, Feed } from 'semantic-ui-react'

const URL = 'https://api.openweathermap.org/data/2.5/onecall';
const URL2 = 'http://localhost:3001/DATOSCRUD'
const URL3 = 'http://localhost:3001/PRONOSTICO1'
const API_KEY = 'b94a885f25fbd1daf17a3ca0548205ae';

function App() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [temperatura, setTemperatura] = useState(null);
  const [luz, setLuz] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [velocidad, setVelocidad] = useState(null);
  const [humedad, setHumedad] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [Velocidad_tipo, setVelocidad_tipo] = useState(null);
  const [Visibilidad, setVisibilidad] = useState(null);
  const [Lluvia, setLluvia] = useState(null);
  const [Calor, setCalor] = useState(null);
  const [dia, setDia] = useState(null);

  const [temperatura1, setTemperatura1] = useState(null);
  const [luz1, setLuz1] = useState(null);
  const [direccion1, setDireccion1] = useState(null);
  const [velocidad1, setVelocidad1] = useState(null);
  const [humedad1, setHumedad1] = useState(null);
  const [fecha1, setFecha1] = useState(null);
  const [velocidad_tipo1, setVelocidad_tipo1] = useState(null);
  const [visibilidad1, setVisibilidad1] = useState(null);
  const [lluvia1, setLluvia1] = useState(null);
  const [calor1, setCalor1] = useState(null);
  const [dia1, setDia1] = useState(null);


  const [temperatura2, setTemperatura2] = useState(null);
  const [luz2, setLuz2] = useState(null);
  const [direccion2, setDireccion2] = useState(null);
  const [velocidad2, setVelocidad2] = useState(null);
  const [humedad2, setHumedad2] = useState(null);
  const [fecha2, setFecha2] = useState(null);
  const [velocidad_tipo2, setVelocidad_tipo2] = useState(null);
  const [visibilidad2, setVisibilidad2] = useState(null);
  const [lluvia2, setLluvia2] = useState(null);
  const [calor2, setCalor2] = useState(null);
  const [dia2, setDia2] = useState(null);


  const [temperatura3, setTemperatura3] = useState(null);
  const [luz3, setLuz3] = useState(null);
  const [direccion3, setDireccion3] = useState(null);
  const [velocidad3, setVelocidad3] = useState(null);
  const [humedad3, setHumedad3] = useState(null);
  const [fecha3, setFecha3] = useState(null);
  const [velocidad_tipo3, setVelocidad_tipo3] = useState(null);
  const [visibilidad3, setVisibilidad3] = useState(null);
  const [lluvia3, setLluvia3] = useState(null);
  const [calor3, setCalor3] = useState(null);
  const [dia3, setDia3] = useState(null);


  const [temperatura4, setTemperatura4] = useState(null);
  const [luz4, setLuz4] = useState(null);
  const [direccion4, setDireccion4] = useState(null);
  const [velocidad4, setVelocidad4] = useState(null);
  const [humedad4, setHumedad4] = useState(null);
  const [fecha4, setFecha4] = useState(null);
  const [velocidad_tipo4, setVelocidad_tipo4] = useState(null);
  const [visibilidad4, setVisibilidad4] = useState(null);
  const [lluvia4, setLluvia4] = useState(null);
  const [calor4, setCalor4] = useState(null);
  const [dia4, setDia4] = useState(null);


  const [temperatura5, setTemperatura5] = useState(null);
  const [luz5, setLuz5] = useState(null);
  const [direccion5, setDireccion5] = useState(null);
  const [velocidad5, setVelocidad5] = useState(null);
  const [humedad5, setHumedad5] = useState(null);
  const [fecha5, setFecha5] = useState(null);
  const [velocidad_tipo5, setVelocidad_tipo5] = useState(null);
  const [visibilidad5, setVisibilidad5] = useState(null);
  const [lluvia5, setLluvia5] = useState(null);
  const [calor5, setCalor5] = useState(null);
  const [dia5, setDia5] = useState(null);


  const [temperatura6, setTemperatura6] = useState(null);
  const [luz6, setLuz6] = useState(null);
  const [direccion6, setDireccion6] = useState(null);
  const [velocidad6, setVelocidad6] = useState(null);
  const [humedad6, setHumedad6] = useState(null);
  const [fecha6, setFecha6] = useState(null);
  const [velocidad_tipo6, setVelocidad_tipo6] = useState(null);
  const [visibilidad6, setVisibilidad6] = useState(null);
  const [lluvia6, setLluvia6] = useState(null);
  const [calor6, setCalor6] = useState(null);
  const [dia6, setDia6] = useState(null);


  const getData = async () => {
    try {

      axios.get(URL2)
      .then((weatherData) => {
        setFecha(weatherData.data[0]);
        setTemperatura(weatherData.data[1]);
        setLuz(weatherData.data[2]);
        setDireccion(weatherData.data[3]);
        setVelocidad(weatherData.data[4]);
        setHumedad(weatherData.data[5]);
        setVelocidad_tipo(weatherData.data[6]);
        setVisibilidad(weatherData.data[7]);
        setLluvia(weatherData.data[8]);
        setCalor(weatherData.data[9]);
        setDia(weatherData.data[10])
        setLoading(false);
      })  
    } catch (err) {
      console.error(err.message);
    }
  };





  const getData2 = async () => {
    try {

      axios.get(URL3)
      .then((weatherData) => {  

        setFecha1(weatherData.data[0]);
        setTemperatura1(weatherData.data[1]);
        setLuz1(weatherData.data[2]);
        setDireccion1(weatherData.data[3]);
        setVelocidad1(weatherData.data[4]);
        setHumedad1(weatherData.data[5]);
        setVelocidad_tipo1(weatherData.data[6]);
        setVisibilidad1(weatherData.data[7]);
        setLluvia1(weatherData.data[8]);
        setCalor1(weatherData.data[9]);
        setDia1(weatherData.data[10]);

        setFecha2(weatherData.data[11]);
        setTemperatura2(weatherData.data[12]);
        setLuz2(weatherData.data[13]);
        setDireccion2(weatherData.data[14]);
        setVelocidad2(weatherData.data[15]);
        setHumedad2(weatherData.data[16]);
        setVelocidad_tipo2(weatherData.data[17]);
        setVisibilidad2(weatherData.data[18]);
        setLluvia2(weatherData.data[19]);
        setCalor2(weatherData.data[20]);
        setDia2(weatherData.data[21]);


        setFecha3(weatherData.data[22]);
        setTemperatura3(weatherData.data[23]);
        setLuz3(weatherData.data[24]);
        setDireccion3(weatherData.data[25]);
        setVelocidad3(weatherData.data[26]);
        setHumedad3(weatherData.data[27]);
        setVelocidad_tipo3(weatherData.data[28]);
        setVisibilidad3(weatherData.data[29]);
        setLluvia3(weatherData.data[30]);
        setCalor3(weatherData.data[31]);
        setDia3(weatherData.data[32]);

        setFecha4(weatherData.data[33]);
        setTemperatura4(weatherData.data[34]);
        setLuz4(weatherData.data[35]);
        setDireccion4(weatherData.data[36]);
        setVelocidad4(weatherData.data[37]);
        setHumedad4(weatherData.data[38]);
        setVelocidad_tipo4(weatherData.data[39]);
        setVisibilidad4(weatherData.data[40]);
        setLluvia4(weatherData.data[41]);
        setCalor4(weatherData.data[42]);
        setDia4(weatherData.data[43]);
        
        setFecha5(weatherData.data[44]);
        setTemperatura5(weatherData.data[45]);
        setLuz5(weatherData.data[46]);
        setDireccion5(weatherData.data[47]);
        setVelocidad5(weatherData.data[48]);
        setHumedad5(weatherData.data[49]);
        setVelocidad_tipo5(weatherData.data[50]);
        setVisibilidad5(weatherData.data[51]);
        setLluvia5(weatherData.data[52]);
        setCalor5(weatherData.data[53]);
        setDia5(weatherData.data[54]);

        setFecha6(weatherData.data[55]);
        setTemperatura6(weatherData.data[56]);
        setLuz6(weatherData.data[57]);
        setDireccion6(weatherData.data[58]);
        setVelocidad6(weatherData.data[59]);
        setHumedad6(weatherData.data[60]);
        setVelocidad_tipo6(weatherData.data[61]);
        setVisibilidad6(weatherData.data[62]);
        setLluvia6(weatherData.data[63]);
        setCalor6(weatherData.data[64]);
        setDia6(weatherData.data[65]);
        
        setLoading(false);
        
      })  
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(()=>{
    getData();
    getData2();
    const interval=setInterval(()=>{
      getData();
      getData2();
     },1000)   
     return()=>clearInterval(interval);
  },[Calor,Lluvia])

  return (
    <div className="main">
      <Header/>
      {loading ? (
        <div>
          <p>Cargando...</p>
          <Loader active inline />
        </div>
      ) :(
        <WeatherCard 
        temperatura = {temperatura}
        direccion = {direccion}
        luz = {luz}
        velocidad = {velocidad}
        humedad = {humedad}
        fecha = {fecha}
        Velocidad_tipo = {Velocidad_tipo}
        Visibilidad = {Visibilidad}
        Lluvia = {Lluvia}
        Calor = {Calor}
        dia = {dia}
        />
      ) }

  <Card.Group itemsPerRow={3}>
      <Forecast 
              temperatura1 = {temperatura1}
              direccion1 = {direccion1}
              luz1 = {luz1}
              velocidad1 = {velocidad1}
              humedad1 = {humedad1}
              fecha1 = {fecha1}
              velocidad_tipo1 = {velocidad_tipo1}
              visibilidad1 = {visibilidad1}
              lluvia1 = {lluvia1}
              calor1 = {calor1}   
              dia1 = {dia1}         
              />
      <Forecast 
              temperatura1 = {temperatura2}
              direccion1 = {direccion2}
              luz1 = {luz2}
              velocidad1 = {velocidad2}
              humedad1 = {humedad2}
              fecha1 = {fecha2}
              velocidad_tipo1 = {velocidad_tipo2}
              visibilidad1 = {visibilidad2}
              lluvia1 = {lluvia2}
              calor1 = {calor2}   
              dia1 = {dia2}         
              />
      <Forecast 
              temperatura1 = {temperatura3}
              direccion1 = {direccion3}
              luz1 = {luz3}
              velocidad1 = {velocidad3}
              humedad1 = {humedad3}
              fecha1 = {fecha3}
              velocidad_tipo1 = {velocidad_tipo3}
              visibilidad1 = {visibilidad3}
              lluvia1 = {lluvia3}
              calor1 = {calor3}  
              dia1 = {dia3}          
              />     
            <Forecast 
              temperatura1 = {temperatura4}
              direccion1 = {direccion4}
              luz1 = {luz4}
              velocidad1 = {velocidad4}
              humedad1 = {humedad4}
              fecha1 = {fecha4}
              velocidad_tipo1 = {velocidad_tipo4}
              visibilidad1 = {visibilidad4}
              lluvia1 = {lluvia4}
              calor1 = {calor4}   
              dia1 = {dia4}            
              />      
            <Forecast 
              temperatura1 = {temperatura5}
              direccion1 = {direccion5}
              luz1 = {luz5}
              velocidad1 = {velocidad5}
              humedad1 = {humedad5}
              fecha1 = {fecha5}
              velocidad_tipo1 = {velocidad_tipo5}
              visibilidad1 = {visibilidad5}
              lluvia1 = {lluvia5}
              calor1 = {calor5} 
              dia1 = {dia5}              
              />
            <Forecast 
              temperatura1 = {temperatura6}
              direccion1 = {direccion6}
              luz1 = {luz6}
              velocidad1 = {velocidad6}
              humedad1 = {humedad6}
              fecha1 = {fecha6}
              velocidad_tipo1 = {velocidad_tipo6}
              visibilidad1 = {visibilidad6}
              lluvia1 = {lluvia6}
              calor1 = {calor6}  
              dia1 = {dia6}             
              />   
    </Card.Group>
    </div>
  );
}
//
export default App;
