<<<<<<< HEAD
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/api/userAPI";

function Login() {
  const { register, handleSubmit } = useForm();

  <h1>Login:</h1>;
  return (
    <Form onSubmit={handleSubmit(loginUser)}>
      <Form.Label>Username:</Form.Label>
      <Form.Control {...register("username")}></Form.Control>
      <Form.Label>Password:</Form.Label>
      <Form.Control {...register("password")}></Form.Control>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
=======
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getTokenFromUser } from "../services/api/userAPI";

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSubmit = formData => {
        getTokenFromUser(formData).then(res => {
            if (res.status === 200) {
                sessionStorage['jwt'] = res.data.jwt;
                navigate('/Home');
            } else {
                console.log("Unable to Login:" + res)
            }
        })
    }

    return (
        <>
            <h1>Login:</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Label>Username:</Form.Label>
                <Form.Control {...register("username")}></Form.Control>
                <Form.Label>Password:</Form.Label>
                <Form.Control {...register("password")}></Form.Control>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    );
>>>>>>> a85db5217ea178b00184b3c38dc6b81c7334d7dc
}

export default Login;
