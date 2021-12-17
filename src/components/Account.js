import { updateUser, getUserByToken } from "../services/api/userAPI";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export function Account() {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserByToken().then((res) => {
      setUser(res.data);
    });
  }, []);

  const onSubmit = formData => {
    Object.entries(formData).map(([key, value]) => { user[key] = value });
    updateUser(user).then(res => {
      sessionStorage["jwt"] = JSON.stringify(res.data);
    })
  }

  return (
    <>
      <h1>Account:</h1>
      <p>Username: {user.username}</p>
      <p>UserID: {user.userId}</p>
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
