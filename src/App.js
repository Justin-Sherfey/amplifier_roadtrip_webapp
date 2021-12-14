import React, { useState } from "react";
import "./App.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from "./Login";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route path="HomePage" element={<HomePage />} />
          <Route path="Login" element={<LoginForm />} />
          <Route path="Register" element={<RegisterForm />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Amplifire RoadTrip</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#loginForm">Login</Nav.Link>
            <Nav.Link href="#registerForm">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => registerUser(JSON.stringify(data));
  const registerUser = (data) => {
    axios.post(`http://localhost:5000/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        console.log(res);
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("password")} />
      <input type="submit" />
    </form>
  );
}

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => loginUser(JSON.stringify(data));
  const loginUser = (data) => {
    axios.post(`http://localhost:5000/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        sessionStorage['jwt'] = res.jwt;
        console.log(res);
      })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("password")} />
      <input type="submit" />
    </form>
  );
}

export default App;
