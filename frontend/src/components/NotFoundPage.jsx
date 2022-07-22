import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';
import pageNotFoundImg from '../images/pageNotFound.jpg';

export const NotFoundPage = () => {
  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12 col-md-8 col-xxl-6 text-center d-flex flex-column align-items-center">
        <div className="rounded-circle overflow-hidden m-5" style={{ width: '360px', height: '360px' }}>
          <Image src={pageNotFoundImg} alt="Страница не найдена"></Image>
        </div>
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          Но вы можете перейти{" "}
          <Link to="/">на главную страницу</Link>
        </p>
      </Col>
    </Row>
  );
};
