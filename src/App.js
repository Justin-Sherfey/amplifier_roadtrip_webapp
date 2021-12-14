import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
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
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

function TestFunction() {
  return <h1>someText</h1>;
}
class RegisterMenu extends React.Component {
  render() {
    return (
      <>
        <form id="registerForm">
          <h1>Sign up</h1>

          <p>Username:</p>
          <input type="text" name="username" />
          <br />

          <p>Password:</p>
          <input type="text" name="password" />
          <br />

          <Button varient="info">Submit</Button>
        </form>
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
