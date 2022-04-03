import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styles
const Styles = styled.div`
  h6 {
    display: inline-block;
  }
  max-width: 560px;
  margin: auto;
`;

const CancelLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    color: black;
  }
`;

const AcceptLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
`;

const StyledButton = styled(Button)`
  color: black;
  &:hover {
    color: white;
    background-color: #fc7b03;
  }
`;

const Register = () => {
  const [isTeacher, setIsTeacher] = useState(false);

  const userIsTeacherHandler = () => {
    setIsTeacher(true);
  };

  const userIsParentHandler = () => {
    setIsTeacher(false);
  };

  return (
    <Styles>
      <Container>
        <Row>
          <Col className='p-5'>
            <h3 className='text-center'>Registracija</h3>

            <h6 className='pt-5'>Registruojuosi kaip</h6>
            <StyledButton
              variant='warning'
              className='m-3'
              onClick={userIsTeacherHandler}
              disabled={isTeacher}
            >
              Mokytojas
            </StyledButton>
            <StyledButton
              variant='warning'
              className='m-3'
              onClick={userIsParentHandler}
              disabled={!isTeacher}
            >
              Globėjas
            </StyledButton>

            {isTeacher ? (
              <Form>
                <Form.Group className='mb-3' controlId='emailInput'>
                  <Form.Label className='text-center'>El. Paštas</Form.Label>
                  <Form.Control type='email' placeholder='El. Paštas' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='passwordInput'>
                  <Form.Label>Slaptažodis</Form.Label>
                  <Form.Control type='password' placeholder='Slaptažodis' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='passwordInput'>
                  <Form.Label>Pakartokite slaptažodį</Form.Label>
                  <Form.Control type='password' placeholder='Slaptažodis' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Vardas</Form.Label>
                  <Form.Control type='text' placeholder='Vardas' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Pavardė</Form.Label>
                  <Form.Control type='text' placeholder='Pavardė' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Mokomasis dalykas</Form.Label>
                  <Form.Control type='text' placeholder='Mokomasis dalykas' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Klasės</Form.Label>
                  <Form.Control type='text' placeholder='Klasės' />
                </Form.Group>
                <Button variant='warning' className='float-start'>
                  <AcceptLink to='/'>Registruotis</AcceptLink>
                </Button>
                <Button variant='danger' className='float-end'>
                  <CancelLink to='/'>Atšaukti</CancelLink>
                </Button>
              </Form>
            ) : (
              <Form>
                <Form.Group className='mb-3' controlId='emailInput'>
                  <Form.Label className='text-center'>El. Paštas</Form.Label>
                  <Form.Control type='email' placeholder='El. Paštas' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='passwordInput'>
                  <Form.Label>Slaptažodis</Form.Label>
                  <Form.Control type='password' placeholder='Slaptažodis' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='passwordInput'>
                  <Form.Label>Pakartokite slaptažodį</Form.Label>
                  <Form.Control type='password' placeholder='Slaptažodis' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Vardas</Form.Label>
                  <Form.Control type='text' placeholder='Vardas' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Pavardė</Form.Label>
                  <Form.Control type='text' placeholder='Pavardė' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Vaiko vardas</Form.Label>
                  <Form.Control type='text' placeholder='Vaiko vardas' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Vaiko pavardė</Form.Label>
                  <Form.Control type='text' placeholder='Vaiko pavardė' />
                </Form.Group>
                <Button variant='warning' className='float-start'>
                  <AcceptLink to='/'>Registruotis</AcceptLink>
                </Button>
                <Button variant='danger' className='float-end'>
                  <CancelLink to='/'>Atšaukti</CancelLink>
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default Register;
