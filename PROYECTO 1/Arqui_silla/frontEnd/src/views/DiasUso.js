import React,{ useState } from "react";
import ChartistGraph from "react-chartist";
import DatePicker from 'react-date-picker'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// react-bootstrap components
import {
  Badge,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

global.setPesoActual = [];
global.setMayorUso =[];
global.setMenorUso =[];



function handleSubmit(event) {
  event.preventDefault();
  console.log(fecha.value);
}

function validateForm() {
  return true;
}



function getPeso(){
  
  fetch('http://localhost:3001/GRAFICAPESO',{mode:'cors'}) // <------------Ruta para la evolución del peso
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(dato);
    if (setPesoActual.length !=0){
      setPesoActual = [];
    }
    setPesoActual.push(dato);
    return dato;
  })    
}

function getMayorUso(){
  
  fetch('http://localhost:3001/DIASMAYORUSO',{mode:'cors'}) // <------------Ruta para días de mayor uso
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(art);
    if (setMayorUso.length !=0){
      setMayorUso = [];
    }
    setMayorUso.push(dato);
    return dato;
  })    
}

function getMenorUso(){
  
  fetch('http://localhost:3001/DIASMENORUSO',{mode:'cors'}) // <------------Ruta para dias de menor uso
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(art);
    if (setMenorUso.length !=0){
      setMenorUso = [];
    }
    setMenorUso.push(dato);
    return dato;
  })    
}

function MyApp() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DatePicker
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

function DiasUso() {
    //Estado
    const [fecha, setFecha] = useState("");

  //Declaración de variables
    //Numeros o variables fijas
    var pesoActual = 15;
    let temp =[];
    //Debería de ser porcentajes por día
    //let datosDiasMayorUso = [50, 51, 52, 53, 54, 55, 56];
    let datosDiasMayorUso = [];
    //let datosDiasMenorUso = [50, 51, 52, 53, 54, 55, 56];
    let datosDiasMenorUso = [];

  //Consulta al back y get información
  //-------------------------Conseguir datos para dias de mayor uso
  getMayorUso();
  Object.entries(setMayorUso).map(([key,value]) => {
    //console.log(key);
    //console.log("*******************************");
    Object.entries(value).map(([key1,value1]) => {
      
      Object.entries(value1).map(([key2,value2]) => { 
        datosDiasMayorUso.push(value2[0].value); // <-----------------------------Valor del atributo json para dias de mayor uso
      });
    });
  });
  
  datosDiasMayorUso.pop();
  datosDiasMayorUso.pop();
  setMayorUso = []; 
    var diasMayorUso = {
      labels: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
      series: [datosDiasMayorUso]
    }
  //-------------------------Conseguir datos para dias de menor uso
  getMenorUso();
  Object.entries(setMenorUso).map(([key,value]) => {
    //console.log(key);
    //console.log("*******************************");
    Object.entries(value).map(([key1,value1]) => {
      
      Object.entries(value1).map(([key2,value2]) => { 
        datosDiasMenorUso.push(value2[0].value); // <-----------------------------Valor del atributo json para dias de mayor uso
      });
    });
  });  
  datosDiasMenorUso.pop();
  datosDiasMenorUso.pop();
  let promedio = 0;
  let stackbar = [];
  for (let i = 0; i< 7;i++){
    promedio+=datosDiasMenorUso[i]; 
  }
  promedio/=7;
  for (let i = 0; i< 7;i++){
    stackbar.push(promedio); 
  } 
  setMenorUso = []; 
    var diasMenorUso = {
      labels: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
      series: [datosDiasMenorUso,stackbar]
    }

  //-------------------------Conseguir datos para peso actual
  getPeso();
  Object.entries(setPesoActual).map(([key,value]) => {
    //console.log(key);
    //console.log("*******************************");
    Object.entries(value).map(([key1,value1]) => {
      
      Object.entries(value1).map(([key2,value2]) => {
        //console.log(value2[1].value);  
        temp.push(value2[1].value); // <-----------------------------Valor del atributo json evolución peso 
      });
    });
  });

  pesoActual = temp[temp.length-1];
  setPesoActual = []; 
  temp = [];

  /*
  //Array con la información de los días de mayor uso sin variables cuantitativas
  var diasMayorUso = {
    labels: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
    series: [datosDiasMayorUso]
  }
  //Array para los días de menor uso
  var diasMenorUso = {
    labels: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
    series: [datosDiasMenorUso]
  }
  */


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
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <div>
    </div>
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
                <div className="stats">
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="5" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="3">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-time-alarm text-success"></i>
                    </div>
                  </Col>
                  <Col xs = "5">
              <Form onChange={handleSubmit}>
                <Form.Group size="lg" controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" className="Submit" disabled={!validateForm()}>
                  Filtrar
                </Button>
              </Form>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">                           
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
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
                      high: 30,
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
                  Veces/día
                </div>
                <hr></hr>
                <div className="stats">
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="12" xs="2">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Días de menor uso</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHoras">
                  <ChartistGraph
                    data={diasMenorUso}
                    type="Bar"
                    options={{
                      seriesBarDistance: 1,
                      low: 0,
                      high: 20,
                      showArea: false,
                      height: "245px",
                      fullWidth: true,
                      showLabel: false,  
                      reverseData: true,
                      horizontalBars: true,  
                      axisY: {
                        offset: 75
                      },
                      style: 'stroke-width: 30px',  
                      stackBars: true
                       
                    }}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-danger"></i>
                  Veces/día
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>                 
                  Media
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

export default DiasUso;
