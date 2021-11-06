import React, {useSate} from "react";
import ChartistGraph from "react-chartist";
var TimerMixin = require('react-timer-mixin');
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

global.setState =[];
global.setDiasMayorUso = [];
global.setUsoTotalHoras = [];
global.setUsoTotalDias = [];
global.setPromedioLevantaDiario = [];
global.setPromedioUsoDiario = [];
global.setUsoActual = [];

function getData(){
  
  fetch('http://localhost:3001/GRAFICAPESO',{mode:'cors'}) // <------------Ruta para la evolución del peso
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(dato);
    if (setState.length !=0){
      setState = [];
    }
    setState.push(dato);
    console.log(dato);
    return dato;
  })
}


function getDiasMayorUso(){
  
  fetch('http://localhost:3001/DIASMAYORUSO',{mode:'cors'}) // <------------Ruta para dias con mayor uso
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(dato);
    if (setDiasMayorUso.length !=0){
      setDiasMayorUso = [];
    }
    setDiasMayorUso.push(dato);
    return dato;
  })    
}

function getUsoTotalHoras(){
  
  fetch('http://localhost:3001/TIEMPOTOTHORASUSO',{mode:'cors'}) // <------------Ruta para Uso total en horas
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(dato);
    if (setUsoTotalHoras.length !=0){
      setUsoTotalHoras = [];
    }
    setUsoTotalHoras.push(dato);
    return dato;
  })    
}

function getUsoTotalDias(){
  
  fetch('http://localhost:3001/GRAFICAPESO',{mode:'cors'}) // <------------Ruta para Uso total en dias
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(dato);
    if (setUsoTotalDias.length !=0){
      setUsoTotalDias = [];
    }
    setUsoTotalDias.push(dato);
    return dato;
  })    
}

function getPromedioLevantaDiario(){
  
  fetch('http://localhost:3001/LEVANTAPROM',{mode:'cors'}) // <------------Ruta para Promedio que se levanta diario
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(dato);
    if (setPromedioLevantaDiario.length !=0){
      setPromedioLevantaDiario = [];
    }
    setPromedioLevantaDiario.push(dato);
    return dato;
  })    
}

function getPromedioUsoDiario(){
  
  fetch('http://localhost:3001/USOPROMPORDIA',{mode:'cors'}) // <------------Ruta para variable de uso diario
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(dato);
    if (setPromedioUsoDiario.length !=0){
      setPromedioUsoDiario = [];
    }
    setPromedioUsoDiario.push(dato);
    return dato;
  })    
}


function getUsoActual(){
  
  fetch('http://localhost:3001/TIEMPOREAL',{mode:'cors'}) // <------------Ruta para Uso actual en vivo
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(dato);
    if (setUsoActual.length !=0){
      setUsoActual = [];
    }
    setUsoActual.push(dato);
    return dato;
  })    
}


function Dashboard() {
  let pesoActual = 0;
  //Numeros o variables fijas
  var usoTotalHoras = 15;
  var usoTotalDias = 14;
  //Datos para las gráficas
  //let datosPesoEvolucion = [50, 51, 52, 53, 54, 55, 56];
  let datosPesoEvolucion = [];
  //Horas de uso promedio
  let promedioUsoDiario = 8;
  //Promedio de veces en que se levanta diario
  let promedioLevantaDiario = 44;
  //Días y los datos de cada día
  //Uso en tiempo real
  let estadoActual = "Usando";
  let horaInicio = "13:00";
  let tiempoUsoActual = 4;
  //Gráfica de dias de mayor uso
  //Debería de ser porcentajes por día
  //let datosDiasMayorUso = [50, 51, 52, 53, 54, 55, 56];
  let datosDiasMayorUso = [];
  //Array con la información de los días de mayor uso sin variables cuantitativas
  //Variable para guardar información temporalmente
  let temp = [];



//---------------------------------Obtener datos para gráfica de peso

  //Consulta al back con getData y recoger información en un arreglo con los objetos
  getData();
  Object.entries(setState).map(([key,value]) => {
    //console.log(key);
    //console.log("*******************************");
    Object.entries(value).map(([key1,value1]) => {
      
      Object.entries(value1).map(([key2,value2]) => {
        //console.log(value2);  
        datosPesoEvolucion.push(value2[0].value); // <-----------------------------Valor del atributo json evolución peso 
      });
    });
  });
    //Actualizar datos
    //console.log(datosPesoEvolucion.length);
    let etiquetas = [];
    let pesoMenor = 0;
    let pesoMayor = 0;
    pesoSilla = datosPesoEvolucion[0];
    for (let i=1;i<datosPesoEvolucion.length;i++){
      if (datosPesoEvolucion[i]>pesoMayor){
        pesoMayor = datosPesoEvolucion[i];
      }
      if (datosPesoEvolucion[i]<pesoMenor){
        pesoMenor = datosPesoEvolucion[i];
      }
      etiquetas.push("dia "+i);
    }

    var pesoEvolucion = {
      labels: etiquetas,
      //series: [datosPesoEvolucion]
      series: [datosPesoEvolucion]
    }
    //console.log("Evolución del peso");
    //console.log(datosPesoEvolucion);
  //Reiniciar para evitar duplicados
  pesoActual = datosPesoEvolucion[datosPesoEvolucion.length-1];
  setState = [];
//---------------------------------Obtener datos para gráfica de dias de mayor uso
  getDiasMayorUso();
  Object.entries(setDiasMayorUso).map(([key,value]) => {
    //console.log(key);
    //console.log("*******************************");
    Object.entries(value).map(([key1,value1]) => {
      
      Object.entries(value1).map(([key2,value2]) => { 
        if (datosDiasMayorUso.length <7){
          datosDiasMayorUso.push(value2[0].value); // <-----------------------------Valor del atributo json dias mayor uso
        }       
      });
    });
  });
  setDiasMayorUso = []; 
  //console.log(datosDiasMayorUso);
  let diasMayor = 0;
  let diasMenor = 0;
  for (let i = 0; i< 7;i++){
    if (diasMayor < datosDiasMayorUso[i]){
      diasMayor = datosDiasMayorUso[i];
    }
    if (diasMenor > datosDiasMayorUso[i]){
      diasMenor = datosDiasMayorUso[i];
    }    
  }
  //datosDiasMayorUso.pop();
  //datosDiasMayorUso.pop();
  var diasMayorUso = {
    labels: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
    series: [datosDiasMayorUso]
  }
  //console.log(diasMayor);
  //console.log(diasMenor);

//---------------------------------Obtener datos para gráfica de peso
getUsoTotalHoras();
//console.log(setUsoTotalHoras);
Object.entries(setUsoTotalHoras).map(([key,value]) => {
  //console.log(key);
  //console.log("*******************************");
  Object.entries(value).map(([key1,value1]) => {
    
    Object.entries(value1).map(([key2,value2]) => { 
      temp.push(value2[0].value); // <-----------------------------Valor del atributo json uto total en horas
    });
  });
});
usoTotalHoras = temp[0];
setUsoTotalHoras = []; 
temp = [];

//---------------------------------Obtener datos para gráfica de peso
getUsoTotalDias();

Object.entries(setUsoTotalDias).map(([key,value]) => {
  //console.log(key);
  //console.log("*******************************");
  Object.entries(value).map(([key1,value1]) => {
    
    Object.entries(value1).map(([key2,value2]) => { 
      temp.push(value2[0].value); // <-----------------------------Valor del atributo json uso total en dias
    });
  });
});

usoTotalDias = temp.pop();
//usoTotalDias = 12;
temp = [];
setUsoTotalDias = []; 

//---------------------------------Obtener datos para gráfica de peso
getPromedioLevantaDiario();
Object.entries(setPromedioLevantaDiario).map(([key,value]) => {
  //console.log(key);
  //console.log("*******************************");
  Object.entries(value).map(([key1,value1]) => {
    
    Object.entries(value1).map(([key2,value2]) => { 
      temp.push(value2[0].value); // <-----------------------------Valor del atributo json promedio de levantarse
    });
  });
});
promedioLevantaDiario = temp[0];
temp = [];
setPromedioLevantaDiario = []; 


//---------------------------------Obtener datos para gráfica de peso
getPromedioUsoDiario();
Object.entries(setPromedioUsoDiario).map(([key,value]) => {
  //console.log(key);
  //console.log("*******************************");
  Object.entries(value).map(([key1,value1]) => {
    
    Object.entries(value1).map(([key2,value2]) => { 
      temp.push(value2[0].value); // <-----------------------------Valor del atributo json promedio uso
    });
  });
});
promedioUsoDiario = temp[0];
setPromedioUsoDiario = []; 
temp = [];

//---------------------------------Obtener datos para gráfica de peso
getUsoActual();
//console.log(setUsoActual);
Object.entries(setUsoActual).map(([key,value]) => {
  //console.log(setUsoActual);
  //console.log("*******************************");
  Object.entries(value).map(([key1,value1]) => {
    //console.log(value1);
    Object.entries(value1).map(([key2,value2]) => { 
      //console.log(value2);
      temp.push(value2[0].value); // <-----------------------------Valor del atributo json uso en vivo sería 3
      temp.push(value2[1].value);
      temp.push(value2[2].value);
    });
  });
});
//console.log(temp);
estadoActual = temp[1];
horaInicio = temp[0];
tiempoUsoActual = temp[2];
setUsoActual = []; 
temp = [];
setState = [];



  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-badge text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Uso total (hrs)</p>
                      <Card.Title as="h4">{usoTotalHoras}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>

              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-time-alarm text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Peso actual (lb)</p>
                      <Card.Title as="h4">{pesoActual}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>

              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Prom. levanta</p>
                      <p className="card-category">Diario</p>
                      <Card.Title as="h4">{promedioLevantaDiario}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>

              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Prom. uso</p>
                      <p className="card-category">Diario (hrs)</p>
                      <Card.Title as="h4">{promedioUsoDiario}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>

              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Peso</Card.Title>
                <p className="card-category">Evolución</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHoras">
                  <ChartistGraph
                    data={pesoEvolucion}
                    type="Line"
                    options={{
                      seriesBarDistance: 1,
                      low: {pesoMenor},
                      high: {pesoMayor},
                      showArea: false,
                      height: "245px",
                      fullWidth: true,
                      showLabel: false,              
                    }}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  libras/día
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Uso actual</Card.Title>
                <p className="card-category">Tiempo real (hrs)</p>
              </Card.Header>
              <Card.Body>
                <div>
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0"></th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Hora de inicio:</td>
                      <td>{estadoActual}</td>
                    </tr>
                    <tr>
                      <td>Hora fin:</td>
                      <td>{tiempoUsoActual}</td>
                    </tr>
                    <tr>
                      <td>Tiempo de uso:</td>
                      <td>{horaInicio} horas</td>
                    </tr>
                  </tbody>
                </Table>
                </div>
                <hr></hr>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="10">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Días de mayor uso</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
              <div className="ct-chart" id="chartHoras">
                  <ChartistGraph
                    data={diasMayorUso}
                    type="Bar"
                    options={{
                      seriesBarDistance: 1,
                      low: 0,
                      high: 50,
                      showArea: false,
                      height: "245px",
                      fullWidth: true,
                      showLabel: false,
                    axisY: {
                      offset: 0,
                      labelInterpolationFnc: () => ''
                    }                   
                    }}
                  />
                  </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Días de la semana 
                </div>
                <hr></hr>

              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
