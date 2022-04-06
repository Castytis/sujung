import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const MeetingForm = () => {
  return (
    <Styles>
      <Container>
        <Row>
          <Col className='p-5'>
            <h3 className='text-center p-2'>Naujas susitikimas</h3>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Pavadinimas</Form.Label>
                <Form.Control type='text' placeholder='Pavadinimas' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Tema</Form.Label>
                <Form.Control type='text' placeholder='Tema' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Data</Form.Label>
                <Form.Control type='text' placeholder='Data' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Laikas</Form.Label>
                <Form.Control type='text' placeholder='Laikas' />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Vieta</Form.Label>
                <Form.Control type='text' placeholder='Vieta' />
              </Form.Group>
              <Button variant='danger' className='float-start'>
                <CancelLink to='../meetings'>Atšaukti</CancelLink>
              </Button>
              <Button variant='warning' type='submit' className='float-end'>
                <AcceptLink to='#'>Registruotis</AcceptLink>
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default MeetingForm;
