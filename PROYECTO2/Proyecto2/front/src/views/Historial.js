import React,{ useState } from "react";
import Form from "react-bootstrap/Form";
import ChartistGraph from "react-chartist";
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
global.temp2=[];
global.result=[];
global.datoBuscar = '';
global.setConsulta =[];
global.setHorarioUso = [];
function getHistorial(){
  
  fetch('http://localhost:3001/HISTORIALTIEMPO',{mode:'cors'}) // <------------Ruta para traer todos los datos historial
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    //console.log(dato);
    if (setHistorial.length !=0){
      setHistorial = [];
    }
    setHistorial.push(dato.rows);
    console.log(dato);
    return dato;
  })    
}




function Historial() {
  //Estado
  //console.log(temp.length);
  var graficaHorario = [];  
  var horarioEncontrado = false;

  var data = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [20, 15, 40]
  };

  //Cargar datos de la consulta
  if(temp2.length != 0){
    if (setConsulta.length !=0){
      setConsulta = [];
    }
    Object.entries(temp2).map(([key,value]) => {
      //console.log(temp);
      setConsulta.push(value);
      //console.log(value);
    });
  }

  const [fecha, setFecha] = useState("");
  const [validar, setValidar] = useState(1);

  function validateForm() {
    return fecha.length === 8;
  }


  function getConsulta(){

    if (temp2.length != 0){
      //console.log("temp tiene algo");
      temp2 = [];
    }
    let nuevaEntrada = {
      fecha: fecha,
    }
    //console.log("Entro al metodo post");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaEntrada)
    };
    //console.log(requestOptions);

    let promesa = new Promise( async (resolve,reject) =>{
      const res = await fetch('http://localhost:3001/FECHACONSULTA', requestOptions,{mode:'cors'}) // <------------Ruta post para la consulta del id del usuario
      .then((response) => {
  
        resolve(response.json());
      })
      .then((dato) => {
        resolve(dato);
      })  
  
    });
    promesa.then( result => {
      temp2.push(result);
      //ob.dato1 = result.description;
      //ob.dato2 = result.numero;
    }, function (error){
  
    });
    //console.log("Entro al metodo post");
    //console.log(result);
    setTimeout(() => { 
      if (setConsulta.length !=0){
        setConsulta = [];
      }
      Object.entries(temp2).map(([key,value]) => {
        //console.log(temp);
        setConsulta.push(value);
        //console.log(value);
      });
    }, 10);   
  }


  function handleSubmit(event) {
    //Consulta al back y get información

    event.preventDefault();
    //console.log('Entro al manejador');
    getConsulta();
    //console.log(res);
    //console.log(setIdUsuario);
    setFecha('');
  }

  //Inicialización de variables
  //let fechaTmp = ["01/09/2021","02/09/2021","03/09/2021","04/09/2021","05/09/2021"];
  //let horaInicioTmp = ["07:00","08:00","09:00","10:00","11:00"];
  //let horaFinTmp = ["12:00","13:00","14:00","15:00","16:00"];
  let fechaTmp = [];
  let horaInicioTmp = [];
  let horaFinTmp = [];

  //Consulta al back con getData y recoger información en un arreglo con los objetos
  getHistorial();

  if (temp2.length != 0){
    if (setHorarioUso.length != 0){
      setHorarioUso = []
    }
    Object.entries(setConsulta).map(([key,value]) => {
      //console.log(key);
      //console.log("*******************************");
      Object.entries(value).map(([key1,value1]) => {
        
        Object.entries(value1).map(([key2,value2]) => { 
          console.log(value2);
          let string = value2[3].value;
          let hora = value2[2].value;
          if (hora[1]===':'){
            hora = hora.substring(0,1);
          }else{
            hora = hora.substring(0,2);
          }   
          fechaTmp.push(string.substring(0,10)); // <-----------------------------Valor del atributo json para fecha 
          horaInicioTmp.push(value2[2].value); // <-----------------------------Valor del atributo json para inicio
          horaFinTmp.push(value2[1].value); // <-----------------------------Valor del atributo json para fin
          
          if (setHorarioUso.length === 0){
            let nuevaHora = {
              hora:hora,
              cantidad: 1
            }
            setHorarioUso.push(nuevaHora);
          }else{
            Object.entries(setHorarioUso).map(([key3,value3]) => { 
              if (value3.hora === hora){
                value3.cantidad = value3.cantidad+1;
                horarioEncontrado = true;
              }
            });

            if (!horarioEncontrado){
              let nuevaHora = {
                hora:hora,
                cantidad: 1
              }
              setHorarioUso.push(nuevaHora);
            }else{
              horarioEncontrado = false;
            }
          }
          
        });
      });
    });
    setConsulta = [];
    temp2 = [];
  }else{
    if (setHorarioUso.length != 0){
      setHorarioUso = []
    }
    Object.entries(setHistorial).map(([key,value]) => {
      //console.log(key);
      //console.log("*******************************");
      Object.entries(value).map(([key1,value1]) => {
        console.log("Entro aca");
        console.log(value1);
          //console.log(value2);
          let string = value1[0].value;
          let hora = value1[2].value;
          if (hora[1]===':'){
            hora = hora.substring(0,1);
          }else{
            hora = hora.substring(0,2);
          }      
          fechaTmp.push(string.substring(0,10)); // <-----------------------------Valor del atributo json para fecha 
          horaInicioTmp.push(value1[1].value); // <-----------------------------Valor del atributo json para inicio
          horaFinTmp.push(value1[2].value); // <-----------------------------Valor del atributo json para fin
        
          if (setHorarioUso.length === 0){
            let nuevaHora = {
              hora:hora,
              cantidad: 1
            }
            setHorarioUso.push(nuevaHora);
          }else{
            Object.entries(setHorarioUso).map(([key3,value3]) => { 
              if (value3.hora === hora){
                value3.cantidad = value3.cantidad+1;
                horarioEncontrado = true;
              }
            });

            if (!horarioEncontrado){
              let nuevaHora = {
                hora:hora,
                cantidad: 1
              }
              setHorarioUso.push(nuevaHora);
            }else{
              horarioEncontrado = false;
            }
          }       
      });
    });
  }

  let datosTabla = {
      datos:[]
  }

  let datosHorario = {
      labels: [],
      series: []
  }

  //Llenar los datos de la gráfica de horarios pie
  for (let i = 0; i<setHorarioUso.length;i++){
      datosHorario.labels.push(setHorarioUso[i].hora);
      datosHorario.series.push(setHorarioUso[i].cantidad); 
  }
  console.log(datosHorario);

  //Ordenar datos
  /*
  for (let i = 0; i<setHorarioUso.length;i++){
    for (let j = i+1; j<setHorarioUso.length;j++){
      if (setHorarioUso[i]){

      }
  }
}
*/


  data.labels = datosHorario.labels;
  data.series = datosHorario.series;
  var labelsHorario = data.labels;
  var seriesHorario = data.series;
  var tempHorario = 0;

  //ordenar datos de horario
  for (let i = 0; i<labelsHorario.length;i++){
    for (let j = i; j<labelsHorario.length;j++){
      if (Number(labelsHorario[i])>Number(labelsHorario[j])){
        tempHorario = seriesHorario[i];
        seriesHorario[i] = seriesHorario[j];
        seriesHorario[j] = tempHorario;
        tempHorario = labelsHorario[i];
        labelsHorario[i] = labelsHorario[j];
        labelsHorario[j] = tempHorario;
      }
    }
  }
  //Formatear horario
  for (let i = 0; i<labelsHorario.length;i++){
    labelsHorario[i] = labelsHorario[i]+":00";
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
              <Form onSubmit={handleSubmit}>
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
        <Row>
        <Col md="12" xs="2">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Horario de uso</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHoras">
                <ChartistGraph
                    data={{
                      labels: labelsHorario,
                      series: [
                        seriesHorario
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 140,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>                 
                  Cantidad/Hora
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

export default Historial;
