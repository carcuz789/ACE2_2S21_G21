import react from "react";
import { Card, Feed } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactAnimatedWeather from 'react-animated-weather';
import { Icon } from '@iconify/react';
import { faWind,faTemperatureHigh,faArrowUp,faArrowDown,faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { WiWindy,WiCloud } from 'weather-icons-react';
//import moment from 'moment';
    export default function Forecast({
      temperatura1, 
      direccion1, 
      luz1, 
      velocidad1, 
      humedad1, 
      fecha1, 
      velocidad_tipo1, 
      visibilidad1, 
      lluvia1,
      calor1,
      dia1
    }){
        let dir_icon;
        let calor_icon = null,lluvia_icon = null,velocidad_tipo_icon = null,visibilidad_icon = null;
        let tableStyle = {
            "width": "90%",
            "gap": "40px 115px"
         }
         let tabStyle = {
            "width": "50%",
            "height":"50px",
            "gap": "40px 115px"
         }
         let tab2Style = {
            "width": "50%",
            "gap": "40px 115px"
         }

        const vel_icon = <FontAwesomeIcon icon={faWind} size='2x' color='#86C6FC' />;
        const temp_icon = <FontAwesomeIcon icon={faTemperatureHigh} size='2x' color='red' />;
        const luz_icon = <Icon icon="carbon:brightness-contrast" color="#fcba86" width="35" />;
        const hum_icon = <Icon icon="wi:humidity" color="#2b93eb" width="20" />
        const soleado = {
          icon: 'CLEAR_DAY',
          color: 'goldenrod',
          size: 30,
          animate: true
        };

        const soleado_calor = {
          icon: 'CLEAR_DAY',
          color: 'red',
          size: 30,
          animate: true
        };        
        
        const nublado = {
          icon: 'CLOUDY',
          color: '#788890',
          size: 30,
          animate: true
        };
        
        const nublado_calor = {
          icon: 'CLOUDY',
          color: 'red',
          size: 30,
          animate: true
        }
        
        const lluvia = {
          icon: 'RAIN',
          color: '#5BC7FE',
          size: 30,
          animate: true
        };
        
        const ventoso = {
          icon: 'WIND',
          color: 'black',
          size: 30,
          animate: true
        };
        
        const definirPronostico = ((velocidad_tipo,visibilidad,calor,lluvia_)=>{
          if (velocidad_tipo === 'alto'){
            //con viento alto
            velocidad_tipo_icon = <ReactAnimatedWeather
            icon={ventoso.icon}
            color={ventoso.color}
            size={ventoso.size}
            animate={ventoso.animate}
            />;
          }else if (velocidad_tipo === 'normal'){
            velocidad_tipo_icon = <WiWindy size={30} color='#000' />;
          }else{}
          
          if (visibilidad === 'despejado'){
            //despejado
            visibilidad_icon = <ReactAnimatedWeather
            icon={soleado.icon}
            color={soleado.color}
            size={soleado.size}
            animate={soleado.animate}
            />;
          }else if (visibilidad === 'nublado'){
            //nublado
            visibilidad_icon = <ReactAnimatedWeather
            icon={nublado.icon}
            color={nublado.color}
            size={nublado.size}
            animate={nublado.animate}
            />;  
          }
          
          if (calor === 'con' && visibilidad === 'despejado'){
            //calor
            calor_icon = <ReactAnimatedWeather
            icon={soleado_calor.icon}
            color={soleado_calor.color}
            size={soleado_calor.size}
            animate={soleado_calor.animate}
            />;
            visibilidad_icon = null;
          }else if (calor === 'con' && visibilidad === 'nublado'){
            calor_icon = <ReactAnimatedWeather
            icon={nublado_calor.icon}
            color={nublado_calor.color}
            size={nublado_calor.size}
            animate={nublado_calor.animate}
            />; 
            visibilidad_icon = null;
          }else if (calor === 'sin'){
            calor_icon = null;
          }
          
          if (lluvia_ === 'con'){
            //con lluvia
            lluvia_icon = <ReactAnimatedWeather
            icon={lluvia.icon}
            color={lluvia.color}
            size={lluvia.size}
            animate={lluvia.animate}
            />;
          }else if (lluvia_ === 'sin'){
            lluvia_icon = null;
          }
        })

        const definirDireccion = ((direccion)=>{
            if (direccion === 'norte'){
                dir_icon = <FontAwesomeIcon icon={faArrowUp} size='2x' color='green' />;
               }else if (direccion === 'sur'){
                 dir_icon = <FontAwesomeIcon icon={faArrowDown} size='2x' color='purple' />;
               }else if (direccion === 'este'){
                 dir_icon = <FontAwesomeIcon icon={faArrowLeft} size='2x' color='brown'/>;
               }else{
                 dir_icon = <FontAwesomeIcon icon={faArrowRight} size='2x' color='black'/>;
               }            
        })
        /*
        if (velocidad1 === undefined){
          return (<div></div>)
        }
        */
        return(
            <div style={{marginTop: 20}}>
                    {definirDireccion(direccion1)}
                    {definirPronostico(velocidad_tipo1,visibilidad1,calor1,lluvia1)}
                    <Card className='forecast-card'>
                        <Card.Content>
                            <Card.Header className='forecast-date'>                    
                                Guatemala {visibilidad_icon} {calor_icon} {velocidad_tipo_icon} {lluvia_icon}  
                                </Card.Header>
                            <Card.Header className='forecast-header'>                    
                                {fecha1},{dia1}                                    
                                </Card.Header>
                                
                            <Card.Description className='temp-desc'>
                                <div>
                                <table style={tableStyle}>
                                        <tbody>
                                        <tr>
                                        <td style = {tabStyle}>{dir_icon} {direccion1}</td>
                                        <td style = {tab2Style}>{vel_icon} {velocidad1} km/h</td>
                                        </tr>
                                        <tr>
                                        <td style = {tabStyle}>{temp_icon} {temperatura1} C°</td>
                                        <td style = {tab2Style}>{hum_icon}{humedad1} %</td>
                                        </tr>
                                        <tr>
                                        <td style = {tabStyle}>{luz_icon} {luz1} Lumen</td>
                                        </tr>
                                        </tbody>
                                </table>
                                </div>
                            </Card.Description>
                        </Card.Content>
                          <Card.Content extra>
                            Velocidad del viento: {velocidad_tipo1}, 
                            Visibilidad: {visibilidad1}, 
                            {lluvia1} lluvia,
                            {calor1} calor
                          </Card.Content>
                    </Card>

            </div>
        )
    }