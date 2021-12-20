import { updateUser } from "../api/userAPI";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
export function Account(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = formData => {
    let user = props.authUser;

    Object.entries(formData).map(([key, value]) => user[key] = value);
    updateUser(user).then(res => {
      sessionStorage["jwt"] = res.data.jwt;
      props.setAuthUser({ ...user });
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
