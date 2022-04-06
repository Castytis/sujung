import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { logoutTeacher } from '../../store/actions/auth-teacher-action';
import { logoutParent } from '../../store/actions/auth-parent-action';

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
  const teacherState = useSelector((state) => state.authenticateTeacher);
  const parentState = useSelector((state) => state.authenticateParent);

  const dispatch = useDispatch();

  const logoutTeacherHandler = () => {
    dispatch(logoutTeacher());
  };

  const logoutParentHandler = () => {
    dispatch(logoutParent());
  };

  if (!parentState.isAuth && !teacherState.isAuth) {
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
  } else if (!parentState.isAuth && teacherState.isAuth) {
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
                    <StyledLink to='/teachers'>Mokytojai</StyledLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <StyledLink to='meetings'>Susitikimai</StyledLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <StyledLink to='/teachers/me'>Paskyra</StyledLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <StyledLink to='/' onClick={logoutTeacherHandler}>
                      Atsijungti
                    </StyledLink>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Styles>
    );
  } else {
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
                    <StyledLink to='/teachers'>Mokytojai</StyledLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <StyledLink to='/meetings'>Susitikimai</StyledLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <StyledLink to='/parents/me'>Paskyra</StyledLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <StyledLink to='/' onClick={logoutParentHandler}>
                      Atsijungti
                    </StyledLink>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Styles>
    );
  }
};

export default NavigationBar;
