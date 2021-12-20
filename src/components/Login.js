import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getTokenFromUser, getUserByToken } from "../api/userAPI";

import "./style/Login.css";

function Login(props) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    getTokenFromUser(formData).then((res) => {
      if (res.status === 200) {

        sessionStorage["jwt"] = res.data.jwt;
        setUserInfo(res.data.jwt);

      } else {
        console.log("Unable to Login:" + res);
      }
    });
  };

  const setUserInfo = (jwt) => {
    getUserByToken(jwt).then((result) => {
      props.setAuthUser(result.data);
      navigate("/Home");
    });
  }

  return (
    
    <>
    
    <div className="Login" style={{justifyContent:'center', alignItems:'center'}}>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group size='lg' controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control {...register("username")}></Form.Control>
        </Form.Group>
        
        <Form.Group size='lg' controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control {...register("password")}></Form.Control>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
    </>
  );
}
export default Login;
