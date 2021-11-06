import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from 'axios';

global.temp = [];

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [peso, setPeso] = useState(0);
  const [validar, setValidar] = useState("");
  const [genero, setGenero] = useState('');
  const [altura, setAltura] = useState(0);
  const [edad, setEdad] = useState(0);
  const [calorias, setCalorias] = useState(0);
  const weekday = new Array(7);
  weekday[0] = "DOMINGO";
  weekday[1] = "LUNES";
  weekday[2] = "MARTES";
  weekday[3] = "MIERCOLES";
  weekday[4] = "JUEVES";
  weekday[5] = "VIERNES";
  weekday[6] = "SADADO";


    //console.log(temp);
    if (temp.length!= 0){    
      Object.entries(temp).map(([key,value]) => {
        //console.log(value);
        Object.entries(value).map(([key1,value1]) => {
          Object.entries(value1).map(([key1,value2]) => {
              pesoSilla = 0;
              console.log(value2[2].value);
          });
        });
      }); 
      temp = [];
    }

 
  function validateForm() {
    if (validar === 1){
      console.log('validado');
      setValidar = 0;
    }
    /*
    getData();
    getDiasMayorUso();
    getPromedioLevantaDiario();
    getPromedioUsoDiario();
    getUsoActual();
    getUsoTotalDias();
    getUsoTotalHoras();
    getHistorial();
    getMayorUso();
    getMenorUso();
    */
    return user.length > 0 && password.length > 0 && peso.length > 0;
  }

  

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
      if (setPesoActual.length !=0){
        setPesoActual = [];
      }
      setState.push(dato);
      setPesoActual.push(dato);
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
      setHistorial.push(dato);
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


  function handleSubmit(event) {
    //Consulta al back y get información
    event.preventDefault();
    iniciarSesion();
    //console.log(res);
    //console.log(setIdUsuario);
    /*
    Object.entries(setIdUsuario).map(([key,value]) => {
      Object.entries(value).map(([key1,value1]) => {
        temp2.push(value1); // <-----------------------------Valor del atributo json para idUsuario o idSilla
        console.log(value1);
      });
    });
    */
   setPeso(0);
   setPassword("");
   setUser("");
   setUbicacion("");
   setCalorias(0);
   setAltura(0);
   setGenero("");
   setEdad(0);
    setIdUsuario = [];
  }

  global.setIdUsuario = [];
  


  function iniciarSesion(){
    //get day
    const d = new Date();
    let day = weekday[d.getDay()];
    console.log(day);
    let nuevaEntrada = {
      usuario: user,
      contraseña: password,
      ubicacion: ubicacion,
      peso: peso,
      calorias: calorias,
      altura: altura,
      edad: edad,
      sexo: genero,
      dia: day
    }

    //console.log("Entro al metodo post");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaEntrada)
    };
    
    let promesa = new Promise( async (resolve,reject) =>{
      const res = await fetch('http://localhost:3001/INSERTARUSER', requestOptions,{mode:'cors'}) // <------------Ruta post para la consulta del id del usuario
      .then((response) => {

        resolve(response.json());
      })
      .then((dato) => {
        resolve(dato);
      })  

    });
    promesa.then( result => {
      //console.log(result);
      temp.push(result);
      //ob.dato1 = result.description;
      //ob.dato2 = result.numero;
    }, function (error){

    });
    
    setTimeout(() => { 
      Object.entries(temp).map(([key,value]) => {
        //console.log(value);
        Object.entries(value).map(([key1,value1]) => {
          Object.entries(value1).map(([key1,value2]) => {
              //pesoSilla = value2[2].value;
              console.log(value2[2].value);
          });
        });
      }); 
      idUsuario = user;
      sillaUbicacion = ubicacion;
    }, 10); 
  }

  //Código del form de peso
/*
  <Form.Group size="lg" controlId="peso">
  <Form.Label>Peso (Kg)</Form.Label>
  <Form.Control
    type="number"
    value={peso}
    onChange={(e) => setPeso(e.target.value)}
  />
</Form.Group>
*/

  function cargarUsuario(){
    fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta Get para traer info de idUsuario
    .then((response) => {
      //console.log("vino aquí",response);
      return  response.json();
    })
    .then((dato) => {
      //console.log(art);
      setIdUsuario.push(dato);
      console.log(dato);
      return dato;
    })  
  }

  return (
    <>
    <div class="text-center"> <h3>Ingreso</h3></div>
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="user">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            required
            value={user}
            placeholder="Nombre de usuario"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            required
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ubicacion">
          <Form.Label>Peso</Form.Label>
          <Form.Control
            type="text"
            required
            value={peso}
            placeholder="kilogramos"
            onChange={(e) => setPeso(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ubicacion">
          <Form.Label>Calorias</Form.Label>
          <Form.Control
            type="text"
            required
            value={calorias}
            placeholder="kilocalorías"
            onChange={(e) => setCalorias(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ubicacion">
          <Form.Label>Altura</Form.Label>
          <Form.Control
            type="text"
            required
            value={altura}
            placeholder="centímetros"
            onChange={(e) => setAltura(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ubicacion">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="text"
            required
            value={edad}
            placeholder="años"
            onChange={(e) => setEdad(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ubicacion">
          <Form.Label>Género</Form.Label>
          <Form.Control
            type="text"
            required
            value={genero}
            placeholder="másculino/femenino"
            onChange={(e) => setGenero(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" className="Submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
    </>
  );
}