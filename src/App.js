import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import { Navbar, Container, Row, Nav,Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <NavigationBar />
      <RegisterMenu />
    </div>
  );
}

class NavigationBar extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Amplifire RoadTrip</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#loginForm">Login</Nav.Link>
              <Nav.Link href="#registerForm">Register</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

class RegisterMenu extends React.Component {
  render() {
    return (
      <>
        <Container>
            <Row>
              <Col xs={6}>
            
              <form id="registerForm">
              <Form.Group>
                <h1>Sign up</h1>

                <Form.Label>Username:</Form.Label>
                <Form.Control placeholder="Enter Username"/>
                <br />

                <Form.Label>Password:</Form.Label>
                <Form.Control placeholder="Enter Password"/>
                <br />

              </Form.Group>
                <Button varient="info" type="submit">
                Submit
                </Button>
              </form>

              </Col>
          </Row>
        </Container>
      </>
    );
  }
}
class logginMenu extends React.Component {
  render() {
    return (
      <>
        <form id="loginForm">
          <h1>Login</h1>
          Username:
          <input type="text" name="username" />
          <br />
          Password:
          <input type="text" name="password" />
          <br />
          <input value="Submit" type="button" onclick="loginForm()" />
        </form>
      </>
    );
  }
}
export default App;
