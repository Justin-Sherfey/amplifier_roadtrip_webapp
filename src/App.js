import React, { useState } from "react";
import "./App.css";
import { Form, Navbar, Container, Nav, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";

const urlConnection = "http://localhost:5000/"
// const urlConnection = "http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/"

function App() {

  function redirectIfloggedIn(privateRoute) {
    return sessionStorage.getItem('jwt') ? <Navigate to="/Homepage" /> : privateRoute;
  }

  function redirectIfLoggedOut(privateRoute) {
    return !sessionStorage.getItem('jwt') ? <Navigate to="/Login" /> : privateRoute;
  }

  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route path="HomePage" element={<HomePage />} />
        <Route path="Login" element={redirectIfloggedIn(<LoginForm />)} />
        <Route path="Register" element={redirectIfloggedIn(<RegisterForm />)} />
        <Route path="Account" element={redirectIfLoggedOut(<AccountForm />)} />
      </Route >
    </Routes >
  );
}

function NavigationBar() {
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

function HomePage() {
  return (<><h1>Home</h1></>);
}

function AccountForm() {
  return (<><h1>Account</h1></>);
}

function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const registerUser = data => {
    axios.post(urlConnection + "register", JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        console.log(res);
      })
  }

  return (
    <div>
      <h1>Register:</h1>
      <Form onSubmit={handleSubmit(registerUser)}>
        <Form.Label>Username:</Form.Label>
        <Form.Control {...register("username")}></Form.Control>
        <Form.Label>Password:</Form.Label>
        <Form.Control {...register("password")}></Form.Control>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const loginUser = data => {
    axios.post(urlConnection + "login", JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        sessionStorage['jwt'] = res.data.jwt;
      })
  }

  return (
    <div>
      <h1>Login:</h1>
      <Form onSubmit={handleSubmit(loginUser)}>
        <Form.Label>Username:</Form.Label>
        <Form.Control {...register("username")}></Form.Control>
        <Form.Label>Password:</Form.Label>
        <Form.Control {...register("password")}></Form.Control>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default App;
