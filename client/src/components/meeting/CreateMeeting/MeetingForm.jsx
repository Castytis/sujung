import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createMeeting } from '../../../store/actions/meeting-action';
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

const MeetingForm = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const timeChangeHandler = (event) => {
    setTime(event.target.value);
  };

  const locationChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const createMeetingHandler = (event) => {
    event.preventDefault();

    dispatch(createMeeting({ title, subject, date, time, location }));
    navigate('/meetings/me');
  };

  return (
    <Styles>
      <Container>
        <Row>
          <Col className='p-5'>
            <h3 className='text-center p-2'>Naujas susitikimas</h3>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Pavadinimas</Form.Label>
                <Form.Control
                  type='text'
                  onChange={titleChangeHandler}
                  value={title}
                  placeholder='Pavadinimas'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Tikslas</Form.Label>
                <Form.Control
                  type='text'
                  onChange={subjectChangeHandler}
                  value={subject}
                  placeholder='Tikslas'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type='text'
                  onChange={dateChangeHandler}
                  value={date}
                  placeholder='Data'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Laikas</Form.Label>
                <Form.Control
                  type='text'
                  onChange={timeChangeHandler}
                  value={time}
                  placeholder='Laikas'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Vieta</Form.Label>
                <Form.Control
                  type='text'
                  onChange={locationChangeHandler}
                  value={location}
                  placeholder='Vieta'
                />
              </Form.Group>
              <Button variant='danger' className='float-start'>
                <CancelLink to='../meetings'>Atšaukti</CancelLink>
              </Button>
              <Button
                variant='warning'
                onClick={createMeetingHandler}
                type='submit'
                className='float-end'
              >
                Sukurti
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default MeetingForm;
