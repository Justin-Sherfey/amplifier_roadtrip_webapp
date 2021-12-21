import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getTokenFromUser, getUserByToken } from "../api/userAPI";
import onTheRoad from "../assets/imgs/onTheRoad.png";
import newUser from "../assets/imgs/newUser.png";
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

  const redirectToLogin = () => {
    navigate("/Register")
  }

  return (

    <>

      <div className="Login" >
        <div className="text-center">
          <img src={onTheRoad} height="130px" />
        </div>
        <div className="text-center">
          <a onClick={redirectToLogin}>
            <img src={newUser} height="40px" />
          </a>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group size='lg' controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control {...register("username")}></Form.Control>
          </Form.Group>

          <Form.Group size='lg' controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control {...register("password")}></Form.Control>
          </Form.Group>

          <br />

          <div className="text-center">
            <Button variant="dark" type="submit">
              Login
            </Button>
          </div>

        </Form>
      </div>
    </>
  );
}
export default Login;