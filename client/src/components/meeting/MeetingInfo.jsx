import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetingById } from '../../store/actions/meeting-action';
import { Card, ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';
import MeetingParticipants from './MeetingParticipants';
import { addParticipant } from '../../store/actions/meeting-action';
import { removeParticipant } from '../../store/actions/meeting-action';

const MeetingInfo = () => {
  let meetingId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let meeting = useSelector((state) => state.meetings.meeting);

  const [participateButton, setParticipateButton] = useState(false);

  useEffect(() => {
    dispatch(getMeetingById(meetingId.id));
  }, [getMeetingById]);

  const addParticipantHandler = () => {
    dispatch(addParticipant(meetingId.id));
    setParticipateButton(true);
  };

  const removeParticipantHandler = () => {
    dispatch(removeParticipant(meetingId.id));
    setParticipateButton(false);
  };

  if (meeting !== null) {
    const teacherParticipants = meeting.participants.teachers;
    const parentParticipants = meeting.participants.parents;

    return (
      <Col className='d-flex justify-content-center mt-5'>
        <Card style={{ width: '22rem' }}>
          <Card.Body>
            <Card.Title style={{ color: 'blue' }}>{meeting.title}</Card.Title>
            <Card.Text>
              <span className='text-muted'>Organizuoja:</span>{' '}
              {meeting.organiser.name} {meeting.organiser.surname}
            </Card.Text>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>
              <span className='text-muted'>Tikslas: </span>
              {meeting.subject}
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>Vieta: </span>
              {meeting.location}
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>Data: </span>
              {meeting.date}
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted'>Laikas: </span>
              {meeting.time}
            </ListGroupItem>
          </ListGroup>
          <Card.Header style={{ color: 'blue' }}>
            Mokytojai dalyviai: {teacherParticipants.length}
          </Card.Header>
          <ListGroup className='list-group-flush'>
            {teacherParticipants.map((participant) => (
              <MeetingParticipants
                key={participant.teacher._id}
                name={participant.teacher.name}
                surname={participant.teacher.surname}
              />
            ))}
          </ListGroup>
          <Card.Header style={{ color: 'blue' }}>
            Globėjai dalyviai: {parentParticipants.length}
          </Card.Header>
          <ListGroup className='list-group-flush'>
            {parentParticipants.map((participant) => (
              <MeetingParticipants
                key={participant.parent._id}
                name={participant.parent.name}
                surname={participant.parent.surname}
              />
            ))}
          </ListGroup>
          <Card.Body>
            <Button variant='outline-info' onClick={() => navigate(-1)}>
              Grįžti atgal
            </Button>
            {!participateButton ? (
              <Button
                variant='btn btn-outline-success'
                className='float-end'
                onClick={addParticipantHandler}
              >
                Dalyvauti
              </Button>
            ) : (
              <Button
                variant='btn btn-danger'
                className='float-end'
                onClick={removeParticipantHandler}
              >
                Palikti susitikimą
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  }
};

export default MeetingInfo;
