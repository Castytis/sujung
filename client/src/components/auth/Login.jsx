import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  max-width: 480px;
  margin: auto;
`;

const Login = () => {
  return (
    <Styles>
      <Container>
        <Row>
          <Col className='p-5'>
            <h3 className='text-center'>Prisijunkite</h3>
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
                Prisijungti
              </Button>
              <Button variant='danger' className='float-end'>
                Atšaukti
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default Login;
