import { registerUser, getUserByToken } from "../api/userAPI";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./style/Register.css"


function Register(props) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData) => {
    registerUser(formData).then((res) => {
      if (res.status === 200) {

        sessionStorage["jwt"] = res.data.jwt;
        setUserInfo(res.data.jwt);

      } else {
        console.log("Unable to Register:" + res);
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
              <div className="Register" style={{justifyContent:'center', alignItems:'center'}}>

      <h1 className="text-center">Register</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Label>Username:</Form.Label>
        <Form.Control {...register("username")}></Form.Control>
        <Form.Label>Password:</Form.Label>
        <Form.Control {...register("password")}></Form.Control>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      </div>

    </>
  );
}

export default Register;
