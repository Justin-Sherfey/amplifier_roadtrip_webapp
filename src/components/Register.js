import { registerUser } from "../services/api/userAPI";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSubmit = formData => {
        registerUser(formData).then(res => {
            if (res.status === 200) {
                navigate('/Login');
            } else {
                console.log("Unable to Register User:" + res)
            }
        })
    }

    return (
        <>
            <h1>Register:</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Label>Username:</Form.Label>
                <Form.Control {...register("username")}></Form.Control>
                <Form.Label>Password:</Form.Label>
                <Form.Control {...register("password")}></Form.Control>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    );
}

export default Register;