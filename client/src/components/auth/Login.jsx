import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styles
const Styles = styled.div`
  max-width: 560px;
  margin: auto;
  h6 {
    display: inline-block;
  }
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

const Login = () => {
  const [isTeacher, setIsTeacher] = useState();

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
            <h3 className='text-center'>Prisijunkite</h3>
            <h6 className='pt-5'>Jungiuosi kaip</h6>
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
            <Form>
              <Form.Group className='mb-3' controlId='emailInput'>
                <Form.Label className='text-center'>El. Paštas</Form.Label>
                <Form.Control type='email' placeholder='El. Paštas' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='passwordInput'>
                <Form.Label>Slaptažodis</Form.Label>
                <Form.Control type='password' placeholder='Slaptažodis' />
              </Form.Group>
              <Button variant='warning' className='float-start'>
                <AcceptLink to='/'>Prisijungti</AcceptLink>
              </Button>
              <Button variant='danger' className='float-end'>
                <CancelLink to='/'>Atšaukti</CancelLink>
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default Login;
