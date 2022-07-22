import { Link } from 'react-router-dom';
import { LoginForm } from './LoginForm.jsx';
import loginImg from '../images/login.jpeg';
import { Card, Col, Image, Row } from 'react-bootstrap';

export const Authorization = () => {
  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Image src={loginImg} alt="" className="rounded-circle"></Image>
            </Col>
            <LoginForm />
          </Card.Body>
          <Card.Footer className="text-muted p-4">
            <div className="text-center">
              Нет аккаунта?{' '}
              <Link to="/signup">Регистрация</Link>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
