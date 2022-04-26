import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { loginTeacher } from '../../store/actions/auth-teacher-action';
import { loginParent } from '../../store/actions/auth-parent-action';
import { setNotification } from '../../store/actions/notification-action';

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
  const [isTeacher, setIsTeacher] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthParent = useSelector((state) => state.authenticateParent.isAuth);
  const isAuthTeacher = useSelector(
    (state) => state.authenticateTeacher.isAuth
  );

  const userIsTeacherHandler = () => {
    setIsTeacher(true);
  };

  const userIsParentHandler = () => {
    setIsTeacher(false);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginTeacherHandler = (event) => {
    event.preventDefault();
    dispatch(loginTeacher({ email, password }));
  };

  const loginParentHandler = (event) => {
    event.preventDefault();
    dispatch(loginParent({ email, password }));
  };

  if (isAuthParent) {
    dispatch(setNotification('Prisijungta sėkmingai', 'success'));
    navigate('/meetings');
  }

  if (isAuthTeacher) {
    dispatch(setNotification('Prisijungta sėkmingai', 'success'));
    navigate('/meetings');
  }

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
                <Form.Control
                  type='email'
                  value={email}
                  onChange={emailChangeHandler}
                  placeholder='El. Paštas'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='passwordInput'>
                <Form.Label>Slaptažodis</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={passwordChangeHandler}
                  placeholder='Slaptažodis'
                />
              </Form.Group>
              <Button
                onClick={isTeacher ? loginTeacherHandler : loginParentHandler}
                variant='warning'
                type='submit'
                className='float-start'
              >
                <AcceptLink to='#'>Prisijungti</AcceptLink>
              </Button>
              <Button variant='danger' className='float-end'>
                <CancelLink to='/'>Atšaukti</CancelLink>
              </Button>
            </Form>
          </Col>
          <Link
            className='text-center'
            style={{ 'text-decoration': 'none' }}
            to='/forgotpassword'
          >
            Pamiršote paskyros slaptažodį?
          </Link>
        </Row>
      </Container>
    </Styles>
  );
};

export default Login;
