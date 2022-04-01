import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #ffff66;
  }
  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #4d3e08;
    &:hover {
      color: #f68905;
    }
  }
`;

const NavigationBar = () => {
  return (
    <Styles>
      <Navbar expand='lg'>
        <Container>
          <Navbar.Brand href='/'>sujung</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Item>
                <Nav.Link href='/login'>Prisijungti</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/register'>Registruotis</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styles>
  );
};

export default NavigationBar;
