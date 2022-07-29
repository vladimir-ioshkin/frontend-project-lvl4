import React from 'react';
import {
  Card, Col, Container, Image, Row,
} from 'react-bootstrap';
import { SignUpForm } from './SignUpForm.jsx';
import signUpImg from '../../images/signup.jpg';

export const SignUp = () => (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={signUpImg} alt="" className="rounded-circle"></Image>
              </Col>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
);
