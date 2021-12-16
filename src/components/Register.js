import { registerUser } from "../../services/api/userAPI";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

function Register() {
  const { register, handleSubmit } = useForm();

  <h1>Register:</h1>;
  return (
    <Form onSubmit={handleSubmit(registerUser)}>
      <Form.Label>Username:</Form.Label>
      <Form.Control {...register("username")}></Form.Control>
      <Form.Label>Password:</Form.Label>
      <Form.Control {...register("password")}></Form.Control>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Register;
