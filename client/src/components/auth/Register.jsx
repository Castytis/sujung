import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  h6 {
    display: inline-block;
  }
  max-width: 560px;
  margin: auto;
`;

const Register = () => {
  let isTeacher = false;

  return (
    <Styles>
      <Container>
        <Row>
          <Col className='p-5'>
            <h3 className='text-center'>Registracija</h3>
            <h6 className='pt-5'>Registruojuosi kaip</h6>
            <Button variant='warning' className='m-3'>
              Mokytojas
            </Button>
            <Button variant='warning' className='m-3'>
              Globėjas
            </Button>
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
                Registruotis
              </Button>
              <Button variant='danger' className='float-end'>
                Atšaukti
              </Button>
            </Form>
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
                Registruotis
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

export default Register;
