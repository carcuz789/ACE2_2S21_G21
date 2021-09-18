import React,{ useState } from "react";
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
} from "react-bootstrap";

global.setHistorial =[];
global.datoBuscar = '';
function getHistorial(){
  
  fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta para traer todos los datos historial
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    setHistorial.push(dato);
    return dato;
  })    
}

function filtrar(){
  let nuevaEntrada = {  // <------------El formato json que tendría la consulta
    title: 'Nueva',
    description: 'Desc nueva',
    numero: 12,
    dia: 12
  }
  console.log("Entro al metodo post");
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevaEntrada)
};
  fetch('http://localhost:4000/api/tasks/', requestOptions,{mode:'cors'}) // <------------Ruta post para la consulta en una fecha específica
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  /*
  .then((dato) => {
    return dato;
  })    
  */
}

function handleSubmit(event) {
  console.log(fecha.value);
}

function validateForm() {
  return true;
}


function Historial() {
  //Estado
  const [fecha, setFecha] = useState("");

  //Inicialización de variables
  //let fechaTmp = ["01/09/2021","02/09/2021","03/09/2021","04/09/2021","05/09/2021"];
  //let horaInicioTmp = ["07:00","08:00","09:00","10:00","11:00"];
  //let horaFinTmp = ["12:00","13:00","14:00","15:00","16:00"];
  let fechaTmp = [];
  let horaInicioTmp = [];
  let horaFinTmp = [];

  //Consulta al back con getData y recoger información en un arreglo con los objetos
  getHistorial();
  Object.entries(setState).map(([key,value]) => {
    //console.log(key);
    //console.log("*******************************");
    Object.entries(value).map(([key1,value1]) => {
      //arrayDatos.push(value1);
      fechaTmp.push(value1.title); // <-----------------------------Valor del atributo json para fecha 
      horaInicioTmp.push(value1.numero); // <-----------------------------Valor del atributo json para inicio
      horaFinTmp.push(value1.dia); // <-----------------------------Valor del atributo json para fin
      //Agregando los números a los datos de la evolución del peso
    });
  });



  let datosTabla = {
      datos:[]
  }
  for (let i = 0; i<fechaTmp.length;i++){
    let dato = {
      fecha: fechaTmp[i],
      horaInicio: horaInicioTmp[i],
      horaFin: horaFinTmp[i]
    }
    datosTabla.datos.push(dato);
  }
  //console.log(datosTabla);
  setHistorial =[];
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12" >
          <Card className="card-stats" >
          <Card.Header>
            <Card.Title as="h4"  >Buscar</Card.Title>
          </Card.Header>
            <Col className="pr-1" md="6">
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
          </Card>
          </Col>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Historial del tiempo</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Fecha</th>
                      <th className="border-0">Hora inicio</th>
                      <th className="border-0">Hora fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosTabla.datos.map(dato=>{
                      return(
                        <tr>
                          <td>{dato.fecha}</td>
                          <td>{dato.horaInicio}</td>
                          <td>{dato.horaFin}</td>
                        </tr>
                      )
                      })
                    }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Historial;
