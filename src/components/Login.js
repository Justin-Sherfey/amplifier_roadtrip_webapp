import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getTokenFromUser, getUserByToken } from "../services/api/userAPI";

function Login(props) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData) => {
    getTokenFromUser(formData).then((res) => {
      if (res.status === 200) {

        props.setIsLoggedIn(true);
        sessionStorage["jwt"] = res.data.jwt;
        navigate("/Home");

        getUserByToken(res.data.jwt).then((result) => {

          props.setAuthUser(result.data);
          sessionStorage["user"] = JSON.stringify(result.data);

        });
      } else {
        console.log("Unable to Login:" + res);
      }
    });
  };

  return (
    <>
      <h1>Login:</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Label>Username:</Form.Label>
        <Form.Control {...register("username")}></Form.Control>
        <Form.Label>Password:</Form.Label>
        <Form.Control {...register("password")}></Form.Control>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
export default Login;
