import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route path="HomePage" element={<HomePage />} />
          <Route path="Login" element={<LoginMenu />} />
          <Route path="Register" element={<RegisterMenu />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

class NavigationBar extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="HomePage">
              Amplifire RoadTrip
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="Login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="Register">
                Register
              </Nav.Link>
              <Link to="Register">Register</Link>
            </Nav>
          </Container>
        </Navbar>
        <Outlet />
      </>
    );
  }
}
class HomePage extends React.Component {
  render() {
    return <></>;
  }
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
class LoginMenu extends React.Component {
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
          <Button varient="info">Submit</Button>
        </form>
      </>
    );
  }
}
export default App;
