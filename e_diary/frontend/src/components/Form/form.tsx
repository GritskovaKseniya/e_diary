import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export function AuthForm(){
    return (
        <div className="auth-form-body mt-3 w-30 mx-auto rounded-sm">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="email" placeholder="Введите логин" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" />
                </Form.Group>

                <Button variant="success" type="submit">
                    Войти
                </Button>
            </Form>
        </div>
    );
}