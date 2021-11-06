import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";





function getData(){
  fetch('http://localhost:4000/api/tasks/',{mode:'cors'})
  .then((response) => {
    //console.log("vino aquí",response);
    return  response.json();
  })
  .then((dato) => {
    return dato;
  }).then(function(dato) {       // `names` is the value resolved by the promise...
    datos = dato;      // and you can now add it to your $scope
 });    
}




function User() {
  getData();
  //Consulta al back y get información
  console.log("****************************");
  console.log(datos);
  

  //Variables para cargar los datos del usuario activo
  let nombreUsuario = "usuario1";
  let nombre = "nombre1";
  let apellido = "apellido2";
  let email = "email1";
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Editar perfil</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nombre de usuario</label>
                        <Form.Control
                          defaultValue={nombreUsuario}
                          placeholder="Nombre de Usuario"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          E-mail
                        </label>
                        <Form.Control
                          defaultValue={email}
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nombre</label>
                        <Form.Control
                          defaultValue={nombre}
                          placeholder="Nombre"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Apellido</label>
                        <Form.Control
                          defaultValue={apellido}
                          placeholder="Apellido"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Comentarios</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Bla bla bla bla"
                          placeholder="Descripción"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Actualizar perfil
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">{nombre}</h5>
                  </a>
                  <p className="description">{nombreUsuario}</p>
                </div>
                <p className="description text-center">
                  "Bla bla<br></br>
                  Bla bla <br></br>
                </p>
              </Card.Body>
              <hr></hr>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default User;
