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
  
  fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta para la evolución del peso
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(art);
    setState.push(dato);
    return dato;
  })    
}


function getDiasMayorUso(){
  
  fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta para dias con mayor uso
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(art);
    setDiasMayorUso.push(dato);
    return dato;
  })    
}

function getUsoTotalHoras(){
  
  fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta para Uso total en horas
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(art);
    setUsoTotalHoras.push(dato);
    return dato;
  })    
}

function getUsoTotalDias(){
  
  fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta para Uso total en dias
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(art);
    setUsoTotalDias.push(dato);
    return dato;
  })    
}

function getPromedioLevantaDiario(){
  
  fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta para Promedio que se levanta diario
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(art);
    setPromedioLevantaDiario.push(dato);
    return dato;
  })    
}

function getPromedioUsoDiario(){
  
  fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta para variable de uso diario
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(art);
    setPromedioUsoDiario.push(dato);
    return dato;
  })    
}


function getUsoActual(){
  
  fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta para Uso actual en vivo
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(art);
    setUsoActual.push(dato);
    return dato;
  })    
}


function Dashboard() {

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
      //arrayDatos.push(value1);
      datosPesoEvolucion.push(value1.numero); // <-----------------------------Valor del atributo json evolución peso
      //console.log(value1);
      //Agregando los números a los datos de la evolución del peso
    });
  });
    //Actualizar datos
    var pesoEvolucion = {
      labels: [1,2,3,4,5,6,7],
      //series: [datosPesoEvolucion]
      series: [datosPesoEvolucion]
    }
    //console.log("Evolución del peso");
    //console.log(datosPesoEvolucion);
  //Reiniciar para evitar duplicados
  setState = [];
//---------------------------------Obtener datos para gráfica de dias de mayor uso
  getDiasMayorUso();
  Object.entries(setDiasMayorUso).map(([key,value]) => {
    //console.log(key);
    //console.log("*******************************");
    Object.entries(value).map(([key1,value1]) => {
      //arrayDatos.push(value1);
      datosDiasMayorUso.push(value1.numero); // <-----------------------------Valor del atributo json dias mayor uso
      //console.log(value1);
      //Agregando los números a los datos de la evolución del peso
    });
  });
  setDiasMayorUso = []; 
    var diasMayorUso = {
      labels: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
      series: [datosDiasMayorUso]
    }

//---------------------------------Obtener datos para gráfica de peso
getUsoTotalHoras();
Object.entries(setUsoTotalHoras).map(([key,value]) => {
  //console.log(key);
  //console.log("*******************************");
  Object.entries(value).map(([key1,value1]) => {
    //arrayDatos.push(value1);
    temp.push(value1.numero); // <-----------------------------Valor del atributo json uto total en horas
    //console.log(value1);
    //Agregando los números a los datos de la evolución del peso
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
    //arrayDatos.push(value1);
    temp.push(value1.numero); // <-----------------------------Valor del atributo json uso total en dias
    //console.log(value1);
    //Agregando los números a los datos de la evolución del peso
  });
});
usoTotalDias = temp[0];
temp = [];
setUsoTotalDias = []; 

//---------------------------------Obtener datos para gráfica de peso
getPromedioLevantaDiario();
Object.entries(setPromedioLevantaDiario).map(([key,value]) => {
  //console.log(key);
  //console.log("*******************************");
  Object.entries(value).map(([key1,value1]) => {
    //arrayDatos.push(value1);
    temp.push(value1.numero); // <-----------------------------Valor del atributo json promedio de levantarse
    //console.log(value1);
    //Agregando los números a los datos de la evolución del peso
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
    //arrayDatos.push(value1);
    temp.push(value1.numero); // <-----------------------------Valor del atributo json promedio uso
    //console.log(value1);
    //Agregando los números a los datos de la evolución del peso
  });
});
promedioUsoDiario = temp[0];
setPromedioUsoDiario = []; 
temp = [];

//---------------------------------Obtener datos para gráfica de peso
getUsoActual();
Object.entries(setUsoActual).map(([key,value]) => {
  //console.log(key);
  //console.log("*******************************");
  Object.entries(value).map(([key1,value1]) => {
    //arrayDatos.push(value1);
    temp.push(value1.numero); // <-----------------------------Valor del atributo json uso en vivo sería 3
    //console.log(value1);
    //Agregando los números a los datos de la evolución del peso
  });
});
estadoActual = temp[0];
horaInicio = temp[0];
tiempoUsoActual = temp[0];
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
                      <p className="card-category">Uso total (días)</p>
                      <Card.Title as="h4">{usoTotalDias}</Card.Title>
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
                      low: 10,
                      high: 80,
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
                  Kilos/día
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
                      <td>Estado actual:</td>
                      <td>{estadoActual}</td>
                    </tr>
                    <tr>
                      <td>Hora de inicio:</td>
                      <td>{horaInicio}</td>
                    </tr>
                    <tr>
                      <td>Tiempo de uso:</td>
                      <td>{tiempoUsoActual} horas</td>
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
                      low: 10,
                      high: 80,
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
