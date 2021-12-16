import React, { useState, useEffect, Component } from "react";
import "./App.css";
import { Form, Navbar, Container, Nav, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import TripComponent from "./components/TripComponent";
import { Routes, Route, Link, Outlet, Navigate, useNavigate } from "react-router-dom";

const urlConnection = "http://localhost:5000/"
// const urlConnection = "http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/"

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route path='' element={<PrivateRoute />}>
          <Route path='Account' element={<AccountForm />} />
        </Route>
        <Route path="HomePage" element={<HomePage />} />
        <Route path="Login" element={<LoginForm />} />
        <Route path="Register" element={<RegisterForm />} />
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
            <Nav.Link as={Link} to="Account">
              Account
            </Nav.Link>
            <Nav.Link as={Link} to="LogOut">
              Log Out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function HomePage() {
  return (
    <TripComponent />
  );
}

function PrivateRoute() {

  return !!sessionStorage.getItem('jwt') ? <Outlet /> : <Navigate to="/HomePage" />;
}


function AccountForm() {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState([]);

  useEffect(() => { getUserByToken().then(res => { setUser(res.data) }); }, []);

  const updateUser = data => {
    Object.keys(data).map((key) => user[key] = data[key]);
    axios.put(urlConnection + "users", JSON.stringify(user), {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        sessionStorage['jwt'] = getToken(res.data);
        setUser(res.data);

      })
  }

  return (
    <div>
      <h1>Account:</h1>
      <p>Username: {user.username}</p>
      <p>Password: {user.password}</p>
      <p>UserID: {user.userId}</p>
      <Form onSubmit={handleSubmit(updateUser)}>
        <Form.Label>Username:</Form.Label>
        <Form.Control {...register("username")}></Form.Control>
        <Form.Label>Password:</Form.Label>
        <Form.Control {...register("password")}></Form.Control>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

function RegisterForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const registerUser = data => {
    axios.post(urlConnection + "register", JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      navigate('/Login');
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
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const loginUser = data => {
    axios.post(urlConnection + "login", JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        navigate('/HomePage')
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

function getUserByToken() {
  return axios.get(urlConnection + "users", {
    headers: {
      'Authorization': "Bearer " + sessionStorage.getItem('jwt')
    }
  })
}

function getToken(user) {
  axios.post(urlConnection + "login", JSON.stringify(user), {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => {
      sessionStorage['jwt'] = res.data.jwt;
    })
}
export default App;
