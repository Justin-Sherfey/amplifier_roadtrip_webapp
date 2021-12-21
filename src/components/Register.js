import { registerUser, getUserByToken } from "../api/userAPI";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import readyToRide from "../assets/imgs/readyToRide.png";
import oldUser from "../assets/imgs/oldUser.png";
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
  const redirectToLogin = () => {
    navigate("/Register")
  }

  return (
    <>
      <div className="Register">
        <div className="text-center">
          <img src={readyToRide} height="130px" />
        </div>
        <div className="text-center">
          <a href={"/Login"}>
            <img src={oldUser} height="40px" />
          </a>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Label>Username:</Form.Label>
          <Form.Control {...register("username")}></Form.Control>
          <Form.Label>Password:</Form.Label>
          <Form.Control {...register("password")}></Form.Control>

          <br />
          <div className="text-center">
            <Button variant="dark" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>

    </>
  );
}

export default Register;
