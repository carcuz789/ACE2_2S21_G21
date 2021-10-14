import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactAnimatedWeather from 'react-animated-weather';
import { Icon } from '@iconify/react';
import { faWind,
  faTemperatureHigh,faArrowUp,faArrowDown,faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons'
  import { WiWindy } from 'weather-icons-react';

export default function WeatherCard ({temperatura, direccion, luz,velocidad,humedad,fecha,
  Velocidad_tipo,Visibilidad,Lluvia,Calor,dia}) {

let dir_icon;
let calor_icon = null,lluvia_icon = null,velocidad_tipo_icon = null,visibilidad_icon = null;
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
};

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

if (direccion === 'norte'){
 dir_icon = <FontAwesomeIcon icon={faArrowUp} size='2x' color='green' />;
}else if (direccion === 'sur'){
  dir_icon = <FontAwesomeIcon icon={faArrowDown} size='2x' color='purple' />;
}else if (direccion === 'este'){
  dir_icon = <FontAwesomeIcon icon={faArrowLeft} size='2x' color='brown'/>;
}else{
  dir_icon = <FontAwesomeIcon icon={faArrowRight} size='2x' color='black'/>;
};




if (Velocidad_tipo === 'alto'){
  //con viento alto
  velocidad_tipo_icon = <ReactAnimatedWeather
  icon={ventoso.icon}
  color={ventoso.color}
  size={ventoso.size}
  animate={ventoso.animate}
  />;
}else if (Velocidad_tipo === 'normal'){
  velocidad_tipo_icon = <WiWindy size={40} color='#000' />;
}

if (Visibilidad === 'despejado'){
  //despejado
  visibilidad_icon = <ReactAnimatedWeather
  icon={soleado.icon}
  color={soleado.color}
  size={soleado.size}
  animate={soleado.animate}
  />;
}else if (Visibilidad === 'nublado'){
  //nublado
  visibilidad_icon = <ReactAnimatedWeather
  icon={nublado.icon}
  color={nublado.color}
  size={nublado.size}
  animate={nublado.animate}
  />;  
};

if (Calor === 'con' && Visibilidad === 'despejado'){
  //calor
  calor_icon = visibilidad_icon = <ReactAnimatedWeather
  icon={soleado_calor.icon}
  color={soleado_calor.color}
  size={soleado_calor.size}
  animate={soleado_calor.animate}
  />;
  visibilidad_icon = null;
}else if (Calor === 'con' && Visibilidad === 'nublado'){
  calor_icon = <ReactAnimatedWeather
  icon={nublado_calor.icon}
  color={nublado_calor.color}
  size={nublado_calor.size}
  animate={nublado_calor.animate}
  />; 
  visibilidad_icon = null;
}

if (Lluvia === 'con'){
  //con lluvia
  lluvia_icon = <ReactAnimatedWeather
  icon={lluvia.icon}
  color={lluvia.color}
  size={lluvia.size}
  animate={lluvia.animate}
  />;
}else{
  lluvia_icon = null;
}


return (
  <Card className = 'weather-card-main'>
    <Card.Content className='weather-card'>
      <Card.Header className='weather-card-child'><p className='titulo-pais'>Guatemala</p></Card.Header>
      <div className='icon-container'>
      {visibilidad_icon} {calor_icon} {velocidad_tipo_icon} {lluvia_icon}
      </div>
    </Card.Content>
    <Card.Content>
      <Feed>
        <Feed.Event>
          <Feed.Content>
              <h5 className='weather-card-child'>{fecha}, {dia}</h5>
              <div className='weather-card'>
                <div className='weather-card-child'>
                    {temp_icon}<b></b> {`${Math.floor(temperatura)} C°`}
                </div>
                <div className='weather-card-child'>
                {hum_icon}<b></b> {humedad} %
                </div>
              </div>
              <div className='weather-card'>
                <div className='weather-card-child'>
                {vel_icon}<b></b> {velocidad} km/h
                </div>
                <div className='weather-card-child'>
                {dir_icon}<b></b> {direccion}
                </div>
              </div>
              <div className='weather-card'>
              <div className='weather-card-child'>
              {luz_icon}<b></b> {luz} Lumen
                </div>
              </div>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
    <Card.Content extra>
    Velocidad del viento: {Velocidad_tipo}, Visibilidad: {Visibilidad}, {Lluvia} lluvia,
    {Calor} calor
      </Card.Content>
  </Card>
)}

