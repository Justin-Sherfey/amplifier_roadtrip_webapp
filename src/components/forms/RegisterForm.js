import { registerUser } from "../../services/api/userAPI";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

function RegisterForm() {
    const { register, handleSubmit } = useForm();

    return (
        <Form onSubmit={handleSubmit(registerUser)}>
            <Form.Label>Username:</Form.Label>
            <Form.Control {...register("username")}></Form.Control>
            <Form.Label>Password:</Form.Label>
            <Form.Control {...register("password")}></Form.Control>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
}

export default RegisterForm;