import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Card, Col, Container, Image, Row,
} from 'react-bootstrap';
import { Pages } from '../../routes';
import loginImg from '../../images/login.jpeg';
import signUpImg from '../../images/signup.jpg';
import { CardFormProps } from './types';

const CardForm: FunctionComponent<CardFormProps> = ({ isAuthorization = false, children }) => {
  const { t } = useTranslation();
  const img = isAuthorization ? loginImg : signUpImg;

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={img} alt="" className="rounded-circle" />
              </Col>
              {children}
            </Card.Body>
            {isAuthorization && (
              <Card.Footer className="text-muted p-4">
                <div className="text-center">
                  {t('authorization.footer.text')}
                  {' '}
                  <Link to={Pages.SIGNUP}>{t('authorization.footer.link')}</Link>
                </div>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CardForm;
