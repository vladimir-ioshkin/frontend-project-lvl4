import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Image, Row } from 'react-bootstrap';
import pageNotFoundImg from '../../images/pageNotFound.jpg';

const NotFound: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12 col-md-8 col-xxl-6 text-center d-flex flex-column align-items-center">
        <div className="rounded-circle overflow-hidden m-5" style={{ width: '360px', height: '360px' }}>
          <Image src={pageNotFoundImg} alt={t('notFound.title')} />
        </div>
        <h1 className="h4 text-muted">{t('notFound.title')}</h1>
        <p className="text-muted">
          {t('notFound.text')}
          {' '}
          <Link to="/">{t('notFound.link')}</Link>
        </p>
      </Col>
    </Row>
  );
};

export default NotFound;
