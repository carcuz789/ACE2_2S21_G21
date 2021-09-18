import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";


export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [peso, setPeso] = useState("");

  function validateForm() {
    return user.length > 0 && password.length > 0 && peso.length > 0;
  }

  

  function handleSubmit(event) {
    //Consulta al back y get información
    
    let temp = [];
    //console.log(user);
    //datos.pop();
    //console.log("****************************");
    event.preventDefault();
    iniciarSesion();
    cargarUsuario();
    Object.entries(setIdUsuario).map(([key,value]) => {
      //console.log(key);
      //console.log("*******************************");
      Object.entries(value).map(([key1,value1]) => {
        temp.push(value1.dia); // <-----------------------------Valor del atributo json para idUsuario o idSilla
        //console.log(value1.dia);
      });
    });
    idUsuario = temp[0];
    //console.log("El id es",idUsuario);
    setIdUsuario = [];
  }

  global.setIdUsuario = [];
  

  function iniciarSesion(){
    let nuevaEntrada = {
      title: user,
      description: ubicacion,
      numero: peso,
      dia: 12
    }
    //console.log("Entro al metodo post");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaEntrada)
  };
    fetch('http://localhost:4000/api/tasks/', requestOptions,{mode:'cors'}) // <------------Ruta post para la consulta del id del usuario
    .then((response) => {
      //console.log("vino aquí",response);
      return  response.json();
    })
  }


  function cargarUsuario(){
    fetch('http://localhost:4000/api/tasks/',{mode:'cors'}) // <------------Ruta Get para traer info de idUsuario
    .then((response) => {
      //console.log("vino aquí",response);
      return  response.json();
    })
    .then((dato) => {
      //console.log(art);
      setIdUsuario.push(dato);
      //console.log(dato);
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
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ubicacion">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="peso">
          <Form.Label>Peso (Kg)</Form.Label>
          <Form.Control
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
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