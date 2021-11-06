import React,{ useState,useEffect  } from "react";
import ChartistGraph from "react-chartist";
import DatePicker from 'react-date-picker'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DataGrid } from '@mui/x-data-grid';

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
global.temp3 =[];
global.temp4 =[];
global.setConsultaMayorUso = [];
global.setConsultaMenorUso = [];




const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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



function DiasUso() {
    //Estado
    const [anio, setAnio] = useState("");
    const [mes, setMes] = useState("");
    const [buscar, setBuscar] = useState(0);
    const [diasMayor, setDiasMayor] = useState([]);

    
//Cargar datos de la consulta
if(temp3.length != 0){
  if (setConsultaMayorUso.length !=0){
    setConsultaMayorUso = [];
  }
  Object.entries(temp3).map(([key,value]) => {
    //console.log(temp);
    if (setConsultaMayorUso.length < 7){
      setConsultaMayorUso.push(value);
    }
    //console.log(value);
  });

}

if(temp4.length != 0){
  if (setConsultaMenorUso.length !=0){
    setConsultaMenorUso = [];
  }
  Object.entries(temp4).map(([key,value]) => {
    //console.log(temp);
    if (setConsultaMenorUso.length < 7){
      setConsultaMenorUso.push(value);
    }
    //console.log(value);
  });
}

//---------------------Validar Form

function validateForm() {
  return anio.length===4 && mes.length===2;
}

//---------------------Validar form

//---------------------Manejar cambios en el form
function handleSubmit(event) {
  //Consulta al back y get información
  setBuscar(buscar+1);
  event.preventDefault();
  //console.log('Entro al manejador');
  getConsultaDiasMayor();
  getConsultaDiasMenor();

  //Probando useEffects
  //setDiasMayor(...diasMayor,setConsultaMayorUso);
  //console.log(res);
  //console.log(setIdUsuario);
  setMes('');
  setAnio('');
}
//---------------------Manejar cambios en el form


//-------------------------------Consulta

function getConsultaDiasMayor(){
  if (temp3.length != 0){
    //console.log("temp tiene algo");
    temp3 = [];
  }
  let nuevaEntrada = {
    anio: anio,
    mes: mes
  }
  //console.log("Entro al metodo post");
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevaEntrada)
  };
  //console.log(requestOptions);

  let promesa = new Promise( async (resolve,reject) =>{
    const res = await fetch('http://localhost:3001/DIASMAYORUSOCONSULT', requestOptions,{mode:'cors'}) // <------------Ruta post para la consulta del id del usuario
    .then((response) => {

      resolve(response.json());
    })
    .then((dato) => {
      resolve(dato);
    })  

  });
  promesa.then( result => {
    temp3.push(result);
    //ob.dato1 = result.description;
    //ob.dato2 = result.numero;
  }, function (error){

  });
  //console.log("Entro al metodo post");
  //console.log(result);
  setTimeout(() => { 
    if (setConsultaMayorUso.length !=0){
      setConsultaMayorUso = [];
    }
    Object.entries(temp3).map(([key,value]) => {
      //console.log(temp);
      if (setConsultaMayorUso.length<7){
        setConsultaMayorUso.push(value);
      }
      
      //console.log(value);
    });
  }, 10);   
}
//---------------------------------Consulta

/*
useEffect(() => {
  console.log("Hola mundo");
  }, [buscar])
*/
//-------------------------------Consulta menor

function getConsultaDiasMenor(){
  if (temp4.length != 0){
    //console.log("temp tiene algo");
    temp4 = [];
  }
  let nuevaEntrada = {
    anio: anio,
    mes: mes
  }
  //console.log("Entro al metodo post");
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevaEntrada)
  };
  //console.log(requestOptions);

  let promesa = new Promise( async (resolve,reject) =>{
    const res = await fetch('http://localhost:3001/DIASMENORUSOCONSULT', requestOptions,{mode:'cors'}) // <------------Ruta post para la consulta del id del usuario
    .then((response) => {

      resolve(response.json());
    })
    .then((dato) => {
      resolve(dato);
    })  

  });
  promesa.then( result => {
    temp4.push(result);
    //ob.dato1 = result.description;
    //ob.dato2 = result.numero;
  }, function (error){

  });
  //console.log("Entro al metodo post");
  //console.log(result);
  setTimeout(() => { 
    if (setConsultaMenorUso.length !=0){
      setConsultaMenorUso = [];
    }
    Object.entries(temp4).map(([key,value]) => {
      //console.log(temp);
      if (setConsultaMenorUso.length < 7){
        setConsultaMenorUso.push(value);
      }  
      //console.log(value);
    });
  }, 10);   
}
//---------------------------------Consulta menor





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
  getMenorUso();
  if (temp3.length != 0){
    Object.entries(setConsultaMayorUso).map(([key,value]) => {
      //console.log(key);
      //console.log("*******************************");
      Object.entries(value).map(([key1,value1]) => {
        
        Object.entries(value1).map(([key2,value2]) => { 
          //console.log(value2);
          if (datosDiasMayorUso.length<7){
            datosDiasMayorUso.push(value2[0].value); // <-----------------------------Valor del atributo json para dias de mayor uso
          }
          
        });
      });
    });
    Object.entries(setConsultaMenorUso).map(([key,value]) => {
      //console.log(key);
      //console.log("*******************************");
      Object.entries(value).map(([key1,value1]) => {
        
        Object.entries(value1).map(([key2,value2]) => { 
          if (datosDiasMenorUso.length < 7){
            datosDiasMenorUso.push(value2[0].value); // <-----------------------------Valor del atributo json para dias de mayor uso
          }     
        });
      });
    });  
    setConsultaMayorUso = [];
    setConsultaMenorUso = [];
    temp3 = [];
    temp4 = [];
  }else{
    Object.entries(setMayorUso).map(([key,value]) => {
      //console.log(key);
      //console.log("*******************************");
      Object.entries(value).map(([key1,value1]) => {
        
        Object.entries(value1).map(([key2,value2]) => { 
          if (datosDiasMayorUso.length < 7){
            datosDiasMayorUso.push(value2[0].value); // <-----------------------------Valor del atributo json para dias de mayor uso
          }         
        });
      });
    });
    Object.entries(setMenorUso).map(([key,value]) => {
      //console.log(key);
      //console.log("*******************************");
      Object.entries(value).map(([key1,value1]) => {
        
        Object.entries(value1).map(([key2,value2]) => { 
          if (datosDiasMenorUso.length < 7){
            datosDiasMenorUso.push(value2[0].value); // <-----------------------------Valor del atributo json para dias de mayor uso
          }         
        });
      });
    });  
  } 
  //datosDiasMayorUso.pop();
  //datosDiasMayorUso.pop();
  setMayorUso = []; 
    var diasMayorUso = {
      labels: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
      series: [datosDiasMayorUso]
    }
  //-------------------------Conseguir datos para dias de menor uso
  
  //datosDiasMenorUso.pop();
  //datosDiasMenorUso.pop();
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
      labels: ["Domingo","Sábado","Viernes","Jueves","Miércoles","Martes","Lunes"],
      series: [datosDiasMenorUso,stackbar]
    }

  //-------------------------Conseguir datos para peso actual
  getPeso();
  Object.entries(setPesoActual).map(([key,value]) => {
    //console.log(key);
    //console.log("*******************************");
    Object.entries(value).map(([key1,value1]) => {
      
      Object.entries(value1).map(([key2,value2]) => {
        //console.log(value2);  
        temp.push(value2[0].value); // <-----------------------------Valor del atributo json evolución peso 
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
              <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="año">
                  <Form.Label>Año</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="YYYY"
                    value={anio}
                    onChange={(e) => setAnio(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="mes">
                  <Form.Label>Mes</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="MM"
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
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
