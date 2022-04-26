import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendPasswordRecoveryLink } from '../../store/actions/password-reset-action';

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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const sendPasswordResetLinkHandler = (event) => {
    event.preventDefault();
    dispatch(sendPasswordRecoveryLink({ email }));
  };

  return (
    <Styles>
      <Container>
        <Row>
          <Col className='p-5'>
            <h3 className='text-center p-2'>Slaptažodžio atkūrimas </h3>
            <Form onSubmit={sendPasswordResetLinkHandler}>
              <Form.Group className='mb-3'>
                <Form.Label>Paskyros el. paštas </Form.Label>
                <Form.Control
                  type='text'
                  value={email}
                  onChange={emailChangeHandler}
                  placeholder='el. paštas'
                />
              </Form.Group>

              <Button variant='danger' className='float-start'>
                <CancelLink to='../'>Atšaukti</CancelLink>
              </Button>
              <Button variant='warning' type='submit' className='float-end'>
                Patvirtinti
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default ForgotPassword;
