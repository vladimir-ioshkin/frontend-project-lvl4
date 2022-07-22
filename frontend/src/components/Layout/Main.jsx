import { Container } from "react-bootstrap";

export const Main = ({ children }) => {
  return (
    <Container fluid className="h-100">
      {children}
    </Container>
  );
};
