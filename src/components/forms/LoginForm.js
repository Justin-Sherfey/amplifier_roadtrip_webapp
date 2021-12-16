import { Button } from "bootstrap";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/api/userAPI";

function LoginForm() {
    const { register, handleSubmit } = useForm();

    return (

        <Form onSubmit={handleSubmit(loginUser)}>
            <Form.Label>Username:</Form.Label>
            <Form.Control {...register("username")}></Form.Control>
            <Form.Label>Password:</Form.Label>
            <Form.Control {...register("password")}></Form.Control>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default LoginForm;
