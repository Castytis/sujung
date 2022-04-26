import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const Styles = styled.div`
  h6 {
    display: inline-block;
  }
  max-width: 480px;
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

const ForgotPassword = () => {
  const dispatch = useDispatch();

  return (
    <Styles>
      <Container>
        <Row>
          <Col className='p-5'>
            <h3 className='text-center p-2'>Slaptažodžio atkūrimas </h3>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Paskyros el. paštas </Form.Label>
                <Form.Control type='text' placeholder='el. paštas' />
              </Form.Group>

              <Button variant='danger' className='float-start'>
                <CancelLink to='../'>Atšaukti</CancelLink>
              </Button>
              <Button variant='warning' type='submit' className='float-end'>
                <AcceptLink to='#'>Patvirtinti</AcceptLink>
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default ForgotPassword;
