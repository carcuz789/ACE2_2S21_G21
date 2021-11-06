import React, {useState,useEffect} from "react";
import ChartistGraph from "react-chartist";
var TimerMixin = require('react-timer-mixin');
import axios from 'axios';
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



function Calorias() {
    const [altura, setAltura] = useState(null);
    const [pulsasion,setPulsasion] = useState(null);
    const [genero, setGenero] = useState(null);
    const [pesoIn, setPeso] = useState(null);
    const [calorias, setCalorias] = useState(null);
    const [edad, setEdad] = useState(null);
    const [validar, setValidar] = useState(null);
    const [rawData, setRawData] = useState(null);
    const [caloricoSemana, setCaloricoSemana] = useState(null);
    const [datosCaloricoSemana, setDatosCaloricoSemana] = useState([]);
    const [caloriasEvolucion, setCaloriasEvolucion] = useState(null);
    const [caloriasMinimo, setCaloriasMinimo] = useState(0);
    const [caloriasMaximo, setCaloriasMaximo] = useState(0);
    const [diasMenorRaw, setDiasMenorRaw] = useState(null);
    const [diasMenor, setDiasMenor] = useState(null);
    const [pulsacionesSemanaRaw, setPulsacionesSemanaRaw] = useState(null);
    const [pulsacionesSemana, setPulsacionesSemana] = useState(null);
    const [deficit, setDeficit] = useState(null);
    const [pulsacion, setPulsacion] = useState(null);
    const [pulsacionRaw, setPulsacionRaw] = useState(null);
    const [gastoCalorico, setGastoCalorico] = useState(null);
    const [gastoPRE, setGastoPRE] = useState(null);
    const [basal, setBasal] = useState(null);
    //Variables para gráfica 1
    var semana = "W ";
    var contador = 1;
    var labelsCaloriasEvolucion = [];
    var datosCaloriasEvolucion = [];
    var caloriasEvolucionPre = {
      labels: 0,
      series: 0
    }

    //Variables para gráfica 2 dias con menor actividad
    var diasSemana = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
    var labelsDiasMenor = [];
    var datosDiasMenor = [];
    var diasMenorPre = {
      labels: 0,
      series: 0
    }

    //Variables para gráfica 3
    var labelsPulsacionesSemana = [];
    var datosulsacionesSemana = [];
    var promedioPRE = [];
    var acumulado = 0;
    var ulsacionesSemanarPre = {
      labels: 0,
      series: 0
    }



    //Variables para la gráfica de líneas con pulsasiones y el promedio de pulsasiones
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        series: [
          [1, 5, 2, 5, 4, 3],
          [2, 3, 4, 8, 1, 2]
        ]};      

    const options = {
        low: 0,
        showArea: true,
        showPoint: false,
        fullWidth: true
    }

    const type = 'Line';



    const show = () =>{


    }


      
    
    async function getCaloricoSemana () {
      let URL = 'http://localhost:3001/GASTOSEMANALCALORICO';
      try {
          axios.get(URL)
          .then((res) => {

            setCaloricoSemana(res.data.rows);
          })  
      } catch (err) {
          console.error(err.message);
      }
      };

      async function getGasto () {
        let URL = 'http://localhost:3001/GETGASTO';
        try {
            axios.get(URL)
            .then((res) => {
              setGastoPRE(res.data.rows);
            })  
        } catch (err) {
            console.error(err.message);
        }
        };
  

    async function getRawData () {
        let URL = 'http://localhost:3001/CONSULTAUSER';
        try {
            axios.get(URL)
            .then((res) => {
            setRawData(res.data.rows[0]);
            setPulsacionRaw(res.data.rows[1]);
            })  
        } catch (err) {
            console.error(err.message);
        }
        };

    async function getDiasMenor () {
      let URL = 'http://localhost:3001/DIASMENORACTIVIDADFISICA';
      try {
          axios.get(URL)
          .then((res) => {
          setDiasMenorRaw(res.data.rows);
            console.log(res.data.rows);
          })  
      } catch (err) {
          console.error(err.message);
      }
      };

      

      async function getPulsacionesSemana () {
        let URL = 'http://localhost:3001/PULSASIONESSEMANAES';
        try {
            axios.get(URL)
            .then((res) => {
            setPulsacionesSemanaRaw(res.data.rows);
            })  
        } catch (err) {
            console.error(err.message);
        }
        };        

    useEffect( async() => { 
        if (rawData === null){
            await getRawData();
            await getCaloricoSemana();
            await getDiasMenor();
            await getPulsacionesSemana();
            await getGasto();
        }else if (rawData && caloricoSemana && diasMenorRaw && pulsacionesSemanaRaw && pulsacionRaw && gastoPRE){
            //Aqui cargar todos los valores de todas las variables
            //Get la pulsación actual
            setPulsacion(pulsacionRaw[0].value);

            Object.entries(caloricoSemana).map(([key,value]) => {
              labelsCaloriasEvolucion.push(semana+contador);
              datosCaloriasEvolucion.push(value[0].value);
              if (caloriasMaximo < value[0].value){
                setCaloriasMaximo(value[0].value);
              }
              if (caloriasMinimo > value[0].value){
                setCaloriasMinimo(value[0].value);
              }
              contador++;
            });
            contador = 0;
            Object.entries(diasMenorRaw).map(([key,value]) => {
              labelsDiasMenor.push(diasSemana[contador]); 
              datosDiasMenor.push(value[0].value);
              contador++;
            });
            contador = 0;
            Object.entries(pulsacionesSemanaRaw).map(([key,value]) => {
              labelsPulsacionesSemana.push(diasSemana[contador]); 
              datosulsacionesSemana.push(value[0].value);
              acumulado += value[0].value;
              contador++;
            });
            acumulado /= (contador+1);
            //Grafica 1
            caloriasEvolucionPre.labels = labelsCaloriasEvolucion;
            caloriasEvolucionPre.series = [datosCaloriasEvolucion];
            setCaloriasEvolucion(caloriasEvolucionPre);
            //Grafica 2
            diasMenorPre.labels = labelsDiasMenor;
            diasMenorPre.series = [datosDiasMenor];
            setDiasMenor(diasMenorPre);
            //Grafica 3
            //Crear promedio para la gráfica 3 
            for (let i=0; i< contador; i++){
              promedioPRE.push(acumulado);
            } 
            ulsacionesSemanarPre.labels = labelsPulsacionesSemana;
            ulsacionesSemanarPre.series = [datosulsacionesSemana,promedioPRE];

            //Calcular el gasto calórico
             
            setPulsacionesSemana(ulsacionesSemanarPre);                             
            setPeso(rawData[2].value);
            setCalorias(rawData[3].value);
            setAltura(rawData[4].value);
            setBasal(rawData[5].value)
            setEdad(rawData[6].value);
            setGenero(rawData[7].value);
            setDeficit(rawData[8].value);  
            setGastoCalorico(gastoPRE[0][0].value); 


        }
    }, [rawData,caloricoSemana,diasMenorRaw,pulsacionesSemanaRaw,pulsacionRaw,gastoPRE]);
    


  let pesoActual = 0;
  //Numeros o variables fijas
  var usoTotalHoras = 15;
  var usoTotalDias = 14;
  //Datos para las gráficas
  let datosPesoEvolucion = [50, 51, 52, 53, 54, 55, 56];
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
  let datosDiasMayorUso = [50, 51, 52, 53, 54, 55, 56];
  //Array con la información de los días de mayor uso sin variables cuantitativas
  //Variable para guardar información temporalmente
  let temp = [];

  let etiquetas = [1,2,3,4,5];


  //datosDiasMayorUso.pop();
  //datosDiasMayorUso.pop();
  var diasMayorUso = {
    labels: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
    series: [datosDiasMayorUso]
  }
/*
  var semana = "Semana ";
  var labelsCaloriasEvolucion = [];
  var caloriasEvolucion = {
    labels: 0,
    series: 0
  }

  if (datosCaloricoSemana.length > 0){
    for (let i = 0; i> datosCaloricoSemana.length; i++){
      labelsCaloriasEvolucion.push(semana+i);
    }
    caloriasEvolucion.labels = [labelsCaloriasEvolucion];
    caloriasEvolucion.series = [datosCaloricoSemana];

  }
*/
  
/*
  var caloriasEvolucion = {
    labels: [labelsCaloriasEvolucion],
    series: [datosCaloricoSemana]
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
                      <i className="nc-icon nc-ruler-pencil text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Altura (cm)</p>
                      <Card.Title as="h4">{altura}</Card.Title>
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
                      <i className="nc-icon nc-single-02 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Peso actual (lb)</p>
                      <Card.Title as="h4">{pesoIn}</Card.Title>
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
                      <i className="nc-icon nc-chart-pie-36 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Ingesta de calorías</p>
                      <Card.Title as="h4">{calorias}</Card.Title>
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
                      <p className="card-category">Edad (años)</p>
                      <Card.Title as="h4">{edad}</Card.Title>
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
                <Card.Title as="h4">Gasto calórico</Card.Title>
                <p className="card-category">Evolución</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHoras">
                  <ChartistGraph
                    data={caloriasEvolucion}
                    type="Line"
                    options={{
                      seriesBarDistance: 1,
                      low: {caloriasMinimo},
                      high: {caloriasMaximo},
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
                  kcalorias/día
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Registro de calorías</Card.Title>
                <p className="card-category">Tiempo real</p>
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
                      <td>Pulsaciones:</td>
                      <td>{pulsacion} bpm</td>
                    </tr>
                    <tr>
                      <td>Metabolismo basal:</td>
                      <td>{basal} kcalorias</td>
                    </tr>
                    <tr>
                      <td>Gasto calórico actual:</td>
                      <td>{gastoCalorico} kcalorias</td>
                    </tr>
                    <tr>
                      <td>Déficit calórico:</td>
                      <td>{deficit} kcalorias</td>
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
                <Card.Title as="h4">Días con menor actividad física</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
              <div className="ct-chart" id="chartHoras">
                  <ChartistGraph
                    data={diasMenor}
                    type="Bar"
                    options={{
                      seriesBarDistance: 1,
                      low: 0,
                      high: 3000,
                      showArea: false,
                      height: "245px",
                      fullWidth: true,
                      showLabel: true,
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
        <Row>
          <Col md="10">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Evolución de pulsasiones</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
              <div className="ct-chart" id="chartHoras">
                  <ChartistGraph data={pulsacionesSemana} options={options} type={type}/>
                  </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Pulsasiones por minuto 
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

export default Calorias;
