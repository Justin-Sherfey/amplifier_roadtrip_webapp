import { updateUser } from "../services/api/userAPI";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export function Account(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = formData => {
    Object.entries(formData).map(([key, value]) => { props.authUser[key] = value });
    updateUser(props.authUser).then(res => {
      sessionStorage["jwt"] = res.data.jwt;
    })
  }

  return (
    <>
      <h1>Account:</h1>
      <p>Username: {props.authUser.username}</p>
      <p>UserID: {props.authUser.userId}</p>
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

export default Account;
