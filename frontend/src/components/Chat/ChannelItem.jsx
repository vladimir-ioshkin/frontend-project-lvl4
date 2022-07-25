import React from 'react';
import { Button, Nav } from 'react-bootstrap';

export const ChannelItem = ({ name }) => (
    <Nav.Item className="w-100">
      <Button variant="light" className="w-100 rounded-0 text-start">
        <span className="me-1">#</span>
        {name}
      </Button>
    </Nav.Item>
);
