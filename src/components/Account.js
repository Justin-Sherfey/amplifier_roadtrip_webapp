import { updateUser } from "../api/userAPI";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import accountInfo from "../assets/imgs/accountInfo.png";


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
    <Container className="text-center" className="Register">
      <div className="text-center">
        <img src={accountInfo} height="80px" />
      </div>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Label>Username:</Form.Label>
        <Form.Control {...register("username")}></Form.Control>
        <Form.Label>Password:</Form.Label>
        <Form.Control {...register("password")}></Form.Control>
        <br />
        <div className="text-center">

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Account;
