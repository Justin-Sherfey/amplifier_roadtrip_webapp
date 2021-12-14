import logo from "./logo.svg";
import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      <RegisterMenu />
    </div>
  );
}
class MenuBar extends React.Component {
  render() {
    return (
      <>
        <a href="home.html">
          <button>Homepage</button>
        </a>
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

          <input value="Submit" type="button" onclick="registerForm()" />
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
