import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../store/actions/password-reset-action';

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

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const link = useParams();

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const passwordChange = (event) => {
    event.preventDefault();
    dispatch(resetPassword(password, link, navigate));
  };

  return (
    <Styles>
      <Container>
        <Row>
          <Col className='p-5'>
            <h3 className='text-center p-2'>Naujas slaptažodis </h3>
            <Form onSubmit={passwordChange}>
              <Form.Group className='mb-3'>
                <Form.Label>Naujas slaptažodis</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  required
                  minLength={6}
                  onChange={passwordChangeHandler}
                  placeholder='slaptažodis'
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

export default ResetPassword;
