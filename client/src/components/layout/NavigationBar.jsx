import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #ffff66;
  }
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #4d3e08;
    &:hover {
      color: #f68905;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4d3e08;
  &:hover {
    color: #f68905;
  }
`;

const NavigationBar = () => {
  return (
    <Styles>
      <Navbar expand='lg'>
        <Container>
          <Navbar.Brand>
            <StyledLink to=''>sujung</StyledLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Item>
                <Nav.Link>
                  <StyledLink to='login'>Prisijungti</StyledLink>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <StyledLink to='register'>Registruotis</StyledLink>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styles>
  );
};

export default NavigationBar;
