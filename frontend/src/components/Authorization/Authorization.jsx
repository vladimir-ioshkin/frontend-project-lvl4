import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Card, Col, Container, Image, Row,
} from 'react-bootstrap';
import loginImg from '../../images/login.jpeg';
import { LoginForm } from './LoginForm.jsx';

export const Authorization = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
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
                {t('authorization.footer.text')}{' '}
                <Link to="/signup">{t('authorization.footer.link')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
