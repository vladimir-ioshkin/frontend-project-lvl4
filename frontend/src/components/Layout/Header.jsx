import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export const Header = () => (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
);
