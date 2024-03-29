import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { registerTeacher } from '../../store/actions/auth-teacher-action';
import { registerParent } from '../../store/actions/auth-parent-action';
import { setNotification } from '../../store/actions/notification-action';

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
  color: white;
  &:hover {
    color: black;
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [subject, setSubject] = useState('');
  const [classes, setClasses] = useState('');
  const [number, setNumber] = useState('');

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

  const repeatPasswordChangeHandler = (event) => {
    setRepeatPassword(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const surnameChangeHandler = (event) => {
    setSurname(event.target.value);
  };

  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };

  const classesChangeHandler = (event) => {
    setClasses(event.target.value);
  };

  const phoneNumberHandler = (event) => {
    setNumber(event.target.value);
  };

  const registerUserHandler = (event) => {
    event.preventDefault();

    if (isTeacher) {
      dispatch(
        registerTeacher({
          email,
          password,
          name,
          surname,
          subject,
          classes,
          number,
        })
      );
    }

    if (!isTeacher) {
      dispatch(
        registerParent({
          email,
          password,
          name,
          surname,
        })
      );
    }
  };

  if (isAuthParent) {
    dispatch(setNotification('Registracija sėkminga', 'success'));
    navigate('/meetings');
  }

  if (isAuthTeacher) {
    dispatch(setNotification('Registracija sėkminga', 'success'));
    navigate('/meetings');
  }

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
                <Form.Group className='mb-3' controlId='passwordInput'>
                  <Form.Label>Pakartokite slaptažodį</Form.Label>
                  <Form.Control
                    type='password'
                    value={repeatPassword}
                    onChange={repeatPasswordChangeHandler}
                    placeholder='Slaptažodis'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Vardas</Form.Label>
                  <Form.Control
                    type='text'
                    value={name}
                    onChange={nameChangeHandler}
                    placeholder='Vardas'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Pavardė</Form.Label>
                  <Form.Control
                    type='text'
                    value={surname}
                    onChange={surnameChangeHandler}
                    placeholder='Pavardė'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Tel. Numeris</Form.Label>
                  <Form.Control
                    type='text'
                    value={number}
                    onChange={phoneNumberHandler}
                    placeholder='Tel. Numeris'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Mokomas dalykas</Form.Label>
                  <Form.Control
                    type='text'
                    value={subject}
                    onChange={subjectChangeHandler}
                    placeholder='Mokomas dalykas'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Klasės</Form.Label>
                  <Form.Control
                    type='text'
                    value={classes}
                    onChange={classesChangeHandler}
                    placeholder='Klasės'
                  />
                </Form.Group>
                <Button variant='danger' className='float-start'>
                  <CancelLink to='/'>Atšaukti</CancelLink>
                </Button>
                <Button
                  variant='success'
                  type='submit'
                  onClick={registerUserHandler}
                  className='float-end'
                >
                  <AcceptLink to='#'>Registruotis</AcceptLink>
                </Button>
              </Form>
            ) : (
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
                <Form.Group className='mb-3' controlId='passwordInput'>
                  <Form.Label>Pakartokite slaptažodį</Form.Label>
                  <Form.Control
                    type='password'
                    value={repeatPassword}
                    onChange={repeatPasswordChangeHandler}
                    placeholder='Slaptažodis'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Vardas</Form.Label>
                  <Form.Control
                    type='text'
                    value={name}
                    onChange={nameChangeHandler}
                    placeholder='Vardas'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Pavardė</Form.Label>
                  <Form.Control
                    type='text'
                    value={surname}
                    onChange={surnameChangeHandler}
                    placeholder='Pavardė'
                  />
                </Form.Group>
                <Button variant='danger' className='float-start'>
                  <CancelLink to='/'>Atšaukti</CancelLink>
                </Button>
                <Button
                  variant='success'
                  type='submit'
                  onClick={registerUserHandler}
                  className='float-end'
                >
                  <AcceptLink to='#'>Registruotis</AcceptLink>
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
